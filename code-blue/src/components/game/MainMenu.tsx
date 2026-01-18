// src/components/game/MainMenu.tsx
// Main entry point for the game

'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { useGameState, usePlayer, useShift } from '@/hooks/useGameState';

// ============================================
// TYPES
// ============================================

export interface MainMenuProps {
    onNewGame: () => void;
    onContinue: () => void;
    onSettings: () => void;
    onCpcExam?: () => void;
    className?: string;
}

// ============================================
// MAIN COMPONENT
// ============================================

export const MainMenu: React.FC<MainMenuProps> = ({
    onNewGame,
    onContinue,
    onSettings,
    onCpcExam,
    className = '',
}) => {
    const { player } = usePlayer();
    const { shiftNumber } = useShift();
    const [hasSave, setHasSave] = useState(false);

    // Check for save data on mount
    useEffect(() => {
        if (player && shiftNumber > 0) {
            setHasSave(true);
        }
    }, [player, shiftNumber]);

    return (
        <div className={`min-h-screen bg-gray-950 flex flex-col items-center justify-center p-6 relative overflow-hidden text-white scanline ${className}`}>

            {/* Background Atmosphere */}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none mix-blend-overlay"></div>
            <div className="absolute inset-0 bg-radial-vignette pointer-events-none"></div>

            {/* EKG Line Background Animation */}
            <div className="absolute top-1/2 left-0 w-full h-32 -translate-y-1/2 opacity-10 pointer-events-none">
                <svg viewBox="0 0 1200 120" className="w-full h-full stroke-cyan-500 fill-none stroke-2">
                    <motion.path
                        d="M0,60 L200,60 L210,50 L220,70 L230,60 L300,60 L310,20 L320,100 L330,60 L400,60 L410,50 L420,70 L430,60 L500,60 L510,20 L520,100 L530,60 L1200,60"
                        initial={{ pathLength: 0, x: -1200 }}
                        animate={{ pathLength: 1, x: 0 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />
                </svg>
            </div>

            {/* Content */}
            <div className="z-10 max-w-md w-full text-center">
                {/* Title */}
                <motion.div
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="mb-12 relative"
                >
                    <div className="absolute -inset-4 bg-cyan-500/10 blur-3xl rounded-full"></div>
                    <h1 className="relative text-7xl font-bold font-mono tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">
                        CODE BLUE
                    </h1>
                    <div className="h-0.5 w-32 mx-auto bg-gradient-to-r from-transparent via-cyan-500 to-transparent mt-2 mb-4" />
                    <p className="text-gray-400 text-sm uppercase tracking-[0.3em] font-medium">
                        Emergency Medicine RPG
                    </p>
                </motion.div>

                {/* Menu Options */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="space-y-4"
                >
                    {hasSave && (
                        <Button
                            variant="primary"
                            size="lg"
                            className="w-full py-6 text-lg tracking-widest font-bold shadow-cyan-500/20"
                            onClick={onContinue}
                        >
                            CONTINUE SHIFT {shiftNumber}
                        </Button>
                    )}

                    <Button
                        variant={hasSave ? 'secondary' : 'medical'} // Use new 'medical' variant for splashy new game
                        size="lg"
                        className="w-full py-6 text-lg tracking-widest font-bold"
                        onClick={onNewGame}
                    >
                        NEW GAME
                    </Button>

                    <div className="grid grid-cols-2 gap-4">
                        <Button
                            variant="outline"
                            className="w-full py-4 tracking-wider"
                            onClick={() => onCpcExam && onCpcExam()}
                        >
                            CPC EXAM MODE
                        </Button>

                        <Button
                            variant="outline"
                            className="w-full py-4 tracking-wider"
                            onClick={onSettings}
                        >
                            SETTINGS
                        </Button>
                    </div>

                    <div className="pt-12 text-gray-700 text-[10px] uppercase tracking-widest">
                        <p>v0.1.0 Pre-Alpha • DeepMind Advanced Agentic Coding</p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default MainMenu;
