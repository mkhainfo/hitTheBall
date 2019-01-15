/*@format @flow*/

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Dimensions } from 'react-native';
import Game from './game/Game.js';

/*const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});*/

const getSize = x => {
  const { width, height } = Dimensions.get('window')
  return x === 'w' ? width : height
}

type AppState = {
  w: number,
  h: number,
  score: any,
  stage: number,
  x: number,
  y: number,
  shuffle: boolean,
}

export default class App extends Component<{}, AppState> {
  state = {
    w: getSize('w'),
    h: getSize('h'),
    score: 'hit the ball',
    stage: 0,
    x: 0,
    y: 0,
    shuffle: false,
  }

  onLayout = (e: ViewLayoutEvent) => {
    this.setState({
      w: Math.floor(e.nativeEvent.layout.width),
      h: Math.floor(e.nativeEvent.layout.height),
    })
  }

  getScore = (score: any) => {
    this.setState({ score })
  }

  getPosition = ( x: number, y: number ) => {
    this.setState({ x, y })
  }

  nextStage = (stage?: number) => {
    if (stage === undefined) { stage = this.state.stage + 1 }
    this.setState({ stage })
  }

  shuffle = () => {
    let shuffle = this.state.shuffle ? false : true
    this.setState({ shuffle })
  }

  render() {
    return (
      <View style={styles.container} onLayout={this.onLayout}>
        <Input
          w={this.state.w} h={this.state.h}
          stage={this.state.stage} nextStage={this.nextStage}
          pos={this.getPosition} shuffle={this.shuffle} />
        <Game fill='#eeeeee'
          w={this.state.w} h={this.state.h}
          score={this.getScore}
          stage={this.state.stage} nextStage={this.nextStage}
          x={this.state.x} y={this.state.y}
          shuffle={this.shuffle} shuffling={this.state.shuffle} />
        <Score score={this.state.score} />
      </View>
    )
  }
}

type inputProps = {
  w: number,
  h: number,
  stage: number,
  nextStage: (stage?: number) => void,
  pos: (x: number, y: number) => void,
  shuffle: void => void,
}

class Input extends Component< inputProps,{}> {
  state = {}

  onStartShouldSetResponder = e => true

  changePos = e => {
    let x = e.nativeEvent.pageX,
        y = e.nativeEvent.pageY
    this.props.pos(x, y)
  }

  shuffle = e => {
    if (this.props.stage === 0 || this.props.stage === 3){
      this.props.nextStage()
    } else {this.props.shuffle()}
    }

  render() {
    return (
      <View style={styles.input} width={this.props.w} height={this.props.h}
        onStartShouldSetResponder={this.onStartShouldSetResponder}
        onResponderMove={this.changePos}
        onResponderRelease={this.shuffle}
         />
    )
  }
}

function Score(props: {score: any}) {
    return <Text style={styles.score}>{props.score}</Text>
}



const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  score: {
    fontSize: getSize('h')/30,
    color: '#eee',
    textAlign: 'center',
    zIndex: 3,
    position: 'absolute',
  },
  input: {
    backgroundColor: 'cyan',
    zIndex: 5,
    position: 'absolute',
    opacity: 0,
  },
});
