import { useEffect, useRef } from "react";

const ITEM_COUNT = 22;
const MAX_BLUR = 36;

const BackgroundCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: true });
    let items = [];
    let animationId = 0;
    let running = true;

    const rand = (min, max) => Math.random() * (max - min) + min;

    const syncSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const initItems = () => {
      items = [];
      let count = ITEM_COUNT;
      while (count--) {
        const radius = rand(1, 220);
        const blur = rand(8, MAX_BLUR);
        const x = rand(-100, window.innerWidth + 100);
        const y = rand(-100, window.innerHeight + 100);
        const colorIndex = Math.floor(rand(0, 3));
        const colors = [
          ["#002aff", "#009ff2"],
          ["#0054ff", "#27e49b"],
          ["#202bc5", "#873dcc"],
        ];
        const [colorOne, colorTwo] = colors[colorIndex];
        items.push({
          x,
          y,
          blur,
          radius,
          colorOne,
          colorTwo,
          angle: rand(0, Math.PI),
          angleVelocity: rand(-0.04, 0.02),
          initialXDirection: Math.round(rand(-99, 99) / 100),
          initialYDirection: Math.round(rand(-99, 99) / 100),
        });
      }
    };

    const draw = () => {
      if (!running) return;

      if (document.hidden) {
        animationId = requestAnimationFrame(draw);
        return;
      }

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      items.forEach((item) => {
        ctx.save();
        ctx.translate(item.x, item.y);
        ctx.rotate(item.angle);

        ctx.beginPath();
        ctx.filter = `blur(${item.blur}px)`;
        const grd = ctx.createLinearGradient(
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

        item.x += item.initialXDirection * 1.5;
        item.y += item.initialYDirection * 1.5;
        item.angle += item.angleVelocity;
      });

      animationId = requestAnimationFrame(draw);
    };

    const handleResize = () => {
      syncSize();
      initItems();
    };

    const handleVisibility = () => {
      if (document.hidden) {
        ctx.filter = "none";
      }
    };

    syncSize();
    initItems();
    draw();

    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", top: 0, left: 0, zIndex: -1 }}
      aria-hidden
    />
  );
};

export default BackgroundCanvas;
