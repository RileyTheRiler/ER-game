// src/components/game/ShiftManager.tsx
// Main orchestrator for the gameplay loop

'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useGamePhase, useShift } from '@/hooks/useGameState';
import { ShiftStartScreen } from './ShiftStartScreen';
import { ShiftEndScreen } from './ShiftEndScreen';
import { ShiftHUD } from './ShiftHUD';
import { CaseQueue } from './CaseQueue';
import { PatientEncounter } from './PatientEncounter';
import { RelationshipPanel } from './RelationshipPanel';
import { DiagnosticBoard } from './DiagnosticBoard'; // Ensure this matches export
import { generateCase, getIncomingCaseChance } from '@/utils/caseGenerator';
import { mrsMartinezDialogue } from '@/data/dialogues/mrsMartinezHistory';

// ============================================
// TYPES
// ============================================

export interface ShiftManagerProps {
    onExitGame?: () => void;
    className?: string;
}

type ViewMode = 'QUEUE' | 'BOARD' | 'RELATIONSHIPS' | 'ENCOUNTER';

// ============================================
// MAIN COMPONENT
// ============================================

export const ShiftManager: React.FC<ShiftManagerProps> = ({
    onExitGame,
    className = '',
}) => {
    const { phase, setPhase } = useGamePhase();
    const {
        shiftNumber,
        startShift,
        endShift,
        advanceTime,
        activeCases,
        addCase,
        completeCase,
        shiftProgress
    } = useShift();

    const [viewMode, setViewMode] = useState<ViewMode>('QUEUE');
    const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);

    // Track mutable state in refs to prevent interval re-creation
    const shiftProgressRef = useRef(shiftProgress);
    const activeCasesRef = useRef(activeCases);

    useEffect(() => {
        shiftProgressRef.current = shiftProgress;
        activeCasesRef.current = activeCases;
    }, [shiftProgress, activeCases]);

    // ============================================
    // TIME & CASE GENERATION LOGIC
    // ============================================

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (phase === 'GAMEPLAY') {
            interval = setInterval(() => {
                // 1. Advance time (1 minute per real second, or configurable)
                advanceTime(1);

                // 2. Check for shift end
                if (shiftProgressRef.current >= 100) {
                    setPhase('SHIFT_END');
                    return;
                }

                // 3. Try generating new case
                if (Math.random() < getIncomingCaseChance(0, activeCasesRef.current.length)) {
                    // Basic difficulty logic
                    const newCase = generateCase(shiftNumber, 1);
                    addCase(newCase);
                }

            }, 2000); // Tick every 2 seconds
        }

        return () => clearInterval(interval);
    }, [phase, advanceTime, addCase, setPhase, shiftNumber]);

    // ============================================
    // HANDLERS
    // ============================================

    const handleStartShift = () => {
        startShift();
        // seed initial cases
        addCase(generateCase(shiftNumber + 1, 1)); // Use next shift number for generation
        setPhase('GAMEPLAY');
    };

    const handleCaseSelect = useCallback((caseId: string) => {
        setSelectedCaseId(caseId);
    }, []);

    const handleEnterEncounter = () => {
        if (selectedCaseId) {
            setPhase('PATIENT_ENCOUNTER');
            setViewMode('ENCOUNTER');
        }
    };

    const handleEncounterComplete = (outcome: string) => {
        if (selectedCaseId) {
            completeCase(selectedCaseId);
            setSelectedCaseId(null);
            setViewMode('QUEUE');
            setPhase('GAMEPLAY');
        }
    };

    // ============================================
    // RENDER
    // ============================================

    // 1. Shift Start
    if (phase === 'SHIFT_START') {
        return <ShiftStartScreen onStart={handleStartShift} />;
    }

    // 2. Shift End
    if (phase === 'SHIFT_END') {
        return (
            <ShiftEndScreen
                onContinue={() => {
                    // End of demo for now
                    if (onExitGame) onExitGame();
                }}
                onRest={() => { }}
            />
        );
    }

    // 3. Patient Encounter (Full Screen)
    if (phase === 'PATIENT_ENCOUNTER' && selectedCaseId) {
        // Find the case
        const currentCase = activeCases.find(c => c.id === selectedCaseId);

        // Fallback if case not found (shouldn't happen)
        if (!currentCase) {
            setPhase('GAMEPLAY');
            return null;
        }

        return (
            <PatientEncounter
                patientCase={currentCase} // In reality, we need correct dialogue tree per case
                dialogueTree={mrsMartinezDialogue} // Hardcoded for prototype
                onComplete={() => handleEncounterComplete('COMPLETED')}
            />
        );
    }

    // 4. Main Governance (QUEUE / HUD / BOARD)
    if (phase === 'GAMEPLAY' || phase === 'BOARD' || phase === 'SKILL_CHECK') {
        return (
            <div className={`min-h-screen bg-gray-950 flex flex-col ${className}`}>
                {/* Top HUD */}
                <ShiftHUD
                    onOpenBoard={() => setViewMode('BOARD')}
                    onOpenRelationships={() => setViewMode('RELATIONSHIPS')}
                    onOpenMenu={() => { }}
                />

                {/* Main Content Area */}
                <div className="flex-1 p-6 overflow-hidden flex gap-6">

                    {/* Left Column: View Content */}
                    <div className="flex-1">
                        {viewMode === 'QUEUE' && (
                            <div className="h-full flex flex-col gap-4">
                                <CaseQueue
                                    activeCases={activeCases}
                                    selectedCaseId={selectedCaseId || undefined}
                                    onSelectCase={handleCaseSelect}
                                    className="flex-1"
                                />
                                {selectedCaseId && (
                                    <div className="flex justify-end">
                                        <button
                                            onClick={handleEnterEncounter}
                                            className="bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-3 rounded-lg font-bold shadow-lg transition-colors"
                                        >
                                            Enter Room
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {viewMode === 'BOARD' && (
                            <div className="h-full flex flex-col">
                                <div className="flex justify-between mb-4">
                                    <h2 className="text-xl text-white font-bold">Diagnostic Board</h2>
                                    <button
                                        onClick={() => setViewMode('QUEUE')}
                                        className="text-gray-400 hover:text-white"
                                    >
                                        Close Board
                                    </button>
                                </div>
                                <DiagnosticBoard className="flex-1" />
                            </div>
                        )}

                        {viewMode === 'RELATIONSHIPS' && (
                            <div className="h-full flex flex-col">
                                <div className="flex justify-between mb-4">
                                    <h2 className="text-xl text-white font-bold">Staff Relationships</h2>
                                    <button
                                        onClick={() => setViewMode('QUEUE')}
                                        className="text-gray-400 hover:text-white"
                                    >
                                        Close Panel
                                    </button>
                                </div>
                                <RelationshipPanel className="flex-1" />
                            </div>
                        )}
                    </div>

                    {/* Right Column: Mini Status / Log (Optional) */}
                    {/* We can put the relationships or something else here if screen is wide enough */}
                </div>
            </div>
        );
    }

    return null;
};

export default ShiftManager;
