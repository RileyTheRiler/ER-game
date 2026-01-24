// src/components/game/ShiftHUD.tsx
// Heads-up display shown during active shift

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useShift, usePlayer } from '@/hooks/useGameState';
import { Button } from '@/components/ui/Button';

// ============================================
// TYPES
// ============================================

export interface ShiftHUDProps {
    onOpenBoard?: () => void;
    onOpenRelationships?: () => void;
    onOpenMenu?: () => void;
    compact?: boolean;
    className?: string;
}

// ============================================
// MAIN COMPONENT
// ============================================

export const ShiftHUD: React.FC<ShiftHUDProps> = ({
    onOpenBoard,
    onOpenRelationships,
    onOpenMenu,
    compact = false,
    className = '',
}) => {
    const {
        shiftNumber,
        timeDisplay,
        shiftProgress,
        activeCaseCount,
        timeRemaining
    } = useShift();
    const { energy, stress } = usePlayer();

    // Time urgency coloring
    const isLowTime = shiftProgress > 80;
    const isCriticalTime = shiftProgress > 95;

    if (compact) {
        return (
            <div className={`flex items-center gap-4 ${className}`}>
                <Badge variant="info">Shift {shiftNumber}</Badge>
                <span className={`font-mono font-bold ${isLowTime ? 'text-amber-400' : 'text-white'}`}>
                    {timeDisplay}
                </span>
                <Badge variant={activeCaseCount > 2 ? 'warning' : 'neutral'}>
                    {activeCaseCount} cases
                </Badge>
            </div>
        );
    }

    return (
        <header className={`bg-gray-950/80 backdrop-blur-md border-b border-gray-800 z-40 relative ${className}`}>
            <div className="max-w-[1920px] mx-auto flex items-center justify-between px-6 py-2">

                {/* Left: Shift Info */}
                <div className="flex items-center gap-6">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Current Shift</span>
                        <div className="flex items-center gap-3">
                            <div className="text-xl font-bold text-white font-mono">{shiftNumber}</div>
                            <div className="h-4 w-px bg-gray-800"></div>
                            <motion.span
                                className={`
                                    text-xl font-mono font-bold tracking-tight
                                    ${isCriticalTime ? 'text-red-400 animate-pulse' :
                                        isLowTime ? 'text-amber-400' : 'text-cyan-50'}
                                `}
                            >
                                {timeDisplay}
                            </motion.span>
                        </div>
                    </div>

                    {/* Shift Progress Bar */}
                    <div className="w-48 hidden md:block">
                        <ProgressBar
                            value={480 - timeRemaining}
                            max={480}
                            variant="time"
                            size="sm"
                            label="Shift Time"
                        />
                    </div>
                </div>

                {/* Center: Active Cases Status */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="flex items-center gap-3 bg-gray-900/50 px-4 py-1.5 rounded-full border border-gray-800">
                        <span className="text-gray-500 text-xs font-bold uppercase tracking-wider">Active Board</span>
                        <Badge
                            variant={activeCaseCount > 3 ? 'danger' : activeCaseCount > 1 ? 'warning' : 'neutral'}
                            pulse={activeCaseCount > 3}
                            size="sm"
                        >
                            {activeCaseCount} CASES
                        </Badge>
                    </div>
                </div>

                {/* Right: Player Status & Quick Actions */}
                <div className="flex items-center gap-8">
                    {/* Energy & Stress */}
                    <div className="flex items-center gap-6">
                        <div className="flex flex-col w-24">
                            <div className="flex justify-between text-[10px] mb-0.5">
                                <span className={energy < 30 ? "text-red-400" : "text-cyan-400"}>ENERGY</span>
                                <span className="text-gray-500">{energy}%</span>
                            </div>
                            <ProgressBar
                                value={energy}
                                max={100}
                                variant="energy"
                                size="sm"
                                aria-label="Energy"
                            />
                        </div>

                        <div className="flex flex-col w-24">
                            <div className="flex justify-between text-[10px] mb-0.5">
                                <span className={stress > 70 ? "text-red-400" : "text-purple-400"}>STRESS</span>
                                <span className="text-gray-500">{stress}%</span>
                            </div>
                            <ProgressBar
                                value={stress}
                                max={100}
                                variant="stress"
                                size="sm"
                                aria-label="Stress"
                            />
                        </div>
                    </div>

                    {/* Quick Action Buttons */}
                    <div className="flex items-center gap-2 border-l border-gray-800 pl-6">
                        {onOpenBoard && (
                            <Button variant="ghost" size="icon" onClick={onOpenBoard} title="Diagnostic Board">
                                <span className="text-xl">🧠</span>
                            </Button>
                        )}
                        {onOpenRelationships && (
                            <Button variant="ghost" size="icon" onClick={onOpenRelationships} title="Relationships">
                                <span className="text-xl">👥</span>
                            </Button>
                        )}
                        {onOpenMenu && (
                            <Button variant="ghost" size="icon" onClick={onOpenMenu} title="System Menu">
                                <span className="text-xl">☰</span>
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default ShiftHUD;
