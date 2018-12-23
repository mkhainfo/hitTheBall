import React, { Component } from 'react'
//import update from 'immutability-helper'
import Game from './game/Game.js'
import './App.css'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

getScore = (n) => {
  this.setState({ score : n })
}

getPosition = (x, y) => {
  this.setState({x, y})
}

pushNext = () => {}

  render() {
    return (
      <span id='view'>
        <Input pos={this.getPosition} score={this.state.score} />
        <Game fill='#eeeeee' score={this.getScore}
          x={this.state.x} y={this.state.y} />
        <Score score={this.state.score} />
      </span>
    )
  }
}

class Input extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  changePos = e => {
    let [x, y] = e.type === 'mousemove' ?
      ([ e.clientX, e.clientY ]) :
      ([ e.touches[0].clientX, e.touches[0].clientY ]);
    this.props.pos(x, y)
    return false
  }

  handleClick = () => {
    if (this.props.score === 'hit the ball') {
      ////start the game
    } else if (this.props.score === ':(') {
      ///// reset the game
    }
    //this.state.score === 'x' ? this.setGame() : this.pickPaddles()
    return false
  }

  render() {
    return (
      <span style={styles.input}
        onMouseMove={this.changePos} onTouchMove={this.changePos} />
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
      <span id='score' style={styles.score}>
        {this.props.score}
      </span>
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
  input: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'cyan',
    opacity: 0.3,
    zIndex: 5,
  },
}
