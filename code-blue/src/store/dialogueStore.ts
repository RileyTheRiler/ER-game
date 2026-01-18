// src/store/dialogueStore.ts
// Dialogue and conversation state management

import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { SkillId, InternalVoice, SkillCheckParams } from '@/types/game';

// ============================================
// DIALOGUE TYPES
// ============================================

export interface DialogueChoice {
    id: string;
    text: string;
    requiresSkill?: {
        skillId: SkillId;
        minLevel: number;
    };
    leadsTo: string;            // Node ID to go to
    skillCheck?: SkillCheckParams;
    isLocked?: boolean;
    lockReason?: string;
    consequences?: DialogueConsequence[];
}

export interface DialogueConsequence {
    type: 'RELATIONSHIP' | 'XP' | 'LESSON' | 'FLAG' | 'BOARD_ENTRY' | 'TIME';
    target?: string;
    value: string | number | boolean | Record<string, unknown>;
}

export interface DialogueNode {
    id: string;
    speaker: string;            // NPC ID or 'NARRATOR' or 'PLAYER'
    speakerMood?: string;
    text: string;
    choices?: DialogueChoice[];
    autoAdvance?: {
        delay: number;            // ms before auto-advancing
        nextNode: string;
    };
    internalVoices?: InternalVoice[];
    onEnter?: DialogueConsequence[];
    isTerminal?: boolean;
}

export interface DialogueTree {
    id: string;
    title: string;
    startNode: string;
    nodes: Record<string, DialogueNode>;
}

// ============================================
// DIALOGUE STATE
// ============================================

interface DialogueState {
    // Current state
    isActive: boolean;
    currentTree: DialogueTree | null;
    currentNodeId: string | null;

    // History
    visitedNodes: string[];
    choicesMade: { nodeId: string; choiceId: string }[];

    // Internal voices queue
    pendingVoices: InternalVoice[];
    displayedVoices: InternalVoice[];

    // Typewriter state
    isTyping: boolean;
    displayedText: string;

    // Actions
    startDialogue: (tree: DialogueTree) => void;
    advanceToNode: (nodeId: string) => void;
    selectChoice: (choiceId: string) => void;
    endDialogue: () => void;

    // Voice actions
    addInternalVoice: (voice: InternalVoice) => void;
    displayNextVoice: () => InternalVoice | null;
    clearVoices: () => void;

    // Typewriter actions
    setTyping: (isTyping: boolean) => void;
    setDisplayedText: (text: string) => void;

    // Selectors
    getCurrentNode: () => DialogueNode | null;
    getAvailableChoices: (playerSkills: Record<SkillId, number>) => DialogueChoice[];
    hasVisitedNode: (nodeId: string) => boolean;
}

// ============================================
// STORE IMPLEMENTATION
// ============================================

export const useDialogueStore = create<DialogueState>()(
    immer((set, get) => ({
        // Initial state
        isActive: false,
        currentTree: null,
        currentNodeId: null,
        visitedNodes: [],
        choicesMade: [],
        pendingVoices: [],
        displayedVoices: [],
        isTyping: false,
        displayedText: '',

        // Start a new dialogue
        startDialogue: (tree) => set((state) => {
            state.isActive = true;
            state.currentTree = tree;
            state.currentNodeId = tree.startNode;
            state.visitedNodes = [tree.startNode];
            state.choicesMade = [];
            state.pendingVoices = [];
            state.displayedVoices = [];
            state.isTyping = true;
            state.displayedText = '';
        }),

        // Move to a specific node
        advanceToNode: (nodeId) => set((state) => {
            if (!state.currentTree?.nodes[nodeId]) return;

            state.currentNodeId = nodeId;
            if (!state.visitedNodes.includes(nodeId)) {
                state.visitedNodes.push(nodeId);
            }
            state.isTyping = true;
            state.displayedText = '';

            // Queue any internal voices for this node
            const node = state.currentTree.nodes[nodeId];
            if (node.internalVoices) {
                state.pendingVoices.push(...node.internalVoices);
            }
        }),

        // Select a dialogue choice
        selectChoice: (choiceId) => set((state) => {
            if (!state.currentTree || !state.currentNodeId) return;

            const node = state.currentTree.nodes[state.currentNodeId];
            const choice = node.choices?.find(c => c.id === choiceId);

            if (!choice) return;

            // Record this choice
            state.choicesMade.push({
                nodeId: state.currentNodeId,
                choiceId,
            });

            // Advance to next node
            if (choice.leadsTo) {
                state.currentNodeId = choice.leadsTo;
                if (!state.visitedNodes.includes(choice.leadsTo)) {
                    state.visitedNodes.push(choice.leadsTo);
                }
                state.isTyping = true;
                state.displayedText = '';

                // Queue voices for new node
                const nextNode = state.currentTree.nodes[choice.leadsTo];
                if (nextNode?.internalVoices) {
                    state.pendingVoices.push(...nextNode.internalVoices);
                }
            }
        }),

        // End the dialogue
        endDialogue: () => set((state) => {
            state.isActive = false;
            state.currentTree = null;
            state.currentNodeId = null;
            state.isTyping = false;
            state.displayedText = '';
        }),

        // Add an internal voice to queue
        addInternalVoice: (voice) => set((state) => {
            state.pendingVoices.push(voice);
            // Sort by priority (higher first)
            state.pendingVoices.sort((a, b) => b.priority - a.priority);
        }),

        // Pop and display next voice
        displayNextVoice: () => {
            const state = get();
            if (state.pendingVoices.length === 0) return null;

            const voice = state.pendingVoices[0];
            set((s) => {
                s.pendingVoices.shift();
                s.displayedVoices.push(voice);
            });
            return voice;
        },

        // Clear all voices
        clearVoices: () => set((state) => {
            state.pendingVoices = [];
            state.displayedVoices = [];
        }),

        // Typewriter controls
        setTyping: (isTyping) => set((state) => {
            state.isTyping = isTyping;
        }),

        setDisplayedText: (text) => set((state) => {
            state.displayedText = text;
        }),

        // Get current dialogue node
        getCurrentNode: () => {
            const state = get();
            if (!state.currentTree || !state.currentNodeId) return null;
            return state.currentTree.nodes[state.currentNodeId] || null;
        },

        // Get choices available to player based on skill levels
        getAvailableChoices: (playerSkills) => {
            const state = get();
            const node = state.currentTree?.nodes[state.currentNodeId || ''];
            if (!node?.choices) return [];

            return node.choices.map(choice => {
                if (!choice.requiresSkill) {
                    return { ...choice, isLocked: false };
                }

                const playerLevel = playerSkills[choice.requiresSkill.skillId] ?? 0;
                const isLocked = playerLevel < choice.requiresSkill.minLevel;
                const lockReason = isLocked
                    ? `Requires ${choice.requiresSkill.skillId} ${choice.requiresSkill.minLevel}`
                    : undefined;

                return { ...choice, isLocked, lockReason };
            });
        },

        // Check if a node was visited
        hasVisitedNode: (nodeId) => {
            return get().visitedNodes.includes(nodeId);
        },
    }))
);
