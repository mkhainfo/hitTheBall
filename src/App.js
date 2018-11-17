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
        <Game fill='#eeeeee' />
        <Score />
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
      <div />
    )
  }
}

export default App
