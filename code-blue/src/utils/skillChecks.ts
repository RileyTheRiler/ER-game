// src/utils/skillChecks.ts
// Full skill check resolution system

import type {
    SkillId,
    SkillCheckParams,
    SkillCheckResult,
    Modifier,
    InternalVoice,
} from '@/types/game';
import { roll2d6, getCriticalType, successProbability, getProbabilityDescription } from './dice';
import { skills, getSkillVoiceLine } from '@/data/skills';

// ============================================
// SKILL CHECK RESOLUTION
// ============================================

export interface ResolvedCheck extends SkillCheckResult {
    skillId: SkillId;
    dc: number;
    internalVoice: InternalVoice | null;
}

/**
 * Resolve a complete skill check with modifiers and narrative
 */
export const resolveSkillCheck = (
    params: SkillCheckParams,
    playerSkills: Record<SkillId, number>,
    lessonBonuses: Partial<Record<SkillId, number>> = {}
): ResolvedCheck => {
    const { skillId, dc, situationalModifiers = [], assistedBy, isPassive = false } = params;

    // Build modifier list
    const modifiers: Modifier[] = [];

    // Base skill modifier
    const baseModifier = playerSkills[skillId] ?? 0;
    modifiers.push({ source: skills[skillId].name, value: baseModifier });

    // Lesson bonuses
    const lessonBonus = lessonBonuses[skillId] ?? 0;
    if (lessonBonus !== 0) {
        modifiers.push({ source: 'Learned Lesson', value: lessonBonus });
    }

    // Situational modifiers
    modifiers.push(...situationalModifiers);

    // Assistance bonus (typically +1 or +2)
    if (assistedBy) {
        modifiers.push({ source: `Assisted by ${assistedBy}`, value: 1 });
    }

    // Calculate total modifier
    const totalModifier = modifiers.reduce((sum, m) => sum + m.value, 0);

    // Roll the dice (or passive check)
    let roll;
    if (isPassive) {
        // Passive check: treat as if rolled 7 (average)
        roll = { dice: [0, 0] as [number, number], natural: 7 };
    } else {
        roll = roll2d6();
    }

    // Calculate final result
    const finalResult = roll.natural + totalModifier;
    const margin = finalResult - dc;
    const success = finalResult >= dc;
    const criticalType = isPassive ? 'NONE' : getCriticalType(roll);

    // Override success/failure for criticals
    let actualSuccess = success;
    if (criticalType === 'SUCCESS') actualSuccess = true;  // Critical success always succeeds
    if (criticalType === 'FAILURE') actualSuccess = false; // Snake eyes always fails

    // Generate narrative result
    const narrativeResult = generateNarrative(skillId, actualSuccess, margin, criticalType);

    // Get internal voice commentary
    const voiceTrigger = actualSuccess ? 'check_success' : 'check_failure';
    const voiceText = getSkillVoiceLine(skillId, voiceTrigger);
    const skill = skills[skillId];

    const internalVoice: InternalVoice | null = voiceText ? {
        skillId,
        skillName: skill.name,
        voiceName: skill.voiceName,
        text: voiceText,
        priority: criticalType !== 'NONE' ? 10 : 5,
        category: skill.category,
    } : null;

    return {
        skillId,
        dc,
        success: actualSuccess,
        roll,
        modifiers,
        totalModifier,
        finalResult,
        margin,
        criticalType,
        narrativeResult,
        internalVoice,
    };
};

// ============================================
// NARRATIVE GENERATION
// ============================================

type CritType = 'NONE' | 'SUCCESS' | 'FAILURE';

const generateNarrative = (
    skillId: SkillId,
    success: boolean,
    margin: number,
    critical: CritType
): string => {
    const skill = skills[skillId];

    if (critical === 'SUCCESS') {
        return `A moment of perfect clarity. Your ${skill.name} exceeds all expectations.`;
    }
    if (critical === 'FAILURE') {
        return `Everything that could go wrong, does. A catastrophic failure of ${skill.name}.`;
    }

    if (success) {
        if (margin >= 5) {
            return `Exceptional success. Your ${skill.name} shines through brilliantly.`;
        }
        if (margin >= 2) {
            return `Solid work. Your ${skill.name} proves reliable.`;
        }
        return `Just enough. Your ${skill.name} carries you through—barely.`;
    } else {
        if (margin <= -5) {
            return `A serious failure. Your ${skill.name} fails you completely.`;
        }
        if (margin <= -2) {
            return `Not quite. Your ${skill.name} isn't enough this time.`;
        }
        return `So close. Your ${skill.name} nearly succeeds.`;
    }
};

// ============================================
// CHECK PREVIEW (for showing odds before rolling)
// ============================================

export interface CheckPreview {
    skillId: SkillId;
    skillName: string;
    dc: number;
    dcDescription: string;
    totalModifier: number;
    probability: number;
    probabilityDescription: string;
    modifierBreakdown: Modifier[];
}

export const previewSkillCheck = (
    params: SkillCheckParams,
    playerSkills: Record<SkillId, number>,
    lessonBonuses: Partial<Record<SkillId, number>> = {}
): CheckPreview => {
    const { skillId, dc, situationalModifiers = [], assistedBy } = params;

    const modifiers: Modifier[] = [];

    // Base skill modifier
    const baseModifier = playerSkills[skillId] ?? 0;
    modifiers.push({ source: skills[skillId].name, value: baseModifier });

    // Lesson bonuses
    const lessonBonus = lessonBonuses[skillId] ?? 0;
    if (lessonBonus !== 0) {
        modifiers.push({ source: 'Learned Lesson', value: lessonBonus });
    }

    // Situational modifiers
    modifiers.push(...situationalModifiers);

    // Assistance bonus
    if (assistedBy) {
        modifiers.push({ source: `Assisted by ${assistedBy}`, value: 1 });
    }

    const totalModifier = modifiers.reduce((sum, m) => sum + m.value, 0);
    const probability = successProbability(dc, totalModifier);

    return {
        skillId,
        skillName: skills[skillId].name,
        dc,
        dcDescription: getDCDescriptionFromValue(dc),
        totalModifier,
        probability,
        probabilityDescription: getProbabilityDescription(probability),
        modifierBreakdown: modifiers,
    };
};

const getDCDescriptionFromValue = (dc: number): string => {
    if (dc <= 6) return 'Trivial';
    if (dc <= 8) return 'Easy';
    if (dc <= 10) return 'Moderate';
    if (dc <= 12) return 'Hard';
    if (dc <= 14) return 'Very Hard';
    if (dc <= 16) return 'Extreme';
    return 'Legendary';
};

// ============================================
// OPPOSED CHECKS
// ============================================

export interface OpposedCheckResult {
    attacker: ResolvedCheck;
    defender: ResolvedCheck;
    winner: 'attacker' | 'defender' | 'tie';
    margin: number;
}

/**
 * Resolve an opposed check between two parties
 */
export const resolveOpposedCheck = (
    attackerParams: { skillId: SkillId; modifiers?: Modifier[] },
    defenderParams: { skillId: SkillId; dc: number },
    attackerSkills: Record<SkillId, number>,
    defenderSkills: Record<SkillId, number>
): OpposedCheckResult => {
    // Attacker rolls against defender's passive value as DC
    const defenderPassive = 10 + (defenderSkills[defenderParams.skillId] ?? 0);

    const attackerResult = resolveSkillCheck(
        {
            skillId: attackerParams.skillId,
            dc: defenderPassive,
            situationalModifiers: attackerParams.modifiers,
        },
        attackerSkills
    );

    // For opposed, defender is passive
    const defenderResult = resolveSkillCheck(
        {
            skillId: defenderParams.skillId,
            dc: attackerResult.finalResult,
            isPassive: true,
        },
        defenderSkills
    );

    let winner: 'attacker' | 'defender' | 'tie';
    if (attackerResult.finalResult > defenderResult.finalResult) {
        winner = 'attacker';
    } else if (defenderResult.finalResult > attackerResult.finalResult) {
        winner = 'defender';
    } else {
        winner = 'tie';
    }

    return {
        attacker: attackerResult,
        defender: defenderResult,
        winner,
        margin: attackerResult.finalResult - defenderResult.finalResult,
    };
};
