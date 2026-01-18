// src/data/npcs/okonkwo.ts
// Dr. Adaeze Okonkwo - EM Attending, Department Legend

import type { NPC } from '@/types/character';

export const drOkonkwo: NPC = {
    id: 'okonkwo',
    name: 'Dr. Adaeze Okonkwo',
    nickname: 'Dr. O',
    role: 'Emergency Medicine Attending',

    appearance: {
        description: "Early 50s, Nigerian-American, tall and commanding presence. Silver wire-rimmed glasses, natural hair cropped short. Moves with deliberate precision. When she enters a room, people notice.",
        sprite: 'okonkwo-neutral',
    },

    personality: {
        traits: ['Brilliant', 'Demanding', 'Fair', 'Deeply principled'],
        teachingStyle: 'High expectations with high reward - pushes you to your limits, then shows you that you can exceed them',
        stressResponse: 'Becomes more focused, colder, makes the hard calls without flinching',
    },

    background: {
        medSchool: 'University of Ibadan, Nigeria; Residency at Johns Hopkins',
        specialty: 'Emergency Medicine, Pediatric EM Fellowship',
        yearsExperience: 22,
        backstory: "Came to America with $200 and a dream. Now runs the EM residency program. Known for producing excellent physicians. Her approval feels like winning an award. Her disappointment feels worse than failure.",
    },

    relationshipDefaults: {
        professional: 0,
        personal: -1, // Starts slightly distant - must be earned
        professionalMax: 10,
        personalMax: 8, // Maintains some professional distance
    },

    dialogueTriggers: {
        firstMeeting: 'okonkwo-intro',
        highProfessional: 'okonkwo-impressed',
        lowProfessional: 'okonkwo-disappointed',
        teachableMoment: 'okonkwo-teaching',
        critical: 'okonkwo-crisis-mode',
    },

    teachingMoments: [
        {
            id: 'medicine-is-people',
            title: 'Medicine Is People',
            lesson: "You are not treating a disease. You are treating a person with a disease. Never forget that.",
            unlockedBy: 'Showing genuine care for a patient beyond their diagnosis',
        },
        {
            id: 'excellence-is-habit',
            title: 'Excellence Is a Habit',
            lesson: "Do it right every time, not just when someone is watching. It becomes who you are.",
            unlockedBy: 'Demonstrating consistent attention to detail',
        },
        {
            id: 'hard-choices',
            title: 'The Hard Choices',
            lesson: "Sometimes there is no good choice. You pick the least bad one and live with it.",
            unlockedBy: 'Witnessing her make a difficult triage decision',
        },
    ],

    voiceLines: {
        greeting: [
            "[acknowledgement nod]",
            "You're early. Good.",
            "Let's see what you've learned.",
        ],
        teaching: [
            "Explain your reasoning.",
            "Is that your final answer?",
            "Think harder. You know this.",
            "What would you do if no one was here to help you?",
        ],
        praise: [
            "Acceptable.",
            "Good work.",
            "That was... well done.",
            "[rare smile] You're learning.",
        ],
        disappointment: [
            "I expected more from you.",
            "[long pause] We'll discuss this later.",
            "Are you satisfied with that answer?",
        ],
        crisis: [
            "Focus. What do we do first?",
            "Everyone has a job. Do yours.",
            "No time for doubt. Decide.",
        ],
    },

    uniqueDialogue: {
        philosophy: "In Nigeria, we had fewer resources but we had to be more resourceful. American medicine has many tools. The question is whether you have the wisdom to use them.",
        aboutMistakes: "Everyone makes mistakes. The good doctors learn from them. The great doctors learn from others' mistakes. The dangerous doctors learn from neither.",
        aboutTheJob: "This job will try to break you. Some days it will succeed. Get up anyway.",
    },
};

export default drOkonkwo;
