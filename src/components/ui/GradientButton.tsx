'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface GradientButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'glass' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  href?: string;
  icon?: React.ReactNode;
}

export default function GradientButton({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  href,
  icon,
}: GradientButtonProps) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-sm',
  };

  const variantClasses = {
    primary: `
      bg-gradient-to-r from-[var(--accent)] to-[#E8956A]
      text-white font-semibold
      border border-transparent
      shadow-[0_4px_16px_var(--accent-glow)]
      hover:shadow-[0_8px_28px_var(--accent-glow)]
      hover:brightness-110
    `,
    glass: `
      sb-btn-glass
    `,
    outline: `
      bg-transparent text-[var(--text-primary)] font-semibold
      border border-[var(--border-main)]
      hover:border-[var(--accent)] hover:text-[var(--accent)]
    `,
  };

  const shared = `
    inline-flex items-center justify-center gap-2
    rounded-[var(--radius-sm)]
    font-[Inter,sans-serif]
    cursor-pointer select-none
    transition-all duration-200 ease-out
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${className}
  `.replace(/\s+/g, ' ').trim();

  const motionProps = {
    whileHover: { scale: 1.02, y: -1 },
    whileTap: { scale: 0.97 },
    transition: { type: 'spring' as const, stiffness: 400, damping: 17 },
  };

  if (href) {
    return (
      <motion.a href={href} className={shared} {...motionProps}>
        {icon}
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button onClick={onClick} className={shared} {...motionProps}>
      {icon}
      {children}
    </motion.button>
  );
}
