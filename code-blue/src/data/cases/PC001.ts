import { PatientCase } from '../../types/PatientCase';

const PC001: PatientCase = {
    id: 'PC001',
    title: 'Elena Martinez',
    description: '52F c/o Chest Pain. "Pressure" not pain.',
    difficulty: 'Medium',
    startNodeId: 'start',
    initialState: {
        vitals: {
            HR: 96,
            BP_SYS: 142,
            BP_DIA: 88,
            O2: 98,
            TEMP: 37,
            RR: 18,
            PAIN: 4
        },
        flags: [],
        inventory: [],
        history: [],
        stress: 0,
        timeElapsed: 0,
        relationships: {}
    },
    nodes: {
        'start': {
            id: 'start',
            text: "Mrs. Martinez is sitting on the stretcher in a hospital gown, arms crossed, looking annoyed. A younger woman—her daughter—sits in the corner, scrolling through her phone. \n\nMRS. MARTINEZ: Finally. I've been waiting forty-five minutes.",
            options: [
                {
                    id: 'intro_student',
                    text: '"I\'m sorry for the wait. I\'m Alex, a medical student working with the team today. Can you tell me what brought you in?"',
                    type: 'DIALOGUE',
                    nextNodeId: 'history_start',
                    timeCost: 1
                },
                {
                    id: 'intro_direct',
                    text: '"Mrs. Martinez, I understand you\'re having chest pain. Can you describe it for me?"',
                    type: 'DIALOGUE',
                    nextNodeId: 'history_start',
                    timeCost: 1
                },
                {
                    id: 'intro_empathy',
                    text: '"Before we talk about your symptoms, how are you feeling right now?"',
                    type: 'DIALOGUE',
                    nextNodeId: 'history_empathy',
                    timeCost: 2
                }
            ]
        },
        'history_empathy': {
            id: 'history_empathy',
            text: "MRS. MARTINEZ: [softening] I'm just tired. And this pressure is... uncomfortable. I don't like hospitals.",
            options: [
                {
                    id: 'continue_history',
                    text: '"I understand. We\'ll try to be quick. Tell me about the pressure."',
                    type: 'DIALOGUE',
                    nextNodeId: 'history_start',
                    effects: [{ type: 'ADD_FLAG', key: 'RAPPORT_BUILT' }]
                }
            ]
        },
        'history_start': {
            id: 'history_start',
            text: "You begin taking the history. What do you want to ask?",
            options: [
                {
                    id: 'ask_onset',
                    text: '"When did this start?"',
                    type: 'DIALOGUE',
                    timeCost: 1,
                    nextNodeId: 'history_response_onset',
                    effects: [{ type: 'ADD_FLAG', key: 'ASKED_ONSET' }]
                },
                {
                    id: 'ask_quality',
                    text: '"What does it feel like?"',
                    type: 'DIALOGUE',
                    timeCost: 1,
                    nextNodeId: 'history_response_quality',
                    effects: [{ type: 'ADD_FLAG', key: 'ASKED_QUALITY' }]
                },
                {
                    id: 'ask_radiation',
                    text: '"Does the pain go anywhere else?"',
                    type: 'DIALOGUE',
                    timeCost: 1,
                    nextNodeId: 'history_response_radiation',
                    effects: [{ type: 'ADD_FLAG', key: 'ASKED_RADIATION' }]
                },
                {
                    id: 'ask_history',
                    text: '"Do you have any medical history like diabetes or high blood pressure?"',
                    type: 'DIALOGUE',
                    timeCost: 1,
                    nextNodeId: 'history_response_pmh',
                    effects: [{ type: 'ADD_FLAG', key: 'ASKED_PMH' }]
                },
                {
                    id: 'finish_history',
                    text: '[Finish History] "I think I have enough information."',
                    type: 'DIALOGUE',
                    nextNodeId: 'decision_point',
                    reqs: [{ type: 'FLAG', key: 'ASKED_QUALITY' }] // Minimum req
                }
            ]
        },
        // Response Nodes 
        'history_response_onset': {
            id: 'history_response_onset',
            text: "MRS. MARTINEZ: About two hours ago. I was making breakfast, and it just... started.",
            options: [{ id: 'back', text: 'Ask another question', type: 'DIALOGUE', nextNodeId: 'history_start' }]
        },
        'history_response_quality': {
            id: 'history_response_quality',
            text: "MRS. MARTINEZ: It's not really pain, exactly. More like... someone's sitting on my chest. Pressure.",
            options: [{ id: 'back', text: 'Ask another question', type: 'DIALOGUE', nextNodeId: 'history_start' }]
        },
        'history_response_radiation': {
            id: 'history_response_radiation',
            text: "MRS. MARTINEZ: My jaw, maybe? I thought it was a toothache at first.",
            options: [{ id: 'back', text: 'Ask another question', type: 'DIALOGUE', nextNodeId: 'history_start' }]
        },
        'history_response_pmh': {
            id: 'history_response_pmh',
            text: "MRS. MARTINEZ: I have type 2 diabetes. And high blood pressure, but I take medication for that. My father had a heart attack at 55.",
            options: [{ id: 'back', text: 'Ask another question', type: 'DIALOGUE', nextNodeId: 'history_start' }]
        },

        'decision_point': {
            id: 'decision_point',
            text: "You have your history. Mrs. Martinez looks pale. \n\nRISK FACTORS:\n- 52F\n- Diabetes\n- Hypertension\n- Family History\n\nSYMPTOMS:\n- Chest Pressure\n- Jaw Pain\n\nWhat do you do?",
            options: [
                {
                    id: 'escalate_resident',
                    text: '"I want to get my supervising resident to take a look at you. I\'ll be right back."',
                    type: 'DIALOGUE',
                    nextNodeId: 'resident_success',
                    timeCost: 2,
                    effects: [{ type: 'MODIFY_RELATIONSHIP', key: 'JIMMY', value: 1, target: 'PROFESSIONAL' }]
                },
                {
                    id: 'order_ekg_self',
                    text: '"I\'m going to order an EKG right now. Don\'t move."',
                    type: 'MEDICAL',
                    nextNodeId: 'resident_annoyed',
                    timeCost: 5,
                    effects: [{ type: 'MODIFY_RELATIONSHIP', key: 'JIMMY', value: -1, target: 'PROFESSIONAL' }]
                },
                {
                    id: 'discharge',
                    text: '"It\'s probably just heartburn. Try to relax."',
                    type: 'MEDICAL',
                    nextNodeId: 'game_over_missed',
                    timeCost: 0
                }
            ]
        },

        'resident_success': {
            id: 'resident_success',
            text: "You find Jimmy. \nYOU: Dr. Reyes? 52F, chest pressure radiating to jaw, diabetic, family history. I'm worried about ACS.\n\nJIMMY: Okay. Good pickup. Let's go. Maria, get an EKG stat.",
            options: [{ id: 'view_ekg', text: 'View EKG', type: 'EXAM', nextNodeId: 'interpret_ekg' }]
        },
        'resident_annoyed': {
            id: 'resident_annoyed',
            text: "You order the EKG yourself. Jimmy sees you. \nJIMMY: Hey, next time run it by me first? But let's see what you got.",
            options: [{ id: 'view_ekg', text: 'View EKG', type: 'EXAM', nextNodeId: 'interpret_ekg' }]
        },

        'interpret_ekg': {
            id: 'interpret_ekg',
            text: "[EKG IMAGE SHOWS: ST Elevations in II, III, aVF]\n\nJIMMY: What do you see?",
            options: [
                {
                    id: 'stemi_call',
                    text: '"ST elevations in the inferior leads. This is a STEMI."',
                    type: 'MEDICAL',
                    nextNodeId: 'win_stemi',
                    effects: [{ type: 'WIN', description: 'Correct Diagnosis: Inferior STEMI' }]
                },
                {
                    id: 'unsure',
                    text: '"It looks irregular? I\'m not sure."',
                    type: 'DIALOGUE',
                    nextNodeId: 'jimmy_explains'
                }
            ]
        },

        'win_stemi': {
            id: 'win_stemi',
            text: "JIMMY: Yeah. It is. Call a STEMI alert.\n\nThe team rushes in. You caught it in time.\n\n[CASE COMPLETE]",
            options: [],
            isTerminal: true
        },
        'jimmy_explains': {
            id: 'jimmy_explains',
            text: "JIMMY: Look at leads II, III, and aVF. See the lift? That's an inferior STEMI. Good thing we checked. \n\n[CASE COMPLETE - PARTIAL CREDIT]",
            options: [],
            isTerminal: true
        },
        'game_over_missed': {
            id: 'game_over_missed',
            text: "You reassure her it's nothing. \n\n2 HOURS LATER: Mrs. Martinez codes in the waiting room. Massive cardiac arrest. \n\n[GAME OVER]",
            options: [],
            effects: [{ type: 'GAME_OVER' }],
            isTerminal: true
        }
    }
};

export default PC001;
