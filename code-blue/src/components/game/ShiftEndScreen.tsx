// src/components/game/ShiftEndScreen.tsx
// Screen shown at the end of each shift with summary

'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useShift, usePlayer, useBoard } from '@/hooks/useGameState';

// ============================================
// TYPES
// ============================================

export interface ShiftEndScreenProps {
    onContinue: () => void;
    onRest?: () => void;
    className?: string;
}

interface ShiftSummary {
    casesCompleted: number;
    xpEarned: number;
    lessonsLearned: string[];
    relationshipChanges: { npc: string; delta: number }[];
    boardEntriesAdded: number;
    shiftRating: 'STRUGGLING' | 'LEARNING' | 'COMPETENT' | 'IMPRESSIVE';
}

// ============================================
// RATING DISPLAY
// ============================================

const ratingInfo: Record<ShiftSummary['shiftRating'], {
    label: string;
    color: string;
    message: string;
}> = {
    STRUGGLING: {
        label: 'Struggling',
        color: 'text-red-400',
        message: "Tough shift. But you're still here. That counts for something.",
    },
    LEARNING: {
        label: 'Learning',
        color: 'text-yellow-400',
        message: "You're starting to find your footing. Keep asking questions.",
    },
    COMPETENT: {
        label: 'Competent',
        color: 'text-green-400',
        message: "Solid shift. You're becoming someone they can count on.",
    },
    IMPRESSIVE: {
        label: 'Impressive',
        color: 'text-cyan-400',
        message: "Outstanding work. People are starting to notice.",
    },
};

// ============================================
// MAIN COMPONENT
// ============================================

export const ShiftEndScreen: React.FC<ShiftEndScreenProps> = ({
    onContinue,
    onRest,
    className = '',
}) => {
    const { shiftNumber, completedCaseCount } = useShift();
    const { xp, energy, stress, lessons } = usePlayer();
    const { entries } = useBoard();

    const [showDetails, setShowDetails] = useState(false);

    // Calculate shift summary (in a real implementation this would come from the store)
    const summary: ShiftSummary = {
        casesCompleted: completedCaseCount,
        xpEarned: xp, // Would track delta
        lessonsLearned: lessons.slice(-2).map(l => l.name), // Recent lessons
        relationshipChanges: [], // Would come from events
        boardEntriesAdded: entries.length,
        shiftRating: completedCaseCount >= 3 ? 'COMPETENT' :
            completedCaseCount >= 1 ? 'LEARNING' : 'STRUGGLING',
    };

    const rating = ratingInfo[summary.shiftRating];

    // Reveal details with delay
    useEffect(() => {
        const timer = setTimeout(() => setShowDetails(true), 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`min-h-screen bg-gray-950 flex items-center justify-center p-6 ${className}`}>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="max-w-2xl w-full"
            >
                {/* Header */}
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-center mb-8"
                >
                    <h1 className="text-3xl font-bold text-white mb-2">
                        Shift {shiftNumber} Complete
                    </h1>
                    <p className="text-gray-400">
                        You made it through another one.
                    </p>
                </motion.div>

                {/* Rating */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-center mb-8"
                >
                    <div className={`text-5xl font-bold ${rating.color} mb-2`}>
                        {rating.label}
                    </div>
                    <p className="text-gray-400 italic">{rating.message}</p>
                </motion.div>

                {/* Summary Card */}
                <AnimatePresence>
                    {showDetails && (
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <Card variant="default" className="mb-6">
                                <CardHeader>
                                    <h2 className="text-white font-semibold">Shift Summary</h2>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {/* Stats Grid */}
                                    <div className="grid grid-cols-3 gap-4 text-center">
                                        <div className="p-3 bg-gray-800/50 rounded-lg">
                                            <div className="text-2xl font-bold text-cyan-400">
                                                {summary.casesCompleted}
                                            </div>
                                            <div className="text-gray-500 text-sm">Cases</div>
                                        </div>
                                        <div className="p-3 bg-gray-800/50 rounded-lg">
                                            <div className="text-2xl font-bold text-green-400">
                                                +{summary.xpEarned}
                                            </div>
                                            <div className="text-gray-500 text-sm">XP</div>
                                        </div>
                                        <div className="p-3 bg-gray-800/50 rounded-lg">
                                            <div className="text-2xl font-bold text-purple-400">
                                                {summary.boardEntriesAdded}
                                            </div>
                                            <div className="text-gray-500 text-sm">Board Items</div>
                                        </div>
                                    </div>

                                    {/* Lessons Learned */}
                                    {summary.lessonsLearned.length > 0 && (
                                        <div className="p-4 bg-green-900/20 border border-green-700 rounded-lg">
                                            <div className="text-green-400 font-medium mb-2">
                                                📚 Lessons Learned
                                            </div>
                                            <div className="space-y-1">
                                                {summary.lessonsLearned.map((lesson, i) => (
                                                    <div key={i} className="text-gray-300 text-sm">
                                                        • {lesson}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Player State */}
                                    <div className="pt-4 border-t border-gray-700">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-400">Energy remaining</span>
                                            <span className={energy < 30 ? 'text-red-400' : 'text-gray-300'}>
                                                {energy}%
                                            </span>
                                        </div>
                                        <div className="flex justify-between text-sm mt-2">
                                            <span className="text-gray-400">Current stress</span>
                                            <span className={stress > 70 ? 'text-red-400' : 'text-gray-300'}>
                                                {stress}%
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Actions */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: showDetails ? 1 : 0 }}
                    className="flex gap-4 justify-center"
                >
                    {onRest && energy < 50 && (
                        <Button variant="secondary" onClick={onRest}>
                            Rest Before Next Shift
                        </Button>
                    )}
                    <Button onClick={onContinue}>
                        {shiftNumber >= 3 ? 'Continue Story' : 'Next Shift'}
                    </Button>
                </motion.div>

                {/* Encouraging Note */}
                {energy < 30 && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5 }}
                        className="text-center text-gray-500 text-sm mt-6"
                    >
                        You're running on empty. Consider resting.
                    </motion.p>
                )}
            </motion.div>
        </div>
    );
};

export default ShiftEndScreen;
