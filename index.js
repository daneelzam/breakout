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
const brickRowCount = 3;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;
const bricks = [];

for (let i = 0; i < brickColumnCount; i += 1) {
  bricks[i] = [];
  for (let j = 0; j < brickRowCount; j += 1) {
    bricks[i][j] = { x: 0, y: 0, status: 1 };
  }
}
// функция которая рисует кирпичи
function drawBricks() {
  for (let i = 0; i < brickColumnCount; i += 1) {
    for (let j = 0; j < brickRowCount; j += 1) {
      if (bricks[i][j].status === 1) {
        const brickX = (i * (brickWidth + brickPadding)) + brickOffsetLeft;
        const brickY = (j * (brickWidth + brickPadding)) + brickOffsetTop;
        bricks[i][j].x = brickX;
        bricks[i][j].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

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

// функция, которая проверяет столкновение с блоками
function collisionDetection() {
  for (let i = 0; i < brickColumnCount; i += 1) {
    for (let j = 0; j < brickRowCount; j += 1) {
      const current = bricks[i][j];
      if (
        current.status === 1
        && x > current.x
          && x < current.x + brickWidth
          && y > current.y
          && y < current.y + brickHeight
      ) {
        dy = -dy;
        current.status = 0;
      }
    }
  }
}

// функция рендерит игру
function draw() {
  // очищаем поле
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // рисуем кирпичи
  drawBricks();
  // рисуем шарик
  drawBall();
  // рисуем ракетку
  drawPaddle();
  // проверяем столкновение с кирпичами
  collisionDetection();
  // смещаем центр шарика для следующей отрисовки
  x += dx;
  y += dy;
  // проверяем, чтобы шарик не столкнулся с краем
  // если столкнулся, то меняем цвет и направление
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    color = 'blue';
    dx = -dx;
  }
  if (y + dy < ballRadius) {
    color = 'green';
    dy = -dy;
  }
  // проверяем столкнулся ли шарик с нижней границей
  if (y + dy > canvas.height - ballRadius) {
    // если столкнулся,проверяем попал ли он в ракетку
    if (x > paddleX && x < paddleX + paddleWidth) {
      // если попал, то меняем направление мячика и увеличиваем скорость игры
      dy = -dy * 1.2;
      // иначе останавливаем игру
    } else {
      alert('GAME OVER');
      document.location.reload();
      // eslint-disable-next-line no-use-before-define
      clearInterval(interval);
    }
  }
  // проверяем нажата ли клавиша стрелочка влево или вправо
  // если нажата смещаем левый край ракетки на 7 пикселей в нужную сторону
  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 3;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 3;
  }
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
const interval = setInterval(draw, 10);
