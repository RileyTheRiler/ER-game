// src/data/dialogues/mrsMartinezHistory.ts
// Complete dialogue tree for Mrs. Martinez patient encounter

import type { DialogueTree, DialogueNode, DialogueChoice } from '@/store/dialogueStore';

// ============================================
// DIALOGUE TREE
// ============================================

export const mrsMartinezDialogue: DialogueTree = {
    id: 'mrs-martinez-history',
    title: 'Taking History - Mrs. Martinez',
    startNode: 'enter-room',
    nodes: {
        // ========================================
        // INITIAL ENCOUNTER
        // ========================================
        'enter-room': {
            id: 'enter-room',
            speaker: 'NARRATOR',
            text: 'You knock on the door of Room 4 and enter. Mrs. Martinez is sitting on the stretcher in a hospital gown, arms crossed, looking annoyed. A younger woman—her daughter, maybe—sits in the corner, scrolling through her phone.',
            autoAdvance: { delay: 3000, nextNode: 'patient-annoyed' },
        },

        'patient-annoyed': {
            id: 'patient-annoyed',
            speaker: 'Mrs. Martinez',
            speakerMood: 'annoyed',
            text: "Finally. I've been waiting forty-five minutes.",
            internalVoices: [
                {
                    skillId: 'BEDSIDE',
                    skillName: 'Bedside',
                    voiceName: 'THE HEALER',
                    text: "She's not being mean. She's scared. People get sharp when they're scared.",
                    priority: 7,
                    category: 'SOCIAL',
                },
            ],
            choices: [
                {
                    id: 'intro-apologetic',
                    text: "I'm sorry for the wait. I'm Alex, a medical student working with the team today. Can you tell me what brought you in?",
                    leadsTo: 'intro-success',
                    skillCheck: { skillId: 'COMMUNICATION', dc: 6 },
                },
                {
                    id: 'intro-direct',
                    text: "Mrs. Martinez, I understand you're having chest pain. Can you describe it for me?",
                    leadsTo: 'intro-direct-response',
                    skillCheck: { skillId: 'HISTORY', dc: 6 },
                },
                {
                    id: 'intro-empathy',
                    text: 'Before we talk about your symptoms, how are you feeling right now?',
                    leadsTo: 'intro-empathy-response',
                    skillCheck: { skillId: 'EMPATHY', dc: 8 },
                    requiresSkill: { skillId: 'EMPATHY', minLevel: 1 },
                },
                {
                    id: 'intro-freeze',
                    text: '[Stay silent, frozen]',
                    leadsTo: 'intro-freeze-response',
                    skillCheck: { skillId: 'COMPOSURE', dc: 8 },
                },
            ],
        },

        // ========================================
        // INTRO RESPONSES
        // ========================================
        'intro-success': {
            id: 'intro-success',
            speaker: 'Mrs. Martinez',
            speakerMood: 'softening',
            text: "[softening slightly] A student. Great. Is there an actual doctor coming, or...?",
            autoAdvance: { delay: 2000, nextNode: 'daughter-interjects' },
        },

        'daughter-interjects': {
            id: 'daughter-interjects',
            speaker: 'Daughter',
            text: 'Mom. Be nice.',
            autoAdvance: { delay: 1500, nextNode: 'patient-opens-up' },
        },

        'patient-opens-up': {
            id: 'patient-opens-up',
            speaker: 'Mrs. Martinez',
            speakerMood: 'resigned',
            text: "[sighing] Fine. It's probably nothing. I've just had this... pressure. Here.",
            internalVoices: [
                {
                    skillId: 'MEMORY',
                    skillName: 'Memory',
                    voiceName: 'THE STUDENT',
                    text: "Pressure. Not 'pain.' That's cardiac language. Women often describe it differently.",
                    priority: 8,
                    category: 'PSYCHOLOGICAL',
                },
            ],
            autoAdvance: { delay: 2500, nextNode: 'history-hub' },
        },

        'intro-direct-response': {
            id: 'intro-direct-response',
            speaker: 'Mrs. Martinez',
            speakerMood: 'guarded',
            text: "Yes, well, it's more like pressure than pain. Started about two hours ago. Can we just get this over with?",
            autoAdvance: { delay: 2000, nextNode: 'history-hub' },
        },

        'intro-empathy-response': {
            id: 'intro-empathy-response',
            speaker: 'Mrs. Martinez',
            speakerMood: 'surprised',
            text: "[pausing, eyes softening] I... I'm scared, honestly. I keep telling myself it's nothing, but...",
            internalVoices: [
                {
                    skillId: 'EMPATHY',
                    skillName: 'Empathy',
                    voiceName: 'THE MIRROR',
                    text: 'There it is. The fear behind the irritation. You broke through.',
                    priority: 9,
                    category: 'SOCIAL',
                },
            ],
            autoAdvance: { delay: 2500, nextNode: 'history-hub' },
        },

        'intro-freeze-response': {
            id: 'intro-freeze-response',
            speaker: 'Mrs. Martinez',
            speakerMood: 'impatient',
            text: "...Well? Are you going to say something, or are we just going to stand here?",
            internalVoices: [
                {
                    skillId: 'COMPOSURE',
                    skillName: 'Composure',
                    voiceName: 'THE PROFESSIONAL',
                    text: "Breathe. Recover. Say something. Anything.",
                    priority: 8,
                    category: 'PSYCHOLOGICAL',
                },
            ],
            choices: [
                {
                    id: 'recover',
                    text: "Sorry—I'm gathering my thoughts. Let's start with what brought you in today.",
                    leadsTo: 'patient-opens-up',
                },
            ],
        },

        // ========================================
        // HISTORY TAKING HUB
        // ========================================
        'history-hub': {
            id: 'history-hub',
            speaker: 'NARRATOR',
            text: 'She puts her hand flat on her chest, center of her sternum. You need to gather more information.',
            choices: [
                {
                    id: 'ask-onset',
                    text: 'When did this start?',
                    leadsTo: 'answer-onset',
                },
                {
                    id: 'ask-quality',
                    text: 'What does it feel like—sharp, dull, pressure?',
                    leadsTo: 'answer-quality',
                },
                {
                    id: 'ask-radiation',
                    text: 'Does it go anywhere—your arm, your jaw, your back?',
                    leadsTo: 'answer-radiation',
                },
                {
                    id: 'ask-severity',
                    text: 'How bad is it on a scale of 1-10?',
                    leadsTo: 'answer-severity',
                },
                {
                    id: 'ask-modifying',
                    text: 'Does anything make it better or worse?',
                    leadsTo: 'answer-modifying',
                },
                {
                    id: 'ask-associated',
                    text: 'Any other symptoms—nausea, sweating, shortness of breath?',
                    leadsTo: 'answer-associated',
                },
                {
                    id: 'ask-pmh',
                    text: 'Do you have any heart problems, diabetes, high blood pressure?',
                    leadsTo: 'answer-pmh',
                },
                {
                    id: 'ask-family',
                    text: 'Does heart disease run in your family?',
                    leadsTo: 'answer-family',
                },
                {
                    id: 'decision-point',
                    text: "[Conclude history - you've gathered enough information]",
                    leadsTo: 'decision-hub',
                    requiresSkill: { skillId: 'HISTORY', minLevel: 0 },
                },
            ],
        },

        // ========================================
        // HISTORY ANSWERS
        // ========================================
        'answer-onset': {
            id: 'answer-onset',
            speaker: 'Mrs. Martinez',
            text: 'About two hours ago. I was making breakfast, and it just... started.',
            internalVoices: [
                {
                    skillId: 'DIFFERENTIAL',
                    skillName: 'Differential',
                    voiceName: 'THE LIST-MAKER',
                    text: 'Onset at rest. Not exertional. Could still be unstable angina or NSTEMI.',
                    priority: 5,
                    category: 'CLINICAL',
                },
            ],
            autoAdvance: { delay: 2000, nextNode: 'history-hub' },
            onEnter: [
                { type: 'BOARD_ENTRY', value: { type: 'SYMPTOM', content: 'Onset at rest (2 hours ago)', source: 'History' } },
            ],
        },

        'answer-quality': {
            id: 'answer-quality',
            speaker: 'Mrs. Martinez',
            text: "It's not really pain, exactly. More like... someone's sitting on my chest. Pressure.",
            internalVoices: [
                {
                    skillId: 'MEMORY',
                    skillName: 'Memory',
                    voiceName: 'THE STUDENT',
                    text: "Pressure, not pain. Classic cardiac description. Women especially describe it this way.",
                    priority: 8,
                    category: 'PSYCHOLOGICAL',
                },
            ],
            autoAdvance: { delay: 2000, nextNode: 'history-hub' },
            onEnter: [
                { type: 'BOARD_ENTRY', value: { type: 'SYMPTOM', content: 'Chest pressure (not sharp pain)', source: 'History' } },
            ],
        },

        'answer-radiation': {
            id: 'answer-radiation',
            speaker: 'Mrs. Martinez',
            speakerMood: 'hesitant',
            text: '[hesitates] My jaw, maybe? I thought it was a toothache at first.',
            internalVoices: [
                {
                    skillId: 'INSTINCT',
                    skillName: 'Instinct',
                    voiceName: 'THE GUT',
                    text: 'Jaw pain. That\'s a red flag. Pay attention.',
                    priority: 9,
                    category: 'PSYCHOLOGICAL',
                },
            ],
            autoAdvance: { delay: 2000, nextNode: 'history-hub' },
            onEnter: [
                { type: 'BOARD_ENTRY', value: { type: 'SYMPTOM', content: 'Radiation to jaw', source: 'History' } },
            ],
        },

        'answer-severity': {
            id: 'answer-severity',
            speaker: 'Mrs. Martinez',
            text: "I don't know, maybe a 4? It's not that bad. I'm probably wasting your time.",
            internalVoices: [
                {
                    skillId: 'EMPATHY',
                    skillName: 'Empathy',
                    voiceName: 'THE MIRROR',
                    text: "She's minimizing. Patients often downplay symptoms when they're scared of the answer.",
                    priority: 6,
                    category: 'SOCIAL',
                },
            ],
            autoAdvance: { delay: 2000, nextNode: 'history-hub' },
        },

        'answer-modifying': {
            id: 'answer-modifying',
            speaker: 'Mrs. Martinez',
            text: "Not really. Tums didn't help.",
            internalVoices: [
                {
                    skillId: 'DIFFERENTIAL',
                    skillName: 'Differential',
                    voiceName: 'THE LIST-MAKER',
                    text: "No relief from antacids. Less likely to be GERD. Keep ACS high on the list.",
                    priority: 5,
                    category: 'CLINICAL',
                },
            ],
            autoAdvance: { delay: 2000, nextNode: 'history-hub' },
            onEnter: [
                { type: 'BOARD_ENTRY', value: { type: 'SYMPTOM', content: 'No relief from antacids', source: 'History' } },
            ],
        },

        'answer-associated': {
            id: 'answer-associated',
            speaker: 'Mrs. Martinez',
            text: "I've been a little sweaty. But it's hot in here.",
            internalVoices: [
                {
                    skillId: 'DOUBT',
                    skillName: 'Doubt',
                    voiceName: 'THE CRITIC',
                    text: "It's not that hot in here.",
                    priority: 7,
                    category: 'PSYCHOLOGICAL',
                },
            ],
            autoAdvance: { delay: 2000, nextNode: 'history-hub' },
            onEnter: [
                { type: 'BOARD_ENTRY', value: { type: 'SYMPTOM', content: 'Diaphoresis (sweating)', source: 'History' } },
            ],
        },

        'answer-pmh': {
            id: 'answer-pmh',
            speaker: 'Mrs. Martinez',
            text: 'I have type 2 diabetes. And high blood pressure, but I take medication for that.',
            internalVoices: [
                {
                    skillId: 'MEMORY',
                    skillName: 'Memory',
                    voiceName: 'THE STUDENT',
                    text: 'Diabetes. Diabetics have atypical presentations. They can have silent MIs. This is not nothing.',
                    priority: 8,
                    category: 'PSYCHOLOGICAL',
                },
            ],
            autoAdvance: { delay: 2000, nextNode: 'history-hub' },
            onEnter: [
                { type: 'BOARD_ENTRY', value: { type: 'FINDING', content: 'PMH: Diabetes, Hypertension', source: 'History' } },
            ],
        },

        'answer-family': {
            id: 'answer-family',
            speaker: 'Mrs. Martinez',
            text: 'My father had a heart attack at 55.',
            internalVoices: [
                {
                    skillId: 'INSTINCT',
                    skillName: 'Instinct',
                    voiceName: 'THE GUT',
                    text: 'This woman is having a heart attack. Do something.',
                    priority: 10,
                    category: 'PSYCHOLOGICAL',
                },
                {
                    skillId: 'COMPOSURE',
                    skillName: 'Composure',
                    voiceName: 'THE PROFESSIONAL',
                    text: "Don't panic. You're a student. Go get the resident.",
                    priority: 9,
                    category: 'PSYCHOLOGICAL',
                },
            ],
            autoAdvance: { delay: 2000, nextNode: 'history-hub' },
            onEnter: [
                { type: 'BOARD_ENTRY', value: { type: 'FINDING', content: 'Family Hx: Father MI at 55', source: 'History' } },
            ],
        },

        // ========================================
        // DECISION POINT
        // ========================================
        'decision-hub': {
            id: 'decision-hub',
            speaker: 'NARRATOR',
            text: "You've gathered the history. Mrs. Martinez is watching you, waiting. What do you do next?",
            internalVoices: [
                {
                    skillId: 'HUMANITY',
                    skillName: 'Humanity',
                    voiceName: 'THE PERSON',
                    text: "She's scared. Look at her hands—she's gripping the rail.",
                    priority: 6,
                    category: 'PSYCHOLOGICAL',
                },
                {
                    skillId: 'COMPOSURE',
                    skillName: 'Composure',
                    voiceName: 'THE PROFESSIONAL',
                    text: "You need to go get Jimmy. Now. But you can't scare her.",
                    priority: 8,
                    category: 'PSYCHOLOGICAL',
                },
            ],
            choices: [
                {
                    id: 'decision-escalate',
                    text: "Mrs. Martinez, I want to get my supervising resident to take a look at you. I'll be right back.",
                    leadsTo: 'escalate-success',
                    skillCheck: { skillId: 'COMMUNICATION', dc: 6 },
                },
                {
                    id: 'decision-order-ekg',
                    text: "I'm going to order an EKG right now. Don't move.",
                    leadsTo: 'order-ekg-response',
                    skillCheck: { skillId: 'HIERARCHY', dc: 10 },
                },
                {
                    id: 'decision-blurt',
                    text: 'I think you might be having a heart attack.',
                    leadsTo: 'blurt-response',
                },
                {
                    id: 'decision-dismiss',
                    text: "It's probably just heartburn. Try to relax.",
                    leadsTo: 'dismiss-response',
                },
            ],
        },

        // ========================================
        // DECISION OUTCOMES
        // ========================================
        'escalate-success': {
            id: 'escalate-success',
            speaker: 'NARRATOR',
            text: "You step out of the room, heart pounding. Jimmy is at the nurses' station, typing.",
            autoAdvance: { delay: 2000, nextNode: 'present-to-jimmy' },
        },

        'present-to-jimmy': {
            id: 'present-to-jimmy',
            speaker: 'PLAYER',
            text: "Dr. Reyes? I have a 52-year-old woman in Room 4, chest pressure for two hours, radiating to her jaw, diaphoretic, diabetic, hypertensive, family history of early MI. I'm worried about ACS.",
            internalVoices: [
                {
                    skillId: 'COMPOSURE',
                    skillName: 'Composure',
                    voiceName: 'THE PROFESSIONAL',
                    text: "Walk. Don't run. Don't scare the patient. Don't scare yourself.",
                    priority: 7,
                    category: 'PSYCHOLOGICAL',
                },
            ],
            choices: [
                {
                    id: 'diff-check',
                    text: '[DIFFERENTIAL check to present the case correctly]',
                    leadsTo: 'jimmy-response-good',
                    skillCheck: { skillId: 'DIFFERENTIAL', dc: 10 },
                },
            ],
        },

        'jimmy-response-good': {
            id: 'jimmy-response-good',
            speaker: 'Jimmy',
            speakerMood: 'alert',
            text: "Okay. Good pickup. Let's go.",
            autoAdvance: { delay: 1500, nextNode: 'jimmy-moving' },
            onEnter: [
                { type: 'RELATIONSHIP', target: 'jimmy', value: 1 },
                { type: 'XP', value: 50 },
            ],
        },

        'jimmy-moving': {
            id: 'jimmy-moving',
            speaker: 'NARRATOR',
            text: "He's already moving. You follow.",
            autoAdvance: { delay: 1500, nextNode: 'jimmy-asks-ekg' },
        },

        'jimmy-asks-ekg': {
            id: 'jimmy-asks-ekg',
            speaker: 'Jimmy',
            speakerMood: 'focused',
            text: '[over his shoulder] Did you get an EKG?',
            choices: [
                {
                    id: 'admit-no-ekg',
                    text: 'No, I—',
                    leadsTo: 'jimmy-orders-ekg',
                },
            ],
        },

        'jimmy-orders-ekg': {
            id: 'jimmy-orders-ekg',
            speaker: 'Jimmy',
            text: "[to the nurses' station] Maria, I need an EKG in Room 4, stat. And put her on a monitor.",
            autoAdvance: { delay: 2000, nextNode: 'lesson-learned' },
        },

        'lesson-learned': {
            id: 'lesson-learned',
            speaker: 'Jimmy',
            speakerMood: 'teaching',
            text: '[to you] You did the right thing. You got me. Now watch.',
            isTerminal: true,
            onEnter: [
                { type: 'LESSON', value: 'lesson-know-your-limits' },
                { type: 'XP', value: 50 },
            ],
        },

        'order-ekg-response': {
            id: 'order-ekg-response',
            speaker: 'Mrs. Martinez',
            speakerMood: 'alarmed',
            text: "Wait, what? You're ordering tests? I thought you were a student—",
            internalVoices: [
                {
                    skillId: 'HIERARCHY',
                    skillName: 'Hierarchy',
                    voiceName: 'THE NAVIGATOR',
                    text: "You overstepped. Technically you can't order anything as a student. But you might be right about needing that EKG...",
                    priority: 8,
                    category: 'SOCIAL',
                },
            ],
            autoAdvance: { delay: 2000, nextNode: 'nurse-intervenes' },
        },

        'nurse-intervenes': {
            id: 'nurse-intervenes',
            speaker: 'Maria',
            speakerMood: 'skeptical',
            text: "[appearing in the doorway] Did someone say stat EKG? Who ordered that?",
            choices: [
                {
                    id: 'backpedal',
                    text: "I'm sorry, I should get Dr. Reyes first—",
                    leadsTo: 'escalate-success',
                },
            ],
        },

        'blurt-response': {
            id: 'blurt-response',
            speaker: 'Mrs. Martinez',
            speakerMood: 'panicked',
            text: "What?! A heart attack?! Oh my God—",
            internalVoices: [
                {
                    skillId: 'COMPOSURE',
                    skillName: 'Composure',
                    voiceName: 'THE PROFESSIONAL',
                    text: "You just made everything worse. Never say 'heart attack' to a patient without confirmation.",
                    priority: 10,
                    category: 'PSYCHOLOGICAL',
                },
            ],
            autoAdvance: { delay: 2000, nextNode: 'daughter-angry' },
        },

        'daughter-angry': {
            id: 'daughter-angry',
            speaker: 'Daughter',
            speakerMood: 'angry',
            text: "You're a student! You can't just say that! Get a real doctor in here!",
            isTerminal: true,
            onEnter: [
                { type: 'RELATIONSHIP', target: 'jimmy', value: -1 },
            ],
        },

        'dismiss-response': {
            id: 'dismiss-response',
            speaker: 'NARRATOR',
            text: "Mrs. Martinez nods, seeming relieved. But something in your gut tells you this isn't right.",
            internalVoices: [
                {
                    skillId: 'INSTINCT',
                    skillName: 'Instinct',
                    voiceName: 'THE GUT',
                    text: 'No. No. This is wrong. You\'re going to regret this.',
                    priority: 10,
                    category: 'PSYCHOLOGICAL',
                },
                {
                    skillId: 'DOUBT',
                    skillName: 'Doubt',
                    voiceName: 'THE CRITIC',
                    text: 'What if you just sent a heart attack patient home thinking she has heartburn?',
                    priority: 9,
                    category: 'PSYCHOLOGICAL',
                },
            ],
            isTerminal: true,
            onEnter: [
                { type: 'FLAG', value: 'missed-stemi' },
            ],
        },
    },
};

export default mrsMartinezDialogue;
