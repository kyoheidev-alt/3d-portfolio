import React, { useEffect, useRef } from "react";

const BackgroundCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let items = []; // アイテムを格納する配列

    // ランダムな値を生成する関数
    const rand = (min, max) => Math.random() * (max - min) + min;

    // アイテムを初期化する関数
    const initItems = () => {
      let count = 50;
      while (count--) {
        let radius = rand(1, 250);
        let blur = rand(12, 70);
        let x = rand(-100, canvas.width + 100);
        let y = rand(-100, canvas.height + 100);
        let colorIndex = Math.floor(rand(0, 3));
        let colors = [
          ["#002aff", "#009ff2"],
          ["#0054ff", "#27e49b"],
          ["#202bc5", "#873dcc"],
        ];
        let [colorOne, colorTwo] = colors[colorIndex];
        let angle = rand(0, Math.PI * 2);
        let angleVelocity = rand(-0.05, 0.02);

        items.push({
          x,
          y,
          blur,
          radius,
          colorOne,
          colorTwo,
          angle,
          angleVelocity,
          initialXDirection: Math.round(rand(-99, 99) / 100),
          initialYDirection: Math.round(rand(-99, 99) / 100),
          initialBlurDirection: Math.round(rand(-99, 99) / 100),
        });
      }
    };

    // キャンバスを描画する関数
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      items.forEach((item) => {
        ctx.save();
        ctx.translate(item.x, item.y);
        ctx.rotate(item.angle);

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

        const height = item.radius * Math.sqrt(3);
        ctx.moveTo(-item.radius / 2, height / 4);
        ctx.lineTo(item.radius / 2, height / 4);
        ctx.lineTo(0, -height / 4);
        ctx.closePath();
        ctx.fill();

        ctx.restore();

        // アイテムのプロパティを更新
        item.x += item.initialXDirection * 2;
        item.y += item.initialYDirection * 2;
        item.angle += item.angleVelocity;
      });

      requestAnimationFrame(draw);
    };

    // ウィンドウのリサイズイベントに対応
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    initItems();
    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", top: 0, left: 0, zIndex: -1 }}
    />
  );
};

export default BackgroundCanvas;
