// src/components/game/PatientEncounter.tsx
// Main patient encounter screen combining all elements

'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { PatientCase, BoardEntry } from '@/types/medical';
import type { DialogueChoice, DialogueTree } from '@/store/dialogueStore';
import { PatientChart } from './PatientChart';
import { DialogueBox } from './DialogueBox';
import { DiagnosticBoard } from './DiagnosticBoard';
import { InternalVoicePanel, FloatingVoice } from './InternalVoicePanel';
import { SkillCheckDisplay } from './SkillCheckDisplay';
import { Button } from '@/components/ui/Button';
import { useDialogueStore, useGameStore } from '@/store';
import { usePlayer, useBoard } from '@/hooks/useGameState';
import { resolveSkillCheck, previewSkillCheck } from '@/utils/skillChecks';
import type { InternalVoice, SkillCheckParams } from '@/types/game';

// ============================================
// TYPES
// ============================================

export interface PatientEncounterProps {
    patientCase: PatientCase;
    dialogueTree: DialogueTree;
    onComplete?: (outcome: string) => void;
    className?: string;
}

type EncounterPhase =
    | 'ENTERING'
    | 'DIALOGUE'
    | 'SKILL_CHECK_PREVIEW'
    | 'SKILL_CHECK_ROLLING'
    | 'SKILL_CHECK_RESULT'
    | 'EXAMINING'
    | 'COMPLETED';

// ============================================
// MAIN COMPONENT
// ============================================

export const PatientEncounter: React.FC<PatientEncounterProps> = ({
    patientCase,
    dialogueTree,
    onComplete,
    className = '',
}) => {
    const [phase, setPhase] = useState<EncounterPhase>('ENTERING');
    const [showChart, setShowChart] = useState(true);
    const [showBoard, setShowBoard] = useState(false);
    const [floatingVoice, setFloatingVoice] = useState<InternalVoice | null>(null);
    const [pendingChoice, setPendingChoice] = useState<DialogueChoice | null>(null);
    const [currentSkillCheck, setCurrentSkillCheck] = useState<{
        params: SkillCheckParams;
        result?: ReturnType<typeof resolveSkillCheck>;
        preview?: ReturnType<typeof previewSkillCheck>;
    } | null>(null);

    // Stores and hooks
    const { startDialogue, isActive, displayedVoices, getCurrentNode } = useDialogueStore();
    const { player, skills: playerSkills } = usePlayer();
    const { addEntry } = useBoard();
    const addXP = useGameStore(state => state.addXP);

    // Start dialogue on mount
    useEffect(() => {
        const timer = setTimeout(() => {
            startDialogue(dialogueTree);
            setPhase('DIALOGUE');
        }, 1000);
        return () => clearTimeout(timer);
    }, [dialogueTree, startDialogue]);

    // Handle choice selection
    const handleChoiceSelected = useCallback((choice: DialogueChoice) => {
        if (choice.skillCheck && playerSkills) {
            // Show skill check preview
            setPendingChoice(choice);
            const preview = previewSkillCheck(choice.skillCheck, playerSkills);
            setCurrentSkillCheck({ params: choice.skillCheck, preview });
            setPhase('SKILL_CHECK_PREVIEW');
        }
        // If no skill check, dialogue store handles navigation
    }, [playerSkills]);

    // Execute skill check
    const handleExecuteCheck = useCallback(() => {
        if (!currentSkillCheck || !playerSkills) return;

        setPhase('SKILL_CHECK_ROLLING');

        // Simulate dice roll delay
        setTimeout(() => {
            const result = resolveSkillCheck(currentSkillCheck.params, playerSkills);
            setCurrentSkillCheck(prev => prev ? { ...prev, result } : null);
            setPhase('SKILL_CHECK_RESULT');

            // Show voice if present
            if (result.internalVoice) {
                setFloatingVoice(result.internalVoice);
            }

            // Auto-continue after showing result
            setTimeout(() => {
                setPhase('DIALOGUE');
                setCurrentSkillCheck(null);
                setPendingChoice(null);
            }, 3000);
        }, 1500);
    }, [currentSkillCheck, playerSkills]);

    // Check for encounter completion
    const currentNode = getCurrentNode();
    useEffect(() => {
        if (currentNode?.isTerminal) {
            setTimeout(() => {
                setPhase('COMPLETED');
                // Check for any onEnter consequences
                currentNode.onEnter?.forEach(consequence => {
                    if (consequence.type === 'XP') {
                        addXP(consequence.value as number);
                    }
                });
            }, 2000);
        }
    }, [currentNode, addXP]);

    return (
        <div className={`min-h-screen bg-gray-950 ${className}`}>
            {/* Top Bar */}
            <div className="bg-gray-900 border-b border-gray-800 px-6 py-3 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <h1 className="text-white font-semibold">
                        Room 4 — {patientCase.patient.name}
                    </h1>
                    <span className="text-cyan-400">
                        {patientCase.patient.chiefComplaint}
                    </span>
                </div>

                <div className="flex gap-2">
                    <Button
                        variant={showChart ? 'primary' : 'ghost'}
                        size="sm"
                        onClick={() => setShowChart(!showChart)}
                    >
                        📋 Chart
                    </Button>
                    <Button
                        variant={showBoard ? 'primary' : 'ghost'}
                        size="sm"
                        onClick={() => setShowBoard(!showBoard)}
                    >
                        🧠 Board
                    </Button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex h-[calc(100vh-60px)]">
                {/* Left Panel - Chart */}
                <AnimatePresence>
                    {showChart && (
                        <motion.div
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: 350, opacity: 1 }}
                            exit={{ width: 0, opacity: 0 }}
                            className="border-r border-gray-800 overflow-y-auto"
                        >
                            <PatientChart
                                patient={patientCase.patient}
                                className="m-4"
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Center - Dialogue */}
                <div className="flex-1 flex flex-col">
                    {/* Internal Voices Panel */}
                    {displayedVoices.length > 0 && (
                        <div className="px-6 pt-4">
                            <InternalVoicePanel
                                voices={displayedVoices}
                                maxVisible={3}
                            />
                        </div>
                    )}

                    {/* Main Dialogue Area */}
                    <div className="flex-1 flex items-end p-6">
                        {phase === 'ENTERING' && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="w-full text-center text-gray-500"
                            >
                                Entering Room 4...
                            </motion.div>
                        )}

                        {(phase === 'DIALOGUE' || phase === 'COMPLETED') && isActive && (
                            <DialogueBox
                                className="w-full"
                                onChoiceSelected={handleChoiceSelected}
                                playerSkills={playerSkills}
                            />
                        )}

                        {phase === 'COMPLETED' && !isActive && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="w-full text-center"
                            >
                                <div className="text-2xl text-white mb-4">Encounter Complete</div>
                                <Button onClick={() => onComplete?.('completed')}>
                                    Continue
                                </Button>
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* Right Panel - Board */}
                <AnimatePresence>
                    {showBoard && (
                        <motion.div
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: 400, opacity: 1 }}
                            exit={{ width: 0, opacity: 0 }}
                            className="border-l border-gray-800 overflow-y-auto"
                        >
                            <DiagnosticBoard className="m-4" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Skill Check Modal */}
            <AnimatePresence>
                {(phase === 'SKILL_CHECK_PREVIEW' ||
                    phase === 'SKILL_CHECK_ROLLING' ||
                    phase === 'SKILL_CHECK_RESULT') &&
                    currentSkillCheck && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
                        >
                            <SkillCheckDisplay
                                skillId={currentSkillCheck.params.skillId}
                                dc={currentSkillCheck.params.dc}
                                modifiers={currentSkillCheck.result?.modifiers || currentSkillCheck.preview?.modifierBreakdown || []}
                                totalModifier={currentSkillCheck.result?.totalModifier || currentSkillCheck.preview?.totalModifier || 0}
                                roll={currentSkillCheck.result?.roll}
                                finalResult={currentSkillCheck.result?.finalResult}
                                success={currentSkillCheck.result?.success}
                                criticalType={currentSkillCheck.result?.criticalType}
                                narrativeResult={currentSkillCheck.result?.narrativeResult}
                                phase={
                                    phase === 'SKILL_CHECK_PREVIEW' ? 'PREVIEW' :
                                        phase === 'SKILL_CHECK_ROLLING' ? 'ROLLING' : 'RESULT'
                                }
                                probability={currentSkillCheck.preview?.probability}
                            />

                            {phase === 'SKILL_CHECK_PREVIEW' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="absolute bottom-20"
                                >
                                    <Button onClick={handleExecuteCheck} size="lg">
                                        Roll the Dice
                                    </Button>
                                </motion.div>
                            )}
                        </motion.div>
                    )}
            </AnimatePresence>

            {/* Floating Voice */}
            <FloatingVoice
                voice={floatingVoice}
                duration={4000}
                onDismiss={() => setFloatingVoice(null)}
            />
        </div>
    );
};

export default PatientEncounter;
