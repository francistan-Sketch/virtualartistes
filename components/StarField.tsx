"use client";

import { useEffect, useRef } from "react";

const BOKEH_COLORS = [
  "0,200,255",    // bright cyan
  "80,160,255",   // bright blue
  "255,50,200",   // hot magenta
  "255,120,200",  // bright pink
  "180,80,255",   // vivid violet
  "0,255,200",    // mint green
  "255,200,0",    // warm gold
];

export default function StarField({ count = 120 }: { count?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Bokeh orbs — large soft glowing circles
    const bokeh = Array.from({ length: 24 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: 100 + Math.random() * 220,
      color: BOKEH_COLORS[Math.floor(Math.random() * BOKEH_COLORS.length)],
      baseAlpha: 0.18 + Math.random() * 0.22,
      speed: 0.0004 + Math.random() * 0.0006,
      phase: Math.random() * Math.PI * 2,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
    }));

    // Stars — small white twinklers
    const stars = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.6 + 0.3,
      speed: Math.random() * 0.004 + 0.001,
      phase: Math.random() * Math.PI * 2,
    }));

    let animId: number;
    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.008;

      // Draw bokeh
      for (const b of bokeh) {
        b.x += b.vx;
        b.y += b.vy;
        if (b.x < -b.r) b.x = canvas.width + b.r;
        if (b.x > canvas.width + b.r) b.x = -b.r;
        if (b.y < -b.r) b.y = canvas.height + b.r;
        if (b.y > canvas.height + b.r) b.y = -b.r;

        const pulse = 0.65 + 0.35 * Math.sin(t * b.speed * 600 + b.phase);
        const a = b.baseAlpha * pulse;

        const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        grad.addColorStop(0,   `rgba(${b.color},${a})`);
        grad.addColorStop(0.45,`rgba(${b.color},${a * 0.35})`);
        grad.addColorStop(1,   `rgba(${b.color},0)`);

        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      // Draw stars on top
      for (const s of stars) {
        const a = 0.25 + 0.55 * Math.abs(Math.sin(t * s.speed * 10 + s.phase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${a})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
