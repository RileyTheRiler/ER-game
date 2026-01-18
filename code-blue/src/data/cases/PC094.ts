import { PatientCase } from '../../types/PatientCase';

const PC094: PatientCase = {
    id: 'PC094',
    title: 'Barry Mitchell',
    description: 'Adult male, choking. Stridor audible. Universal choking sign.',
    difficulty: 'Hard',
    startNodeId: 'start',
    initialState: {
        vitals: {
            HR: 130, BP_SYS: 160, BP_DIA: 90, O2: 90, TEMP: 37, RR: 30, PAIN: 0
        },
        flags: [],
        inventory: [],
        history: [],
        stress: 0,
        timeElapsed: 0,
        relationships: { 'RESP_THERAPY': 0 }
    },
    nodes: {
        'start': {
            id: 'start',
            text: "EMS rolls in. \nPARAMEDIC: 34yo male, choked on broccoli at dinner. Heimlich failed. We can't bag him adequately. O2 sats falling to 88%.",
            options: [
                {
                    id: 'assess',
                    text: 'Listen to lungs.',
                    type: 'EXAM',
                    nextNodeId: 'exam_stridor',
                    timeCost: 1
                },
                {
                    id: 'immediate_action',
                    text: 'Prepare to intubate.',
                    type: 'MEDICAL',
                    nextNodeId: 'drug_choice'
                }
            ]
        },
        'exam_stridor': {
            id: 'exam_stridor',
            text: "Loud inspiratory stridor. He is drooling and looks terrified. He cannot speak.\n\nROBBY: He's moving air, but barely. If we paralyze him and can't get the tube, he dies.",
            options: [
                {
                    id: 'go_to_drugs',
                    text: '"We need to look. Get the airway cart."',
                    type: 'MEDICAL',
                    nextNodeId: 'drug_choice'
                }
            ]
        },
        'drug_choice': {
            id: 'drug_choice',
            text: "You have two options for sedation/induction.\n\nOption A: RSI (Etomidate + Rocuronium). Standard, but paralytic stops his breathing.\nOption B: Ketamine Only. Sedates, but keeps respiratory drive intact.",
            options: [
                {
                    id: 'choose_rsi',
                    text: 'RSI: Etomidate 20mg + Rocuronium 80mg.',
                    type: 'MEDICAL',
                    nextNodeId: 'rsi_fail',
                    effects: [{ type: 'ADD_FLAG', key: 'PARALYZED' }]
                },
                {
                    id: 'choose_ketamine',
                    text: 'Ketamine Only: 100mg IV.',
                    type: 'MEDICAL',
                    nextNodeId: 'ketamine_success',
                    effects: [{ type: 'ADD_FLAG', key: 'KETAMINE_DISSOCIATION' }]
                }
            ]
        },
        'rsi_fail': {
            id: 'rsi_fail',
            text: "You push the paralytic. He stops breathing. \n\nYOU: Laryngoscope in.\n\nThe throat collapses. You see... nothing but blood and broccoli mush. You try to bag him, but the obstruction is complete now that his muscles are relaxed.\n\nROBBY: Sats are 40%! I can't bag! cric him!\n\nIt's a mess. You eventually get an airway, but he suffered hypoxic brain injury.",
            options: [],
            isTerminal: true,
            onEnter: [{ type: 'GAME_OVER', description: 'Failed Airway. Should have preserved respiratory drive.' }]
        },
        'ketamine_success': {
            id: 'ketamine_success',
            text: "You push the Ketamine. Barry stares into space (nystagmus) but continues to gasp for air. His breathing keeps the airway patent.\n\nYOU: Blade in. I see it. It's a huge floret.\n\nYou grab the Magill Forceps.",
            options: [
                {
                    id: 'pull_it',
                    text: 'Pull the object out.',
                    type: 'PROCEDURE',
                    nextNodeId: 'win'
                }
            ]
        },
        'win': {
            id: 'win',
            text: "You pull out a massive piece of broccoli. Barry takes a huge, deep breath.\n\nSats rise to 100% instantly.\n\nROBBY: Nice call on the Ketamine. If we paralyzed him, that would have been a nightmare.\n\n[CASE COMPLETE]",
            options: [],
            isTerminal: true,
            effects: [{ type: 'WIN', description: 'Successfully removed obstruction using KOL.' }]
        }
    }
};

export default PC094;
