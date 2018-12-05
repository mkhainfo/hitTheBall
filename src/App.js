import React, { Component } from 'react'
import update from 'immutability-helper'
import './App.css'



class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      score: 0,
    }
  }

getScore = (n) => {
  this.setState({ score : n })
}

  render() {
    return (
      <span id="view">
        <Game fill='#eeeeee' score={this.getScore} />
        <Score score={this.state.score} />
      </span>
    )
  }
}



class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {
      svg: {},
      cell: {},
      paddles: {
        depth: 0,
        x: {
          length: 0,
          x: 0,
          top: {},
          bottom: {},
        },
        y: {
          length: 0,
          y: 0,
          left: {},
          right: {},
        },
      },
      ball: {},
      score: 0,
    }
  }

  setSvg = () => {
    let w = window.innerWidth, h = window.innerHeight
    let svg = update(this.state.svg, {
      w: {$set: w},
      h: {$set: h},
      box: {$set: [0, 0, w, h].join(' ')},
      size: {$set: Math.sqrt( w*w + h*h )}
    })
    this.setState({ svg: svg })
  }

  setCell = () => {
    let w = this.state.svg.w * .8, h = this.state.svg.h * .8
    let cell = update(this.state.cell, {
      w: {$set: w},
      h: {$set: h},
      x: {$set: (this.state.svg.w - w) / 2},
      y: {$set: (this.state.svg.h - h) / 2},
    })
    this.setState({cell: cell})
  }

  setPaddles = () => {
    let svg = this.state.svg, cell = this.state.cell,
        size = 1/9, depth = svg.size/100,
        ready = update(this.state.paddles, {
          depth: {$set: depth},
          x: {
            length: {$set: svg.w * size},
            top: {y: {$set: cell.y}},
            bottom: {y: {$set: cell.y + cell.h - depth}},
          },
          y: {
            length: {$set: svg.h * size},
            left: {x: {$set: cell.x}},
            right: {x: {$set: cell.x + cell.w - depth}},
          },
        })
    this.setState({paddles: ready})
  }

  pickPaddles = () => {
    const printArr = (min, max) => {
      max = max === undefined ? min : max
      let arr = []
      for (let i = 0; i < 4; i++) {
        arr.push(Math.round(Math.random()))
      }
      let arrSum = arr.reduce( (a, b) => a + b )
      return min <= arrSum && arrSum <= max ? arr : printArr(min, max)
    }
    let keys = printArr(4)
    let on = update(this.state.paddles, {
      x: {
        top: {display: {$set: keys[0] ? 'on' : 'none'},},
        bottom: {display: {$set: keys[1] ? 'on' : 'none'},},
      },
      y: {
        left: {display: {$set: keys[2] ? 'on' : 'none'},},
        right: {display: {$set: keys[3] ? 'on' : 'none'},},
      },
    })
    this.setState({paddles: on})
  }

  setBall = () => {
    let svg = this.state.svg
    let ball = update(this.state.ball, {
      x: {$set: svg.w/2},
      y: {$set: svg.h/2},
      r: {$set: svg.size/100},
      dx: {$set: svg.size/700},
      dy: {$set: svg.size/700},
      })

    this.setState({ ball: ball })
  }

  moveBall = () => {
    let cell = this.state.cell, ball = this.state.ball, bounce = ball,
        pad = this.state.paddles, dx = ball.dx, dy = ball.dy, score = this.state.score

    // if the ball hits a vertical wall
    if ( ball.x + ball.dx - ball.r < cell.x
          || ball.x + ball.dx + ball.r > cell.x + cell.w) {
      dx *= -1
    // if ball hits horizontal wall
    } else if (ball.y + ball.dy - ball.r  < cell.y
          || ball.y + ball.r + ball.dy > cell.y + cell.h ) {
      dy *= -1
    // if ball hits bottom paddle. paddle must be present.
    } else if ( pad.x.bottom.display !== 'none'
      && ball.y + ball.r + ball.dy > cell.y + cell.h - pad.depth) {
      pad.x.x <= ball.x + ball.r && ball.x + ball.r <= pad.x.x + pad.x.length ?
      dy *= -1 : dy = 0
    }



    bounce = update(ball, {
      dx: {$set: dx},
      dy: {$set: dy},
      })

    let move = update(bounce, {
      x: {$set: ball.x + ball.dx},
      y: {$set: ball.y + ball.dy},
      })

    this.setState({ ball: move, score: score })
  }

  movePaddles = (e) => {
    let cell = this.state.cell, pad = this.state.paddles,
      rightBound = cell.x + cell.w - pad.x.length,
      lowerBound = cell.y + cell.h - pad.y.length
    let [x, y] = e.type !== 'mousemove'?
      [ e.touches.clientX, e.touches.clientY ] : [e.clientX, e.clientY]
    x = x < cell.x ? cell.x : x > rightBound ? rightBound : x
    y = y < cell.y ? cell.y : y > lowerBound ? lowerBound : y
    let move = update(pad, {
      x: {x: {$set: x}},
      y: {y: {$set: y}},
    })
    this.setState({ paddles: move })
  }

  setGame = () => {
    this.setSvg()
    this.pickPaddles()
    setTimeout(this.setCell)
    setTimeout(this.setBall)
    setTimeout(this.setPaddles, 1)
    setTimeout(this.pickPaddles, 2)
  }

//// this conditions should be triggered AFTER state is updated to score: ':('
//////     where do i put it?
  /*  if (this.state.score === ':(') {
      let reset = () => {
        this.setGame()
        this.setState({ score : 0 })
        this.props.score(0)
      }
      window.setTimeout(reset(), 3000)
    }
  }*/
//////////   maybe in shouldComponentUpdate()? check the lifecycle graph
///// maybe it is triggered when the ball touches the paddle again ??
/// in that case it would be a part of moveBall()


  componentDidMount() {
    this.setGame()
    window.addEventListener('resize', this.setGame)
    window.setInterval(this.moveBall, 10)
    window.addEventListener('mousemove', this.movePaddles)
  }

  shouldComponentUpdate(nextProps, nextState){
    return this.state !== nextState
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setGame)
    window.clearInterval(window.setInterval(this.moveBall, 10))
  }


// onMouseMove={this.movePaddle} onTouchMove={this.movePaddle}
  render() {
    let s = this.state
    let pad = this.state.paddles
    return(
      <svg
        width={ s.svg.w } height={ s.svg.h }
        viewBox={ s.svg.box }
         >
        <rect id='cell'
          width={ s.cell.w } height={ s.cell.h }
          x={ s.cell.x } y={ s.cell.y } />

        <circle id='ball'
          cx={ s.ball.x } cy={ s.ball.y }
          r={ s.ball.r } fill={ this.props.fill } />

        <rect id='paddleXT' display={ pad.x.top.display }
          width={ pad.x.length } height={ pad.depth }
          x={ pad.x.x } y={ pad.x.top.y }
          fill={ this.props.fill } />
        <rect id='paddleXB' display={ pad.x.bottom.display }
          width={ pad.x.length } height={ pad.depth }
          x={ pad.x.x } y={ pad.x.bottom.y }
          fill={ this.props.fill } />
        <rect id='paddleYL' display={pad.y.left.display}
          width={ pad.depth } height={ pad.y.length }
          x={ pad.y.left.x } y={ pad.y.y }
          fill={ this.props.fill } />
        <rect id='paddleYR' display={pad.y.right.display}
            width={ pad.depth } height={ pad.y.length }
            x={ pad.y.right.x } y={ pad.y.y }
            fill={ this.props.fill } />
      </svg>
    )
  }
}

class Score extends Component {
  constructor(props) {
    super(props)
    this.state = {
        score: 0,
    }
  }

  render() {
    return (
      <div id='score' style={styles.score}>
        {this.props.score}
      </div>
    )
  }
}

const styles = {
  score: {
    fontSize: '6vh',
    color: '#eee',
    textAlign: 'center',
    zIndex: 3,
    position: 'absolute',
  },
}
export default App
