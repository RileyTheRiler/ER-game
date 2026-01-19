// src/types/game.ts
// Core game types for CODE BLUE

// ============================================
// SKILL TYPES
// ============================================

export type SkillCategory = 'CLINICAL' | 'SOCIAL' | 'PSYCHOLOGICAL';

export interface Skill {
    id: string;
    name: string;
    category: SkillCategory;
    description: string;
    voiceName: string;      // e.g., "The Alarm", "The Detective"
    voiceTone: string;      // Description of how this skill speaks
}

export type SkillId =
    // Clinical (8)
    | 'TRIAGE' | 'DIFFERENTIAL' | 'PATHOPHYSIOLOGY' | 'HISTORY'
    | 'PHYSICAL_EXAM' | 'PROCEDURE' | 'PHARMACOLOGY' | 'INTERPRETATION'
    // Social (6)
    | 'BEDSIDE' | 'EMPATHY' | 'COMMUNICATION' | 'HIERARCHY' | 'TEAMWORK' | 'ADVOCACY'
    // Psychological (6)
    | 'COMPOSURE' | 'INSTINCT' | 'DOUBT' | 'DRIVE' | 'MEMORY' | 'HUMANITY';

export type PlayerSkills = Record<SkillId, number>;

// ============================================
// SKILL CHECK TYPES
// ============================================

export interface Modifier {
    source: string;
    value: number;
}

export interface SkillCheckParams {
    skillId: SkillId;
    dc: number;
    situationalModifiers?: Modifier[];
    assistedBy?: string;       // NPC ID who's helping
    isPassive?: boolean;       // No roll, just check if modifier beats DC-10
}

export interface SkillCheckResult {
    success: boolean;
    roll: { dice: [number, number]; natural: number };
    modifiers: Modifier[];
    totalModifier: number;
    finalResult: number;
    margin: number;           // How much over/under DC
    criticalType: 'NONE' | 'SUCCESS' | 'FAILURE';
    narrativeResult: string;  // Flavor text for this outcome
}

export interface SkillCheck {
    skillId: SkillId;
    dc: number;
    modifiers: Modifier[];
    result?: SkillCheckResult;
}

// ============================================
// DIFFICULTY CLASS CONSTANTS
// ============================================

export const DifficultyClass = {
    TRIVIAL: 6,
    EASY: 8,
    MODERATE: 10,
    HARD: 12,
    VERY_HARD: 14,
    EXTREME: 16,
    LEGENDARY: 18,
} as const;

export type DCLevel = keyof typeof DifficultyClass;

// ============================================
// LESSON TYPES
// ============================================

export type LessonEffectType = 'SKILL_BONUS' | 'UNLOCK_DIALOGUE' | 'UNLOCK_ACTION' | 'PASSIVE_HINT';

export interface LessonEffect {
    type: LessonEffectType;
    target: string;
    value: number | string | boolean;
}

export interface Lesson {
    id: string;
    name: string;
    description: string;
    unlockedFrom: string;     // What triggered learning this
    effects: LessonEffect[];
    isPinned?: boolean;       // Lessons are always pinned on the Board
}

// ============================================
// GAME PHASE
// ============================================

export type GamePhase =
    | 'MAIN_MENU'
    | 'CHARACTER_CREATION'
    | 'INTRO_SEQUENCE'
    | 'ORIENTATION'
    | 'SHIFT_START'
    | 'GAMEPLAY'
    | 'PATIENT_ENCOUNTER'
    | 'DIALOGUE'
    | 'SKILL_CHECK'
    | 'BOARD'
    | 'SHIFT_END'
    | 'DEBRIEF'
    | 'DEMO_END'
    | 'CPC_EXAM'
    | 'GAME_OVER';

// ============================================
// INTERNAL VOICE TYPES
// ============================================

export interface InternalVoice {
    skillId: SkillId;
    skillName: string;
    voiceName: string;
    text: string;
    priority: number;
    category: SkillCategory;
}

export type VoiceEvent =
    | 'SCENE_START'
    | 'DIALOGUE_LINE'
    | 'CHOICE_AVAILABLE'
    | 'SKILL_CHECK_BEFORE'
    | 'SKILL_CHECK_AFTER'
    | 'PATIENT_OBSERVATION'
    | 'DANGER_DETECTED'
    | 'EMOTIONAL_MOMENT'
    | 'IDLE';
