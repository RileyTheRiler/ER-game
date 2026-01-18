import { PatientCase, PatientState, NarrativeNode, Choice, ActionEffect, Requirement } from '../types/PatientCase';

export class CaseEngine {
    currentCase: PatientCase;
    currentState: PatientState;
    currentNodeId: string;

    constructor(patientCase: PatientCase) {
        this.currentCase = patientCase;
        this.currentState = JSON.parse(JSON.stringify(patientCase.initialState)); // Deep copy
        this.currentNodeId = patientCase.startNodeId;

        // Apply initial node effects if any
        const startNode = this.getNode(this.currentNodeId);
        if (startNode && startNode.onEnter) {
            this.applyEffects(startNode.onEnter);
        }
    }

    public getCurrentNode(): NarrativeNode | undefined {
        return this.currentCase.nodes[this.currentNodeId];
    }

    public getState(): PatientState {
        return this.currentState;
    }

    private getNode(nodeId: string): NarrativeNode | undefined {
        return this.currentCase.nodes[nodeId];
    }

    public getAvailableChoices(): Choice[] {
        const node = this.getCurrentNode();
        if (!node) return [];

        return node.options.filter(choice => this.checkRequirements(choice.reqs));
    }

    public makeChoice(choiceId: string): { success: boolean; message?: string } {
        const node = this.getCurrentNode();
        if (!node) return { success: false, message: 'Node not found' };

        const choice = node.options.find(c => c.id === choiceId);
        if (!choice) return { success: false, message: 'Choice not found' };

        if (!this.checkRequirements(choice.reqs)) {
            return { success: false, message: 'Requirements not met' };
        }

        // Apply effects
        if (choice.effects) {
            this.applyEffects(choice.effects);
        }

        // Deduct time
        if (choice.timeCost) {
            this.currentState.timeElapsed += choice.timeCost;
        }

        // Move to next node if specified
        if (choice.nextNodeId) {
            this.currentNodeId = choice.nextNodeId;
            const nextNode = this.getNode(this.currentNodeId);
            if (nextNode && nextNode.onEnter) {
                this.applyEffects(nextNode.onEnter);
            }
        }

        return { success: true };
    }

    private checkRequirements(reqs?: Requirement[]): boolean {
        if (!reqs || reqs.length === 0) return true;

        return reqs.every(req => {
            switch (req.type) {
                case 'FLAG':
                    return this.currentState.flags.includes(req.key);
                case 'ITEM':
                    return this.currentState.inventory.includes(req.key);
                // Add SKILL and VITAL checks here later
                default:
                    return true;
            }
        });
    }

    private applyEffects(effects: ActionEffect[]) {
        effects.forEach(effect => {
            switch (effect.type) {
                case 'ADD_FLAG':
                    if (effect.key && !this.currentState.flags.includes(effect.key)) {
                        this.currentState.flags.push(effect.key);
                        this.log(`Flag added: ${effect.key}`);
                    }
                    break;
                case 'REMOVE_FLAG':
                    if (effect.key) {
                        this.currentState.flags = this.currentState.flags.filter(f => f !== effect.key);
                    }
                    break;
                case 'ADD_ITEM':
                    if (effect.key) this.currentState.inventory.push(effect.key);
                    break;
                case 'MODIFY_VITALS':
                    if (effect.key && effect.value !== undefined) {
                        // @ts-ignore - Dynamic access to vitals
                        this.currentState.vitals[effect.key] = Number(effect.value);
                        this.log(`Vitals update: ${effect.key} -> ${effect.value}`);
                    }
                    break;
                case 'GAME_OVER':
                    this.log("GAME OVER: Patient Died");
                    break;
                case 'MODIFY_RELATIONSHIP':
                    if (effect.key && effect.value !== undefined) {
                        const currentVal = this.currentState.relationships[effect.key] || 0;
                        this.currentState.relationships[effect.key] = currentVal + Number(effect.value);
                        this.log(`Relationship update: ${effect.key} ${Number(effect.value) > 0 ? '+' : ''}${effect.value}`);
                    }
                    break;
                case 'CRAFT_ITEM':
                    // This acts as a trigger to check crafting recipes
                    // In a real implementation, we might check CraftingEngine here
                    // For now, simpler implementation: direct item grant if recipe valid
                    // But wait, the Effect usually IS the result. 
                    // Let's strictly interpret CRAFT_ITEM as "Start crafting attempt" or simple grant?
                    // Let's assume the ActionPalette pre-validates crafting, so this just grants the item
                    // and consumes ingredients if specified in other effects.
                    // Actually, let's just treat ADD_ITEM as the result of crafting. 
                    // So CRAFT_ITEM might just be a log or sound effect trigger?
                    this.log(`Crafting item: ${effect.key}`);
                    break;
            }
            if (effect.description) {
                this.log(effect.description);
            }
        });
    }

    private log(message: string) {
        this.currentState.history.push(`[${this.currentState.timeElapsed}m] ${message}`);
    }
}
