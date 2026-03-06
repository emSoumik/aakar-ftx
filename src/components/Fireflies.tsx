import { useEffect, useRef } from "react";

interface Firefly {
  x: number;
  y: number;
  vx: number;
  vy: number;
  phase: number;
  speed: number;
  size: number;
  brightness: number;
}

export function Fireflies() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!canvasRef.current) return;
      const heroHeight = window.innerHeight;
      const progress = Math.min(Math.max(window.scrollY / heroHeight, 0), 1);
      const blur = progress * 8;
      canvasRef.current.style.filter = `blur(${blur}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const flies: Firefly[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Spawn fireflies in the grassland area
    const spawnFirefly = (): Firefly => {
      // Two zones: bottom-left flower field and bottom-right
      const zone = Math.random();
      let x: number, y: number;
      if (zone < 0.65) {
        // Bottom-left field
        x = Math.random() * canvas.width * 0.5;
        y = canvas.height * 0.55 + Math.random() * canvas.height * 0.45;
      } else {
        // Bottom-right field
        x = canvas.width * 0.45 + Math.random() * canvas.width * 0.35;
        y = canvas.height * 0.65 + Math.random() * canvas.height * 0.35;
      }

      return {
        x,
        y,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -0.1 - Math.random() * 0.25,
        phase: Math.random() * Math.PI * 2,
        speed: 0.02 + Math.random() * 0.03,
        size: 1.5 + Math.random() * 2,
        brightness: 0,
      };
    };

    // Initialize
    const count = 35;
    for (let i = 0; i < count; i++) {
      flies.push(spawnFirefly());
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const fly of flies) {
        fly.phase += fly.speed;
        // Pulse: smooth glow on/off
        fly.brightness = Math.max(0, Math.sin(fly.phase));

        // Gentle drift
        fly.x += fly.vx + Math.sin(fly.phase * 0.7) * 0.15;
        fly.y += fly.vy + Math.cos(fly.phase * 0.5) * 0.1;

        // Respawn if drifted too far
        if (
          fly.y < canvas.height * 0.4 ||
          fly.x < -20 ||
          fly.x > canvas.width + 20 ||
          fly.y > canvas.height + 20
        ) {
          Object.assign(fly, spawnFirefly());
        }

        if (fly.brightness < 0.05) continue;

        const alpha = fly.brightness * 0.85;

        // Outer glow
        const grd = ctx.createRadialGradient(
          fly.x, fly.y, 0,
          fly.x, fly.y, fly.size * 6
        );
        grd.addColorStop(0, `rgba(255,230,130,${alpha})`);
        grd.addColorStop(0.3, `rgba(255,210,80,${alpha * 0.4})`);
        grd.addColorStop(1, `rgba(255,200,60,0)`);
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(fly.x, fly.y, fly.size * 6, 0, Math.PI * 2);
        ctx.fill();

        // Bright core
        ctx.fillStyle = `rgba(255,245,200,${alpha})`;
        ctx.beginPath();
        ctx.arc(fly.x, fly.y, fly.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[1] pointer-events-none"
    />
  );
}
