// src/data/npcs/jimmy.ts
// Dr. James "Jimmy" Reyes - Senior EM Resident, Primary Mentor

import type { NPC } from '@/types/character';

export const jimmy: NPC = {
    id: 'jimmy',
    name: 'Dr. James Reyes',
    nickname: 'Jimmy',
    role: 'Senior EM Resident (PGY-3)',

    appearance: {
        description: "Early 30s, Filipino-American, perpetually tired eyes that somehow still manage to look kind. Wears slightly wrinkled scrubs and a stethoscope that's seen better days. Always has a coffee cup somewhere nearby.",
        sprite: 'jimmy-neutral',
    },

    personality: {
        traits: ['Patient', 'Pragmatic', 'Secretly idealistic', 'Dark humor'],
        teachingStyle: 'Socratic with a safety net - asks questions but catches you before you fall',
        stressResponse: 'Gets quieter, more focused, occasionally snaps but always apologizes',
    },

    background: {
        medSchool: 'University of the Philippines, then residency match in the US',
        specialty: 'Emergency Medicine',
        yearsExperience: 3,
        backstory: "Came to the US for residency to help support his family back home. Works extra shifts, sends money home. Still believes in the system despite seeing its cracks every day.",
    },

    relationshipDefaults: {
        professional: 0,
        personal: 0,
        professionalMax: 10,
        personalMax: 10,
    },

    dialogueTriggers: {
        firstMeeting: 'jimmy-intro',
        highProfessional: 'jimmy-impressed',
        lowProfessional: 'jimmy-concerned',
        highPersonal: 'jimmy-friend',
        stressed: 'jimmy-venting',
    },

    teachingMoments: [
        {
            id: 'three-things',
            title: 'The Three Things',
            lesson: "One—take good histories. Two—know your vitals. Three—ask questions.",
            unlockedBy: 'Asking what to focus on',
        },
        {
            id: 'know-your-limits',
            title: 'Know Your Limits',
            lesson: "Asking for help when appropriate builds trust rather than damaging it.",
            unlockedBy: 'Appropriately escalating a case',
        },
        {
            id: 'presentation-matters',
            title: 'Presentation Matters',
            lesson: "How you present a patient changes how seriously they're taken.",
            unlockedBy: 'Observing him present to attending',
        },
    ],

    voiceLines: {
        greeting: [
            "Ready to see some patients?",
            "Coffee first. Then we work.",
            "You look less terrified than yesterday. Good.",
        ],
        teaching: [
            "What do you think is going on?",
            "Walk me through your reasoning.",
            "Good thought. What else could it be?",
            "Don't tell me what the labs are. Tell me what they mean.",
        ],
        praise: [
            "Good pickup.",
            "You're getting it.",
            "That's the kind of thinking that saves lives.",
        ],
        concern: [
            "You okay? You seem off today.",
            "Don't let one bad case wreck you. We've all been there.",
            "Take a breath. Then go back in.",
        ],
        stressed: [
            "Not now.",
            "Just... give me a minute.",
            "[sighs heavily]",
        ],
    },
};

export default jimmy;
