export interface CraftingRecipe {
    id: string;
    result: string; // Item ID created
    ingredients: string[]; // Item IDs required
    description: string;
    skillReq?: { skill: string; level: number };
}

export const CRAFTING_RECIPES: CraftingRecipe[] = [
    {
        id: 'maggot_tool',
        result: 'FROZEN_CAST_CUTTER',
        ingredients: ['ETHYL_CHLORIDE', 'CAST_CUTTER'],
        description: 'Spray the blade with coolant to freeze the maggots while cutting.',
        skillReq: { skill: 'IMPROVISATION', level: 1 }
    },
    {
        id: 'chest_seal_improvised',
        result: 'OCCLUSIVE_DRESSING',
        ingredients: ['VASELINE_GAUZE', 'TAPE'],
        description: 'Create a 3-sided occlusive dressing for a sucking chest wound.',
        skillReq: { skill: 'PROCEDURE', level: 2 }
    }
];

export class CraftingEngine {
    playerInventory: string[];

    constructor(inventory: string[]) {
        this.playerInventory = inventory;
    }

    public canCraft(recipeId: string): boolean {
        const recipe = CRAFTING_RECIPES.find(r => r.id === recipeId);
        if (!recipe) return false;

        return recipe.ingredients.every(ing => this.playerInventory.includes(ing));
    }

    public craft(recipeId: string): { success: boolean; result?: string; message: string } {
        const recipe = CRAFTING_RECIPES.find(r => r.id === recipeId);
        if (!recipe) return { success: false, message: 'Unknown recipe' };

        if (!this.canCraft(recipeId)) {
            return { success: false, message: 'Missing ingredients' };
        }

        // Consume ingredients (optional, depending on game design)
        // For now, we keep tools (Cast Cutter) but consume consumables (Ethyl Chloride)
        // Logic would go here.

        return {
            success: true,
            result: recipe.result,
            message: `Crafted ${recipe.result}: ${recipe.description}`
        };
    }
}
