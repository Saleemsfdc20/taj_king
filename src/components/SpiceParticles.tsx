'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  life: number;
  maxLife: number;
}

interface SpiceParticlesProps {
  count?: number;
  className?: string;
}

export default function SpiceParticles({
  count = 40,
  className = '',
}: SpiceParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const colors = ['#F97316', '#FFB703', '#FF6B35', '#FFA500', '#FF8C00'];

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
      }
    };

    const createParticle = (): Particle => {
      const maxLife = Math.random() * 200 + 100;
      return {
        x: Math.random() * canvas.width,
        y: canvas.height + Math.random() * 50,
        vx: (Math.random() - 0.5) * 0.8,
        vy: -(Math.random() * 1.5 + 0.5),
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.7 + 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 0,
        maxLife,
      };
    };

    // Initialize particles
    particlesRef.current = Array.from({ length: count }, () => {
      const p = createParticle();
      p.y = Math.random() * canvas.height;
      p.life = Math.random() * p.maxLife;
      return p;
    });

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        // Fade out as life progresses
        const lifeRatio = p.life / p.maxLife;
        const alpha = lifeRatio < 0.1
          ? lifeRatio * 10 * p.opacity
          : lifeRatio > 0.7
          ? (1 - lifeRatio) * (1 / 0.3) * p.opacity
          : p.opacity;

        // Slight wind sway
        p.vx += (Math.random() - 0.5) * 0.05;
        p.vx = Math.max(-1, Math.min(1, p.vx));

        // Draw particle with glow
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.shadowBlur = p.size * 3;
        ctx.shadowColor = p.color;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Respawn when dead
        if (p.life >= p.maxLife || p.y < -20) {
          particlesRef.current[i] = createParticle();
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener('resize', resize);
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
    />
  );
}
