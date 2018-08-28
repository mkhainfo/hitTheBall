//keyboard
document.addEventListener("keydown", keyDown, false);
document.addEventListener("keyup", keyUp, false);

function keyDown(e) {
    if(e.keyCode == 39) {
        rPress = true;
    }
    else if(e.keyCode == 37) {
        lPress = true;
    }
}

function keyUp(e) {
    if(e.keyCode == 39) {
        rPress = false;
    }
    else if(e.keyCode == 37) {
        lPress = false;
    }
}

//mouse
document.addEventListener("mousemove", track, false);

function track(e){
    if (e.clientX < rec.left + paddleW/2){
        paddleX = 0;
    }
    else if (e.clientX - rec.left > can.width - paddleW/2){
        paddleX = can.width - paddleW;
    }
    else {paddleX = e.clientX - rec.left - paddleW/2;}
}

//touch
document.addEventListener("touchstart", press, false);
document.addEventListener("touchmove", hold, false);
document.addEventListener("touchend", stop, false);

function press(e){
    //e.preventDefault();
    //e.stopPropagation();
    var paddleM = rec.left + paddleX + paddleW/2;
    if (e.touches[0].clientX < paddleM){
        lPress = true;
    }
    else if (e.touches[0].clientX > paddleM){
        rPress = true;
    }
    return false;
}

function hold(e){
  lPress = false;
  rPress = false;
  paddleX = e.touches[0].clientX - rec.left - paddleW/2;
  return false;
}

function stop(e){
  lPress = false;
  rPress = false;
  //e.preventDefault();
  //e.stopPropagation();
  return false;
}
