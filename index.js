const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
// красный квадрат
ctx.beginPath();
ctx.rect(20, 40, 50, 50);
ctx.fillStyle = '#FF0000';
ctx.fill();
ctx.closePath();
// зеленый круг
ctx.beginPath();
ctx.arc(240, 160, 30, 0, Math.PI * 10, false);
ctx.fillStyle = 'green';
ctx.fill();
ctx.closePath();
// пустой прямоугольник с синей обводкой
ctx.beginPath();
ctx.rect(160, 10, 100, 50);
ctx.strokeStyle = 'rgba(0, 0, 255, 0.5)';
ctx.stroke();
ctx.closePath();
