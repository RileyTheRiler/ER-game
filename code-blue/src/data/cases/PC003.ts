import { PatientCase } from '../../types/PatientCase';

const PC003: PatientCase = {
    id: 'PC003',
    title: 'Sarah Chen',
    description: '42F, Severe headache',
    difficulty: 'Medium',
    startNodeId: 'start',
    initialState: {
        vitals: {
            HR: 88, BP_SYS: 168, BP_DIA: 95, O2: 98, TEMP: 98.9, RR: 16, PAIN: 5
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
            text: `**Presentation**:

 42 y/o F, c/o headache x 4 hours. States it came on suddenly while at work. 

 Patient appears uncomfortable but alert and oriented.

**The Trap**: She has a migraine history. It's tempting to assume this is "just another migraine." She's alert and talking, so how bad can it be? The phrase "worst headache of my life" is the critical clue that elevates this beyond migraine.

**The Reality**: She has a subarachnoid hemorrhage from a ruptured aneurysm. Without treatment, she may rebleed and die within hours.`,
            options: [
                {
                    id: 'history',
                    text: 'Take History',
                    type: 'DIALOGUE',
                    nextNodeId: 'do_exam'
                },
                {
                    id: 'vitals',
                    text: 'Check Vitals',
                    type: 'MEDICAL',
                    nextNodeId: 'start'
                }
            ]
        },
        'do_exam': {
            id: 'do_exam',
            text: "You perform the physical exam. Findings are consistent with the presentation.",
            options: [
                {
                    id: 'diagnosis',
                    text: 'Make Diagnosis',
                    type: 'MEDICAL',
                    nextNodeId: 'win'
                }
            ]
        },
        'win': {
            id: 'win',
            text: "You correctly diagnosed and treated the patient. Good work.",
            options: [],
            isTerminal: true,
            onEnter: [{ type: 'WIN', description: 'Case Resolved' }]
        }
    }
};

export default PC003;