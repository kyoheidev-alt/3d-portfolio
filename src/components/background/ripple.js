const rippleCanvas = document.getElementById("ripple");
rippleCanvas.setAttribute("width", window.innerWidth);
rippleCanvas.setAttribute("height", window.innerHeight);
rippleCanvas.setAttribute("id", "foregroundCanvas");
rippleCanvas.style.position = "absolute";
rippleCanvas.style.left = "0";
rippleCanvas.style.top = "0";
canvasContainer.appendChild(rippleCanvas);

const context = rippleCanvas.getContext("2d");
let circleCoord = [];
let stay = 0;
let dir = 1,
  dirY = 1;
let auto = true;
let mX = window.innerWidth / 2;
let mY = window.innerHeight / 2;

const handle = (e) => {
  stay = 0;
  auto = false;
  mX = e.pageX - rippleCanvas.offsetLeft;
  mY = e.pageY - rippleCanvas.offsetTop;
};

rippleCanvas.addEventListener("mousemove", handle);
rippleCanvas.addEventListener("touchmove", handle);

let frame = 0;
const render = () => {
  context.clearRect(0, 0, rippleCanvas.width, rippleCanvas.height);

  //   document.getElementById("debug").innerHTML = `${mX} ${mY}`;
  const cX = rippleCanvas.width / 2;
  const cY = rippleCanvas.height / 2;

  const drawTriangle = (mx, my, size, opacity, rotationAngle) => {
    context.save(); // 現在の描画状態を保存
    context.translate(mx, my); // 描画原点を三角形の中心に移動
    context.rotate(rotationAngle); // 回転角度で回転

    // 三角形の頂点を計算（原点を基準にする）
    const height = size * (Math.sqrt(3) / 2);
    context.beginPath();
    context.moveTo(0, -height / 2);
    context.lineTo(-size / 2, height / 2);
    context.lineTo(size / 2, height / 2);
    context.closePath();

    // スタイル設定
    context.lineWidth = 3;
    context.strokeStyle = `rgba(100, 149, 237, ${opacity})`;
    context.stroke();

    context.restore(); // 描画状態を復元（原点を元に戻す）
  };

  frame++;
  if (frame % 1 === 0) {
    if (
      frame > 5 &&
      frame % 2 === 0 &&
      circleCoord[circleCoord.length - 1][0] === mX &&
      circleCoord[circleCoord.length - 1][1] === mY
    ) {
      stay++;
      if (stay > 50) auto = true;
    } else if (!auto) {
      circleCoord.push([mX, mY, frame]);
    } else {
      stay++;
      stay %= 400;
      if (stay % 93 === 0) {
        dir = -dir;
        dirY = -dirY;
      }
      circleCoord.push([
        mX + dir * (Math.random() * 3 - 100 + stay),
        mY + dirY * (Math.random() * 3 - 100 + stay),
        frame,
      ]);
    }
  }

  if (circleCoord.length > 100) circleCoord.shift();
  circleCoord.forEach((coord) => {
    const base = frame - coord[2] + 15;
    const [aX, cX] = coord;
    const rotationAngle = (frame * Math.PI) / 180; // frameを基に回転角度を計算（度からラジアンへ変換）
    drawTriangle(
      aX + base,
      cX + base / 2,
      3 * base + base / 10,
      1.3 / (base * 3),
      rotationAngle
    );
    drawTriangle(
      aX,
      cX,
      1.5 * base + base / 10,
      2.3 / (base * 3),
      rotationAngle
    );
    drawTriangle(aX, cX, 2 * base + base / 20, 2.5 / (base * 3), rotationAngle);
  });

  requestAnimationFrame(render);
};

render();
