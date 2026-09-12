'use client';

import React from 'react';

interface ParticleFieldProps {
  count?: number;
}

/**
 * Decorative CSS-animated particle overlay for hero sections.
 * Each particle gets randomized position, size, drift direction, and delay.
 */
export default function ParticleField({ count = 18 }: ParticleFieldProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const particles = React.useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      // Deterministic pseudo-random generation based on index
      const pseudoRandom = (seed: number) => {
        const x = Math.sin(i * 12.9898 + seed * 78.233) * 43758.5453;
        return x - Math.floor(x);
      };

      const left = pseudoRandom(1) * 100;
      const top = pseudoRandom(2) * 100;
      const size = 2 + pseudoRandom(3) * 4;
      const dx = (pseudoRandom(4) - 0.5) * 200;
      const dy = -(60 + pseudoRandom(5) * 160);
      const delay = pseudoRandom(6) * 8;
      const duration = 6 + pseudoRandom(7) * 8;
      const opacity = 0.15 + pseudoRandom(8) * 0.35;

      return { i, left, top, size, dx, dy, delay, duration, opacity };
    });
  }, [count]);

  if (!mounted) {
    return <div className="hero-particles" aria-hidden="true" />;
  }

  return (
    <div className="hero-particles" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.i}
          style={{
            left: `${p.left.toFixed(2)}%`,
            top: `${p.top.toFixed(2)}%`,
            width: `${p.size.toFixed(1)}px`,
            height: `${p.size.toFixed(1)}px`,
            ['--dx' as string]: `${p.dx.toFixed(1)}px`,
            ['--dy' as string]: `${p.dy.toFixed(1)}px`,
            animationDelay: `${p.delay.toFixed(2)}s`,
            animationDuration: `${p.duration.toFixed(2)}s`,
            opacity: Number(p.opacity.toFixed(2)),
          }}
        />
      ))}
    </div>
  );
}
