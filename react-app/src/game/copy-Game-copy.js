import React, { Component } from 'react'
import update from 'immutability-helper'

export default class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {
      svg: {},
      cell: {},
      paddles: {
        x: {
          top: { display: 0 },
          bottom: { display: 0 },
        },
        y: {
          left: { display: 0 },
          right: { display: 0 },
        },
      },
      ball: {},
    }
  }

  setSvg = () => {
    let w = window.innerWidth, h = window.innerHeight,
    svg = update(this.state.svg, {
      w: {$set: w},
      h: {$set: h},
      box: {$set: [0, 0, w, h].join(' ')},
      size: {$set: Math.sqrt( w*w + h*h )}
    })
    this.setState({ svg: svg })
  }

  setCell = ( size ) => {

    if (size === undefined) {
      if (this.state.score < 2) {
        size = 10
      } else if (this.state.score < 5) {
        size = 9
      } else if (this.state.score < 6) {
        size = 8.5
      } else { size = 6 }
    }

    size /= 10
    let w = this.state.svg.w * size, h = this.state.svg.h * size,
    cell = update(this.state.cell, {
      w: {$set: w},
      h: {$set: h},
      x: {$set: (this.state.svg.w - w) / 2},
      y: {$set: (this.state.svg.h - h) / 2},
      size: {$set: size},
    })
    this.setState({cell: cell})
  }

  checkRange = ( size ) => {
    size /= 10
    let svg = this.state.svg, cell = this.state.cell, ball = this.state.ball,
        w = cell.w * size, h = cell.h * size

        return (ball.x > cell.x + ball.r && ball.x < cell.x + w - ball.r)
          && (ball.y > cell.y + ball.r && ball.y < cell.y + h - ball.r)?
          true : false
  }

  setPaddles = () => {
    let svg = this.state.svg, cell = this.state.cell,
        length = 1/9, depth = svg.size/100,
        ready = update(this.state.paddles, {
          depth: {$set: depth},
          x: {
            length: {$set: svg.w * length},
            top: {y: {$set: cell.y},},
            bottom: {y: {$set: cell.y + cell.h - depth}, },
          },
          y: {
            length: {$set: svg.h * length},
            left: {x: {$set: cell.x},},
            right: {x: {$set: cell.x + cell.w - depth},},
          },
        })
    this.setState({paddles: ready})
  }

  adjustPaddles = ( size ) => {
    size /= 10
    let svg = this.state.svg, paddles = this.state.paddles,
        w = svg.w * size, h = svg.h * size,
        x = (svg.w - w) / 2, y = (svg.h - h) / 2,
        ready = update(paddles, {
          x: {
            top: {y: {$set: y},},
            bottom: {y: {$set: y + h - paddles.depth}, },
          },
          y: {
            left: {x: {$set: x},},
            right: {x: {$set: x + w - paddles.depth},},
          },
        })
    this.setState({paddles: ready})
  }

  makeKey = (min, max) => {
    max = max === undefined ? min : max
    let arr = []
    for (let i = 0; i < 4; i++) {
      arr.push(Math.round(Math.random()))
    }
    let arrSum = arr.reduce( (a, b) => a + b )
    return min <= arrSum && arrSum <= max ? arr : this.makeKey(min, max)
  }

  pickPaddles = (keys) => {
  //type keys = [num, num, num, num]
    if (keys === undefined) {
      if (this.state.score < 1) {
        keys = [0,1,0,0]
      } else if (this.state.score < 5) {
        keys = this.makeKey(1)
      } else if (this.state.score < 6) {
        keys = this.makeKey(2)
      } else if (this.state.score < 7) {
        keys = this.makeKey(1, 2)
      } else if (this.state.score < 15) {
        keys = this.makeKey(2, 3)
      } else { keys = this.makeKey(3, 4)}
    }

    let on = update(this.state.paddles, {
      x: {
        top: {display: {$set: keys[0] },},
        bottom: {display: {$set: keys[1] },},
      },
      y: {
        left: {display: {$set: keys[2] },},
        right: {display: {$set: keys[3] },},
      },
    })
    this.setState({paddles: on})
  }

  setBall = () => {
    let svg = this.state.svg,
    ball = update(this.state.ball, {
      x: {$set: svg.w/2},
      y: {$set: svg.h/2},
      r: {$set: svg.size/100},
      })
    this.setState({ ball })
  }

  setInitialVelocity = () => {
    let svg = this.state.svg,
    ball = update(this.state.ball, {
      dx: {$set: svg.size/500},
      dy: {$set: svg.size/500},
      })
    this.setState({ ball })
  }

  moveBall = () => {

    let cell = this.state.cell, ball = this.state.ball, bounce = ball,
        pad = this.state.paddles, dx = ball.dx, dy = ball.dy, score = this.state.score

    // if the ball hits a vertical wall
    if ( ball.x + dx - ball.r < cell.x
          || ball.x + ball.dx + ball.r > cell.x + cell.w) {
      dx *= -1
    // if ball hits horizontal wall
  } else if (ball.y + dy - ball.r  < cell.y
          || ball.y + ball.r + ball.dy > cell.y + cell.h ) {
      dy *= -1
    // if ball hits x paddle. paddle must be present.
  } else if (( ball.y - ball.r + dy <= cell.y + pad.depth && pad.x.top.display > 0 )
    || ( ball.y + ball.r + dy >= cell.y + cell.h - pad.depth && pad.x.bottom.display > 0 )) {
    if (pad.x.x <= ball.x + ball.r + dx && ball.x - ball.r + dx <= pad.x.x + pad.x.length) {
      dy *= -1
      score += 1
      this.props.score(score)
      this.pickPaddles()
    } else {
      dy = 0
      score = ':('
      this.props.score(score)
    }
    // if ball hits y paddle. paddle must be present.
  } else if (( ball.x - ball.r + dx <= cell.x + pad.depth && pad.y.left.display > 0 )
    || ( ball.x + ball.r + dx >= cell.x + cell.w - pad.depth && pad.y.right.display > 0 )) {
    if (pad.y.y <= ball.y + ball.r + dx && ball.y - ball.r + dy <= pad.y.y + pad.y.length) {
      dx *= -1
      score += 1
      this.props.score(score)
      this.pickPaddles()
    } else {
      dx = 0
      score = ':('
      this.props.score(score)
    }
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

  movePaddles = () => {
  //takes position data from <Input /> and uses it to update paddle position
    let cell = this.state.cell, pad = this.state.paddles,
      halfX = pad.x.length / 2, halfY = pad.y.length / 2,
      rightBound = cell.x + cell.w - halfX,
      lowerBound = cell.y + cell.h - halfY,
      x = this.props.x, y = this.props.y

    x = x < cell.x + halfX ? cell.x : x > rightBound ? rightBound - halfX : x - halfX
    y = y < cell.y + halfY ? cell.y : y > lowerBound ? lowerBound - halfY : y - halfY

    let move = update(pad, {
      x: {x: {$set: x }},
      y: {y: {$set: y }},
    })

    this.setState({ paddles: move })
  }

  setGame = () => {
    this.props.score('hit the ball')
    this.setState({score: 0})
    this.sizeGame()
    setTimeout(this.setInitialVelocity, 1)
  }

  sizeGame = () => {
    this.setSvg()
    setTimeout(this.setCell)
    setTimeout(this.setBall)
    setTimeout(this.setPaddles, 1)
  }

  animate = () => {
    this.movePaddles()
    this.moveBall()
  }

  componentDidMount() {
    this.setGame()
    window.addEventListener('resize', this.sizeGame)
    window.setInterval(this.animate, 10)
  }

  shouldComponentUpdate(nextProps, nextState){
    return this.state !== nextState
  }

  componentDidUpdate() {
    if (this.props.stage === 1) {
      this.pickPaddles()
      this.props.nextStage()
    } else if (this.props.stage === 2 && this.state.score === ':(') {
      this.pickPaddles([0,0,0,0])
      this.props.nextStage()
    } else if (this.props.stage === 4) {
      this.props.nextStage(0)
      this.setGame()
    } else if (this.props.shuffling === true) {
      this.pickPaddles()
      this.props.shuffle()
    } else if ( this.state.score >= 3 && this.state.cell.size === 1 && this.checkRange(7) ) {
      this.setCell(9)
      this.adjustPaddles(9)
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.sizeGame)
    window.clearInterval(window.setInterval(this.animate, 10))
  }

  render() {
    let s = this.state
    let pad = this.state.paddles
    return(
      <svg
        width={ s.svg.w } height={ s.svg.h }
        viewBox={ s.svg.box } onClick={ this.handleClick }>

        <rect id='cell'
          width={ s.cell.w } height={ s.cell.h }
          x={ s.cell.x } y={ s.cell.y }
          fillOpacity={ s.cell.size } />

        <circle id='ball'
          cx={ s.ball.x } cy={ s.ball.y }
          r={ s.ball.r } fill={ this.props.fill } />

        <rect id='paddleXT'
          width={ pad.x.length } height={ pad.depth }
          x={ pad.x.x } y={ pad.x.top.y }
          fill={ this.props.fill } fillOpacity={ pad.x.top.display } />
        <rect id='paddleXB'
          width={ pad.x.length } height={ pad.depth }
          x={ pad.x.x } y={ pad.x.bottom.y }
          fill={ this.props.fill } fillOpacity={ pad.x.bottom.display } />
        <rect id='paddleYL'
          width={ pad.depth } height={ pad.y.length }
          x={ pad.y.left.x } y={ pad.y.y }
          fill={ this.props.fill } fillOpacity={pad.y.left.display} />
        <rect id='paddleYR'
          width={ pad.depth } height={ pad.y.length }
          x={ pad.y.right.x } y={ pad.y.y }
          fill={ this.props.fill } fillOpacity={pad.y.right.display} />

      </svg>
    )
  }
}
