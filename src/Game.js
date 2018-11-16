import React, { Component } from 'react'
import update from 'immutability-helper'

class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {
      svg: {},
      cell: {},
      ball: {
        fill: '#eeeeee',
      },
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
    this.setState({ svg: svg, })
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
    //this.setState( state => ({cell: cell,}))
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

  setGame = () => {
    this.setBound()
    this.setBall()
    this.setCell()
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
  }

///RENDER////////////////
  render() {
    return(
      <svg
        width={ this.state.svg.w } height={ this.state.svg.h }
        viewBox={ this.state.svg.box }
        style = {{ backgroundColor: 'white' }}
        xmlns="http://www.w3.org/2000/svg">
        <rect width={ this.state.cell.w } height={ this.state.cell.h }
          x={ this.state.cell.x } y={ this.state.cell.y }/>
        <circle
          cx={ this.state.ball.x } cy={ this.state.ball.y }
          r={ this.state.ball.r } fill={ this.state.ball.fill }/>
      </svg>
    )
  }
}

export default Game
