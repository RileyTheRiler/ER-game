// src/data/npcs/maria.ts
// Maria Santos - Senior ER Nurse, Department Veteran

import type { NPC } from '@/types/character';

export const maria: NPC = {
    id: 'maria',
    name: 'Maria Santos',
    nickname: 'Maria',
    role: 'Senior ER Nurse (20 years)',

    appearance: {
        description: "Late 40s, Latina, silver streaks in dark hair pulled back in a practical bun. Always moving efficiently. Has a way of looking at you that makes you feel either completely trusted or completely seen through.",
        sprite: 'maria-neutral',
    },

    personality: {
        traits: ['No-nonsense', 'Protective of patients', 'Secretly maternal', 'Dark humor'],
        teachingStyle: 'Shows you once, expects you to remember, but will quietly help if you ask nicely',
        stressResponse: 'Becomes hyper-efficient, commands the room, takes no prisoners',
    },

    background: {
        specialty: 'Emergency Nursing',
        yearsExperience: 20,
        backstory: "Started as a new grad in this ER and never left. Has seen attendings come and go. Knows more about emergency medicine than half the residents but never makes a big deal of it. Her good opinion is hard to earn and priceless when you do.",
    },

    relationshipDefaults: {
        professional: 0,
        personal: 0,
        professionalMax: 10,
        personalMax: 10,
    },

    dialogueTriggers: {
        firstMeeting: 'maria-intro',
        highProfessional: 'maria-respect',
        lowProfessional: 'maria-skeptical',
        highPersonal: 'maria-mentor',
        busy: 'maria-busy',
    },

    teachingMoments: [
        {
            id: 'nurses-are-your-eyes',
            title: 'Nurses Are Your Eyes',
            lesson: "When a nurse tells you something's wrong, believe them. They see what you miss.",
            unlockedBy: 'Trusting her judgment on a deteriorating patient',
        },
        {
            id: 'respect-earned',
            title: 'Respect Is Earned',
            lesson: "Help with the small things. Hold the stretcher. Get the warm blanket. It matters.",
            unlockedBy: 'Helping with tasks below your station',
        },
    ],

    voiceLines: {
        greeting: [
            "New student? Don't just stand there.",
            "You the new one? Good. We need the help.",
            "[looks you up and down] You'll do.",
        ],
        teaching: [
            "Watch. I'll only show you once.",
            "That's not how we do it here.",
            "Good. Now do it faster.",
        ],
        praise: [
            "[nods approvingly]",
            "You're not completely useless.",
            "I see potential. Don't waste it.",
        ],
        concern: [
            "You're pale. When did you last eat?",
            "Go sit down for five minutes. That's an order.",
            "I've seen that look. Talk to someone.",
        ],
        busy: [
            "Not now, mijo.",
            "Unless someone's dying, it can wait.",
            "[already walking away]",
        ],
    },

    uniqueDialogue: {
        aboutJimmy: "Dr. Reyes? He's good. Works too hard, but they all do. At least he listens.",
        aboutOkonkwo: "Dr. O? Brilliant. Terrifying. You'll learn more from her in one shift than a month anywhere else.",
        advice: "You want my advice? Watch. Listen. And never lie to me about a patient's condition.",
    },
};

export default maria;
