import { PatientCase } from '../../types/PatientCase';

const PC095: PatientCase = {
    id: 'PC095',
    title: 'Ian Randall',
    description: 'Male patient with painful erection lasting > 8 hours.',
    difficulty: 'Medium',
    startNodeId: 'start',
    initialState: {
        vitals: {
            HR: 110, BP_SYS: 150, BP_DIA: 95, O2: 99, TEMP: 37, RR: 18, PAIN: 8
        },
        flags: [],
        inventory: ['NEEDLE_18G', 'PHENYLEPHRINE'],
        history: [],
        stress: 0,
        timeElapsed: 0,
        relationships: { 'MEL': 0 }
    },
    nodes: {
        'start': {
            id: 'start',
            text: "Ian is writhing in pain under a sheet tented up in the middle.\n\nIAN: Please, make it stop. It's been like 8 hours. I took... extra. For my anniversary.",
            options: [
                {
                    id: 'cold_pack',
                    text: 'Apply ice packs and wait.',
                    type: 'MEDICAL',
                    nextNodeId: 'wait_fail',
                    timeCost: 30
                },
                {
                    id: 'procedure_prep',
                    text: 'Prepare for aspiration.',
                    type: 'PROCEDURE',
                    nextNodeId: 'consent'
                }
            ]
        },
        'wait_fail': {
            id: 'wait_fail',
            text: "30 Minutes Later.\n\nIAN: It hurts worse! It's turning purple!\n\nROBBY: Stop messing around. The blood is sludging. You need to drain it now or he loses it.",
            options: [{ id: 'go_prep', text: 'Prepare for aspiration.', type: 'PROCEDURE', nextNodeId: 'consent' }]
        },
        'consent': {
            id: 'consent',
            text: "You explain the procedure: A needle into the side of the penis to drain blood and inject medicine.\n\nIAN: You're going to stick a needle WHERE? ...Fine. Just do it.",
            options: [
                {
                    id: 'nerve_block',
                    text: 'Step 1: Dorsal Penile Nerve Block.',
                    type: 'PROCEDURE',
                    nextNodeId: 'block_done',
                    effects: [{ type: 'MODIFY_VITALS', key: 'PAIN', value: 2 }]
                },
                {
                    id: 'stab_blind',
                    text: 'Just stick the big needle in.',
                    type: 'PROCEDURE',
                    nextNodeId: 'game_over_pain'
                }
            ]
        },
        'block_done': {
            id: 'block_done',
            text: "Nerve block successful. The area is numb.\n\nROBBY: Okay, grab the 18 gauge. Go for the Corpus Cavernosa. Not the middle, not the urethra.",
            options: [
                {
                    id: 'aspirate',
                    text: 'Insert needle at 10 o\'clock position and aspirate.',
                    type: 'PROCEDURE',
                    nextNodeId: 'aspiration'
                }
            ]
        },
        'aspiration': {
            id: 'aspiration',
            text: "You draw back. Thick, dark, black blood fills the syringe. It looks like sludge.\n\nROBBY: Ischemic. Keep draining until it turns bright red.",
            options: [
                {
                    id: 'irrigate',
                    text: 'Irrigate with saline and Phenylephrine.',
                    type: 'MEDICAL',
                    nextNodeId: 'massage',
                    reqs: [{ type: 'ITEM', key: 'PHENYLEPHRINE' }]
                }
            ]
        },
        'massage': {
            id: 'massage',
            text: "You inject the phenylephrine.\n\nMEL: You need to distribute it. You know... massage it around.\n\nThe room gets very awkward.",
            options: [
                {
                    id: 'do_massage',
                    text: 'Massage the shaft to distribute the medication.',
                    type: 'PROCEDURE',
                    nextNodeId: 'win'
                },
                {
                    id: 'refuse',
                    text: '"Mel, you do it."',
                    type: 'DIALOGUE',
                    nextNodeId: 'mel_angry',
                    effects: [{ type: 'MODIFY_RELATIONSHIP', key: 'MEL', value: -5 }]
                }
            ]
        },
        'mel_angry': {
            id: 'mel_angry',
            text: "MEL: I am not doing that. That's doctor work.\n\nShe stares at you until you do it.",
            options: [{ id: 'do_it_late', text: 'Fine. Do it.', type: 'PROCEDURE', nextNodeId: 'win' }]
        },
        'game_over_pain': {
            id: 'game_over_pain',
            text: "You stick an 18G needle into his un-anesthetized penis. \n\nIan screams, thrashes, and punches you in the face. Security is called. Procedure aborted. \n\n[GAME OVER]",
            options: [],
            isTerminal: true,
            onEnter: [{ type: 'GAME_OVER' }]
        },
        'win': {
            id: 'win',
            text: "The erection subsides almost immediately. Ian sighs in relief.\n\nIAN: Oh thank god. I'm never doing that again.\n\n[CASE COMPLETE]",
            options: [],
            isTerminal: true,
            effects: [{ type: 'WIN', description: 'Priapism resolved.' }]
        }
    }
};

export default PC095;
