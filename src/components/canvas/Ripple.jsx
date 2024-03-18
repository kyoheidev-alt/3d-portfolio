import React, { useEffect, useRef } from "react";

const RippleCanvas = ({ mousePosition }) => {
  const canvasRef = useRef(null);
  let circleCoord = [];
  let frame = 0;
  const rotateFrame = useRef(0); // rotateFrameをuseRefで定義

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // mousePositionの変更を監視し、変更があった場合に三角形の座標を更新
    if (mousePosition) {
      const mX = mousePosition.x - canvas.offsetLeft;
      const mY = mousePosition.y - canvas.offsetTop;
      circleCoord.push([mX, mY, frame]);
    }

    // const handleMouseMove = (e) => {
    //   stay = 0;
    //   auto = false;
    //   mX = e.pageX - canvas.offsetLeft;
    //   mY = e.pageY - canvas.offsetTop;
    //   circleCoord.push([mX, mY, frame]);
    // };

    const drawTriangle = (mx, my, size, opacity, rotationAngle) => {
      context.save();
      context.translate(mx, my);
      context.rotate(rotationAngle);

      const height = size * (Math.sqrt(3) / 2);
      context.beginPath();
      context.moveTo(0, -height / 2);
      context.lineTo(-size / 2, height / 2);
      context.lineTo(size / 2, height / 2);
      context.closePath();

      context.lineWidth = 6;
      context.strokeStyle = `rgba(100, 149, 237, ${opacity})`;
      context.stroke();

      context.restore();
    };

    const render = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      frame++;
      rotateFrame.current += 0.02; // rotateFrame.currentを0.05ずつインクリメント
      const rotationAngle = (rotateFrame.current * Math.PI) / 180;

      if (circleCoord.length > 100) circleCoord.shift();
      circleCoord.forEach((coord) => {
        const base = frame - coord[2] + 15;

        drawTriangle(
          coord[0] + base,
          coord[1] + base / 2,
          3 * base + base / 10,
          1.3 / (base * 2),
          rotationAngle
        );
        drawTriangle(
          coord[0],
          coord[1],
          1.5 * base + base / 10,
          2.3 / (base * 2),
          rotationAngle
        );
        drawTriangle(
          coord[0],
          coord[1],
          2 * base + base / 20,
          2.5 / (base * 2),
          rotationAngle
        );
      });

      requestAnimationFrame(render);
    };

    window.addEventListener("resize", handleResize);
    // canvas.addEventListener("mousemove", handleMouseMove);
    // canvas.addEventListener("touchmove", handleMouseMove);

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      // canvas.removeEventListener("mousemove", handleMouseMove);
      // canvas.removeEventListener("touchmove", handleMouseMove);
    };
  }, [mousePosition]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", left: 0, top: 0, zIndex: 1 }}
    />
  );
};

export default RippleCanvas;
