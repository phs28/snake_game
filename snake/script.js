const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

let speed = 8;

let tileCount = 20;
let tileSize = canvas.width/tileCount-2;
let headX = 10;
let headY = 10;

let applex = 5;
let appley = 5;

let xVelocity = 0;
let yVelocity = 0;
const snakeParts = [];
let tailLength = 0;

let score = 0;

class SnakePart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

function drawGame() {
  changeSnakePosition();
  let result = isGameOver();
  if(result) {
    return;
  }

  clearScreen();
  drawSnake();
  checkApple();
  drawApple();

  drawScore();

  setTimeout(drawGame, 1000/speed);
}

function isGameOver() {
  let gameOver = false;

  if(yVelocity === 0 && xVelocity === 0) {
    return false;
  }

  if(headX < 0) {
    gameOver = true;
  } else if(headY < 0) {
    gameOver = true;
  } else if(headX > tileCount) {
    gameOver = true;
  } else if(headY > tileCount) {
    gameOver = true;
  }

  for(let i=0; i<snakeParts.length; i++) {
    let part = snakeParts[i];
    if(part.x === headX && part.y === headY) {
      gameOver = true;
      break;
    }
  }

  if(gameOver) {
    ctx.fillStyle = 'white';
    ctx.font = '50px Verdana';
    ctx.fillText("Game Over!", canvas.width/6.5, canvas.height/2);
  }

  return gameOver;
}

function drawScore() {
  ctx.fillStyle = 'white';
  ctx.font = '20px';
  ctx.fillText("Score: " + score, canvas.width-50, 10);
}

function clearScreen() {
  ctx.fillStyle = 'gray';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
  ctx.fillStyle = 'orange';
  ctx.fillRect(headX*tileCount, headY*tileCount, tileSize, tileSize);

  ctx.fillStyle = 'green';
  for(let i=0; i<snakeParts.length; i++) {
    let part = snakeParts[i];
    ctx.fillRect(part.x*tileCount, part.y*tileCount, tileSize, tileSize);
  }

  snakeParts.push(new SnakePart(headX, headY));
  while(snakeParts.length > tailLength) {
    snakeParts.shift();
  }
}

function drawApple() {
  ctx.fillStyle = "red"
  ctx.fillRect(applex*tileCount, appley*tileCount, tileSize, tileSize);
}

function checkApple() {
  if(applex === headX && appley === headY) {
    applex = Math.floor(Math.random() * tileCount);
    appley = Math.floor(Math.random() * tileCount);
    tailLength++;
    score++
  }
}

function changeSnakePosition() {
  headX = headX + xVelocity;
  headY = headY + yVelocity;
}

document.body.addEventListener("keydown", (e) => {
  if(e.key == 'ArrowUp' || e.key == 'w') {
    yVelocity = -1;
    xVelocity = 0;
  } else if(e.key == 'ArrowDown' || e.key == 's') {
    yVelocity = 1;
    xVelocity = 0;
  } else if(e.key == 'ArrowRight' || e.key == 'd') {
    yVelocity = 0;
    xVelocity = 1;
  } else if(e.key == 'ArrowLeft' || e.key == 'a') {
    yVelocity = 0;
    xVelocity = -1;
  }
});

drawGame();