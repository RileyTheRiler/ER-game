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
import { CharacterCreation } from './CharacterCreation';
import { IntroSequence } from './IntroSequence';
import { OrientationScene } from './OrientationScene';
import { useGameStore } from '@/store/gameStore';
import type { PlayerBackground, PersonalityAxes } from '@/types/character';

export const GameContainer: React.FC = () => {
    const { phase, setPhase } = useGameState();
    const createPlayer = useGameStore(state => state.createPlayer);

    // Prevent hydration mismatch by waiting for mount
    const [mounted, setMounted] = React.useState(false);
    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    // ============================================
    // HANDLERS
    // ============================================

    // New Game now goes to Character Creation instead of jumping into gameplay
    const handleNewGame = () => {
        setPhase('CHARACTER_CREATION');
    };

    // Called when character creation is complete
    const handleCharacterCreated = (name: string, background: PlayerBackground, personality: PersonalityAxes) => {
        createPlayer(name, background, personality);
        setPhase('INTRO_SEQUENCE');
    };

    // Called when intro sequence is complete or skipped
    const handleIntroComplete = () => {
        setPhase('ORIENTATION');
    };

    // Called when orientation is complete or skipped
    const handleOrientationComplete = () => {
        setPhase('SHIFT_START');
    };

    const handleContinue = () => {
        // Player already exists, skip intro and go straight to gameplay
        setPhase('SHIFT_START');
    };

    const handleOpenSettings = () => {
        setPhase('SETTINGS' as any);
    };

    const handleCloseSettings = () => {
        setPhase('MAIN_MENU');
    };

    const handleStartCpcExam = () => {
        setPhase('CPC_EXAM');
    };

    const handleExitGame = () => {
        setPhase('MAIN_MENU');
    };

    const handleDemoEnd = () => {
        setPhase('DEMO_END' as any);
    };

    // ============================================
    // RENDER BASED ON PHASE
    // ============================================

    if (phase === 'MAIN_MENU') {
        return (
            <MainMenu
                onNewGame={handleNewGame}
                onContinue={handleContinue}
                onSettings={handleOpenSettings}
                onCpcExam={handleStartCpcExam}
            />
        );
    }

    // Character Creation - first step of new game
    if (phase === 'CHARACTER_CREATION') {
        return (
            <CharacterCreation
                onComplete={handleCharacterCreated}
                onBack={() => setPhase('MAIN_MENU')}
            />
        );
    }

    // Intro Sequence - narrative introduction after character creation
    if (phase === 'INTRO_SEQUENCE') {
        return (
            <IntroSequence
                onComplete={handleIntroComplete}
                onSkip={handleIntroComplete}
            />
        );
    }

    // Orientation - tutorial and team introduction
    if (phase === 'ORIENTATION') {
        return (
            <OrientationScene
                onComplete={handleOrientationComplete}
                onSkip={handleOrientationComplete}
            />
        );
    }

    // Settings screen
    if ((phase as any) === 'SETTINGS') {
        return <SettingsScreen onBack={handleCloseSettings} />;
    }

    // Demo end screen
    if ((phase as any) === 'DEMO_END') {
        return <DemoEndScreen onReturnToMenu={handleExitGame} />;
    }

    // CPC Exam mode
    if (phase === 'CPC_EXAM') {
        return <CPCMode onExit={handleExitGame} />;
    }

    // Any gameplay-related phase is handled by ShiftManager
    if (['SHIFT_START', 'GAMEPLAY', 'BOARD', 'RELATIONSHIPS', 'PATIENT_ENCOUNTER', 'SKILL_CHECK', 'SHIFT_END'].includes(phase)) {
        return <ShiftManager onExitGame={handleDemoEnd} />;
    }

    // Fallback loading state
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

