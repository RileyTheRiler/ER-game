export type VitalSign = 'HR' | 'BP_SYS' | 'BP_DIA' | 'O2' | 'TEMP' | 'RR' | 'PAIN' | 'ETCO2';

export interface Vitals {
    HR: number;
    BP_SYS: number;
    BP_DIA: number;
    O2: number;
    TEMP: number; // Celsius
    RR: number;
    PAIN: number; // 0-10
    ETCO2?: number; // End-tidal CO2
}

export interface PatientState {
    vitals: Vitals;
    flags: string[]; // e.g., "IV_ACCESS", "INTUBATED", "BLEEDING_STOPPED"
    inventory: string[]; // Items used/attached e.g. "NECK_BRACE"
    history: string[]; // Log of actions taken
    stress: number; // Patient stress level (0-100)
    timeElapsed: number; // In game minutes
    relationships: Record<string, number>; // "NPC_ID": value
}

export interface Requirement {
    type: 'FLAG' | 'ITEM' | 'SKILL' | 'VITAL';
    key: string;
    value?: string | number;
    operator?: '>' | '<' | '==' | '!=';
}

export interface ActionEffect {
    type: 'MODIFY_VITALS' | 'ADD_FLAG' | 'REMOVE_FLAG' | 'ADD_ITEM' | 'REMOVE_ITEM' | 'GAME_OVER' | 'WIN' | 'MODIFY_RELATIONSHIP' | 'CRAFT_ITEM';
    key?: string; // Flag name, Item ID, or NPC ID
    value?: string | number; // Vital value, Relationship delta, or Item count
    target?: string; // For relationship (Personal vs Professional)
    description?: string; // Text to show in log e.g. "BP crashes to 60/40"
}

export interface Choice {
    id: string;
    text: string;
    type: 'MEDICAL' | 'DIALOGUE' | 'EXAM' | 'PROCEDURE';
    reqs?: Requirement[];
    effects?: ActionEffect[];
    nextNodeId?: string; // If undefined, stay on current node
    timeCost?: number; // Minutes to perform
}

export interface NarrativeNode {
    id: string;
    text: string; // The situation description
    options: Choice[];
    onEnter?: ActionEffect[]; // Effects that happen immediately when node is reached
    imageUrl?: string; // Optional visual
    isTerminal?: boolean; // If true, case ends here
}

export interface PatientCase {
    id: string;
    title: string;
    description: string; // Brief overview for selection menu
    difficulty: 'Easy' | 'Medium' | 'Hard' | 'Legendary';
    initialState: PatientState;
    nodes: Record<string, NarrativeNode>; // Map of NodeID -> Node
    startNodeId: string;
}
