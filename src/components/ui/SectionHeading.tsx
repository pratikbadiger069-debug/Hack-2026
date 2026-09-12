'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeadingProps {
  label: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export default function SectionHeading({
  label,
  title,
  subtitle,
  align = 'center',
}: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
      className={`space-y-3 max-w-3xl ${alignClass}`}
    >
      <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[var(--accent)] font-bold">
        <span className="w-6 h-[2px] rounded-full bg-[var(--accent)] inline-block" />
        {label}
      </span>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--text-primary)] tracking-tight leading-[1.1]">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      <div className="section-divider mt-4" />
    </motion.div>
  );
}
