function setBound() {
  var bound = document.getElementById("bound")
  var w = window.innerWidth * .99
  var h = window.innerHeight * .99
  var arr = [0, 0, w, h]
  var box = arr.join(" ")
  var boundAtt = {
    height: h,
    width: w,
    viewbox: box,
  }
  setAtt(bound, boundAtt)
}

window.addEventListener('load', setBound, false)
window.addEventListener('resize', setBound, false)

function setAtt(el, att) {
  for(var key in att) {
    el.setAttribute(key, att[key])
  }
}
