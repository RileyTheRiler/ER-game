import { PatientCase } from '../../types/PatientCase';

const PC004: PatientCase = {
    id: 'PC004',
    title: 'Lily Okonkwo  # No relation to Dr. Okonkwo - different family',
    description: '8F, Crying, won\'t stop, not acting right',
    difficulty: 'Medium',
    startNodeId: 'start',
    initialState: {
        vitals: {
            HR: 165, BP_SYS: 75, BP_DIA: 50, O2: 98, TEMP: 100.2, RR: 32, PAIN: 5
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

 8-month-old F brought by parents. Intermittent crying episodes for past 12 hours.

 Parents state baby draws up legs and screams, then becomes quiet and lethargic.

**The Trap**: Parents are anxious first-timers, it's 2 AM, and "won't stop crying" sounds like a baby being a baby. The temptation is to reassure and discharge. The episodic nature of the symptoms is the key clue—intussusception causes paroxysmal colicky pain.

**The Reality**: The baby has intussusception—the bowel is telescoping into itself. Without treatment, it will become ischemic and potentially necrotic.`,
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

export default PC004;