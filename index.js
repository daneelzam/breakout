const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

let dx = 2;// при каждой отрисовке смещается по Х на dx
let dy = -2;// при каждой отрисовке смещается по Y на dy
let x = canvas.width / 2;// начальная координата центра шарика (посередине в ширину)
let y = canvas.height - 30;// начальная координата центра шарика (на 30 пикселей выше нижнего края)
const color = '#008701';// цвет шарика
const ballRadius = 10; // радиус шарика
const paddleHeight = 10; // высота ракетки
const paddleWidth = 75; // ширина ракетки
let paddleX = (canvas.width - paddleWidth) / 2; // начальная позиция ракетки(левого края)
// ширина холста минус ширина ракетки деленная на два
let rightPressed = false;// ракетка движется вправо (ложь)
let leftPressed = false;// ракетка движется влево (ложь)
const brickRowCount = 2;// количество строк с блоками
const brickColumnCount = 5;// количество столбцов с блоками
const brickWidth = 75;// ширина блока
const brickHeight = 20;// высота блока
const brickPadding = 20;// отступ от блока
const brickOffsetTop = 10;// отступ сверху
const brickOffsetLeft = 10;// отступ слева
const bricks = [];// массив блоков
let score = 0;
let lives = 3;

// наполянем массив блоков блоками
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
        const brickY = ((j / 1.5) * (brickWidth + brickPadding)) + brickOffsetTop;
        bricks[i][j].x = brickX;
        bricks[i][j].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.strokeStyle = color;
        ctx.stroke();
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
  ctx.fillStyle = color;
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

function mouseMoveHandler(e) {
  const relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
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
        score += 1;
        if (score === brickRowCount * brickColumnCount) {
          alert('YOU WIN, CONGRATULATIONS!');
          document.location.reload();
        }
      }
    }
  }
}

// функция, которая рисует количество очков
function drowScore() {
  ctx.font = '16px Arial';
  ctx.fillStyle = color;
  ctx.fillText(`Score: ${score}`, 8, 20);
}
// функция, которая рисует количество жизней
function drowLives() {
  ctx.font = '16px Arial';
  ctx.fillStyle = color;
  ctx.fillText(`Lives: ${lives}`, 8, 40);
}

// функция рендерит игру
function draw() {
  // очищаем поле
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // рисуем кирпичи
  drawBricks();
  // рисуем шарик
  drawBall();
  // рисуем жизни
  drowLives();
  // рисуем счет
  drowScore();
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
    dx = -dx;
  }
  if (y + dy < ballRadius) {
    dy = -dy;
  }
  // проверяем столкнулся ли шарик с нижней границей
  if (y + dy > canvas.height - ballRadius) {
    // если столкнулся,проверяем попал ли он в ракетку
    if (x > paddleX && x < paddleX + paddleWidth) {
      // если попал, то меняем направление мячика и увеличиваем скорость игры
      dy = -dy;
      // иначе останавливаем игру
    } else {
      lives -= 1;
      if (!lives) {
        alert('GAME OVER');
        document.location.reload();
      } else {
        x = canvas.width / 2;
        y = canvas.height - 30;
        dx = 2;
        dy = -2;
        paddleX = (canvas.width - paddleWidth) / 2;
      }
    }
  }
  // проверяем нажата ли клавиша стрелочка влево или вправо
  // если нажата смещаем левый край ракетки на 7 пикселей в нужную сторону
  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 3;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 3;
  }
  requestAnimationFrame(draw);
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener('mousemove', mouseMoveHandler, false);
draw();
