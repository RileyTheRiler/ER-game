// src/lib/internalVoices.ts
// System for generating contextual skill voice commentary

import type { SkillId, SkillCategory, InternalVoice } from '@/types/game';
import type { VitalSigns, Patient } from '@/types/medical';
import { skills, getSkillVoiceLine, skillVoiceLines } from '@/data/skills';

// ============================================
// VOICE GENERATION CONTEXT
// ============================================

export interface VoiceContext {
    scene: 'PATIENT_ROOM' | 'HALLWAY' | 'NURSES_STATION' | 'TRAUMA_BAY' | 'WAITING_ROOM';
    situation: 'EXAMINING' | 'TALKING' | 'WAITING' | 'EMERGENCY' | 'ROUTINE' | 'LEARNING';
    patient?: Patient;
    vitals?: VitalSigns;
    playerSkills: Record<SkillId, number>;
    recentChecks?: SkillId[];
    timeOfShift: 'EARLY' | 'MID' | 'LATE' | 'OVERTIME';
    playerEnergy: number;
    playerStress: number;
}

// ============================================
// VOICE SELECTION LOGIC
// ============================================

/**
 * Get contextually appropriate internal voices based on the current situation
 */
export const getContextualVoices = (
    context: VoiceContext,
    maxVoices: number = 3
): InternalVoice[] => {
    const candidates: InternalVoice[] = [];

    // Check vital signs for danger signals
    if (context.vitals) {
        const dangerVoices = checkVitalsForDanger(context.vitals, context.playerSkills);
        candidates.push(...dangerVoices);
    }

    // Add situation-appropriate voices
    const situationVoices = getSituationVoices(context);
    candidates.push(...situationVoices);

    // Add fatigue/stress voices if applicable
    if (context.playerEnergy < 30 || context.playerStress > 70) {
        const wellbeingVoices = getWellbeingVoices(context.playerEnergy, context.playerStress);
        candidates.push(...wellbeingVoices);
    }

    // Sort by priority and return top voices
    candidates.sort((a, b) => b.priority - a.priority);
    return candidates.slice(0, maxVoices);
};

// ============================================
// DANGER DETECTION
// ============================================

const checkVitalsForDanger = (
    vitals: VitalSigns,
    playerSkills: Record<SkillId, number>
): InternalVoice[] => {
    const voices: InternalVoice[] = [];

    // Heart rate concerns
    if (vitals.heartRate > 120 || vitals.heartRate < 50) {
        const triageLevel = playerSkills.TRIAGE ?? 0;
        if (triageLevel >= 1) {
            voices.push(createVoice(
                'TRIAGE',
                vitals.heartRate > 120
                    ? "That heart rate is too fast. Something is wrong."
                    : "That's bradycardia. Watch for it to drop further.",
                8
            ));
        }
    }

    // Blood pressure concerns
    if (vitals.bloodPressure.systolic < 90) {
        voices.push(createVoice(
            'TRIAGE',
            "Blood pressure is dropping. This patient is crashing.",
            10
        ));
    }

    // Oxygen saturation
    if (vitals.oxygenSaturation < 92) {
        voices.push(createVoice(
            'INTERPRETATION',
            vitals.oxygenSaturation < 88
                ? "SpO2 in the 80s. They need oxygen now."
                : "Oxygen is borderline. Keep watching.",
            vitals.oxygenSaturation < 88 ? 10 : 6
        ));
    }

    // Fever
    if (vitals.temperature > 101.5) {
        voices.push(createVoice(
            'DIFFERENTIAL',
            "Fever. Infection is on the list. What's the source?",
            5
        ));
    }

    return voices;
};

// ============================================
// SITUATION VOICES
// ============================================

const getSituationVoices = (context: VoiceContext): InternalVoice[] => {
    const voices: InternalVoice[] = [];

    switch (context.situation) {
        case 'EMERGENCY':
            voices.push(createVoice(
                'COMPOSURE',
                "Breathe. You can panic later. Not now.",
                9
            ));
            voices.push(createVoice(
                'DRIVE',
                "Move. Every second matters.",
                8
            ));
            break;

        case 'EXAMINING':
            // Add observation prompts based on skill levels
            if ((context.playerSkills.PHYSICAL_EXAM ?? 0) >= 2) {
                voices.push(createVoice(
                    'PHYSICAL_EXAM',
                    "Look at the hands. Check the nails. The body tells you things.",
                    4
                ));
            }
            if ((context.playerSkills.HISTORY ?? 0) >= 1) {
                voices.push(createVoice(
                    'HISTORY',
                    "There's more to this story. Keep asking.",
                    3
                ));
            }
            break;

        case 'TALKING':
            if ((context.playerSkills.EMPATHY ?? 0) >= 2) {
                voices.push(createVoice(
                    'EMPATHY',
                    "They're scared. You can see it in how they hold themselves.",
                    4
                ));
            }
            break;

        case 'WAITING':
            // Doubt tends to appear during waiting
            if ((context.playerSkills.DOUBT ?? 0) >= 0) {
                voices.push(createVoice(
                    'DOUBT',
                    "Did you miss something? Should you go back and check?",
                    3
                ));
            }
            break;

        case 'LEARNING':
            voices.push(createVoice(
                'MEMORY',
                "Pay attention. You'll need to remember this.",
                4
            ));
            break;
    }

    return voices;
};

// ============================================
// WELLBEING VOICES
// ============================================

const getWellbeingVoices = (energy: number, stress: number): InternalVoice[] => {
    const voices: InternalVoice[] = [];

    if (energy < 30) {
        voices.push(createVoice(
            'HUMANITY',
            "You haven't eaten in hours. Your body is telling you something.",
            3
        ));
        voices.push(createVoice(
            'DRIVE',
            "You're tired. So what? Keep moving.",
            4
        ));
    }

    if (stress > 70) {
        voices.push(createVoice(
            'COMPOSURE',
            "Your hands are shaking. Take a breath.",
            5
        ));
        voices.push(createVoice(
            'HUMANITY',
            "This is too much. It's okay to feel overwhelmed. But not now.",
            4
        ));
    }

    return voices;
};

// ============================================
// SKILL CHECK VOICES
// ============================================

/**
 * Generate voices before a skill check (to show internal deliberation)
 */
export const getPreCheckVoices = (
    skillId: SkillId,
    dc: number,
    playerSkillLevel: number
): InternalVoice[] => {
    const voices: InternalVoice[] = [];
    const skill = skills[skillId];

    // The skill itself speaks before its check
    const skillVoice = getSkillVoiceLine(skillId, 'check_before');
    if (skillVoice) {
        voices.push(createVoice(skillId, skillVoice, 7));
    }

    // Doubt sometimes appears before difficult checks
    if (dc >= 12 && playerSkillLevel < 3) {
        const doubtVoice = getSkillVoiceLine('DOUBT', 'check_before');
        if (doubtVoice) {
            voices.push(createVoice('DOUBT', doubtVoice, 5));
        }
    }

    return voices;
};

/**
 * Generate voices after a skill check (reactions to success/failure)
 */
export const getPostCheckVoices = (
    skillId: SkillId,
    success: boolean,
    isCritical: boolean
): InternalVoice[] => {
    const voices: InternalVoice[] = [];

    const trigger = success ? 'check_success' : 'check_failure';
    const skillVoice = getSkillVoiceLine(skillId, trigger);

    if (skillVoice) {
        voices.push(createVoice(skillId, skillVoice, isCritical ? 10 : 6));
    }

    // Critical failures sometimes trigger Composure or Drive
    if (!success && isCritical) {
        voices.push(createVoice(
            'COMPOSURE',
            "Don't let them see you panic.",
            8
        ));
    }

    // Critical successes might trigger confidence
    if (success && isCritical) {
        voices.push(createVoice(
            'DRIVE',
            "Yes. That's it. You've got this.",
            7
        ));
    }

    return voices;
};

// ============================================
// HELPER FUNCTIONS
// ============================================

const createVoice = (
    skillId: SkillId,
    text: string,
    priority: number
): InternalVoice => {
    const skill = skills[skillId];
    return {
        skillId,
        skillName: skill.name,
        voiceName: skill.voiceName,
        text,
        priority,
        category: skill.category,
    };
};

/**
 * Format a voice for display with proper styling
 */
export const formatVoiceForDisplay = (voice: InternalVoice): {
    prefix: string;
    text: string;
    categoryClass: string;
} => {
    const categoryClass =
        voice.category === 'CLINICAL' ? 'skill-clinical' :
            voice.category === 'SOCIAL' ? 'skill-social' :
                'skill-psychological';

    return {
        prefix: voice.voiceName.toUpperCase(),
        text: voice.text,
        categoryClass,
    };
};
