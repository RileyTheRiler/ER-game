// src/data/npcs/index.ts
// Central export for all NPCs

export { jimmy } from './jimmy';
export { maria } from './maria';
export { drOkonkwo } from './okonkwo';

// NPC lookup by ID
import { jimmy } from './jimmy';
import { maria } from './maria';
import { drOkonkwo } from './okonkwo';
import type { NPC } from '@/types/character';

export const npcs: Record<string, NPC> = {
    jimmy,
    maria,
    okonkwo: drOkonkwo,
};

export const getNPC = (id: string): NPC | null => {
    return npcs[id] ?? null;
};

export const getAllNPCs = (): NPC[] => {
    return Object.values(npcs);
};
