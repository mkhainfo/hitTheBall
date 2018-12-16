/*@format @flow*/

import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import Svg, { Circle, Rect } from 'react-native-svg';
import update from 'immutability-helper';

type Props = {
  score: any,
  fill: string,
}

type State = {
  svg: {
    w: number,
    h: number,
    box: string,
    size: number,
    },
  cell: {
    x: number,
    y: number,
    h: number,
    w: number,
    },
  paddles: {
    depth: number,
    x: {
      x: number,
      length: number,
      top: { y: number, display: string, },
      bottom: { y: number, display: string, },
    },
    y: {
      y: number,
      length: number,
      left: { x: number, display: string, },
      right: { x: number, display: string, },
    },
  },
  ball: {
    x: number,
    y: number,
    r: number,
    dx: number,
    dy: number,
    },
  score: any,
}

export default class Game extends Component<Props, State> {
state = {
      svg: {
        w: 0,
        h: 0,
        box: '0 0 0 0',
        size:0,
        },
      cell: {
        x: 0,
        y: 0,
        h: 0,
        w: 0,
        },
      paddles: {
        depth: 0,
        x: {
          x: 0,
          length: 0,
          top: { y: 0, display: 'none', },
          bottom: { y: 0, display: 'none', },
        },
        y: {
          y: 0,
          length: 0,
          left: { x: 0, display: 'none', },
          right: { x: 0, display: 'none', },
        },
      },
      ball: {
        x: 0,
        y: 0,
        r: 0,
        dx: 0,
        dy: 0,
        },
      score: 0,
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
    let w = this.state.svg.w * .8, h = this.state.svg.h * .8,
      cell = update(this.state.cell, {
        w: {$set: w},
        h: {$set: h},
        x: {$set: (this.state.svg.w - w) / 2},
        y: {$set: (this.state.svg.h - h) / 2},
      })
    this.setState({cell: cell})
  }

  setPaddles = () => {
    let svg = this.state.svg, cell = this.state.cell,
        size = 1/9, depth = svg.size/100,
        ready = update(this.state.paddles, {
          depth: {$set: depth},
          x: {
            length: {$set: svg.w * size},
            top: {y: {$set: cell.y},},
            bottom: {y: {$set: cell.y + cell.h - depth}, },
          },
          y: {
            length: {$set: svg.h * size},
            left: {x: {$set: cell.x},},
            right: {x: {$set: cell.x + cell.w - depth},},
          },
        })
    this.setState({paddles: ready})
  }

  pickPaddles = () => {
    const printArr = (min, max) => {
      max = max === undefined ? min : max
      let arr = []
      for (let i = 0; i < 4; i++) {
        arr.push(Math.round(Math.random()))
      }
      let arrSum = arr.reduce( (a, b) => a + b )
      return min <= arrSum && arrSum <= max ? arr : printArr(min, max)
    }

    // keys sets up "level" conditions based on score
    let keys
    if (this.state.score === ':(') {
      keys = [0,0,0,0]
    } else if (this.state.score < 2) {
      keys = [0,1,0,0]
    } else if (this.state.score < 5) {
      keys = printArr(1)
    } else if (this.state.score < 6) {
      keys = printArr(2)
    } else if (this.state.score < 7) {
      keys = printArr(1, 2)
    } else if (this.state.score < 15) {
      keys = printArr(2, 3)
    } else { keys = printArr(3, 4)}

    let on = update(this.state.paddles, {
      x: {
        top: {display: {$set: keys[0] ? 'on' : 'none'},},
        bottom: {display: {$set: keys[1] ? 'on' : 'none'},},
      },
      y: {
        left: {display: {$set: keys[2] ? 'on' : 'none'},},
        right: {display: {$set: keys[3] ? 'on' : 'none'},},
      },
    })
    this.setState({paddles: on})
  }

  setBall = () => {
    let svg = this.state.svg
    let ball = update(this.state.ball, {
      x: {$set: svg.w/2},
      y: {$set: svg.h/2},
      r: {$set: svg.size/100},
      dx: {$set: svg.size/500},
      dy: {$set: svg.size/500},
      })

    this.setState({ ball: ball })
  }

  moveBall = () => {

    let cell = this.state.cell, ball = this.state.ball, bounce = ball,
        pad = this.state.paddles, dx = ball.dx, dy = ball.dy, score = this.state.score

    // if the ball hits a vertical wall
    if ( ball.x + dx - ball.r < cell.x
          || ball.x + ball.dx + ball.r > cell.x + cell.w) {
      dx *= -1
    // if ball hits horizontal wall
  } else if (ball.y + dy - ball.r  < cell.y
          || ball.y + ball.r + ball.dy > cell.y + cell.h ) {
      dy *= -1
    // if ball hits x paddle. paddle must be present.
  } else if (( ball.y - ball.r + dy <= cell.y + pad.depth && pad.x.top.display !== 'none' )
    || ( ball.y + ball.r + dy >= cell.y + cell.h - pad.depth && pad.x.bottom.display !== 'none' )) {
    if (pad.x.x <= ball.x + ball.r + dx && ball.x - ball.r + dx <= pad.x.x + pad.x.length) {
      dy *= -1
      score += 1
      this.props.score(score)
      this.pickPaddles()
    } else {
      dy = 0
      score = ':('
      this.props.score(score)
    }
    // if ball hits y paddle. paddle must be present.
  } else if (( ball.x - ball.r + dx <= cell.x + pad.depth && pad.y.left.display !== 'none' )
    || ( ball.x + ball.r + dx >= cell.x + cell.w - pad.depth && pad.y.right.display !== 'none' )) {
    if (pad.y.y <= ball.y + ball.r + dx && ball.y - ball.r + dy <= pad.y.y + pad.y.length) {
      dx *= -1
      score += 1
      this.props.score(score)
      this.pickPaddles()
    } else {
      dx = 0
      score = ':('
      this.props.score(score)
    }
  }

    bounce = update(ball, {
      dx: {$set: dx},
      dy: {$set: dy},
      })

    let move = update(bounce, {
      x: {$set: ball.x + ball.dx},
      y: {$set: ball.y + ball.dy},
      })

    this.setState({ ball: move, score: score })
  }

  setGame = () => {
    this.props.score('hit the ball')
    this.setState({score: 0})
    this.sizeGame()
  }

  sizeGame = () => {
    this.setSvg()
    setTimeout(this.setCell)
    setTimeout(this.setBall)
    setTimeout(this.setPaddles, 1)
  }

  componentDidMount() {
    this.setGame()
    //window.addEventListener('resize', this.sizeGame)
    //window.addEventListener('mousemove', this.movePaddles)
    //window.addEventListener('touchmove', this.movePaddles)
    window.setInterval(this.moveBall, 10)
  }

  shouldComponentUpdate(nextProps: Props, nextState: State){
    return this.state !== nextState
  }

  componentDidUpdate() {
    if (this.state.score === ':(') {
      this.pickPaddles()
      this.setState({score: 'x'})
    }
  }

  componentWillUnmount() {
    //window.removeEventListener('resize', this.sizeGame)
    //window.removeEventListener('mousemove', this.movePaddles)
    //window.removeEventListener('touchmove', this.movePaddles)
    window.clearInterval(window.setInterval(this.moveBall, 10))
  }

  render() {
    let s = this.state, pad = this.state.paddles
    return (
      <Svg
        style={styles.svg}
        width={ s.svg.w } height={ s.svg.h }
        viewBox={ s.svg.box }>
        <Rect
          width={ s.cell.w } height={ s.cell.h }
          x={ s.cell.x } y={ s.cell.y }/>
        <Circle
          cx={ s.ball.x } cy={ s.ball.y }
          r={ s.ball.r } fill={ this.props.fill } />
        <Rect id='paddleXT' display={ pad.x.top.display }
          width={ pad.x.length } height={ pad.depth }
          x={ pad.x.x } y={ pad.x.top.y }
          fill={ this.props.fill } />
        <Rect id='paddleXB' display={ pad.x.bottom.display }
          width={ pad.x.length } height={ pad.depth }
          x={ pad.x.x } y={ pad.x.bottom.y }
          fill={ this.props.fill } />
        <Rect id='paddleYL' display={pad.y.left.display}
          width={ pad.depth } height={ pad.y.length }
          x={ pad.y.left.x } y={ pad.y.y }
          fill={ this.props.fill } />
        <Rect id='paddleYR' display={pad.y.right.display}
          width={ pad.depth } height={ pad.y.length }
          x={ pad.y.right.x } y={ pad.y.y }
          fill={ this.props.fill } />
      </Svg>
    )
  }
}

const styles = StyleSheet.create({
  svg: {
    backgroundColor: '#00ff00',
  },
});
