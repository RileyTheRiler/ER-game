// src/components/ui/Badge.tsx
// Badge/tag component for status indicators

'use client';

import React from 'react';
import { motion } from 'framer-motion';

export interface BadgeProps {
    children: React.ReactNode;
    variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'skill' | 'neutral';
    size?: 'xs' | 'sm' | 'md';
    pulse?: boolean;
    className?: string;
}

const variantStyles = {
    default: 'bg-gray-800 text-gray-300 border border-gray-700',
    neutral: 'bg-gray-500/10 text-gray-400 border border-gray-800',
    success: 'bg-emerald-950/40 text-emerald-400 border border-emerald-800/50',
    warning: 'bg-amber-950/40 text-amber-400 border border-amber-800/50',
    danger: 'bg-red-950/40 text-red-400 border border-red-800/50',
    info: 'bg-cyan-950/40 text-cyan-400 border border-cyan-800/50',
    skill: 'bg-purple-950/40 text-purple-400 border border-purple-800/50',
};

const sizeStyles = {
    xs: 'px-1.5 py-0.5 text-[10px] uppercase tracking-wider',
    sm: 'px-2 py-0.5 text-xs font-medium',
    md: 'px-2.5 py-1 text-sm font-medium',
};

export const Badge: React.FC<BadgeProps> = ({
    children,
    variant = 'default',
    size = 'sm',
    pulse = false,
    className = '',
}) => {
    return (
        <motion.span
            animate={pulse ? { opacity: [1, 0.6, 1] } : undefined}
            transition={pulse ? { duration: 2, repeat: Infinity, ease: "easeInOut" } : undefined}
            className={`
        inline-flex items-center justify-center rounded-sm font-medium
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
        >
            {pulse && (
                <span className="mr-1.5 flex h-1.5 w-1.5 relative">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${variant === 'danger' ? 'bg-red-400' : 'bg-current'}`}></span>
                    <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${variant === 'danger' ? 'bg-red-500' : 'bg-current'}`}></span>
                </span>
            )}
            {children}
        </motion.span>
    );
};

// Skill category badges - Specialized for consistent skill tagging everywhere
export const SkillBadge: React.FC<{
    category: 'CLINICAL' | 'SOCIAL' | 'PSYCHOLOGICAL';
    children: React.ReactNode;
}> = ({ category, children }) => {
    const categoryStyles = {
        CLINICAL: 'bg-cyan-950/50 text-cyan-400 border-cyan-800',
        SOCIAL: 'bg-emerald-950/50 text-emerald-400 border-emerald-800',
        PSYCHOLOGICAL: 'bg-amber-950/50 text-amber-400 border-amber-800',
    };

    return (
        <span className={`
      inline-flex items-center px-1.5 py-0.5 rounded-sm text-[10px] uppercase tracking-wider border font-bold
      ${categoryStyles[category]}
    `}>
            {children}
        </span>
    );
};

export default Badge;
