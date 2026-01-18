import { PatientCase } from '../../types/PatientCase';

const PC092: PatientCase = {
    id: 'PC092',
    title: 'Mr. Digby',
    description: 'Homeless male with a foul-smelling leg cast.',
    difficulty: 'Easy',
    startNodeId: 'start',
    initialState: {
        vitals: {
            HR: 88, BP_SYS: 130, BP_DIA: 85, O2: 99, TEMP: 37, RR: 16, PAIN: 2
        },
        flags: [],
        inventory: ['CAST_CUTTER', 'ETHYL_CHLORIDE'], // Starting items for this scenario
        history: [],
        stress: 0,
        timeElapsed: 0,
        relationships: { 'MEL': 0 }
    },
    nodes: {
        'start': {
            id: 'start',
            text: "The smell hits you before you enter the bay. Mr. Digby has a fiberglass cast on his left leg that looks ancient. \n\nMR. DIGBY: Itches. Itches real bad, doc. Can you take it off?",
            options: [
                {
                    id: 'inspect',
                    text: 'Inspect the cast.',
                    type: 'EXAM',
                    nextNodeId: 'inspection',
                    timeCost: 1
                },
                {
                    id: 'cut_cast',
                    text: 'Start cutting immediately.',
                    type: 'PROCEDURE',
                    nextNodeId: 'disaster_cut'
                }
            ]
        },
        'inspection': {
            id: 'inspection',
            text: "The cast is stained and crumbling. You see small movements inside the gaps.\n\nMEL: Oh god. I think there's something living in there. If we just cut it, we might slice whatever is moving.",
            options: [
                {
                    id: 'spray_bugs',
                    text: '"I need to freeze them first. Hand me the Ethyl Chloride."',
                    type: 'MEDICAL',
                    nextNodeId: 'crafting_hint',
                    reqs: [{ type: 'ITEM', key: 'ETHYL_CHLORIDE' }]
                },
                {
                    id: 'pour_water',
                    text: 'Pour rubbing alcohol down the cast.',
                    type: 'MEDICAL',
                    nextNodeId: 'bugs_scatter',
                    effects: [{ type: 'MODIFY_VITALS', key: 'HR', value: 110 }]
                }
            ]
        },
        'crafting_hint': {
            id: 'crafting_hint',
            text: "You have Ethyl Chloride and a Cast Cutter. \n\nMEL: You want to freeze the blade? Or spray the leg?\n\n[SYSTEM: New Crafting Option Available]",
            options: [
                {
                    id: 'combine_freeze',
                    text: 'Combine Ethyl Chloride + Cast Cutter -> Frozen Cutter',
                    type: 'PROCEDURE',
                    nextNodeId: 'cutting_frozen',
                    effects: [
                        { type: 'CRAFT_ITEM', key: 'maggot_tool' }, // Uses recipe ID
                        { type: 'ADD_ITEM', key: 'FROZEN_CAST_CUTTER' } // Result
                    ]
                }
            ]
        },
        'cutting_frozen': {
            id: 'cutting_frozen',
            text: "You spray the blade and the cast gap, creating a freezing mist. The movement stops. You cut quickly.\n\nThe cast cracks open. A ball of thousands of maggots falls out, frozen in a clump.\n\nMEL: [Gags] Oh... oh my god.",
            options: [
                {
                    id: 'clean_up',
                    text: '"Get the basin. Let\'s irrigate."',
                    type: 'PROCEDURE',
                    nextNodeId: 'win_clean',
                    effects: [{ type: 'MODIFY_RELATIONSHIP', key: 'MEL', value: 2 }]
                }
            ]
        },
        'disaster_cut': {
            id: 'disaster_cut',
            text: "You start cutting. The vibration sends the insects into a frenzy. Thousands of maggots pour out onto the bed, crawling everywhere. \n\nMr. Digby screams as they bite. The ER goes into lockdown for infestation.\n\n[GAME OVER]",
            options: [],
            isTerminal: true,
            effects: [{ type: 'GAME_OVER' }]
        },
        'bugs_scatter': {
            id: 'bugs_scatter',
            text: "The alcohol burns! The maggots scatter, crawling further UP the leg into his pants. \n\nMR. DIGBY: THEY'RE EVERYWHERE!\n\n[GAME OVER]",
            options: [],
            isTerminal: true,
            effects: [{ type: 'GAME_OVER' }]
        },
        'win_clean': {
            id: 'win_clean',
            text: "The leg underneath is pink and healthy. The maggots actually ate the necrotic tissue, leaving the healthy skin alone.\n\nMR. DIGBY: Feels much better. Thanks, doc.\n\n[CASE COMPLETE]",
            options: [],
            isTerminal: true,
            effects: [{ type: 'WIN', description: 'Maggots removed safely. Leg saved.' }]
        }
    }
};

export default PC092;
