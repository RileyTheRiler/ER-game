// src/components/game/GameContainer.tsx
// Top-level game orchestrator

'use client';

import React, { useEffect } from 'react';
import { useGameState, usePlayer } from '@/hooks/useGameState';
import { MainMenu } from './MainMenu';
import { SettingsScreen } from './SettingsScreen';
import { ShiftManager } from './ShiftManager';
import { DemoEndScreen } from './DemoEndScreen';
import { CPCMode } from './CPCMode';
import { useGameStore } from '@/store/gameStore';

export const GameContainer: React.FC = () => {
    const { phase, setPhase } = useGameState();
    const createPlayer = useGameStore(state => state.createPlayer);

    // Prevent hydration mismatch by waiting for mount
    const [mounted, setMounted] = React.useState(false);
    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    // Handlers
    const handleNewGame = () => {
        // Create default player for now (Character Creation is next phase if needed)
        createPlayer(
            "Dr. Candidate",
            "LATE_BLOOMER",
            { confidence: 0, approach: 0, outlook: 0 }
        );
        setPhase('SHIFT_START');
    };

    const handleContinue = () => {
        // Persistence handles loading, just switch phase
        setPhase('SHIFT_START'); // Updated phase
    };

    const handleOpenSettings = () => {
        // We don't really have a SETTINGS phase, but let's fake it or use MainMenu
        // For simplicity, let's say MainMenu handles it, or we add a phase
        // Let's rely on local state for settings if it's overlay, 
        // BUT since we made a full screen component, let's treat it as a pseudo-phase
        // or just swap component here.
        setPhase('SETTINGS' as any); // Type cast until we add SETTINGS to GamePhase
    };

    const handleCloseSettings = () => {
        setPhase('MAIN_MENU');
    };

    // Added handleStartCpcExam
    const handleStartCpcExam = () => {
        setPhase('CPC_EXAM');
    };

    const handleExitGame = () => {
        setPhase('MAIN_MENU');
    };

    const handleDemoEnd = () => {
        setPhase('DEMO_END' as any); // Add to types later
    };

    // Render based on Phase

    if (phase === 'MAIN_MENU') {
        return (
            <MainMenu
                onNewGame={handleNewGame}
                onContinue={handleContinue}
                onSettings={handleOpenSettings}
                onCpcExam={handleStartCpcExam} // Added onCpcExam prop
            />
        );
    }

    // Temporary until we add SETTINGS to GamePhase type properly
    if ((phase as any) === 'SETTINGS') {
        return <SettingsScreen onBack={handleCloseSettings} />;
    }

    if ((phase as any) === 'DEMO_END') {
        return <DemoEndScreen onReturnToMenu={handleExitGame} />;
    }

    // Added CPC_EXAM phase rendering
    if (phase === 'CPC_EXAM') {
        return <CPCMode onExit={handleExitGame} />;
    }

    // Any gameplay-related phase is handled by ShiftManager
    // SHIFT_START, GAMEPLAY, PATIENT_ENCOUNTER, etc.
    if (['SHIFT_START', 'GAMEPLAY', 'BOARD', 'RELATIONSHIPS', 'PATIENT_ENCOUNTER', 'SKILL_CHECK', 'SHIFT_END'].includes(phase)) {
        // Pass handleDemoEnd if ShiftManager triggers it (e.g. after shift end screen)
        return <ShiftManager onExitGame={handleDemoEnd} />; // ShiftManager onExitGame actually used for "Continue" from shift end? We need to check ShiftManager props.
    }

    // Fallback
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white scanline relative overflow-hidden">
            {/* Atmosphere layers */}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none mix-blend-overlay"></div>
            <div className="absolute inset-0 bg-radial-vignette pointer-events-none"></div>

            <div className="z-10 flex flex-col items-center gap-4">
                <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
                <span className="text-cyan-500 font-mono text-sm tracking-widest uppercase">Initializing System...</span>
            </div>
        </div>
    );
};

export default GameContainer;
