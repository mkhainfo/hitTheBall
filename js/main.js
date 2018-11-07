//reference to inner window dimentions
function getWindow() {
  var get = {
    w: window.innerWidth,
    h: window.innerHeight,
  }
 return get
}

//a function to set multiple attributes at once
//takes an element and an object
function setAtt(el, att) {
  for(var key in att) {
    el.setAttribute(key, att[key])
  }
}

//set functions scale element to the inner window dimentions
//using setAtt() to change attributes
function setBound() {
  var get = getWindow()
  var bound = document.getElementById("bound")
  var w = get.w
  var h = get.h
  var arr = [0, 0, w, h]
  var box = arr.join(" ")
  var boundAtt = {
    height: h,
    width: w,
    viewbox: box,
  }
  setAtt(bound, boundAtt)
}

function setCell() {
  var get = getWindow()
  var cell = document.getElementById("cell")
  var w = get.w * .8
  var h = get.h * .8
  var cellAtt = {
    height: h,
    width: w,
    x: (get.w - w) / 2,
    y: (get.h - h) / 2,
  }
  setAtt(cell, cellAtt)
}

function setBall() {
  var get = getWindow()
  var ball = document.getElementById("ball")
  var dist = Math.sqrt(get.w * get.w + get.h * get.h)
  var ballAtt = {
    cx: get.w / 2,
    cy: get.h / 2,
    r: dist / 100,
    fill: '#eeeeee',
    dx: 1,
    dy: 1,
  }
  setAtt(ball, ballAtt)
}

//defines the behavior of the ball
function moveBall() {
  var cell = {
    cell: document.getElementById("cell"),
    x: (() => parseInt(this.cell.getAttribute("x"), 10))(),
    y: (() => parseInt(this.cell.getAttribute("y"), 10))(),
    w: (() => parseInt(this.cell.getAttribute("width"), 10))(),
    h: (() => parseInt(this.cell.getAttribute("height"), 10))(),
  }
  var ball = {
    ball: document.getElementById("ball"),
    x: (() => parseInt(this.ball.getAttribute("cx"), 10))(),
    y: (() => parseInt(this.ball.getAttribute("cy"), 10))(),
    dx: (() => parseInt(this.ball.getAttribute("dx"), 10))(),
    dy: (() => parseInt(this.ball.getAttribute("dy"), 10))(),
  }

  if (ball.x + ball.dx < cell.x || ball.x + ball.dx > cell.x + cell.w) {
    ball.dx *= -1
  }
  else if (ball.y + ball.dy < cell.y || ball.y + ball.dy > cell.y + cell.h) {
      ball.dy *= -1
  }

  var ballAtt = {
    cx: ball.x + ball.dx,
    cy: ball.y + ball.dy,
    dx: ball.dx,
    dy: ball.dy,
  }
  setAtt(ball.ball, ballAtt)
}

function set() {
  setBound()
  setCell()
  setBall()
  //moveBall()
}

window.addEventListener('load', set, false)
window.addEventListener('resize', set, false)
window.setInterval(moveBall, 10)
