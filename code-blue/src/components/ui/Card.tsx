// src/components/ui/Card.tsx
// Reusable card component for content containers
// Polished for "Code Blue" aesthetic

'use client';

import React from 'react';
import { motion } from 'framer-motion';

export interface CardProps {
    children: React.ReactNode;
    variant?: 'default' | 'elevated' | 'outlined' | 'critical' | 'monitor' | 'panel';
    className?: string;
    onClick?: () => void;
    hoverable?: boolean;
    noPadding?: boolean;
}

const variantStyles = {
    default: 'bg-gray-900/60 border-gray-800 backdrop-blur-sm',
    elevated: 'bg-gray-800 border-gray-700 shadow-xl shadow-black/50',
    outlined: 'bg-transparent border-gray-700 border-dashed',
    critical: 'bg-red-950/30 border-red-900/50 shadow-[0_0_15px_rgba(220,38,38,0.1)]',
    monitor: 'bg-black border-gray-800 relative overflow-hidden scanline', // CRT/Monitor look
    panel: 'bg-gray-900 border-t border-b border-gray-800 rounded-none sm:rounded-md sm:border', // Hardware panel look
};

export const Card: React.FC<CardProps> = ({
    children,
    variant = 'default',
    className = '',
    onClick,
    hoverable = false,
    noPadding = false,
}) => {
    const Component = onClick || hoverable ? motion.div : 'div';

    const baseProps = {
        className: `
      rounded-lg border
      ${variantStyles[variant]}
      ${onClick ? 'cursor-pointer' : ''}
      ${className}
    `,
        onClick,
    };

    const motionProps = onClick || hoverable ? {
        whileHover: {
            scale: 1.005,
            borderColor: variant === 'critical' ? 'rgba(239, 68, 68, 0.6)' : 'rgba(34, 211, 238, 0.4)',
            backgroundColor: variant === 'default' ? 'rgba(39, 39, 42, 0.8)' : undefined
        },
        whileTap: onClick ? { scale: 0.99 } : undefined,
        transition: { duration: 0.2 }
    } : {};

    return (
        <Component {...baseProps} {...motionProps}>
            {/* Corner accents for Monitor variant */}
            {variant === 'monitor' && (
                <>
                    <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-gray-600 rounded-tl-sm opacity-50" />
                    <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-gray-600 rounded-tr-sm opacity-50" />
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-gray-600 rounded-bl-sm opacity-50" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-gray-600 rounded-br-sm opacity-50" />
                </>
            )}

            <div className={noPadding ? '' : 'p-0'}>
                {children}
            </div>
        </Component>
    );
};

export interface CardHeaderProps {
    children: React.ReactNode;
    className?: string;
    action?: React.ReactNode;
    subtitle?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
    children,
    className = '',
    action,
    subtitle
}) => (
    <div className={`px-4 py-3 border-b border-gray-800 flex items-center justify-between ${className}`}>
        <div>
            <h3 className="text-gray-100 font-semibold tracking-wide text-sm uppercase">{children}</h3>
            {subtitle && <div className="text-xs text-gray-500 mt-0.5">{subtitle}</div>}
        </div>
        {action && <div className="ml-4">{action}</div>}
    </div>
);

export interface CardContentProps {
    children: React.ReactNode;
    className?: string;
}

export const CardContent: React.FC<CardContentProps> = ({
    children,
    className = '',
}) => (
    <div className={`p-4 ${className}`}>
        {children}
    </div>
);

export interface CardFooterProps {
    children: React.ReactNode;
    className?: string;
}

export const CardFooter: React.FC<CardFooterProps> = ({
    children,
    className = '',
}) => (
    <div className={`px-4 py-3 border-t border-gray-800 bg-black/20 ${className}`}>
        {children}
    </div>
);

export default Card;
