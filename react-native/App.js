/*@format @flow*/

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import Game from './game/Game.js';

/*const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});*/

export default class App extends Component<{},{score: any}> {
  state = {
    score: 'hit the ball',
  }

  getScore = (n: any) => {
    this.setState({ score : n })
  }

  render() {
    let s = this.state
    return (
      <View style={styles.full, styles.container}>
        <Game fill='#eeeeee' score={this.getScore} />
        <Input />
        <Score score={this.state.score} />
      </View>
    )
  }
}

class Input extends Component<{},{}> {
  state = {}

    /// THIS WILL COLLECT DATA FROM INPUTS AND SEND IT TO THE App
    /// THE APP WILL THEN SEND THIS DATA TO THE GAME Component
    /// THE GAME COMPONENT WILL UPDATE THE POSITION OF THE PADDLES

  render() {
    return (
      <View style={styles.full} />
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
  //  fontSize: '6vh',
    color: '#eee',
    textAlign: 'center',
    zIndex: 3,
    position: 'absolute',
  },
  full: {
    flex: 1,
  },
});
