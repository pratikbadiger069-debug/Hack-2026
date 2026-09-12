'use client';

import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

interface GlassCardProps extends Omit<HTMLMotionProps<'div'>, 'ref'> {
  variant?: 'light' | 'dark';
  hoverGlow?: boolean;
  gradientBorder?: boolean;
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function GlassCard({
  variant = 'light',
  hoverGlow = false,
  gradientBorder = false,
  children,
  className = '',
  delay = 0,
  ...rest
}: GlassCardProps) {
  const baseClass = variant === 'dark' ? 'glass-card-dark' : 'glass-card';
  const glowClass = hoverGlow ? 'hover:shadow-[0_0_30px_var(--accent-glow)]' : '';
  const borderClass = gradientBorder ? 'gradient-border' : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay, ease: [0.33, 1, 0.68, 1] }}
      className={`${baseClass} ${glowClass} ${borderClass} ${className}`}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
