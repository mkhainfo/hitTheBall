//canvas
var can = document.getElementById('can1');
var ctx = can.getContext('2d');
var rec = can.getBoundingClientRect();
//ball
var ballX = 100;
var ballY = 50;
var ballR = 12;
var dx = 3;
var dy = 3;
//paddle
var paddleH = 13;
var paddleW = 100;
var paddleX = can.width/4-paddleW;
var paddleY = can.height-paddleH;
//move paddle
var speed = Math.abs(dx)+5;
var rPress = false;
var lPress = false;
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

//canvas
function draw() {
    ctx.clearRect(0, 0, can.width, can.height);
    drawBall();
    drawPaddle();
    ballX += dx;
    ballY += dy;
    //sides
    if(ballX + dx > can.width - ballR || ballX + dx < ballR) {
        dx *= -0.98;
        dy *= 0.99;
    }
    //top
    if(ballY + dy < ballR) {
        dy *= -1.1;
        dx *= 0.98;
    }
    //bottom
    else if(ballY + dy > can.height - ballR) {
        //paddle center
        if(ballX > paddleX + paddleX/3 && ballX < paddleX + paddleW - paddleX/3) {
            dy *= -1.1;
            dx *= 0.9;
        }
        //paddle sides
        else if(ballX > paddleX && ballX < paddleX + paddleW){
          dy *= -1.07;
          dx *= 1.1;
        }
        //paddle edges
        else if(ballX > paddleX - ballR && ballX < paddleX + paddleW + ballR){
            dy *= -1.05;
            dx *= 1.3;
        }
        //no paddle
        else {
            document.getElementById('can1').style.backgroundColor = "#202020";
            //setTimeout(function () {document.location.reload();}, 500);
        }
    }

    if(rPress && paddleX < can.width-paddleW) {
    paddleX += speed;
    }
    else if(lPress && paddleX > 0) {
    paddleX -= speed;
  }
}

setInterval(draw, 10);
