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
      <View style={styles.container}>
        <Game fill='#eeeeee' score={this.getScore} />
        <Score score={this.state.score} />
      </View>
    )
  }
}

function Score(props: {score: any}) {
    return <Text style={styles.score}>{props.score}</Text>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});
