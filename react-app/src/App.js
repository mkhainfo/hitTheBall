import React, { Component } from 'react'
//import update from 'immutability-helper'
import Game from './game/Game.js'
import './App.css'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stage: 0,
      shuffle: false,
    }
  }

getScore = score => {
  this.setState({ score })
}

getPosition = ( x, y ) => {
  this.setState({ x, y })
}

nextStage = stage => {
  if (stage === undefined) { stage = this.state.stage + 1 }
  this.setState({ stage })
}

shuffle = () => {
  let shuffle = this.state.shuffle ? false : true
  this.setState({shuffle})
}

  render() {
    return (
      <span id='view'>
        <Input pos={this.getPosition}
          score={this.state.score} shuffle={this.shuffle}
          stage={this.state.stage} nextStage={this.nextStage}/>
        <Game fill='#eeeeee'
          score={this.getScore}
          stage={this.state.stage} nextStage={this.nextStage}
          x={this.state.x} y={this.state.y}
          shuffle={this.shuffle} shuffling={this.state.shuffle}/>
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

  handleClick = e => {
    if (this.props.stage === 0 || this.props.stage === 3){
      this.props.nextStage()
    } else {this.props.shuffle()}
    //this.state.score === 'x' ? this.setGame() : this.pickPaddles()
    return false
  }

  render() {
    return (
      <span style={styles.input} onClick={this.handleClick}
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
    opacity: 0,
    zIndex: 5,
  },
}
