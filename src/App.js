import React, { Component } from 'react'
//import update from 'immutability-helper'
import Game from './game/Game.js'
import './App.css'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <span id="view">
        <Score style={styles.score} />
        <div id="wrap" style={styles.game}>
          <Game fill='#eeeeee' />
        </div>
      </span>
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
      <div id='score'><p>{this.state.score}</p></div>
    )
  }
}

const styles = {
  score: {
    color: '#ffffff',
    textAlign: 'center',
    zIndex: 2,
  },
  game: {
    zIndex: 1,
  },
}
export default App
