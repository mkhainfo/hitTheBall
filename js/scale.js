window.addEventListener("load", size, false);
window.addEventListener("resize", size, false);

function size(){
  var w = window.innerWidth;
  var h = window.innerHeight;

    can.width = 0.9*w;
    can.height = 0.9*h;
    rec = can.getBoundingClientRect();
    ballX = can.width/4;
    ballY = can.height/4;
    ballR = 0.03*can.height;
    dx = 0.004*can.height;
    dy = 0.004*can.width;
    paddleH = 0.02*can.height;
    paddleW = 0.2*can.width;
    paddleX = can.width/4-paddleW;
    paddleY = can.height-paddleH;
}
