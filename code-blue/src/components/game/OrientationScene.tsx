// src/components/game/OrientationScene.tsx
// Brief orientation tutorial introducing key staff and ER overview

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { usePlayer } from '@/hooks/useGameState';

// ============================================
// TYPES
// ============================================

export interface OrientationSceneProps {
    onComplete: () => void;
    onSkip?: () => void;
}

interface StaffMember {
    id: string;
    name: string;
    role: string;
    description: string;
    icon: string;
    quote: string;
    tip: string;
}

// ============================================
// DATA
// ============================================

const KEY_STAFF: StaffMember[] = [
    {
        id: 'maria',
        name: 'Maria Santos, RN',
        role: 'Charge Nurse • 20 Years',
        description: 'Runs the department. Attendings know it.',
        icon: '👩‍⚕️',
        quote: '"Doctor, I\'ve been a nurse longer than you\'ve been alive. Would you like my opinion?"',
        tip: 'Listen to Maria. She\'ll save you—if you respect her.',
    },
    {
        id: 'okonkwo',
        name: 'Dr. Rachel Okonkwo',
        role: 'Attending Physician',
        description: 'The mentor who notices everything.',
        icon: '🩺',
        quote: '"What does that heart rate tell you? No—don\'t guess. What does it *tell* you?"',
        tip: 'She won\'t give you answers. She\'ll make you find them.',
    },
    {
        id: 'priya',
        name: 'Dr. Priya Sharma',
        role: 'PGY-2 Resident',
        description: 'Ambitious, competitive, sharp.',
        icon: '📋',
        quote: '"I don\'t have time for people who can\'t keep up."',
        tip: 'She\'ll help you—if it doesn\'t cost her.',
    },
    {
        id: 'ben',
        name: 'Dr. Ben Okafor',
        role: 'PGY-1 Intern',
        description: 'Only one year ahead of you.',
        icon: '💊',
        quote: '"I\'ll tell you the secret: always make friends with the nurses."',
        tip: 'He remembers being where you are.',
    },
];

const ER_AREAS = [
    { name: 'Trauma Bay', description: 'The most critical cases. Controlled chaos.', icon: '🚨' },
    { name: 'Fast Track', description: 'Minor injuries. High volume, quick turnover.', icon: '⚡' },
    { name: 'Resus', description: 'Where codes happen. Don\'t freeze.', icon: '💓' },
    { name: 'Observation', description: 'Holding pattern. Not sick enough to admit, not well enough to go.', icon: '👁️' },
];

// ============================================
// COMPONENT
// ============================================

export const OrientationScene: React.FC<OrientationSceneProps> = ({ onComplete, onSkip }) => {
    const { player } = usePlayer();
    const [phase, setPhase] = useState<'staff' | 'areas' | 'ready'>('staff');
    const [selectedStaff, setSelectedStaff] = useState<string | null>(null);

    const handleContinue = () => {
        if (phase === 'staff') setPhase('areas');
        else if (phase === 'areas') setPhase('ready');
        else onComplete();
    };

    const handleSkip = () => {
        if (onSkip) onSkip();
        else onComplete();
    };

    return (
        <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-6 relative overflow-hidden text-white scanline">
            {/* Background Atmosphere */}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none mix-blend-overlay" />
            <div className="absolute inset-0 bg-radial-vignette pointer-events-none" />

            {/* Skip Button */}
            <div className="absolute top-6 right-6 z-20">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSkip}
                    className="text-gray-600 hover:text-gray-400"
                >
                    Skip
                </Button>
            </div>

            {/* Content */}
            <div className="z-10 w-full max-w-4xl">
                <AnimatePresence mode="wait">
                    {/* Staff Introduction */}
                    {phase === 'staff' && (
                        <motion.div
                            key="staff"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-6"
                        >
                            <div className="text-center mb-8">
                                <h2 className="text-2xl font-bold text-cyan-400 tracking-wide mb-2">
                                    THE TEAM
                                </h2>
                                <p className="text-gray-500 text-sm">
                                    Click on each person to learn about them
                                </p>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {KEY_STAFF.map((staff) => (
                                    <motion.div
                                        key={staff.id}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Card
                                            className={`cursor-pointer text-center p-4 transition-all h-full ${selectedStaff === staff.id
                                                    ? 'border-cyan-500 bg-cyan-950/30'
                                                    : 'hover:border-gray-600'
                                                }`}
                                            onClick={() => setSelectedStaff(selectedStaff === staff.id ? null : staff.id)}
                                        >
                                            <span className="text-4xl mb-2 block">{staff.icon}</span>
                                            <p className="font-semibold text-sm text-white">{staff.name.split(',')[0]}</p>
                                            <p className="text-xs text-gray-500">{staff.role}</p>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Selected staff detail */}
                            <AnimatePresence>
                                {selectedStaff && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                    >
                                        <Card className="p-4 bg-gray-900/50 mt-2">
                                            {(() => {
                                                const staff = KEY_STAFF.find(s => s.id === selectedStaff);
                                                if (!staff) return null;
                                                return (
                                                    <div className="space-y-3">
                                                        <div>
                                                            <p className="font-semibold text-white">{staff.name}</p>
                                                            <p className="text-gray-400 text-sm">{staff.description}</p>
                                                        </div>
                                                        <blockquote className="italic text-cyan-400 border-l-2 border-cyan-700 pl-3">
                                                            {staff.quote}
                                                        </blockquote>
                                                        <p className="text-amber-400/80 text-sm">
                                                            💡 {staff.tip}
                                                        </p>
                                                    </div>
                                                );
                                            })()}
                                        </Card>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="flex justify-center mt-8">
                                <Button variant="primary" size="lg" onClick={handleContinue}>
                                    Continue →
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {/* ER Areas */}
                    {phase === 'areas' && (
                        <motion.div
                            key="areas"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-6"
                        >
                            <div className="text-center mb-8">
                                <h2 className="text-2xl font-bold text-cyan-400 tracking-wide mb-2">
                                    THE DEPARTMENT
                                </h2>
                                <p className="text-gray-500 text-sm">
                                    Know your terrain
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {ER_AREAS.map((area, idx) => (
                                    <motion.div
                                        key={area.name}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                    >
                                        <Card className="p-4 h-full">
                                            <div className="flex items-start gap-3">
                                                <span className="text-2xl">{area.icon}</span>
                                                <div>
                                                    <p className="font-semibold text-white">{area.name}</p>
                                                    <p className="text-gray-400 text-sm">{area.description}</p>
                                                </div>
                                            </div>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="flex justify-center mt-8">
                                <Button variant="primary" size="lg" onClick={handleContinue}>
                                    Continue →
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {/* Ready Screen */}
                    {phase === 'ready' && (
                        <motion.div
                            key="ready"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-center space-y-8"
                        >
                            <motion.div
                                initial={{ y: 20 }}
                                animate={{ y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <div className="text-6xl mb-4">🏥</div>
                                <h2 className="text-3xl font-bold text-white mb-2">
                                    Welcome to County General
                                </h2>
                                <p className="text-gray-400 max-w-md mx-auto">
                                    Your first shift awaits. Trust your training. Learn from your mistakes.
                                    <span className="text-cyan-400"> Everyone does.</span>
                                </p>
                            </motion.div>

                            <Card className="max-w-md mx-auto p-4 bg-gray-900/50 text-left">
                                <p className="text-amber-400/80 text-sm mb-3">💡 Remember:</p>
                                <ul className="text-gray-400 text-sm space-y-2">
                                    <li>• <span className="text-white">ABC</span> — Airway, Breathing, Circulation</li>
                                    <li>• <span className="text-white">Ask for help</span> — That's what residents are for</li>
                                    <li>• <span className="text-white">Listen to nurses</span> — They know more than you</li>
                                    <li>• <span className="text-white">Failure teaches</span> — Every mistake is a lesson</li>
                                </ul>
                            </Card>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                <Button variant="medical" size="lg" onClick={handleContinue}>
                                    BEGIN SHIFT 1
                                </Button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default OrientationScene;
