import React, { Component } from 'react'
import update from 'immutability-helper'

class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {
      svg: {},
      cell: {},
      paddle: {},
      ball: {},
    }
  }

  setSvg = () => {
    let w = window.innerWidth
    let h = window.innerHeight
    let svg = update(this.state.svg, {
      w: {$set: w},
      h: {$set: h},
      box: {$set: [0, 0, w, h].join(' ')},
      size: {$set: Math.sqrt( w*w + h*h )}
    })
    this.setState({ svg: svg })
  }

  setCell = () => {
    let w = this.state.svg.w * .8
    let h = this.state.svg.h * .8
    let cell = update(this.state.cell, {
      w: {$set: w},
      h: {$set: h},
      x: {$set: (this.state.svg.w - w) / 2},
      y: {$set: (this.state.svg.h - h) / 2},
    })
    this.setState({cell: cell})
  }

  setPaddle = () => {
    let w = this.state.svg.w / 9
    let h = this.state.svg.h / 60
    let cell = this.state.cell
    let paddle = update(this.state.paddle, {
      w: {$set: w},
      h: {$set: h},
      x: {$set: (this.state.svg.w - w) / 2},
      y: {$set: cell.h + (this.state.svg.h - cell.h) / 2 - h},
    })
    this.setState({paddle: paddle})
  }

  setBall = () => {
    let svg = this.state.svg
    let ball = update(this.state.ball, {
      x: {$set: svg.w/2},
      y: {$set: svg.h/2},
      r: {$set: svg.size/100},
      dx: {$set: svg.size/1000},
      dy: {$set: svg.size/1000},
      })

    this.setState({ ball: ball })
  }

  moveBall = () => {
    let cell = this.state.cell, ball = this.state.ball,
        pad = this.state.paddle, bounce = ball

    if ( ball.x + ball.dx - ball.r < cell.x
          || ball.x + ball.dx + ball.r > cell.x + cell.w) {
      bounce = update(ball, {
        dx: {$set: ball.dx * -1}
        })
    } else if (ball.y + ball.dy - ball.r  < cell.y) {
      bounce = update(ball, {
        dy: {$set: ball.dy * -1}
        })
/// A SIMPLE GAME OVER AND PADDLE BOUNCE ///
    } else if ( ball.y + ball.r + ball.dy  > cell.y + cell.h - pad.h) {
      let hit = ball.x + ball.r  < pad.x
          || ball.x - ball.r > pad.x + pad.w ? 0 : -1
      bounce = update(ball, {
        dy: {$set: ball.dy * hit}
        })
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
    let pad = this.state.paddle.w / 2
    let margin = (this.state.svg.w - this.state.cell.w) / 2 + pad
    if (x < margin) {
      move = update(this.state.paddle, {
        x: {$set: margin - pad},
        })
    } else if (x > this.state.svg.w - margin) {
      move = update(this.state.paddle, {
        x: {$set: this.state.svg.w - margin - pad },
        })
    } else {
      move = update(this.state.paddle, {
        x: {$set: x - pad },
        })
    }
    this.setState({ paddle: move })
  }

  setGame = () => {
    this.setSvg()
    setTimeout(this.setCell)
    setTimeout(this.setBall)
    setTimeout(this.setPaddle, 1)
  }

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
        <rect id='paddle'
          width={ s.paddle.w } height={ s.paddle.h }
          x={ s.paddle.x } y={ s.paddle.y }
          fill={ this.props.fill } />
      </svg>
    )
  }
}

export default Game
