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

  getWindow = () => {
    let w = window.innerWidth
    let h = window.innerHeight
    let size = Math.sqrt( w*w + h*h )
    return { w: w, h: h, size: size, }
  }

  setBound = () => {
    let get = this.getWindow()
    let svg = update(this.state.svg, {
      w: {$set: get.w},
      h: {$set: get.h},
      box: {$set: [0, 0, get.w, get.h].join(' ')}
    })
    this.setState({ svg: svg })
  }

  setCell = () => {
    let get = this.getWindow()
    let w = get.w * .8
    let h = get.h * .8
    let cell = update(this.state.cell, {
      w: {$set: w},
      h: {$set: h},
      x: {$set: (get.w - w) / 2},
      y: {$set: (get.h - h) / 2},
    })
    this.setState({cell: cell})
  }

  setPaddle = () => {
    let get = this.getWindow()
    let w = get.w / 9
    let h = get.h / 60
    let cell = this.state.cell
    let paddle = update(this.state.paddle, {
      w: {$set: w},
      h: {$set: h},
      x: {$set: (get.w - w) / 2},
      y: {$set: cell.h + (get.h - cell.h) / 2 - h},
    })
    this.setState({paddle: paddle})
  }

  setBall = () => {
    let get = this.getWindow()
    let ball = update(this.state.ball, {
      x: {$set: get.w/2},
      y: {$set: get.h/2},
      r: {$set: get.size/100},
      dx: {$set: get.size/1000},
      dy: {$set: get.size/1000},
      })

    this.setState({ ball: ball })
  }

  moveBall = () => {
    let cell = this.state.cell
    let ball = this.state.ball
    let bounce = ball

    if ( ball.x + ball.dx < cell.x
          || ball.x + ball.dx > cell.x + cell.w) {
      bounce = update(ball, {
        dx: {$set: ball.dx * -1}
        })
    } else if (ball.y + ball.dy < cell.y
          || ball.y + ball.dy > cell.y + cell.h) {
      bounce = update(ball, {
        dy: {$set: ball.dy * -1}
        })
    }

    let move = update(bounce, {
      x: {$set: ball.x + ball.dx},
      y: {$set: ball.y + ball.dy},
      })

    this.setState({ ball: move })
  }

  movePaddle = (event) => {

  }

  setGame = () => {
    this.setBound()
    this.setCell()
    this.setBall()
    setTimeout(this.setPaddle)
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
    return(
      <svg
        width={ this.state.svg.w } height={ this.state.svg.h }
        viewBox={ this.state.svg.box } xmlns="http://www.w3.org/2000/svg" >
        <rect width={ this.state.cell.w } height={ this.state.cell.h }
          x={ this.state.cell.x } y={ this.state.cell.y } />
        <circle
          cx={ this.state.ball.x } cy={ this.state.ball.y }
          r={ this.state.ball.r } fill={ this.props.fill } />
        <rect width={ this.state.paddle.w } height={ this.state.paddle.h }
          x={ this.state.paddle.x } y={ this.state.paddle.y }
          fill={ this.props.fill } />
      </svg>
    )
  }
}

export default Game
