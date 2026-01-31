// src/components/game/CPCMode.tsx
// Rapid-fire diagnostic exam mode

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useSound } from '@/hooks/useSound';
import { useGameStore } from '@/store/gameStore';

// ============================================
// TYPES & DATA
// ============================================

interface MiniCase {
    id: string;
    complaint: string;
    age: number;
    sex: 'M' | 'F';
    vitals: string; // e.g. "BP 80/50, HR 120"
    finding: string;
    answer: string;
    options: string[];
}

const CASES: MiniCase[] = [
    {
        id: 'c1',
        complaint: 'Crushing chest pain -> L arm',
        age: 55, sex: 'M',
        vitals: 'BP 160/90, HR 110, O2 94%',
        finding: 'EKG: ST Elevation in II, III, aVF',
        answer: 'Inferior STEMI',
        options: ['Inferior STEMI', 'Anterior STEMI', 'Pericarditis', 'GERD']
    },
    {
        id: 'c2',
        complaint: 'Sudden SOB, pleuritic pain',
        age: 28, sex: 'F',
        vitals: 'BP 110/70, HR 125, O2 88%',
        finding: 'Hx: Oral Contraceptives + Long Flight',
        answer: 'Pulmonary Embolism',
        options: ['Pulmonary Embolism', 'Pneumothorax', 'Pneumonia', 'Panic Attack']
    },
    {
        id: 'c3',
        complaint: 'Tearing back pain',
        age: 72, sex: 'M',
        vitals: 'BP 210/110, HR 100',
        finding: 'CXR: Widened Mediastinum',
        answer: 'Aortic Dissection',
        options: ['Aortic Dissection', 'MI', 'Muscle Strain', 'Cauda Equina']
    },
    {
        id: 'c4',
        complaint: 'RLQ Pain, Fever',
        age: 12, sex: 'M',
        vitals: 'Temp 38.5, HR 110',
        finding: 'McBurney\'s Point Tenderness',
        answer: 'Appendicitis',
        options: ['Appendicitis', 'Gastroenteritis', 'Testicular Torsion', 'Constipation']
    },
    {
        id: 'c5',
        complaint: 'Thunderclap Headache',
        age: 45, sex: 'F',
        vitals: 'BP 150/90',
        finding: 'CT Head: Stellate Pattern in Cisterns',
        answer: 'Subarachnoid Hemorrhage',
        options: ['Subarachnoid Hemorrhage', 'Migraine', 'Meningitis', 'Stroke']
    },
    {
        id: "c6",
        complaint: "Epigastric pain -> Back",
        age: 50, sex: "M",
        vitals: "HR 110, BP 130/80",
        finding: "Lipase > 3x Upper Limit Normal",
        answer: "Acute Pancreatitis",
        options: ["Acute Pancreatitis", "Cholecystitis", "Gastritis", "Peptic Ulcer"]
    }
];

export interface CPCModeProps {
    onExit: () => void;
    className?: string;
}

// ============================================
// COMPONENT
// ============================================

export const CPCMode: React.FC<CPCModeProps> = ({
    onExit,
    className = '',
}) => {
    const { play } = useSound();
    const { highScore, checkHighScore } = useGameStore();

    const [gameState, setGameState] = useState<'START' | 'PLAYING' | 'GAME_OVER'>('START');
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(60);
    const [currentCase, setCurrentCase] = useState<MiniCase | null>(null);
    const [streak, setStreak] = useState(0);
    const [feedback, setFeedback] = useState<'CORRECT' | 'WRONG' | null>(null);

    // Timer
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (gameState === 'PLAYING' && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        setGameState('GAME_OVER');
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [gameState, timeLeft]);

    const startGame = () => {
        setScore(0);
        setStreak(0);
        setTimeLeft(60);
        setGameState('PLAYING');
        nextCase();
        play('CLICK'); // Reuse sound
    };

    const nextCase = useCallback(() => {
        const randomIndex = Math.floor(Math.random() * CASES.length);
        // Shuffle options too? For now, static hardcoded options
        setCurrentCase(CASES[randomIndex]);
        setFeedback(null);
    }, []);

    const handleAnswer = (option: string) => {
        if (!currentCase || feedback) return;

        if (option === currentCase.answer) {
            // Correct
            const points = 100 + (streak * 10);
            setScore(prev => prev + points);
            setStreak(prev => prev + 1);
            setTimeLeft(prev => Math.min(prev + 5, 60)); // Add 5s cap at 60
            setFeedback('CORRECT');
            play('SUCCESS');

            setTimeout(nextCase, 800);
        } else {
            // Wrong
            setStreak(0);
            setTimeLeft(prev => Math.max(0, prev - 10)); // Penalty
            setFeedback('WRONG');
            play('ERROR');

            setTimeout(nextCase, 800);
        }
    };

    const handleExit = () => {
        checkHighScore(score);
        onExit();
    };

    // Render Start Screen
    if (gameState === 'START') {
        return (
            <div className={`min-h-screen bg-gray-900 flex flex-col items-center justify-center p-6 ${className}`}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md w-full text-center space-y-8"
                >
                    <h1 className="text-4xl font-bold font-mono text-cyan-400 mb-2">
                        CPC EXAM MODE
                    </h1>
                    <p className="text-gray-400">
                        Rapid-fire diagnostics. +5s for correct answers. -10s for wrong.
                    </p>

                    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                        <div className="text-sm text-gray-500 uppercase tracking-wider mb-1">High Score</div>
                        <div className="text-3xl font-mono text-white">{highScore}</div>
                    </div>

                    <div className="flex gap-4">
                        <Button variant="secondary" onClick={onExit} className="flex-1">Back</Button>
                        <Button variant="primary" onClick={startGame} className="flex-1 font-bold text-lg">START EXAM</Button>
                    </div>
                </motion.div>
            </div>
        );
    }

    // Render Game Over
    if (gameState === 'GAME_OVER') {
        return (
            <div className={`min-h-screen bg-gray-900 flex flex-col items-center justify-center p-6 ${className}`}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-md w-full text-center space-y-8"
                >
                    <h1 className="text-5xl font-bold text-red-500 mb-2">TIME&apos;S UP</h1>

                    <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
                        <div className="mb-6">
                            <div className="text-sm text-gray-500 uppercase tracking-wider mb-1">Final Score</div>
                            <div className="text-6xl font-mono text-white font-bold">{score}</div>
                        </div>

                        {score > highScore && (
                            <div className="inline-block bg-yellow-500/20 text-yellow-400 px-4 py-2 rounded-full font-bold animate-pulse">
                                NEW HIGH SCORE!
                            </div>
                        )}
                    </div>

                    <div className="flex gap-4">
                        <Button variant="secondary" onClick={handleExit} className="flex-1">Exit</Button>
                        <Button variant="primary" onClick={startGame} className="flex-1">Retry</Button>
                    </div>
                </motion.div>
            </div>
        );
    }

    // Render Playing
    return (
        <div className={`min-h-screen bg-gray-950 flex flex-col p-6 ${className}`}>
            {/* HUD */}
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-4">
                    <div className="text-2xl font-bold text-cyan-400">CPC EXAM</div>
                    <Badge variant={streak > 2 ? 'warning' : 'default'}>Streak: {streak}</Badge>
                </div>

                <div className="flex items-center gap-6">
                    <div className="text-xl font-mono">
                        Score: <span className="text-white">{score}</span>
                    </div>
                    <div className="w-32">
                        <ProgressBar
                            value={timeLeft}
                            max={60}
                            variant={timeLeft < 10 ? 'stress' : 'time'}
                            size="lg" // Now works
                            showLabel={false}
                            aria-label="Time Remaining"
                        />
                    </div>
                </div>
            </div>

            {/* Main Game Area */}
            <div className="flex-1 flex items-center justify-center">
                <AnimatePresence mode="wait">
                    {currentCase && (
                        <motion.div
                            key={currentCase.id}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.2 }}
                            className="max-w-2xl w-full"
                        >
                            {/* Question Card */}
                            <Card className="mb-6 border-cyan-500/30">
                                <CardContent className="p-8 space-y-6">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <div className="text-gray-400 text-sm mb-1">Patient</div>
                                            <div className="text-xl text-white font-medium">{currentCase.age}yo {currentCase.sex}</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-gray-400 text-sm mb-1">Vitals</div>
                                            <div className="text-red-300 font-mono">{currentCase.vitals}</div>
                                        </div>
                                    </div>

                                    <div className="bg-gray-900/50 p-4 rounded-lg border-l-4 border-cyan-500">
                                        <div className="text-sm text-cyan-400 mb-1">Chief Complaint</div>
                                        <div className="text-2xl text-white font-bold">{currentCase.complaint}</div>
                                    </div>

                                    <div>
                                        <div className="text-sm text-yellow-500 mb-1">Key Finding</div>
                                        <div className="text-lg text-gray-200">{currentCase.finding}</div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Options */}
                            <div className="grid grid-cols-2 gap-4">
                                {currentCase.options.map((option) => (
                                    <button
                                        key={option}
                                        onClick={() => handleAnswer(option)}
                                        disabled={!!feedback}
                                        className={`
                                        p-6 rounded-xl border-2 text-left transition-all
                                        ${feedback
                                                ? option === currentCase.answer
                                                    ? 'bg-green-500/20 border-green-500 text-green-100'
                                                    : option === feedback && feedback === 'WRONG' // if this was the clicked wrong one? No, we don't track clicked selection easily here without more state.
                                                        ? 'opacity-50 border-gray-700' // Simplify logic: just highlight correct one
                                                        : 'opacity-50 border-gray-700'
                                                : 'bg-gray-800 border-gray-700 hover:border-cyan-500 hover:bg-gray-750 text-white'
                                            }
                                    `}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Feedback Overlay */}
            <AnimatePresence>
                {feedback && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className={`
                        fixed inset-0 flex items-center justify-center pointer-events-none z-50
                    `}
                    >
                        <div className={`
                        text-6xl font-black tracking-tighter transform -rotate-12 border-4 px-8 py-4 rounded-xl shadow-2xl
                        ${feedback === 'CORRECT'
                                ? 'bg-green-500 text-white border-white rotate-[-5deg]'
                                : 'bg-red-500 text-white border-white rotate-[5deg]'}
                    `}>
                            {feedback === 'CORRECT' ? 'CORRECT!' : 'MISSED!'}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CPCMode;
