import { PatientCase } from '../../types/PatientCase';

const PC091: PatientCase = {
    id: 'PC091',
    title: 'Allen Billings',
    description: 'Male patient with right arm stuck in fixed abduction. "The Nazi Salute".',
    difficulty: 'Medium',
    startNodeId: 'start',
    initialState: {
        vitals: {
            HR: 110, BP_SYS: 145, BP_DIA: 90, O2: 98, TEMP: 37, RR: 20, PAIN: 9
        },
        flags: [],
        inventory: [],
        history: [],
        stress: 0,
        timeElapsed: 0,
        relationships: { 'ROBBY': 0, 'GEN_SURG': 0 }
    },
    nodes: {
        'start': {
            id: 'start',
            text: "Mr. Billings is standing by the bed, his right arm locked straight up in the air. He is sweating profusely.\n\nMR. BILLINGS: I can't put it down! It's stuck! Help me!",
            options: [
                {
                    id: 'assess',
                    text: '"Sir, please sit down. When did this happen?"',
                    type: 'DIALOGUE',
                    nextNodeId: 'history',
                    timeCost: 1
                },
                {
                    id: 'force_down',
                    text: 'Try to pull the arm down.',
                    type: 'MEDICAL',
                    nextNodeId: 'pain_reaction',
                    effects: [{ type: 'MODIFY_VITALS', key: 'HR', value: 130 }, { type: 'MODIFY_VITALS', key: 'PAIN', value: 10 }]
                }
            ]
        },
        'history': {
            id: 'history',
            text: "MR. BILLINGS: I was reaching for a box on the top shelf and I slipped. My arm got caught and then... pop. Now it's locked like this!\n\nROBBY: Look at that. Luxatio Erecta. Inferior Glenohumeral Dislocation. Less than 0.5% of all shoulder dislocations.",
            options: [
                {
                    id: 'exam',
                    text: 'Examine the axilla and check pulses.',
                    type: 'EXAM',
                    nextNodeId: 'exam_results',
                    timeCost: 2
                }
            ]
        },
        'pain_reaction': {
            id: 'pain_reaction',
            text: "Mr. Billings screams in agony. \n\nROBBY: Whoa, easy! You can't force that. It's locked against the acromion. You're going to break something.",
            options: [{ id: 'return_history', text: 'Apologize and take history.', type: 'DIALOGUE', nextNodeId: 'history' }]
        },
        'exam_results': {
            id: 'exam_results',
            text: "Palpation reveals the humeral head in the axilla. Radial pulse is palpable but weak. \n\nConsultant Surgeon Dr. Vane walks by.\nDR. VANE: Luxatio? That needs to go to the OR. Too much risk of neurovascular damage. Book it.",
            options: [
                {
                    id: 'agree_orph',
                    text: '"You\'re right, Dr. Vane. It\'s safer in the OR."',
                    type: 'DIALOGUE',
                    nextNodeId: 'or_transfer',
                    effects: [{ type: 'MODIFY_RELATIONSHIP', key: 'GEN_SURG', value: 2 }, { type: 'MODIFY_RELATIONSHIP', key: 'ROBBY', value: -2, target: 'PROFESSIONAL' }]
                },
                {
                    id: 'side_with_robby',
                    text: 'Look at Robby. "Can we reduce this here?"',
                    type: 'DIALOGUE',
                    nextNodeId: 'robby_plan',
                    effects: [{ type: 'MODIFY_RELATIONSHIP', key: 'ROBBY', value: 1 }]
                }
            ]
        },
        'robby_plan': {
            id: 'robby_plan',
            text: "ROBBY: I am the OR. We can do this. Procedural sedation, convert to anterior, then reduce. You in, or are you scared?",
            options: [
                {
                    id: 'do_procedure',
                    text: '"Let\'s do it. Prepare for sedation."',
                    type: 'MEDICAL',
                    nextNodeId: 'procedure_step1',
                    effects: [{ type: 'ADD_FLAG', key: 'SEDATION_STARTED' }]
                },
                {
                    id: 'back_out',
                    text: '"Dr. Vane is right. Send him up."',
                    type: 'DIALOGUE',
                    nextNodeId: 'or_transfer'
                }
            ]
        },
        'procedure_step1': {
            id: 'procedure_step1',
            text: "Patient is sedated with Propofol. Muscles are relaxed.\n\nROBBY: Okay. Step one: Convert to anterior. You need to push the humeral head up and out while I pull tracking. Hand in the armpit.",
            options: [
                {
                    id: 'maneuver_correct',
                    text: 'Place hand in axilla, push head superiorly while rotating arm.',
                    type: 'PROCEDURE',
                    nextNodeId: 'reduction_success',
                    reqs: [{ type: 'VITAL', key: 'HR', value: 100, operator: '<' }] // Implicit check for sedation depth
                },
                {
                    id: 'pull_hard',
                    text: 'Just pull the arm down hard.',
                    type: 'PROCEDURE',
                    nextNodeId: 'fracture_bad',
                    effects: [{ type: 'GAME_OVER', description: 'Humerus Fracture caused by improper technique.' }]
                }
            ]
        },
        'reduction_success': {
            id: 'reduction_success',
            text: "CLUNK.\n\nThe shoulder slides back into place. The arm falls to the patient's side naturally.\n\nROBBY: Beautiful. Cancel the OR. We're done here.",
            options: [],
            effects: [
                { type: 'MODIFY_RELATIONSHIP', key: 'ROBBY', value: 5, target: 'PROFESSIONAL' },
                { type: 'WIN', description: 'Successful ER Reduction of Luxatio Erecta' }
            ],
            isTerminal: true
        },
        'or_transfer': {
            id: 'or_transfer',
            text: "Patient is transferred to Pre-Op. \n\nROBBY: Fine. Safe choice. Boring, but safe.\n\nThe patient waits 6 hours for an OR slot.",
            options: [],
            effects: [{ type: 'WIN', description: 'Patient treated in OR (Safe but slow)' }],
            isTerminal: true
        },
        'fracture_bad': {
            id: 'fracture_bad',
            text: "CRACK.\n\nROBBY: Damn it! You broke the surgical neck. Now he DOES need the OR, and orthopedics is going to kill us.\n\n[GAME OVER]",
            options: [],
            isTerminal: true
        }
    }
};

export default PC091;
