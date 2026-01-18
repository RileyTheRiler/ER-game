// src/types/character.ts
// Player and NPC character types

import type { SkillId, PlayerSkills, Lesson } from './game';

// ============================================
// PLAYER CHARACTER TYPES
// ============================================

export type PlayerBackground = 'EMT' | 'RESEARCH' | 'LATE_BLOOMER' | 'LEGACY';

export interface PersonalityAxes {
    confidence: number;   // -3 (Anxious) to +3 (Confident)
    approach: number;     // -3 (By-the-Book) to +3 (Intuitive)
    outlook: number;      // -3 (Cynical) to +3 (Idealistic)
}

export interface PlayerCharacter {
    id: string;
    name: string;
    background: PlayerBackground;
    personalityAxes: PersonalityAxes;
    skills: PlayerSkills;
    lessons: Lesson[];
    energy: number;       // 0-100
    stress: number;       // 0-100
    currentShift: number;
    totalXP: number;
    unlockedMilestones: string[];
}

// ============================================
// NPC TYPES
// ============================================

export interface NPCAppearance {
    description: string;
    sprite: string;
}

export interface NPCPersonality {
    traits: string[];
    teachingStyle: string;
    stressResponse: string;
}

export interface NPCBackground {
    medSchool?: string;
    specialty?: string;
    yearsExperience: number;
    backstory: string;
}

export interface NPCTeachingMoment {
    id: string;
    title: string;
    lesson: string;
    unlockedBy: string;
}

export interface NPCVoiceLines {
    greeting: string[];
    teaching?: string[];
    praise?: string[];
    concern?: string[];
    stressed?: string[];
    disappointment?: string[];
    busy?: string[];
    crisis?: string[];
    [key: string]: string[] | undefined;
}

export interface NPC {
    id: string;
    name: string;
    nickname?: string;
    role: string;

    appearance: NPCAppearance;
    personality: NPCPersonality;
    background: NPCBackground;

    relationshipDefaults: {
        professional: number;
        personal: number;
        professionalMax: number;
        personalMax: number;
    };

    dialogueTriggers: Record<string, string>;
    teachingMoments: NPCTeachingMoment[];
    voiceLines: NPCVoiceLines;
    uniqueDialogue?: Record<string, string>;
}

// ============================================
// RELATIONSHIP TYPES
// ============================================

export interface Relationship {
    npcId: string;
    professional: number;       // -3 to +3
    personal: number;           // 0 to 4
    storyProgress: number;      // 0 to 100
    flags: Record<string, boolean>;
    history: RelationshipEvent[];
}

export interface RelationshipEvent {
    shiftNumber: number;
    description: string;
    professionalDelta: number;
    personalDelta: number;
    timestamp: number;
}

export interface RelationshipChange {
    npcId: string;
    professionalDelta: number;
    personalDelta: number;
    reason: string;
}

// ============================================
// RELATIONSHIP LEVEL DESCRIPTIONS
// ============================================

export const ProfessionalLevels: Record<number, string> = {
    [-3]: 'Dangerous',
    [-2]: 'Incompetent',
    [-1]: 'Green',
    [0]: 'Student',
    [1]: 'Capable',
    [2]: 'Reliable',
    [3]: 'Impressive',
};

export const PersonalLevels: Record<number, string> = {
    [0]: 'Stranger',
    [1]: 'Acquaintance',
    [2]: 'Colleague',
    [3]: 'Friend',
    [4]: 'Confidant',
};

// ============================================
// BACKGROUND BONUSES
// ============================================

export const BackgroundBonuses: Record<PlayerBackground, Partial<Record<SkillId, number>>> = {
    EMT: {
        TRIAGE: 2,
        COMPOSURE: 2,
        PHYSICAL_EXAM: 1,
        PROCEDURE: 1,
        TEAMWORK: 1,
        INSTINCT: 1,
        DRIVE: 1,
    },
    RESEARCH: {
        DIFFERENTIAL: 2,
        PATHOPHYSIOLOGY: 2,
        PHARMACOLOGY: 1,
        INTERPRETATION: 1,
        MEMORY: 2,
        DOUBT: 1,
    },
    LATE_BLOOMER: {
        BEDSIDE: 2,
        EMPATHY: 2,
        COMMUNICATION: 1,
        HISTORY: 1,
        TEAMWORK: 1,
        INSTINCT: 1,
        HUMANITY: 2,
        ADVOCACY: 1,
    },
    LEGACY: {
        HIERARCHY: 2,
        PROCEDURE: 1,
        PHARMACOLOGY: 1,
        COMPOSURE: 1,
        DOUBT: 1,
        DRIVE: 1,
        MEMORY: 1,
    },
};
