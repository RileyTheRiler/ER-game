import { PatientCase } from '../../types/PatientCase';

const PC096: PatientCase = {
    id: 'PC096',
    title: 'Orlando Diaz',
    description: 'Roofer found confused at work. Fruity odor on breath.',
    difficulty: 'Hard',
    startNodeId: 'start',
    initialState: {
        vitals: {
            HR: 135, BP_SYS: 90, BP_DIA: 60, O2: 96, TEMP: 37, RR: 28, PAIN: 0
        },
        flags: [],
        inventory: [],
        history: [],
        stress: 0,
        timeElapsed: 0,
        relationships: { 'AL_HASHIMI': 0 }
    },
    nodes: {
        'start': {
            id: 'start',
            text: "Orlando is delirious, breathing rapidly (Kussmaul reading). He smells like nail polish remover.\n\nNURSE: POC Glucose is 'High'. Monitor says he's in Sinus Tach.",
            options: [
                {
                    id: 'order_fluids',
                    text: 'Start 2L Normal Saline wide open.',
                    type: 'MEDICAL',
                    nextNodeId: 'fluids_running',
                    effects: [{ type: 'MODIFY_VITALS', key: 'BP_SYS', value: 100 }]
                },
                {
                    id: 'start_insulin',
                    text: 'Start Insulin Drip immediately.',
                    type: 'MEDICAL',
                    nextNodeId: 'insulin_death'
                }
            ]
        },
        'fluids_running': {
            id: 'fluids_running',
            text: "Fluids are running. BP improves slightly to 100/60. He is still tachypneic.\n\nRESIDENT: Looks like DKA. Anion gap is probably huge. We should start the insulin to close the gap.",
            options: [
                {
                    id: 'agree_insulin',
                    text: '"Agreed. Start Insulin 0.1 units/kg/hr."',
                    type: 'MEDICAL',
                    nextNodeId: 'insulin_death'
                },
                {
                    id: 'check_k',
                    text: '"Wait. What is his Potassium?"',
                    type: 'MEDICAL',
                    nextNodeId: 'check_k_result'
                }
            ]
        },
        'check_k_result': {
            id: 'check_k_result',
            text: "You check the BMP. \n\nPotassium: 2.8 mmol/L (Critically Low)\n\nRESIDENT: Whoa. Good catch. If we gave insulin, it would have driven the K+ down even further.",
            options: [
                {
                    id: 'replete_k',
                    text: 'Replete Potassium first: 40mEq IV.',
                    type: 'MEDICAL',
                    nextNodeId: 'win_safe',
                    effects: [{ type: 'MODIFY_RELATIONSHIP', key: 'AL_HASHIMI', value: 5 }]
                }
            ]
        },
        'insulin_death': {
            id: 'insulin_death',
            text: "You start the insulin. \n\n15 MINUTES LATER: \nMonitor Alarms: V-FIB.\n\nHis potassium was 2.8. The insulin drove it down to 2.0. His heart couldn't handle the hypokalemia. He dies despite code efforts.\n\n[GAME OVER]",
            options: [],
            isTerminal: true,
            onEnter: [{ type: 'GAME_OVER', description: 'Fatal Arrhythmia due to iatrogenic hypokalemia.' }]
        },
        'win_safe': {
            id: 'win_safe',
            text: "You give Potassium first. Once it rises to 3.5, you start the insulin.\n\n6 HOURS LATER: Gap is closed used. Orlando wakes up asking for water. Dr. Al-Hashimi nods at you.\n\nAL-HASHIMI: Smart. You didn't fall for the trap.\n\n[CASE COMPLETE]",
            options: [],
            isTerminal: true,
            effects: [{ type: 'WIN', description: 'Safely managed DKA.' }]
        }
    }
};

export default PC096;
