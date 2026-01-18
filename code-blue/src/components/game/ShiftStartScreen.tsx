// src/components/game/ShiftStartScreen.tsx
// Screen shown at the start of each shift

'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useShift, usePlayer } from '@/hooks/useGameState';

// ============================================
// TYPES
// ============================================

export interface ShiftStartScreenProps {
    onStart: () => void;
    className?: string;
}

// ============================================
// SHIFT INFO DATA
// ============================================

interface ShiftInfo {
    greeting: string;
    time: string;
    difficulty: 'Light' | 'Moderate' | 'Busy' | 'Chaotic';
    staffNote: string;
    expectedCases: string[];
}

const getShiftInfo = (shiftNumber: number): ShiftInfo => {
    const shifts: Record<number, ShiftInfo> = {
        1: {
            greeting: "Welcome to your first shift",
            time: "7:00 AM - 3:00 PM",
            difficulty: 'Light',
            staffNote: "Dr. Reyes will be your supervising resident. Maria is on as charge nurse.",
            expectedCases: ["Minor care", "Chest pain workups", "Observation holds"],
        },
        2: {
            greeting: "Day 1, Shift 2",
            time: "3:00 PM - 11:00 PM",
            difficulty: 'Moderate',
            staffNote: "Evening shift - things tend to pick up. Dr. Okonkwo is the attending.",
            expectedCases: ["Walk-ins", "Pediatric cases", "Psychiatric holds"],
        },
        3: {
            greeting: "Day 2, Morning",
            time: "7:00 AM - 3:00 PM",
            difficulty: 'Busy',
            staffNote: "Monday mornings are always busy. Weekend admits coming through.",
            expectedCases: ["Admits from observation", "Follow-ups", "New presentations"],
        },
    };

    return shifts[shiftNumber] || {
        greeting: `Shift ${shiftNumber}`,
        time: "8-hour shift",
        difficulty: 'Moderate',
        staffNote: "Check the board for assignments.",
        expectedCases: ["Various presentations"],
    };
};

const difficultyColors = {
    Light: 'text-green-400',
    Moderate: 'text-yellow-400',
    Busy: 'text-orange-400',
    Chaotic: 'text-red-400',
};

// ============================================
// MAIN COMPONENT
// ============================================

export const ShiftStartScreen: React.FC<ShiftStartScreenProps> = ({
    onStart,
    className = '',
}) => {
    const { shiftNumber } = useShift();
    const { energy, stress } = usePlayer();
    const [isReady, setIsReady] = useState(false);

    const info = getShiftInfo(shiftNumber);

    // Brief delay before allowing start
    useEffect(() => {
        const timer = setTimeout(() => setIsReady(true), 1500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`min-h-screen bg-gray-950 flex items-center justify-center p-6 ${className}`}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-2xl w-full"
            >
                {/* Header */}
                <div className="text-center mb-8">
                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-4xl font-bold text-white mb-2"
                    >
                        {info.greeting}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-cyan-400 text-xl"
                    >
                        County General Emergency Department
                    </motion.p>
                </div>

                {/* Shift Info Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 }}
                >
                    <Card variant="default" className="mb-6">
                        <CardContent className="space-y-6 pt-6">
                            {/* Time and Difficulty */}
                            <div className="flex justify-between items-center">
                                <div>
                                    <div className="text-gray-500 text-sm uppercase tracking-wider">Shift Time</div>
                                    <div className="text-white text-xl font-semibold">{info.time}</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-gray-500 text-sm uppercase tracking-wider">Expected</div>
                                    <div className={`text-xl font-semibold ${difficultyColors[info.difficulty]}`}>
                                        {info.difficulty}
                                    </div>
                                </div>
                            </div>

                            {/* Staff Note */}
                            <div className="p-4 bg-gray-800/50 rounded-lg border-l-4 border-cyan-600">
                                <p className="text-gray-300">{info.staffNote}</p>
                            </div>

                            {/* Expected Cases */}
                            <div>
                                <div className="text-gray-500 text-sm uppercase tracking-wider mb-2">
                                    Likely Presentations
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {info.expectedCases.map((caseType, i) => (
                                        <Badge key={i} variant="default">{caseType}</Badge>
                                    ))}
                                </div>
                            </div>

                            {/* Player Status */}
                            <div className="pt-4 border-t border-gray-700">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <div className="text-gray-500 text-sm">Energy</div>
                                        <div className="flex items-center gap-2">
                                            <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-green-500 rounded-full transition-all"
                                                    style={{ width: `${energy}%` }}
                                                />
                                            </div>
                                            <span className="text-green-400 text-sm font-mono">{energy}%</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-gray-500 text-sm">Stress</div>
                                        <div className="flex items-center gap-2">
                                            <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full transition-all ${stress > 70 ? 'bg-red-500' : stress > 40 ? 'bg-yellow-500' : 'bg-gray-500'
                                                        }`}
                                                    style={{ width: `${stress}%` }}
                                                />
                                            </div>
                                            <span className={`text-sm font-mono ${stress > 70 ? 'text-red-400' : stress > 40 ? 'text-yellow-400' : 'text-gray-400'
                                                }`}>
                                                {stress}%
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Start Button */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isReady ? 1 : 0.3 }}
                    className="text-center"
                >
                    <Button
                        size="lg"
                        onClick={onStart}
                        disabled={!isReady}
                        className="px-12"
                    >
                        {isReady ? 'Begin Shift' : 'Preparing...'}
                    </Button>

                    {shiftNumber === 1 && (
                        <p className="text-gray-500 text-sm mt-4">
                            Take a breath. You've got this.
                        </p>
                    )}
                </motion.div>
            </motion.div>
        </div>
    );
};

export default ShiftStartScreen;
