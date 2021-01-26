const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const dx = 2;
const dy = 0;
let x = canvas.width / 2;
let y = canvas.height - 30;

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, 10, 0, Math.PI * 2);
  ctx.fillStyle = 'red';
  ctx.fill();
  ctx.closePath();
}
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  x += dx;
  y += dy;
}

setInterval(draw, 100);
