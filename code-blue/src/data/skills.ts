// src/data/skills.ts
// Complete skill definitions with voice lines from SKILL_REFERENCE.md

import type { Skill, SkillCategory, SkillId } from '@/types/game';

// ============================================
// SKILL DEFINITIONS
// ============================================

export const skills: Record<SkillId, Skill> = {
    // ============================================
    // CLINICAL SKILLS (8)
    // ============================================

    TRIAGE: {
        id: 'TRIAGE',
        name: 'Triage',
        category: 'CLINICAL',
        description: 'Recognize severity. Who is crashing? Who can wait?',
        voiceName: 'The Alarm',
        voiceTone: 'Urgent, binary, life-or-death',
    },

    DIFFERENTIAL: {
        id: 'DIFFERENTIAL',
        name: 'Differential',
        category: 'CLINICAL',
        description: 'Generate and narrow the list of possibilities.',
        voiceName: 'The List-Maker',
        voiceTone: 'Systematic, probability-weighted, generating options',
    },

    PATHOPHYSIOLOGY: {
        id: 'PATHOPHYSIOLOGY',
        name: 'Pathophysiology',
        category: 'CLINICAL',
        description: 'Understand why symptoms occur and predict disease progression.',
        voiceName: 'The Professor',
        voiceTone: 'Explanatory, mechanistic, cause-and-effect',
    },

    HISTORY: {
        id: 'HISTORY',
        name: 'History',
        category: 'CLINICAL',
        description: 'Ask the right questions. Extract the real story.',
        voiceName: 'The Detective',
        voiceTone: 'Curious, probing, patient-centered',
    },

    PHYSICAL_EXAM: {
        id: 'PHYSICAL_EXAM',
        name: 'Physical Exam',
        category: 'CLINICAL',
        description: 'Identify physical findings through proper technique.',
        voiceName: 'The Hands',
        voiceTone: 'Tactile, observational, body-focused',
    },

    PROCEDURE: {
        id: 'PROCEDURE',
        name: 'Procedure',
        category: 'CLINICAL',
        description: 'Technical skills: IV placement, blood draws, suturing.',
        voiceName: 'The Technician',
        voiceTone: 'Precise, step-by-step, focused',
    },

    PHARMACOLOGY: {
        id: 'PHARMACOLOGY',
        name: 'Pharmacology',
        category: 'CLINICAL',
        description: 'Drug selection, dosing, contraindications, interactions.',
        voiceName: 'The Chemist',
        voiceTone: 'Precise, dosing-focused, interaction-aware',
    },

    INTERPRETATION: {
        id: 'INTERPRETATION',
        name: 'Interpretation',
        category: 'CLINICAL',
        description: 'EKG reading, lab interpretation, imaging findings.',
        voiceName: 'The Analyst',
        voiceTone: 'Pattern-matching, comparative, data-focused',
    },

    // ============================================
    // SOCIAL SKILLS (6)
    // ============================================

    BEDSIDE: {
        id: 'BEDSIDE',
        name: 'Bedside',
        category: 'SOCIAL',
        description: 'Build trust, provide comfort, patient-centered care.',
        voiceName: 'The Healer',
        voiceTone: 'Warm, present, reassuring',
    },

    EMPATHY: {
        id: 'EMPATHY',
        name: 'Empathy',
        category: 'SOCIAL',
        description: 'Read emotional states, connect with patients.',
        voiceName: 'The Mirror',
        voiceTone: 'Feeling, receptive, sometimes overwhelming',
    },

    COMMUNICATION: {
        id: 'COMMUNICATION',
        name: 'Communication',
        category: 'SOCIAL',
        description: 'Breaking bad news, informed consent, patient education.',
        voiceName: 'The Translator',
        voiceTone: 'Clear, appropriate, adaptable',
    },

    HIERARCHY: {
        id: 'HIERARCHY',
        name: 'Hierarchy',
        category: 'SOCIAL',
        description: 'Work within the system, know when to escalate.',
        voiceName: 'The Navigator',
        voiceTone: 'Strategic, aware, diplomatic',
    },

    TEAMWORK: {
        id: 'TEAMWORK',
        name: 'Teamwork',
        category: 'SOCIAL',
        description: 'Work with nurses, techs, specialists effectively.',
        voiceName: 'The Teammate',
        voiceTone: 'Coordinated, respectful, humble',
    },

    ADVOCACY: {
        id: 'ADVOCACY',
        name: 'Advocacy',
        category: 'SOCIAL',
        description: 'Fight for appropriate care, challenge unjust decisions.',
        voiceName: 'The Champion',
        voiceTone: 'Protective, systemic-aware, righteous',
    },

    // ============================================
    // PSYCHOLOGICAL SKILLS (6)
    // ============================================

    COMPOSURE: {
        id: 'COMPOSURE',
        name: 'Composure',
        category: 'PSYCHOLOGICAL',
        description: 'Stay calm under pressure, function in chaos.',
        voiceName: 'The Professional',
        voiceTone: 'Calm, controlled, detached-when-needed',
    },

    INSTINCT: {
        id: 'INSTINCT',
        name: 'Instinct',
        category: 'PSYCHOLOGICAL',
        description: 'Sense badness before data confirms it.',
        voiceName: 'The Gut',
        voiceTone: 'Pre-verbal, warning, often unexplainable',
    },

    DOUBT: {
        id: 'DOUBT',
        name: 'Doubt',
        category: 'PSYCHOLOGICAL',
        description: 'Appropriate self-questioning, catching mistakes.',
        voiceName: 'The Critic',
        voiceTone: 'Anxious, second-guessing, sometimes protective',
    },

    DRIVE: {
        id: 'DRIVE',
        name: 'Drive',
        category: 'PSYCHOLOGICAL',
        description: 'Push through fatigue, refuse to give up.',
        voiceName: 'The Engine',
        voiceTone: 'Relentless, forward-moving, sometimes reckless',
    },

    MEMORY: {
        id: 'MEMORY',
        name: 'Memory',
        category: 'PSYCHOLOGICAL',
        description: 'Remember facts, apply book knowledge.',
        voiceName: 'The Student',
        voiceTone: 'Retrieval-focused, pattern-matching, studious',
    },

    HUMANITY: {
        id: 'HUMANITY',
        name: 'Humanity',
        category: 'PSYCHOLOGICAL',
        description: 'Remember patients are people. Maintain self-care.',
        voiceName: 'The Person',
        voiceTone: 'Grounding, humanizing, emotionally honest',
    },
};

// ============================================
// VOICE LINES BY SKILL
// ============================================

export interface VoiceLine {
    text: string;
    trigger: 'idle' | 'observation' | 'check_before' | 'check_success' | 'check_failure' | 'danger' | 'emotional';
}

export const skillVoiceLines: Record<SkillId, VoiceLine[]> = {
    TRIAGE: [
        { text: "That's not a normal heart rate for an 80-year-old. That's a dying heart rate. Move.", trigger: 'danger' },
        { text: "The waiting room is full. Three ankle sprains, one anxiety attack, one... wait. That man is grey. He needs to be in the back. Now.", trigger: 'observation' },
        { text: "Sick or not sick. That's the only question that matters right now.", trigger: 'idle' },
    ],
    DIFFERENTIAL: [
        { text: "Chest pain in a 50-year-old male. Cardiac until proven otherwise, but keep PE on the list.", trigger: 'observation' },
        { text: "Three possibilities. Rank them. What would rule out the worst one?", trigger: 'check_before' },
        { text: "Don't anchor. Don't anchor. There could be something else.", trigger: 'check_failure' },
    ],
    PATHOPHYSIOLOGY: [
        { text: "The troponin is elevated because cardiac myocytes are dying. The question is why.", trigger: 'observation' },
        { text: "Think backwards. Low BP, high heart rate, poor perfusion. The pump is failing. Why?", trigger: 'check_before' },
        { text: "The mechanism makes sense. Follow the logic.", trigger: 'check_success' },
    ],
    HISTORY: [
        { text: "She said it started two hours ago. But she hesitated. Ask what she was doing when it started.", trigger: 'observation' },
        { text: "He says he's fine. Look at his eyes. He's not fine. Give him silence. Let him fill it.", trigger: 'emotional' },
        { text: "There's something she's not saying. Keep asking.", trigger: 'check_failure' },
    ],
    PHYSICAL_EXAM: [
        { text: "Feel the abdomen. Not with your whole hand—fingertips only. Start away from where it hurts.", trigger: 'check_before' },
        { text: "Those are spider angiomata. Those are palmar erythema. That's ascites. You know what this means.", trigger: 'check_success' },
        { text: "Look at the hands. The hands always tell you something.", trigger: 'observation' },
    ],
    PROCEDURE: [
        { text: "Find the landmark. Clean the site. Anchor the vein. Bevel up. Advance slowly.", trigger: 'check_before' },
        { text: "Flash of blood. You're in.", trigger: 'check_success' },
        { text: "The needle is shaking. Your hands are shaking. Stop. Take one breath. Then continue.", trigger: 'check_failure' },
    ],
    PHARMACOLOGY: [
        { text: "Aspirin: 325mg, not 81. This is an acute event, not prevention.", trigger: 'observation' },
        { text: "That's too much morphine for someone her age and weight. Start with 2mg.", trigger: 'danger' },
        { text: "Check her allergies—she said she's PCN-allergic. Does she react to cephalosporins?", trigger: 'check_before' },
    ],
    INTERPRETATION: [
        { text: "Troponin is 0.08. That's elevated. But is it new? Could be demand ischemia. Need another one in three hours.", trigger: 'observation' },
        { text: "Those are ST elevations. That's not an artifact—they're in contiguous leads. Get cardiology.", trigger: 'danger' },
        { text: "The pattern is there. You can see it.", trigger: 'check_success' },
    ],
    BEDSIDE: [
        { text: "Sit down. You're looming over her. Meet her eyes. Touch her hand if she'll let you.", trigger: 'observation' },
        { text: "He's scared. Of course he's scared. Slow down.", trigger: 'emotional' },
        { text: "She needs to know you see her, not just the disease.", trigger: 'idle' },
    ],
    EMPATHY: [
        { text: "She's holding it together for her daughter. When the daughter leaves, she's going to fall apart.", trigger: 'observation' },
        { text: "You're feeling his fear. That's okay. Don't let it drown you. Feel it, then set it aside.", trigger: 'emotional' },
        { text: "Something is wrong. Not medically. Emotionally.", trigger: 'idle' },
    ],
    COMMUNICATION: [
        { text: "She doesn't know what 'cardiac enzymes' means. Say it differently.", trigger: 'check_before' },
        { text: "This is the worst news of their lives. Say it once. Slowly. Then stop.", trigger: 'emotional' },
        { text: "You explained it well. They understand now.", trigger: 'check_success' },
    ],
    HIERARCHY: [
        { text: "Dr. Webb doesn't like being questioned. But Priya respects pushback if you have data.", trigger: 'observation' },
        { text: "You're a third-year medical student. You don't order anything. You suggest. You present. You wait.", trigger: 'idle' },
        { text: "Know who you're talking to. Adjust accordingly.", trigger: 'check_before' },
    ],
    TEAMWORK: [
        { text: "Maria has been a nurse for twenty years. She's seen more codes than you've seen patients. Listen.", trigger: 'observation' },
        { text: "You don't know where the supplies are. Ask. It's not weakness—it's efficiency.", trigger: 'idle' },
        { text: "Good. You're working together.", trigger: 'check_success' },
    ],
    ADVOCACY: [
        { text: "The insurance won't cover it. Who's going to fight for her if not you?", trigger: 'observation' },
        { text: "He's homeless. That's not a diagnosis. That's a housing problem.", trigger: 'emotional' },
        { text: "Don't let them discharge him to the street.", trigger: 'danger' },
    ],
    COMPOSURE: [
        { text: "The family is screaming. The monitor is screaming. You are silent. You are steady.", trigger: 'danger' },
        { text: "Your hands want to shake. Don't let them. There will be time to feel this. Not now.", trigger: 'check_before' },
        { text: "You can scream later. Not now.", trigger: 'emotional' },
    ],
    INSTINCT: [
        { text: "Something is wrong with this patient. You don't know what. The numbers are fine. But something is wrong.", trigger: 'observation' },
        { text: "Don't walk out of this room. Stay. Wait. Something's about to happen.", trigger: 'danger' },
        { text: "Trust it. You've seen enough.", trigger: 'check_success' },
    ],
    DOUBT: [
        { text: "You said pneumonia. What if it's cancer? What if the chest X-ray is wrong?", trigger: 'idle' },
        { text: "You're about to do something. Are you sure? What's the worst that could happen?", trigger: 'check_before' },
        { text: "Good. You caught it before it mattered.", trigger: 'check_success' },
    ],
    DRIVE: [
        { text: "You've been here twelve hours. Your feet hurt. That's someone's mother on that stretcher. Get up.", trigger: 'idle' },
        { text: "They said it couldn't be done. Try anyway. Try one more thing.", trigger: 'check_failure' },
        { text: "Keep going. You're almost there.", trigger: 'check_before' },
    ],
    MEMORY: [
        { text: "You read about this. Last month. The name is on the tip of your tongue...", trigger: 'check_before' },
        { text: "Triad... fever, rash, and... arthritis. Disseminated gonococcal infection.", trigger: 'check_success' },
        { text: "ABC. You know this. You've known this since first year.", trigger: 'idle' },
    ],
    HUMANITY: [
        { text: "He's not Room 4. He's not 'the chest pain.' He's Alejandro Martinez. He has a daughter.", trigger: 'observation' },
        { text: "You haven't eaten in eight hours. You're allowed to be hungry. You're still human.", trigger: 'idle' },
        { text: "Remember why you're here.", trigger: 'emotional' },
    ],
};

// ============================================
// HELPER FUNCTIONS
// ============================================

export const getSkillsByCategory = (category: SkillCategory): Skill[] => {
    return Object.values(skills).filter(s => s.category === category);
};

export const getSkillVoiceLine = (
    skillId: SkillId,
    trigger: VoiceLine['trigger']
): string | null => {
    const lines = skillVoiceLines[skillId];
    const matching = lines.filter(l => l.trigger === trigger);
    if (matching.length === 0) return null;
    return matching[Math.floor(Math.random() * matching.length)].text;
};

export const getCategoryColor = (category: SkillCategory): string => {
    switch (category) {
        case 'CLINICAL': return 'var(--primary-light)';
        case 'SOCIAL': return 'var(--success-light)';
        case 'PSYCHOLOGICAL': return 'var(--warning-light)';
        default: return 'var(--foreground)';
    }
};

export const getCategoryClass = (category: SkillCategory): string => {
    switch (category) {
        case 'CLINICAL': return 'skill-clinical';
        case 'SOCIAL': return 'skill-social';
        case 'PSYCHOLOGICAL': return 'skill-psychological';
        default: return '';
    }
};
