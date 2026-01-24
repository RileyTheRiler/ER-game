// src/components/ui/ProgressBar.tsx
// Visual indicator for stats and timers

'use client';

import React from 'react';
import { motion } from 'framer-motion';

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
    value: number;
    max: number;
    variant?: 'default' | 'time' | 'energy' | 'stress' | 'health';
    size?: 'sm' | 'md' | 'lg';
    showLabel?: boolean;
    label?: string;
    className?: string;
    animate?: boolean;
}

const variantColors = {
    default: 'bg-gray-500',
    time: 'bg-amber-500',
    energy: 'bg-cyan-500',
    stress: 'bg-purple-500',
    health: 'bg-red-500',
};

const variantBackgrounds = {
    default: 'bg-gray-800',
    time: 'bg-amber-950/30',
    energy: 'bg-cyan-950/30',
    stress: 'bg-purple-950/30',
    health: 'bg-red-950/30',
};

const sizeStyles = {
    sm: 'h-2',
    md: 'h-4',
    lg: 'h-6',
};

export const ProgressBar: React.FC<ProgressBarProps> = ({
    value,
    max,
    variant = 'default',
    size = 'md',
    showLabel = false,
    label,
    className = '',
    animate = true,
    ...props
}) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    return (
        <div
            className={`w-full ${className}`}
            role="progressbar"
            aria-valuenow={Math.round(value)}
            aria-valuemin={0}
            aria-valuemax={max}
            aria-label={label}
            {...props}
        >
            {(showLabel || label) && (
                <div className="flex justify-between items-center mb-1 text-xs uppercase tracking-wider font-semibold text-gray-400">
                    <span>{label}</span>
                    {showLabel && <span>{Math.round(value)}/{max}</span>}
                </div>
            )}
            <div className={`
        w-full rounded-full overflow-hidden border border-white/5
        ${variantBackgrounds[variant]}
        ${sizeStyles[size]}
      `}>
                <motion.div
                    className={`h-full relative ${variantColors[variant]}`}
                    initial={animate ? { width: 0 } : { width: `${percentage}%` }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    {/* Shine effect */}
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/30" />

                    {/* Striped pattern overlay */}
                    <div
                        className="absolute inset-0 w-full h-full opacity-20"
                        style={{
                            backgroundImage: 'linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)',
                            backgroundSize: '1rem 1rem'
                        }}
                    />
                </motion.div>
            </div>
        </div>
    );
};

export default ProgressBar;
