import { PatientCase } from '../../types/PatientCase';

const PC005: PatientCase = {
    id: 'PC005',
    title: 'Robert Hayes',
    description: '68M, Confusion, acting strange',
    difficulty: 'Medium',
    startNodeId: 'start',
    initialState: {
        vitals: {
            HR: 102, BP_SYS: 158, BP_DIA: 88, O2: 97, TEMP: 98.2, RR: 18, PAIN: 5
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

 68 y/o M brought by wife. Found at home "acting confused." 

 Wife reports he's been "not himself" for the past hour, slurred speech, unsteady.

**This is the "easy win" case** - designed for early in the game to teach the altered mental status workup and give the player confidence. The diagnosis is straightforward IF you check a blood glucose.

**The Teaching Moment**: Always check glucose in altered mental status. It takes 30 seconds and can be immediately life-saving.`,
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

export default PC005;