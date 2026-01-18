// src/components/game/SkillCheckDisplay.tsx
// Animated skill check display with dice roll

'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { SkillId, SkillCategory, Modifier } from '@/types/game';
import { skills } from '@/data/skills';
import { SkillBadge } from '@/components/ui/Badge';

// ============================================
// TYPES
// ============================================

export interface SkillCheckDisplayProps {
    skillId: SkillId;
    dc: number;
    modifiers: Modifier[];
    totalModifier: number;
    roll?: { dice: [number, number]; natural: number };
    finalResult?: number;
    success?: boolean;
    criticalType?: 'NONE' | 'SUCCESS' | 'FAILURE';
    narrativeResult?: string;
    phase: 'PREVIEW' | 'ROLLING' | 'RESULT';
    probability?: number;
    onRollComplete?: () => void;
}

// ============================================
// DICE COMPONENT
// ============================================

const Die: React.FC<{
    value: number;
    isRolling: boolean;
    delay?: number;
}> = ({ value, isRolling, delay = 0 }) => {
    const [displayValue, setDisplayValue] = useState(1);

    useEffect(() => {
        if (isRolling) {
            // Animate through random values
            const interval = setInterval(() => {
                setDisplayValue(Math.floor(Math.random() * 6) + 1);
            }, 50);

            // Stop after delay and show final value
            const timeout = setTimeout(() => {
                clearInterval(interval);
                setDisplayValue(value);
            }, 800 + delay);

            return () => {
                clearInterval(interval);
                clearTimeout(timeout);
            };
        } else {
            setDisplayValue(value);
        }
    }, [isRolling, value, delay]);

    // Pip positions for each die face
    const pipPositions: Record<number, string[]> = {
        1: ['center'],
        2: ['top-right', 'bottom-left'],
        3: ['top-right', 'center', 'bottom-left'],
        4: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
        5: ['top-left', 'top-right', 'center', 'bottom-left', 'bottom-right'],
        6: ['top-left', 'top-right', 'middle-left', 'middle-right', 'bottom-left', 'bottom-right'],
    };

    const positionClasses: Record<string, string> = {
        'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
        'top-left': 'top-1.5 left-1.5',
        'top-right': 'top-1.5 right-1.5',
        'middle-left': 'top-1/2 left-1.5 -translate-y-1/2',
        'middle-right': 'top-1/2 right-1.5 -translate-y-1/2',
        'bottom-left': 'bottom-1.5 left-1.5',
        'bottom-right': 'bottom-1.5 right-1.5',
    };

    return (
        <motion.div
            className="relative w-12 h-12 bg-white rounded-lg shadow-lg"
            animate={isRolling ? {
                rotate: [0, 180, 360],
                scale: [1, 1.1, 1],
            } : {}}
            transition={{
                duration: 0.5,
                repeat: isRolling ? Infinity : 0,
                ease: 'linear'
            }}
        >
            {pipPositions[displayValue]?.map((pos, i) => (
                <div
                    key={i}
                    className={`absolute w-2 h-2 rounded-full bg-gray-800 ${positionClasses[pos]}`}
                />
            ))}
        </motion.div>
    );
};

// ============================================
// MAIN SKILL CHECK DISPLAY
// ============================================

export const SkillCheckDisplay: React.FC<SkillCheckDisplayProps> = ({
    skillId,
    dc,
    modifiers,
    totalModifier,
    roll,
    finalResult,
    success,
    criticalType = 'NONE',
    narrativeResult,
    phase,
    probability,
    onRollComplete,
}) => {
    const skill = skills[skillId];
    const [showResult, setShowResult] = useState(false);

    useEffect(() => {
        if (phase === 'ROLLING' && roll) {
            // Delay showing result for dice animation
            const timeout = setTimeout(() => {
                setShowResult(true);
                onRollComplete?.();
            }, 1500);
            return () => clearTimeout(timeout);
        }
    }, [phase, roll, onRollComplete]);

    const getDCLabel = (dc: number): string => {
        if (dc <= 6) return 'Trivial';
        if (dc <= 8) return 'Easy';
        if (dc <= 10) return 'Moderate';
        if (dc <= 12) return 'Hard';
        if (dc <= 14) return 'Very Hard';
        if (dc <= 16) return 'Extreme';
        return 'Legendary';
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-900 border border-gray-700 rounded-xl p-6 max-w-md mx-auto"
        >
            {/* Header */}
            <div className="text-center mb-6">
                <SkillBadge category={skill.category}>{skill.category}</SkillBadge>
                <h3 className="text-xl font-bold text-white mt-2">{skill.name} Check</h3>
                <p className="text-sm text-gray-400 mt-1">
                    DC {dc} ({getDCLabel(dc)})
                </p>
            </div>

            {/* Preview Phase - Show odds */}
            {phase === 'PREVIEW' && probability !== undefined && (
                <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-cyan-400">
                        {Math.round(probability * 100)}%
                    </div>
                    <div className="text-gray-400 text-sm mt-1">
                        Chance of Success
                    </div>
                </div>
            )}

            {/* Dice Display */}
            {(phase === 'ROLLING' || phase === 'RESULT') && roll && (
                <div className="flex justify-center gap-4 mb-6">
                    <Die
                        value={roll.dice[0]}
                        isRolling={phase === 'ROLLING' && !showResult}
                        delay={0}
                    />
                    <Die
                        value={roll.dice[1]}
                        isRolling={phase === 'ROLLING' && !showResult}
                        delay={200}
                    />
                </div>
            )}

            {/* Modifiers */}
            <div className="space-y-2 mb-6 p-3 bg-gray-800/50 rounded-lg">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Natural Roll</span>
                    <span className="text-white font-mono">
                        {phase === 'PREVIEW' ? '2d6' : roll?.natural ?? '?'}
                    </span>
                </div>

                {modifiers.map((mod, i) => (
                    <div key={i} className="flex justify-between text-sm">
                        <span className="text-gray-400">{mod.source}</span>
                        <span className={`font-mono ${mod.value >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {mod.value >= 0 ? '+' : ''}{mod.value}
                        </span>
                    </div>
                ))}

                <div className="border-t border-gray-700 pt-2 mt-2 flex justify-between">
                    <span className="text-gray-300 font-medium">Total</span>
                    <span className="text-white font-bold font-mono">
                        {phase === 'PREVIEW'
                            ? `2d6 ${totalModifier >= 0 ? '+' : ''}${totalModifier}`
                            : finalResult ?? '?'}
                    </span>
                </div>
            </div>

            {/* Result */}
            <AnimatePresence>
                {phase === 'RESULT' && success !== undefined && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        {/* Critical indicator */}
                        {criticalType !== 'NONE' && (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className={`
                  text-sm font-bold uppercase tracking-wider mb-2
                  ${criticalType === 'SUCCESS' ? 'text-yellow-400' : 'text-red-400'}
                `}
                            >
                                {criticalType === 'SUCCESS' ? '★ CRITICAL SUCCESS ★' : '☠ CRITICAL FAILURE ☠'}
                            </motion.div>
                        )}

                        {/* Success/Failure */}
                        <motion.div
                            initial={{ scale: 0.5 }}
                            animate={{ scale: 1 }}
                            className={`
                text-3xl font-bold
                ${success ? 'text-green-400' : 'text-red-400'}
              `}
                        >
                            {success ? 'SUCCESS' : 'FAILURE'}
                        </motion.div>

                        {/* Narrative */}
                        {narrativeResult && (
                            <p className="text-gray-400 mt-3 text-sm italic">
                                {narrativeResult}
                            </p>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default SkillCheckDisplay;
