// src/store/gameStore.ts
// Main game state management with Zustand + Immer

import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools, persist } from 'zustand/middleware';
import type {
    GamePhase,
    PlayerSkills,
    Lesson,
    SkillId,
} from '@/types/game';
import type {
    PlayerCharacter,
    PlayerBackground,
    PersonalityAxes,
    Relationship,
    RelationshipChange,
} from '@/types/character';
import { BackgroundBonuses } from '@/types/character';
import type {
    PatientCase,
    BoardEntry,
} from '@/types/medical';
import { v4 as uuid } from 'uuid';

// ============================================
// INITIAL STATE
// ============================================

const createInitialSkills = (background?: PlayerBackground): PlayerSkills => {
    const skills: PlayerSkills = {
        // Clinical
        TRIAGE: 0,
        DIFFERENTIAL: 0,
        PATHOPHYSIOLOGY: 0,
        HISTORY: 0,
        PHYSICAL_EXAM: 0,
        PROCEDURE: 0,
        PHARMACOLOGY: 0,
        INTERPRETATION: 0,
        // Social
        BEDSIDE: 0,
        EMPATHY: 0,
        COMMUNICATION: 0,
        HIERARCHY: 0,
        TEAMWORK: 0,
        ADVOCACY: 0,
        // Psychological
        COMPOSURE: 0,
        INSTINCT: 0,
        DOUBT: 0,
        DRIVE: 0,
        MEMORY: 0,
        HUMANITY: 0,
    };

    // Apply background bonuses if provided
    if (background) {
        const bonuses = BackgroundBonuses[background];
        for (const [skillId, bonus] of Object.entries(bonuses)) {
            skills[skillId as SkillId] += bonus as number;
        }
    }

    return skills;
};

// ============================================
// STORE INTERFACE
// ============================================

interface GameState {
    // Game Phase
    currentPhase: GamePhase;
    previousPhase: GamePhase | null;

    // Player
    player: PlayerCharacter | null;

    // Shift
    currentShiftNumber: number;
    shiftTimeRemaining: number;  // In minutes (480 = 8 hour shift)
    activeCases: PatientCase[];
    completedCases: PatientCase[];

    // Board
    boardEntries: BoardEntry[];
    maxBoardSlots: number;

    // Relationships
    relationships: Record<string, Relationship>;
    highScore: number;

    // Actions - Phase
    setPhase: (phase: GamePhase) => void;

    // Actions - Player
    checkHighScore: (score: number) => void;
    createPlayer: (name: string, background: PlayerBackground, personality: PersonalityAxes) => void;
    updateSkill: (skillId: SkillId, delta: number) => void;
    addLesson: (lesson: Omit<Lesson, 'id'>) => void;
    updateEnergy: (delta: number) => void;
    updateStress: (delta: number) => void;
    addXP: (amount: number) => void;

    // Actions - Shift
    startShift: () => void;
    endShift: () => void;
    advanceTime: (minutes: number) => void;
    addCase: (patientCase: PatientCase) => void;
    completeCase: (caseId: string) => void;

    // Actions - Board
    addBoardEntry: (entry: Omit<BoardEntry, 'id' | 'createdAt'>) => void;
    removeBoardEntry: (id: string) => void;
    pinBoardEntry: (id: string) => void;
    unpinBoardEntry: (id: string) => void;
    linkBoardEntries: (id1: string, id2: string) => void;
    clearUnpinnedEntries: () => void;

    // Actions - Relationships
    updateRelationship: (change: RelationshipChange) => void;
    initializeRelationship: (npcId: string) => void;

    // Selectors
    getSkillModifier: (skillId: SkillId) => number;
    canAddBoardEntry: () => boolean;
    getPinnedEntries: () => BoardEntry[];
}

// ============================================
// STORE IMPLEMENTATION
// ============================================

export const useGameStore = create<GameState>()(
    devtools(
        persist(
            immer((set, get) => ({
                // Initial State
                currentPhase: 'MAIN_MENU',
                previousPhase: null,
                player: null,
                currentShiftNumber: 0,
                shiftTimeRemaining: 480,
                activeCases: [],
                completedCases: [],
                boardEntries: [],
                maxBoardSlots: 4,
                relationships: {},
                highScore: 0,

                checkHighScore: (score: number) => set((state) => {
                    if (score > (state.highScore || 0)) {
                        state.highScore = score;
                    }
                }),

                // Phase Actions
                setPhase: (phase) => set((state) => {
                    state.previousPhase = state.currentPhase;
                    state.currentPhase = phase;
                }),

                // Player Actions
                createPlayer: (name, background, personality) => set((state) => {
                    state.player = {
                        id: uuid(),
                        name,
                        background,
                        personalityAxes: personality,
                        skills: createInitialSkills(background),
                        lessons: [],
                        energy: 100,
                        stress: 0,
                        currentShift: 0,
                        totalXP: 0,
                        unlockedMilestones: [],
                    };
                }),

                updateSkill: (skillId, delta) => set((state) => {
                    if (state.player) {
                        state.player.skills[skillId] = Math.max(-2, Math.min(7,
                            state.player.skills[skillId] + delta
                        ));
                    }
                }),

                addLesson: (lesson) => set((state) => {
                    if (state.player) {
                        const newLesson: Lesson = {
                            ...lesson,
                            id: uuid(),
                        };
                        state.player.lessons.push(newLesson);

                        // Also add to board as pinned entry
                        state.boardEntries.push({
                            id: uuid(),
                            type: 'LESSON',
                            content: lesson.name,
                            description: lesson.description,
                            pinned: true,
                            linkedTo: [],
                            source: lesson.unlockedFrom,
                            createdAt: Date.now(),
                        });
                    }
                }),

                updateEnergy: (delta) => set((state) => {
                    if (state.player) {
                        state.player.energy = Math.max(0, Math.min(100,
                            state.player.energy + delta
                        ));
                    }
                }),

                updateStress: (delta) => set((state) => {
                    if (state.player) {
                        state.player.stress = Math.max(0, Math.min(100,
                            state.player.stress + delta
                        ));
                    }
                }),

                addXP: (amount) => set((state) => {
                    if (state.player) {
                        state.player.totalXP += amount;
                    }
                }),

                // Shift Actions
                startShift: () => set((state) => {
                    state.currentShiftNumber += 1;
                    state.shiftTimeRemaining = 480;
                    state.activeCases = [];
                    if (state.player) {
                        state.player.currentShift = state.currentShiftNumber;
                        state.player.energy = 100; // Reset energy at shift start
                    }
                    // Clear unpinned board entries except lessons
                    state.boardEntries = state.boardEntries.filter(e => e.pinned);
                    state.currentPhase = 'SHIFT_START';
                }),

                endShift: () => set((state) => {
                    state.currentPhase = 'SHIFT_END';
                }),

                advanceTime: (minutes) => set((state) => {
                    state.shiftTimeRemaining = Math.max(0, state.shiftTimeRemaining - minutes);
                    // Drain energy slightly with time
                    if (state.player && minutes > 0) {
                        state.player.energy = Math.max(0, state.player.energy - Math.floor(minutes / 30));
                    }
                }),

                addCase: (patientCase) => set((state) => {
                    state.activeCases.push(patientCase);
                }),

                completeCase: (caseId) => set((state) => {
                    const caseIndex = state.activeCases.findIndex(c => c.id === caseId);
                    if (caseIndex !== -1) {
                        const [completed] = state.activeCases.splice(caseIndex, 1);
                        state.completedCases.push(completed);
                    }
                }),

                // Board Actions
                addBoardEntry: (entry) => set((state) => {
                    const currentCount = state.boardEntries.filter(e => !e.pinned).length;
                    const pinnedCount = state.boardEntries.filter(e => e.pinned).length;

                    if (currentCount + pinnedCount < state.maxBoardSlots || entry.pinned) {
                        state.boardEntries.push({
                            ...entry,
                            id: uuid(),
                            createdAt: Date.now(),
                        });
                    }
                }),

                removeBoardEntry: (id) => set((state) => {
                    const index = state.boardEntries.findIndex(e => e.id === id);
                    if (index !== -1 && !state.boardEntries[index].pinned) {
                        state.boardEntries.splice(index, 1);
                    }
                }),

                pinBoardEntry: (id) => set((state) => {
                    const entry = state.boardEntries.find(e => e.id === id);
                    if (entry) {
                        entry.pinned = true;
                    }
                }),

                unpinBoardEntry: (id) => set((state) => {
                    const entry = state.boardEntries.find(e => e.id === id);
                    if (entry && entry.type !== 'LESSON') { // Lessons stay pinned
                        entry.pinned = false;
                    }
                }),

                linkBoardEntries: (id1, id2) => set((state) => {
                    const entry1 = state.boardEntries.find(e => e.id === id1);
                    const entry2 = state.boardEntries.find(e => e.id === id2);
                    if (entry1 && entry2) {
                        if (!entry1.linkedTo.includes(id2)) {
                            entry1.linkedTo.push(id2);
                        }
                        if (!entry2.linkedTo.includes(id1)) {
                            entry2.linkedTo.push(id1);
                        }
                    }
                }),

                clearUnpinnedEntries: () => set((state) => {
                    state.boardEntries = state.boardEntries.filter(e => e.pinned);
                }),

                // Relationship Actions
                updateRelationship: (change) => set((state) => {
                    const rel = state.relationships[change.npcId];
                    if (rel) {
                        rel.professional = Math.max(-3, Math.min(3,
                            rel.professional + change.professionalDelta
                        ));
                        rel.personal = Math.max(0, Math.min(4,
                            rel.personal + change.personalDelta
                        ));
                        rel.history.push({
                            shiftNumber: state.currentShiftNumber,
                            description: change.reason,
                            professionalDelta: change.professionalDelta,
                            personalDelta: change.personalDelta,
                            timestamp: Date.now(),
                        });
                    }
                }),

                initializeRelationship: (npcId) => set((state) => {
                    if (!state.relationships[npcId]) {
                        state.relationships[npcId] = {
                            npcId,
                            professional: 0,
                            personal: 0,
                            storyProgress: 0,
                            flags: {},
                            history: [],
                        };
                    }
                }),

                // Selectors
                getSkillModifier: (skillId) => {
                    const state = get();
                    let modifier = state.player?.skills[skillId] ?? 0;

                    // Add lesson bonuses
                    state.player?.lessons.forEach(lesson => {
                        lesson.effects.forEach(effect => {
                            if (effect.type === 'SKILL_BONUS' && effect.target === skillId) {
                                modifier += effect.value as number;
                            }
                        });
                    });

                    return modifier;
                },

                canAddBoardEntry: () => {
                    const state = get();
                    const unpinnedCount = state.boardEntries.filter(e => !e.pinned).length;
                    return unpinnedCount < state.maxBoardSlots;
                },

                getPinnedEntries: () => {
                    return get().boardEntries.filter(e => e.pinned);
                },
            })),
            {
                name: 'code-blue-game-store',
                partialize: (state) => ({
                    player: state.player,
                    currentShiftNumber: state.currentShiftNumber,
                    completedCases: state.completedCases,
                    boardEntries: state.boardEntries.filter(e => e.pinned),
                    relationships: state.relationships,
                }),
            }
        ),
        { name: 'CodeBlueGameStore' }
    )
);
