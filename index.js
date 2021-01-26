const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

let dx = 2;// при каждой отрисовке смещается по Х на dx
let dy = -2;// при каждой отрисовке смещается по Y на dy
let x = canvas.width / 2;// начальная координата центра шарика (посередине в ширину)
let y = canvas.height - 30;// начальная координата центра шарика (на 30 пикселей выше нижнего края)
let color = 'red';// цвет шарика
const ballRadius = 10; // радиус шарика
const paddleHeight = 10; // высота ракетки
const paddleWidth = 75; // ширина ракетки
let paddleX = (canvas.width - paddleWidth) / 2; // начальная позиция ракетки(левого края)
// ширина холста минус ширина ракетки деленная на два
let rightPressed = false;// ракетка движется вправо (ложь)
let leftPressed = false;// ракетка движется влево (ложь)

// функция которая рисует шарик
function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
}

// функция которая рисует ракетку
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = 'yellow';
  ctx.fill();
  ctx.closePath();
}

// функция рендерит игру
function draw() {
  // очищаем поле
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // рисуем шарик
  drawBall();
  // рисуем ракетку
  drawPaddle();
  // смещаем центр шарика для следующей отрисовки
  x += dx;
  y += dy;
  // проверяем, чтобы шарик не столкнулся с краем
  // если столкнулся, то меняем цвет и направление
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {    
    color = 'blue';
    dx = -dx;
  }
  if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
    color = 'red';
    dy = -dy;
  }
  // проверяем нажата ли клавиша стрелочка влево или вправо
  // если нажата смещаем левый край ракетки на 7 пикселей в нужную сторону
  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }
}

// проверяет, нажата ли стрелочка влево или вправо
// если нажата, то меняет флаг на true
function keyDownHandler(e) {
  if (e.keyCode === 39) {
    rightPressed = true;
  } else if (e.keyCode === 37) {
    leftPressed = true;
  }
}

// проверяет, отпущена ли стрелочка влево или вправо
// если отпущена, то меняет флаг на false
function keyUpHandler(e) {
  if (e.keyCode === 39) {
    rightPressed = false;
  } else if (e.keyCode === 37) {
    leftPressed = false;
  }
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
setInterval(draw, 10);
