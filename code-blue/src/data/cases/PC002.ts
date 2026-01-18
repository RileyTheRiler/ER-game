import { PatientCase } from '../../types/PatientCase';

const PC002: PatientCase = {
    id: 'PC002',
    title: 'Marcus Thompson',
    description: '34M, Abdominal pain, need something for the pain',
    difficulty: 'Medium',
    startNodeId: 'start',
    initialState: {
        vitals: {
            HR: 92, BP_SYS: 138, BP_DIA: 88, O2: 99, TEMP: 99.8, RR: 18, PAIN: 5
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
            text: `**EMS/Triage Notes**:

 34 y/o M, ambulatory, c/o abdominal pain. States he needs "something strong for pain." 

 Known to department - multiple prior visits for pain complaints.

 Triage nurse note: "Frequent flyer, drug-seeking behavior suspected."

**The Trap**: Everyone has already decided he's drug-seeking. The triage note biases everyone who reads it. His vital signs are "almost normal." The subtle fever is dismissed or not noticed.

**The Reality**: He has appendicitis. It's early, which is why the presentation is subtle. If missed, it will perforate.`,
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

export default PC002;