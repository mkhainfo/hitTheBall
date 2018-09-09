//canvas
var can = document.getElementById('can1');
var ctx = can.getContext('2d');
var rec = can.getBoundingClientRect();
//ball
var ballX = 100;
var ballY = 50;
var ballR = 12;
var dx = 1;
var dy = 1;
//paddle
var paddleH = 13;
var paddleW = 100;
var paddleX = can.width/4-paddleW;
var paddleY = can.height-paddleH;
//move paddle
var speed = Math.abs(dx)+5;
var rPress = false;
var lPress = false;
//hit count
var i = 0;
var score = document.getElementById("score");
//game over

function drawBall(){
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballR, 0, Math.PI*2, true);
    ctx.fillStyle = "#e2e2e2";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, paddleY, paddleW, paddleH);
    ctx.fillStyle = "#e2e2e2";
    ctx.fill();
    ctx.closePath();
}

function hit(){
  //hit ball
  var paddleM = paddleX + paddleW/2;
  var dist = Math.abs(paddleM - ballX);
  var force = dist * 8 / paddleW;
  dx *= force;
  if(dx * force < 1){
    dx /= Math.abs(dx);
  }
  dy *= -1.04;

  //show score
  i++;
  score.innerHTML = i;
}

function miss(){
  //bounce off the bottom - test mode
  dx *= 1;
  dy *= -1;
  //game over
  i = 0;
  score.innerHTML = ":(";
  document.getElementById('can1').style.backgroundColor = "#555555";
  //refresh page
  //setTimeout(function () {document.location.reload();}, 500);
}

//canvas
function draw() {
    ctx.clearRect(0, 0, can.width, can.height);
    drawBall();
    drawPaddle();
    ballX += dx;
    ballY += dy;
    //sides
    if(ballX + dx > can.width - ballR || ballX + dx < ballR) {
        dy *= 0.99;
        dx *= -0.97;
    }
    //top
    if(ballY + dy < ballR) {
        dy *= -1.01;
        dx *= 0.98;
    }
    //bottom
    else if(ballY + dy > can.height) {
        if (ballX < paddleX + paddleW + ballR && ballX > paddleX - ballR){
          hit();
        }
        else {
          miss();
        }
    }

    if(rPress && paddleX < can.width-paddleW) {
    paddleX += speed;
    }
    else if(lPress && paddleX > 0) {
    paddleX -= speed;
  }
}//end canvas

setInterval(draw, 10);
