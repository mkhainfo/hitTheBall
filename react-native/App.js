/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component, useState } from 'react';
import { Platform, StyleSheet, Text, View, Dimensions } from 'react-native';
import Svg, { Circle, Rect } from 'react-native-svg';
import update from 'immutability-helper';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
      svg: {},
      cell: {},
      paddle: {},
      ball: {},
    }
  }

  setSvg = () => {
    const { width, height } = Dimensions.get('window')
    let svg = update(this.state.svg, {
      w: {$set: width},
      h: {$set: height},
      box: {$set: [0, 0, width, height].join(' ')},
      size: {$set: Math.sqrt( width*width + height*height )}
    })
    this.setState({ svg: svg })
  }

  setCell = () => {
    let w = this.state.svg.w * .8
    let h = this.state.svg.h * .8
    let cell = update(this.state.cell, {
      w: {$set: w},
      h: {$set: h},
      x: {$set: (this.state.svg.w - w) / 2},
      y: {$set: (this.state.svg.h - h) / 2},
    })
    this.setState({cell: cell})
  }

  setPaddle = () => {
    let w = this.state.svg.w / 9
    let h = this.state.svg.h / 60
    let cell = this.state.cell
    let paddle = update(this.state.paddle, {
      w: {$set: w},
      h: {$set: h},
      x: {$set: (this.state.svg.w - w) / 2},
      y: {$set: cell.h + (this.state.svg.h - cell.h) / 2 - h},
    })
    this.setState({paddle: paddle})
  }

  setBall = () => {
    let svg = this.state.svg
    let ball = update(this.state.ball, {
      x: {$set: svg.w/2},
      y: {$set: svg.h/2},
      r: {$set: svg.size/100},
      dx: {$set: svg.size/1000},
      dy: {$set: svg.size/1000},
      })

    this.setState({ ball: ball })
  }

  moveBall = () => {
    let cell = this.state.cell
    let ball = this.state.ball
    let bounce = ball

    if ( ball.x + ball.dx - ball.r < cell.x
          || ball.x + ball.dx + ball.r > cell.x + cell.w) {
      bounce = update(ball, {
        dx: {$set: ball.dx * -1}
        })
    } else if (ball.y + ball.dy - ball.r  < cell.y
          || ball.y + ball.dy + ball.r  > cell.y + cell.h) {
      bounce = update(ball, {
        dy: {$set: ball.dy * -1}
        })
/// A SIMPLE GAME OVER AND PADDLE BOUNCE ///
    }

    let move = update(bounce, {
      x: {$set: ball.x + ball.dx},
      y: {$set: ball.y + ball.dy},
      })

    this.setState({ ball: move })
  }

  setGame = () => {
    this.setSvg()
    setTimeout(this.setCell)
    setTimeout(this.setBall)
    setTimeout(this.setPaddle, 1)
  }

  componentDidMount() {
    this.setGame()
    //window.addEventListener('resize', this.setGame)
    window.setInterval(this.moveBall, 10)
  }

  shouldComponentUpdate(nextProps, nextState){
    return this.state !== nextState
  }

  componentWillUnmount() {
    //window.removeEventListener('resize', this.setGame)
    //window.clearInterval(window.setInterval(this.moveBall, 10))
  }

  render() {
    let s = this.state
    return (
      <View style={styles.container}>
        <Svg
          style={styles.svg}
          width={ s.svg.w } height={ s.svg.h }
          viewBox={ s.svg.box }>
          <Rect
            width={ s.cell.w } height={ s.cell.h }
            x={ s.cell.x } y={ s.cell.y }/>
          <Circle
            cx={ s.ball.x } cy={ s.ball.y }
            r={ s.ball.r } fill='#eeeeee' />
          <Rect
            width={ s.paddle.w } height={ s.paddle.h }
            x={ s.paddle.x } y={ s.paddle.y }
            fill='#eeeeee' />
        </Svg>
      </View>
    )
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
