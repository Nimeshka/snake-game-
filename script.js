
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
const canvasSize = 400;
let snake = [{ x: 200, y: 200 }];
let food = randomPosition();
let direction = "right";
let score = 0;
let game;

document.addEventListener("keydown", event => {
  const keyMap = {
    ArrowLeft: "left",
    ArrowUp: "up",
    ArrowDown: "down",
    ArrowRight: "right"
  };
  if (keyMap[event.key]) setDirection(keyMap[event.key]);
});

function setDirection(dir) {
  const opposite = { left: "right", right: "left", up: "down", down: "up" };
  if (dir !== opposite[direction]) direction = dir;
}

function randomPosition() {
  return {
    x: Math.floor(Math.random() * (canvasSize / box)) * box,
    y: Math.floor(Math.random() * (canvasSize / box)) * box
  };
}

function draw() {
  ctx.clearRect(0, 0, canvasSize, canvasSize);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "lime" : "green";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);

  let head = { ...snake[0] };
  if (direction === "left") head.x -= box;
  if (direction === "right") head.x += box;
  if (direction === "up") head.y -= box;
  if (direction === "down") head.y += box;

  if (
    head.x < 0 || head.y < 0 ||
    head.x >= canvasSize || head.y >= canvasSize ||
    snake.some(seg => seg.x === head.x && seg.y === head.y)
  ) {
    clearInterval(game);
    alert("Game Over");
    return;
  }

  snake.unshift(head);
  if (head.x === food.x && head.y === food.y) {
    score++;
    document.getElementById("score").innerText = "Score: " + score;
    food = randomPosition();
  } else {
    snake.pop();
  }
}

function restartGame() {
  snake = [{ x: 200, y: 200 }];
  direction = "right";
  score = 0;
  document.getElementById("score").innerText = "Score: 0";
  clearInterval(game);
  game = setInterval(draw, 100);
}

restartGame();
