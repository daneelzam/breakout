const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

let dx = 2;
let dy = -2;
let x = canvas.width / 2;
let y = canvas.height - 30;
let color = 'red';
const ballRadius = 10;

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
}
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  x += dx;
  y += dy;
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    color = 'blue';
    dx = -dx;
  }
  if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
    color = 'red';
    dy = -dy;
  }
}

setInterval(draw, 10);
