import React, { Component } from 'react'
import update from 'immutability-helper'
//import Game from './game/Game.js'
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
          top: {
            x: 0,
            y: 0,
          },
          bottom: {
            x: 0,
            y: 0,
          },
        },
        y: {
          length: 0,
          left: {
            x: 0,
            y: 0,
          },
          right: {
            x: 0,
            y: 0,
          },
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
    let svg = this.state.svg, cell = this.state.cell, size = 1/9,
      depth = svg.size/100, wM = svg.w / 2, hM = svg.h / 2,
      ready = update(this.state.paddles, {
        depth: {$set: depth},
        x: {  // fixed y
          length: {$set: svg.w * size},
          top: {
            x: {$set: wM},
            y: {$set: cell.y},
          },
          bottom: {
            x: {$set: wM},
            y: {$set: cell.y + cell.h - depth},
          },
        },
        y: { // fixed x
          length: {$set: svg.h * size},
          left: {
            x: {$set: cell.x},
            y: {$set: hM},
          },
          right: {
            x: {$set: cell.x + cell.w - depth},
            y: {$set: hM},
          },
        },
      })
    this.setState({paddles: ready})
  }

  ///toggles displayed paddles with an array with length 4
  /*pickPaddles = () => {
    let displayPaddles
    let printArr = (min, max) => {
      let a = []
      let enabledPaddles = (arr) => (arr.filter(n => (n === 1)).length)
      for (let i = 0; i < 4; i++) {
        a.push(Math.round(Math.random()))
      }
      return enabledPaddles(a) > min && enabledPaddles(a) < max ? displayPaddles = a : printArr(min, max)
    }

  }*/

  setPaddleB = () => {
    let w = this.state.svg.w / 9, h = this.state.svg.h / 60
    let cell = this.state.cell
    let paddle = update(this.state.paddles, {
      w: {$set: w},
      h: {$set: h},
      x: {$set: (this.state.svg.w - w) / 2},
      y: {$set: cell.h + (this.state.svg.h - cell.h) / 2 - h},
      display: {$set: 'none'},
    })
    this.setState({paddles: paddle})
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
    let cell = this.state.cell, ball = this.state.ball,
        pad = this.state.paddles, bounce = ball

    //if the ball hits a vertical wall
    if ( ball.x + ball.dx - ball.r < cell.x
          || ball.x + ball.dx + ball.r > cell.x + cell.w) {
      bounce = update(ball, {
        dx: {$set: ball.dx * -1}
        })

    //if ball hits horizontal wall
    } else if (ball.y + ball.dy - ball.r  < cell.y
          || ball.y + ball.r + ball.dy > cell.y + cell.h ) {
      bounce = update(ball, {
        dy: {$set: ball.dy * -1}
        })

    // if ball hits a paddle. paddle must be present.
    } else if ( ball.y + ball.r + ball.dy  > cell.y + cell.h - pad.h
          && this.state.paddles.display !== 'none') {
      let hit = ball.x + ball.r  < pad.x
          || ball.x - ball.r > pad.x + pad.w ? 0 : -1
      bounce = update(ball, {
        dy: {$set: ball.dy * hit}
        })
      let score = hit ? this.state.score + 1 : ':('
      this.setState({ score : score })
      this.props.score(score)
    }


    let move = update(bounce, {
      x: {$set: ball.x + ball.dx},
      y: {$set: ball.y + ball.dy},
      })

    this.setState({ ball: move })
  }

  movePaddle = (e) => {
    let move
    let x = e.type !== 'mousemove'? e.touches.clientX : e.clientX
    let pad = this.state.paddles.w / 2
    let margin = (this.state.svg.w - this.state.cell.w) / 2 + pad
    if (x < margin) {
      move = update(this.state.paddles, {
        x: {$set: margin - pad},
        })
    } else if (x > this.state.svg.w - margin) {
      move = update(this.state.paddles, {
        x: {$set: this.state.svg.w - margin - pad },
        })
    } else {
      move = update(this.state.paddles, {
        x: {$set: x - pad },
        })
    }
    this.setState({ paddles: move })
  }

  setGame = () => {
    this.setSvg()
    setTimeout(this.setCell)
    setTimeout(this.setBall)
    setTimeout(this.setPaddleB, 1)
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
  }

  shouldComponentUpdate(nextProps, nextState){
    return this.state !== nextState
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setGame)
    window.clearInterval(window.setInterval(this.moveBall, 10))
  }

  render() {
    let s = this.state
    return(
      <svg
        width={ s.svg.w } height={ s.svg.h }
        viewBox={ s.svg.box }
        onMouseMove={this.movePaddle} onTouchMove={this.movePaddle} >
        <rect id='cell'
          width={ s.cell.w } height={ s.cell.h }
          x={ s.cell.x } y={ s.cell.y } />
        <circle id='ball'
          cx={ s.ball.x } cy={ s.ball.y }
          r={ s.ball.r } fill={ this.props.fill } />
        <rect id='paddle' display={s.paddles.display}
          width={ s.paddles.w } height={ s.paddles.h }
          x={ s.paddles.x } y={ s.paddles.y }
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
