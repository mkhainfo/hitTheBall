//var SAT = require('sat');
function contact(){

var V = SAT.Vector;
var C = SAT.Circle;
var P = SAT.Polygon;

var ball = new C(new V(ballX, ballY), ballR);
var paddle = new P(new V(paddleX, can.height), [
  new V(paddleX, can.height),
  new V(paddleX+paddleW, can.height),
  new V(paddleX+paddleW, can.height-paddleH),
  new V(paddleX, can.height-paddleH)]);

var response = new SAT.Response();
var collided = SAT.testPolygonCircle(paddle, ball, response);

  if ((collided=true)){
    console.log(response.overlap);
  } else {
    console.log("bip");
  }
}

setInterval(contact, 10);
