// src/hooks/useGameState.ts
// Custom hooks for accessing game state

import { useCallback, useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useGameStore } from '@/store/gameStore';
import type { SkillId } from '@/types';

// ============================================
// CORE GAME STATE HOOK
// ============================================

// Optimized selector for phase-only updates to prevent re-renders on every timer tick
export const useGamePhase = () => {
    return useGameStore(useShallow(state => ({
        phase: state.currentPhase,
        previousPhase: state.previousPhase,
        setPhase: state.setPhase,
    })));
};

export const useGameState = () => {
    // Use shallow comparison to prevent re-renders when unselected state changes
    return useGameStore(useShallow(store => ({
        // Phase
        phase: store.currentPhase,
        previousPhase: store.previousPhase,
        setPhase: store.setPhase,

        // Player
        player: store.player,

        // Shift
        shiftNumber: store.currentShiftNumber,
        timeRemaining: store.shiftTimeRemaining,
        activeCases: store.activeCases,

        // Board
        boardEntries: store.boardEntries,

        // Derived state
        isInShift: store.currentPhase !== 'MAIN_MENU' &&
            store.currentPhase !== 'CHARACTER_CREATION' &&
            store.currentShiftNumber > 0,
    })));
};

// ============================================
// PLAYER HOOKS
// ============================================

export const usePlayer = () => {
    const player = useGameStore(state => state.player);
    const updateSkill = useGameStore(state => state.updateSkill);
    const addLesson = useGameStore(state => state.addLesson);
    const updateEnergy = useGameStore(state => state.updateEnergy);
    const updateStress = useGameStore(state => state.updateStress);
    const addXP = useGameStore(state => state.addXP);

    const getSkillLevel = useCallback((skillId: SkillId): number => {
        return player?.skills[skillId] ?? 0;
    }, [player]);

    const hasLesson = useCallback((lessonId: string): boolean => {
        return player?.lessons.some(l => l.id === lessonId) ?? false;
    }, [player]);

    // Default empty skills for when player is null
    const safeSkills = useMemo(() => {
        if (player?.skills) return player.skills;
        // Return empty record with all skills at 0
        return {
            TRIAGE: 0, DIFFERENTIAL: 0, PATHOPHYSIOLOGY: 0, HISTORY: 0,
            PHYSICAL_EXAM: 0, PROCEDURE: 0, PHARMACOLOGY: 0, INTERPRETATION: 0,
            BEDSIDE: 0, EMPATHY: 0, COMMUNICATION: 0, HIERARCHY: 0,
            TEAMWORK: 0, ADVOCACY: 0, COMPOSURE: 0, INSTINCT: 0,
            DOUBT: 0, DRIVE: 0, MEMORY: 0, HUMANITY: 0,
        } as Record<SkillId, number>;
    }, [player?.skills]);

    return {
        player,
        skills: safeSkills,
        lessons: player?.lessons ?? [],
        energy: player?.energy ?? 100,
        stress: player?.stress ?? 0,
        xp: player?.totalXP ?? 0,
        background: player?.background,

        getSkillLevel,
        hasLesson,
        updateSkill,
        addLesson,
        updateEnergy,
        updateStress,
        addXP,
    };
};

// ============================================
// SKILL CHECK HOOK
// ============================================

export const useSkillCheck = () => {
    const player = useGameStore(state => state.player);
    const getSkillModifier = useGameStore(state => state.getSkillModifier);

    const getLessonBonuses = useMemo(() => {
        const bonuses: Partial<Record<SkillId, number>> = {};
        player?.lessons.forEach(lesson => {
            lesson.effects.forEach(effect => {
                if (effect.type === 'SKILL_BONUS') {
                    const skillId = effect.target as SkillId;
                    bonuses[skillId] = (bonuses[skillId] ?? 0) + (effect.value as number);
                }
            });
        });
        return bonuses;
    }, [player?.lessons]);

    return {
        playerSkills: player?.skills ?? {} as Record<SkillId, number>,
        lessonBonuses: getLessonBonuses,
        getModifier: getSkillModifier,
    };
};

// ============================================
// BOARD HOOK
// ============================================

export const useBoard = () => {
    const boardEntries = useGameStore(state => state.boardEntries);
    const maxSlots = useGameStore(state => state.maxBoardSlots);
    const addEntry = useGameStore(state => state.addBoardEntry);
    const removeEntry = useGameStore(state => state.removeBoardEntry);
    const pinEntry = useGameStore(state => state.pinBoardEntry);
    const unpinEntry = useGameStore(state => state.unpinBoardEntry);
    const linkEntries = useGameStore(state => state.linkBoardEntries);
    const clearUnpinned = useGameStore(state => state.clearUnpinnedEntries);
    const canAdd = useGameStore(state => state.canAddBoardEntry);
    const getPinned = useGameStore(state => state.getPinnedEntries);

    const symptoms = useMemo(() =>
        boardEntries.filter(e => e.type === 'SYMPTOM'),
        [boardEntries]
    );

    const differentials = useMemo(() =>
        boardEntries.filter(e => e.type === 'DIFFERENTIAL'),
        [boardEntries]
    );

    const lessons = useMemo(() =>
        boardEntries.filter(e => e.type === 'LESSON'),
        [boardEntries]
    );

    return {
        entries: boardEntries,
        maxSlots,
        symptoms,
        differentials,
        lessons,
        pinnedEntries: getPinned(),
        canAddEntry: canAdd(),

        addEntry,
        removeEntry,
        pinEntry,
        unpinEntry,
        linkEntries,
        clearUnpinned,
    };
};

// ============================================
// RELATIONSHIPS HOOK
// ============================================

export const useRelationships = () => {
    const relationships = useGameStore(state => state.relationships);
    const updateRelationship = useGameStore(state => state.updateRelationship);
    const initializeRelationship = useGameStore(state => state.initializeRelationship);

    const getRelationship = useCallback((npcId: string) => {
        return relationships[npcId] ?? null;
    }, [relationships]);

    const getProfessionalLevel = useCallback((npcId: string): number => {
        return relationships[npcId]?.professional ?? 0;
    }, [relationships]);

    const getPersonalLevel = useCallback((npcId: string): number => {
        return relationships[npcId]?.personal ?? 0;
    }, [relationships]);

    return {
        relationships,
        getRelationship,
        getProfessionalLevel,
        getPersonalLevel,
        updateRelationship,
        initializeRelationship,
    };
};

// ============================================
// SHIFT HOOK
// ============================================

export const useShift = () => {
    const shiftNumber = useGameStore(state => state.currentShiftNumber);
    const timeRemaining = useGameStore(state => state.shiftTimeRemaining);
    const activeCases = useGameStore(state => state.activeCases);
    const completedCases = useGameStore(state => state.completedCases);
    const startShift = useGameStore(state => state.startShift);
    const endShift = useGameStore(state => state.endShift);
    const advanceTime = useGameStore(state => state.advanceTime);
    const addCase = useGameStore(state => state.addCase);
    const completeCase = useGameStore(state => state.completeCase);

    const timeDisplay = useMemo(() => {
        const hours = Math.floor(timeRemaining / 60);
        const minutes = timeRemaining % 60;
        return `${hours}:${minutes.toString().padStart(2, '0')}`;
    }, [timeRemaining]);

    const shiftProgress = useMemo(() => {
        return ((480 - timeRemaining) / 480) * 100;
    }, [timeRemaining]);

    return {
        shiftNumber,
        timeRemaining,
        timeDisplay,
        shiftProgress,
        activeCases,
        completedCases,
        activeCaseCount: activeCases.length,
        completedCaseCount: completedCases.length,

        startShift,
        endShift,
        advanceTime,
        addCase,
        completeCase,
    };
};
