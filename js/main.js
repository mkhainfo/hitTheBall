function getWindow() {
  var get = {
    w: window.innerWidth,
    h: window.innerHeight,
  }
 return get
}

function setAtt(el, att) {
  for(var key in att) {
    el.setAttribute(key, att[key])
  }
}

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
  }
  setAtt(ball, ballAtt)
}

window.addEventListener('load', set, false)
window.addEventListener('resize', set, false)

function set() {
  setBound()
  setCell()
  setBall()
}
