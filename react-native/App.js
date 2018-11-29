/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component, } from 'react';
import { Platform, StyleSheet, Text, View, Dimensions, } from 'react-native';
import Svg, { Circle, Rect, } from 'react-native-svg';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const { width, height } = Dimensions.get('window')

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Svg style={styles.svg} height={height} width={width}>
          <Rect height='50' width='50'/>
        </Svg>
      </View>
    )
  /*  return (
      <View style={styles.container}>
        <Svg style={styles.svg} height={height} width={width}>

        </Svg>
      </View>
    );*/
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  svg: {
    backgroundColor: '#00ff7d',
  },
});
