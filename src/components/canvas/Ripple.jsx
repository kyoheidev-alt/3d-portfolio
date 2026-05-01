import { useEffect, useRef } from "react";

const RippleCanvas = () => {
  const canvasRef = useRef(null);
  const rotateFrameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const mouseRef = { x: 0, y: 0 };
    let pendingPush = false;
    const circleCoord = [];
    let frame = 0;
    let animationId = 0;

    const syncSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    syncSize();

    const onMove = (e) => {
      mouseRef.x = e.clientX;
      mouseRef.y = e.clientY;
      pendingPush = true;
    };

    const handleResize = () => syncSize();

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
      rotateFrameRef.current += 0.02;
      const rotationAngle =
        (rotateFrameRef.current * Math.PI) / 180;

      if (pendingPush) {
        const mX = mouseRef.x - canvas.offsetLeft;
        const mY = mouseRef.y - canvas.offsetTop;
        circleCoord.push([mX, mY, frame]);
        pendingPush = false;
      }

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

      animationId = requestAnimationFrame(render);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", onMove, { passive: true });
    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", left: 0, top: 0, zIndex: 1 }}
      aria-hidden
    />
  );
};

export default RippleCanvas;
