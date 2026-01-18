// src/components/ui/Button.tsx
// Reusable button component with variants
// Polished for "Code Blue" aesthetic

'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { useSound } from '@/hooks/useSound';

export interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline' | 'medical';
    size?: 'sm' | 'md' | 'lg' | 'icon';
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    fullWidth?: boolean;
}

const variantStyles = {
    primary: 'bg-cyan-700 hover:bg-cyan-600 text-white border border-cyan-500/50 shadow-[0_0_10px_rgba(8,145,178,0.3)]',
    secondary: 'bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-600',
    danger: 'bg-red-900/80 hover:bg-red-800 text-red-100 border border-red-700 shadow-[0_0_10px_rgba(220,38,38,0.2)]',
    ghost: 'bg-transparent hover:bg-gray-800/50 text-gray-400 hover:text-white border border-transparent',
    outline: 'bg-transparent hover:bg-cyan-950/30 text-cyan-400 border border-cyan-700/50',
    medical: 'bg-slate-100 text-slate-900 border border-white hover:bg-white font-bold uppercase tracking-widest shadow-sm', // Sterile, "real world" button
};

const sizeStyles = {
    sm: 'px-3 py-1 text-xs uppercase tracking-wider',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base font-semibold',
    icon: 'p-2',
};

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    leftIcon,
    rightIcon,
    className = '',
    disabled,
    type = 'button',
    fullWidth = false,
    onClick,
    ...props
}) => {
    const { play } = useSound();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!disabled && !isLoading) {
            play('CLICK', { volume: 0.3 });
            onClick?.(e);
        }
    };

    return (
        <motion.button
            whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
            whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
            className={`
        relative inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all 
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-950 focus:ring-cyan-500/50
        disabled:opacity-50 disabled:cursor-not-allowed disabled:grayscale
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
            disabled={disabled || isLoading}
            onClick={handleClick}
            type={type}
            {...props}
        >
            {isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                        className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                    />
                </div>
            ) : null}

            <span className={`flex items-center gap-2 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
                {leftIcon}
                {children}
                {rightIcon}
            </span>
        </motion.button>
    );
};

export default Button;
