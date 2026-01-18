import { PatientCase } from '../../types/PatientCase';

const PC093: PatientCase = {
    id: 'PC093',
    title: 'Sister Grace',
    description: 'Catholic Nun complaining of severe eye redness and discharge.',
    difficulty: 'Medium',
    startNodeId: 'start',
    initialState: {
        vitals: {
            HR: 72, BP_SYS: 120, BP_DIA: 80, O2: 98, TEMP: 37, RR: 14, PAIN: 3
        },
        flags: [],
        inventory: [],
        history: [],
        stress: 0,
        timeElapsed: 0,
        relationships: { 'SISTER_GRACE': 0 }
    },
    nodes: {
        'start': {
            id: 'start',
            text: "Sister Grace sits patiently in the chair. Her left eye is swollen shut, oozing purulent discharge. She is wearing her full habit.\n\nSISTER GRACE: It started yesterday as an itch, and now I can barely open it. I suspect it is pink eye.",
            options: [
                {
                    id: 'culture',
                    text: 'Swab the discharge for culture and gram stain.',
                    type: 'MEDICAL',
                    nextNodeId: 'lab_results',
                    timeCost: 10
                },
                {
                    id: 'prescribe_drops',
                    text: 'Prescribe Tobramycin drops for bacterial conjunctivitis.',
                    type: 'MEDICAL',
                    nextNodeId: 'misdiagnosis',
                    timeCost: 5
                }
            ]
        },
        'lab_results': {
            id: 'lab_results',
            text: "LAB REPORT:\nGram-negative intracellular diplococci identified.\n\nYour resident, Jimmy, looks at the chart.\nJIMMY: That's Gonorrhea. Neisseria gonorrhoeae. But... she's a nun.",
            options: [
                {
                    id: 'retest',
                    text: '"Must be a lab error. Run it again."',
                    type: 'MEDICAL',
                    nextNodeId: 'lab_confirm',
                    timeCost: 30
                },
                {
                    id: 'ask_sexual',
                    text: 'Ask Sister Grace about her sexual history.',
                    type: 'DIALOGUE',
                    nextNodeId: 'offend_patient'
                },
                {
                    id: 'think_environ',
                    text: '"It can spread via fomites. Ask about her work."',
                    type: 'DIALOGUE',
                    nextNodeId: 'history_work'
                }
            ]
        },
        'lab_confirm': {
            id: 'lab_confirm',
            text: "LAB REPORT (REPEAT): Confirmed Neisseria gonorrhoeae.\n\nJIMMY: It's not an error. How do we tell her?",
            options: [
                {
                    id: 'ask_sexual_2',
                    text: '"Sister, be honest. have you been sexually active?"',
                    type: 'DIALOGUE',
                    nextNodeId: 'offend_patient'
                },
                {
                    id: 'think_environ_2',
                    text: 'Ask about environment/linens.',
                    type: 'DIALOGUE',
                    nextNodeId: 'history_work'
                }
            ]
        },
        'history_work': {
            id: 'history_work',
            text: "YOU: Sister, what exactly is your work at the mission?\n\nSISTER GRACE: I run the laundry service for the men's shelter. We've been overwhelmed lately. I try to wash everything myself.\n\nYOU: Do you wear gloves?\n\nSISTER GRACE: We ran out last week.",
            options: [
                {
                    id: 'explain',
                    text: 'Explain the diagnosis gently.',
                    type: 'DIALOGUE',
                    nextNodeId: 'win_good_dx'
                }
            ]
        },
        'offend_patient': {
            id: 'offend_patient',
            text: "SISTER GRACE: [Standing up] Young doctor, I am married to God. I have kept my vows for forty years. How dare you.\n\nShe storms out.\n\n[GAME OVER - Patient Left Against Medical Advice]",
            options: [],
            isTerminal: true,
            onEnter: [{ type: 'GAME_OVER' }]
        },
        'misdiagnosis': {
            id: 'misdiagnosis',
            text: "You treat for standard pink eye. \n\n3 DAYS LATER: Sister Grace returns with a perforated cornea and permanent vision loss from untreated Gonococcal infection.\n\n[GAME OVER - Malpractice]",
            options: [],
            isTerminal: true,
            onEnter: [{ type: 'GAME_OVER' }]
        },
        'win_good_dx': {
            id: 'win_good_dx',
            text: "SISTER GRACE: From the linens? Oh my. That makes sense. \n\nYou treat with Ceftriaxone IM. The eye heals perfectly.\n\n[CASE COMPLETE]",
            options: [],
            isTerminal: true,
            effects: [{ type: 'WIN', description: 'Correctly diagnosed Gonococcal inclusion conjunctivitis from fomites.' }]
        }
    }
};

export default PC093;
