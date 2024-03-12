const rand = function (min, max) {
  return Math.random() * (max - min) + min;
};

let canvasContainer = document.getElementById("canvasContainer");
let canvas = document.createElement("canvas");
canvas.id = "backgroundCanvas";
canvasContainer.appendChild(canvas);
let ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx = canvas.getContext("2d");
  ctx.globalCompositeOperation = "lighter";
});
let backgroundColors = ["#000", "#000"];
let colors = [
  ["#002aff", "#009ff2"],
  ["#0054ff", "#27e49b"],
  ["#202bc5", "#873dcc"],
];
let count = 70;
let blur = [12, 70];
let radius = [1, 250];

ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.globalCompositeOperation = "lighter";

let grd = ctx.createLinearGradient(0, canvas.height, canvas.width, 0);
grd.addColorStop(0, backgroundColors[0]);
grd.addColorStop(1, backgroundColors[1]);
ctx.fillStyle = grd;
ctx.fillRect(0, 0, canvas.width, canvas.height);

let items = [];

while (count--) {
  let thisRadius = rand(radius[0], radius[1]);
  let thisBlur = rand(blur[0], blur[1]);
  let x = rand(-100, canvas.width + 100);
  let y = rand(-100, canvas.height + 100);
  let colorIndex = Math.floor(rand(0, 299) / 100);
  let colorOne = colors[colorIndex][0];
  let colorTwo = colors[colorIndex][1];
  let angle = rand(0, Math.PI * 2); // 初期角度
  let angleVelocity = rand(-0.05, 0.02); // 角速度

  ctx.beginPath();
  ctx.filter = `blur(${thisBlur}px)`;
  let grd = ctx.createLinearGradient(
    x - thisRadius / 2,
    y - thisRadius / 2,
    x + thisRadius,
    y + thisRadius
  );

  grd.addColorStop(0, colorOne);
  grd.addColorStop(1, colorTwo);
  ctx.fillStyle = grd;
  ctx.fill();
  ctx.arc(x, y, thisRadius, 0, Math.PI * 2);
  ctx.closePath();

  let directionX = Math.round(rand(-99, 99) / 100);
  let directionY = Math.round(rand(-99, 99) / 100);

  items.push({
    x: x,
    y: y,
    blur: thisBlur,
    radius: thisRadius,
    initialXDirection: directionX,
    initialYDirection: directionY,
    initialBlurDirection: directionX,
    colorOne: colorOne,
    colorTwo: colorTwo,
    gradient: [
      x - thisRadius / 2,
      y - thisRadius / 2,
      x + thisRadius,
      y + thisRadius,
    ],
    angle: angle,
    angleVelocity: angleVelocity,
  });
}

function changeCanvas(timestamp) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let adjX = 2;
  let adjY = 2;
  let adjBlur = 1;
  items.forEach(function (item) {
    if (
      (item.x + item.initialXDirection * adjX >= canvas.width &&
        item.initialXDirection !== 0) ||
      (item.x + item.initialXDirection * adjX <= 0 &&
        item.initialXDirection !== 0)
    ) {
      item.initialXDirection = item.initialXDirection * -1;
    }
    if (
      (item.y + item.initialYDirection * adjY >= canvas.height &&
        item.initialYDirection !== 0) ||
      (item.y + item.initialYDirection * adjY <= 0 &&
        item.initialYDirection !== 0)
    ) {
      item.initialYDirection = item.initialYDirection * -1;
    }

    if (
      (item.blur + item.initialBlurDirection * adjBlur >= radius[1] &&
        item.initialBlurDirection !== 0) ||
      (item.blur + item.initialBlurDirection * adjBlur <= radius[0] &&
        item.initialBlurDirection !== 0)
    ) {
      item.initialBlurDirection *= -1;
    }

    item.x += item.initialXDirection * adjX;
    item.y += item.initialYDirection * adjY;
    item.blur += item.initialBlurDirection * adjBlur;

    // 以下のコードを追加
    item.angle += item.angleVelocity; // 角度を更新

    ctx.save(); // 現在のキャンバスの状態を保存
    ctx.translate(item.x, item.y); // キャンバスの原点を三角形の中心に移動
    ctx.rotate(item.angle); // 三角形を回転

    // 三角形を描画するコード
    ctx.beginPath();
    ctx.filter = `blur(${item.blur}px)`;
    let grd = ctx.createLinearGradient(
      -item.radius / 2,
      -item.radius / 2,
      item.radius,
      item.radius
    );
    grd.addColorStop(0, item.colorOne);
    grd.addColorStop(1, item.colorTwo);
    ctx.fillStyle = grd;

    // 三角形の頂点を計算して描画
    const height = item.radius * Math.sqrt(3);
    ctx.moveTo(item.x - item.radius / 2, item.y + height / 4);
    ctx.lineTo(item.x + item.radius / 2, item.y + height / 4);
    ctx.lineTo(item.x, item.y - height / 4);
    ctx.closePath();
    ctx.fill();

    ctx.restore(); // キャンバスの状態を元に戻す
  });
  window.requestAnimationFrame(changeCanvas);
}

window.requestAnimationFrame(changeCanvas);
