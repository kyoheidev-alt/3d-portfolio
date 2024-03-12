import React, { useEffect, useRef } from "react";

const RippleCanvas = () => {
  const canvasRef = useRef(null);
  let circleCoord = [];
  let stay = 0;
  let dir = 1,
    dirY = 1;
  let auto = true;
  let mX, mY;
  let frame = 0;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      stay = 0;
      auto = false;
      mX = e.pageX - canvas.offsetLeft;
      mY = e.pageY - canvas.offsetTop;
      circleCoord.push([mX, mY, frame]);
    };

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

      context.lineWidth = 3;
      context.strokeStyle = `rgba(100, 149, 237, ${opacity})`;
      context.stroke();

      context.restore();
    };

    const render = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      if (circleCoord.length > 100) circleCoord.shift();
      circleCoord.forEach((coord) => {
        const base = frame - coord[2] + 15;
        const rotationAngle = (frame * Math.PI) / 180;
        drawTriangle(
          coord[0] + base,
          coord[1] + base / 2,
          3 * base + base / 10,
          1.3 / (base * 3),
          rotationAngle
        );
        drawTriangle(
          coord[0],
          coord[1],
          1.5 * base + base / 10,
          2.3 / (base * 3),
          rotationAngle
        );
        drawTriangle(
          coord[0],
          coord[1],
          2 * base + base / 20,
          2.5 / (base * 3),
          rotationAngle
        );
      });

      requestAnimationFrame(render);
    };

    window.addEventListener("resize", handleResize);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("touchmove", handleMouseMove);

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("touchmove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", left: 0, top: 0, zIndex: 1 }}
    />
  );
};

export default RippleCanvas;
