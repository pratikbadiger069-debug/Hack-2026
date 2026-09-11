'use client';

import React, { useState } from 'react';
import { getDefaultAvatar } from '@/lib/avatar-service';

interface UserAvatarProps {
  src?: string;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
  showLevel?: boolean;
  level?: number;
  interactive?: boolean;
  onClick?: () => void;
}

const sizeMap = {
  xs: 'w-6 h-6 text-[10px] rounded-lg',
  sm: 'w-8 h-8 text-xs rounded-xl',
  md: 'w-10 h-10 text-sm rounded-xl',
  lg: 'w-14 h-14 text-base rounded-2xl',
  xl: 'w-20 h-20 text-xl rounded-2xl',
  '2xl': 'w-24 h-24 text-2xl rounded-3xl',
};

export function UserAvatar({
  src,
  name = 'Builder',
  size = 'md',
  className = '',
  showLevel = false,
  level = 1,
  interactive = false,
  onClick,
}: UserAvatarProps) {
  const [imgError, setImgError] = useState(false);

  const fallbackUrl = getDefaultAvatar(name);
  const effectiveSrc = imgError || !src ? fallbackUrl : src;
  const initial = name ? name.charAt(0).toUpperCase() : 'B';

  return (
    <div
      onClick={interactive ? onClick : undefined}
      className={`relative inline-flex items-center justify-center shrink-0 select-none overflow-visible ${
        interactive ? 'cursor-pointer hover:opacity-90 transition-opacity' : ''
      } ${className}`}
    >
      <div
        className={`${sizeMap[size]} bg-[#1B1B1B] text-white flex items-center justify-center font-bold overflow-hidden border border-[#E8E5DD] shadow-xs relative`}
      >
        {effectiveSrc ? (
          <img
            src={effectiveSrc}
            alt={name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <span>{initial}</span>
        )}
      </div>

      {showLevel && (
        <span className="absolute -bottom-1 -right-1 px-1.5 py-0.2 rounded-full bg-[#1B1B1B] text-white text-[9px] font-mono font-bold shadow-xs border border-white">
          Lvl {level}
        </span>
      )}
    </div>
  );
}
