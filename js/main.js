function setBound() {
  var bound = document.getElementById("bound")
  var w = window.innerWidth
  var h = window.innerHeight
  console.log(window.innerHeight + "this is var: " + h)

  var arr = [0, 0, w, h]
  var box = arr.join(" ")
  bound.setAttribute("viewBox", box)
}

setBound()
