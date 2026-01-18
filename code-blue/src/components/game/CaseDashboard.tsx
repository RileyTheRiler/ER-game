'use client';

import React, { useState, useEffect, useRef } from 'react';
import { PatientCase, PatientState, NarrativeNode, Choice } from '../../types/PatientCase';
import { CaseEngine } from '../../lib/CaseEngine';
import { VitalSignsMonitor } from './VitalSignsMonitor';
import { NarrativeLog } from './NarrativeLog';
import { ActionPalette } from './ActionPalette';

import '../../styles/crt-theme.css';

interface CaseDashboardProps {
    initialCase: PatientCase;
    onCaseComplete?: (success: boolean) => void;
}

export const CaseDashboard: React.FC<CaseDashboardProps> = ({ initialCase, onCaseComplete }) => {
    // We use a ref for the engine so it persists across renders
    const engineRef = useRef<CaseEngine | null>(null);

    // React state to trigger re-renders
    const [patientState, setPatientState] = useState<PatientState | null>(null);
    const [history, setHistory] = useState<{ id: string, text: string, type: 'NARRATIVE' | 'DIALOGUE' | 'ACTION', speaker?: string }[]>([]);
    const [availableChoices, setAvailableChoices] = useState<Choice[]>([]);
    const [currentNode, setCurrentNode] = useState<NarrativeNode | null>(null);

    // Initialize Engine
    useEffect(() => {
        const engine = new CaseEngine(initialCase);
        engineRef.current = engine;
        updateUI(engine);

        // Add initial narrative
        const startNode = engine.getCurrentNode();
        if (startNode) {
            addToHistory(startNode.text, 'NARRATIVE');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialCase]);

    const updateUI = (engine: CaseEngine) => {
        setPatientState({ ...engine.getState() }); // Clone to force update
        setAvailableChoices(engine.getAvailableChoices());
        setCurrentNode(engine.getCurrentNode() || null);
    };

    const addToHistory = (text: string, type: 'NARRATIVE' | 'DIALOGUE' | 'ACTION', speaker?: string) => {
        setHistory(prev => [...prev, {
            id: Math.random().toString(36).substr(2, 9),
            text,
            type,
            speaker
        }]);
    };

    const handleChoiceValues = (choiceId: string) => {
        const engine = engineRef.current;
        if (!engine) return;

        // 1. Find the choice to get its text for the log
        const choice = availableChoices.find(c => c.id === choiceId);
        if (choice) {
            addToHistory(choice.text, choice.type === 'DIALOGUE' ? 'DIALOGUE' : 'ACTION', choice.type === 'DIALOGUE' ? 'YOU' : undefined);
        }

        // 2. Execute Action
        const result = engine.makeChoice(choiceId);

        if (result.success) {
            // 3. Update State
            updateUI(engine);

            // 4. Log new node text if we moved
            const newNode = engine.getCurrentNode();
            if (newNode && newNode.id !== currentNode?.id) {
                // Add a small delay for narrative flow
                setTimeout(() => {
                    addToHistory(newNode.text, newNode.id.includes('response') ? 'DIALOGUE' : 'NARRATIVE', newNode.id.includes('response') ? 'PATIENT' : undefined);
                }, 500);
            }

            // 5. Check Terminal
            if (newNode?.isTerminal) {
                setTimeout(() => {
                    onCaseComplete?.(true);
                }, 3000);
            }
        }
    };

    if (!patientState) return <div className="p-10 text-white scanline">Loading Case Engine...</div>;

    // Map PatientState vitals to Monitor props
    const monitorVitals = {
        heartRate: patientState.vitals.HR,
        bloodPressure: {
            systolic: patientState.vitals.BP_SYS,
            diastolic: patientState.vitals.BP_DIA
        },
        respiratoryRate: patientState.vitals.RR,
        oxygenSaturation: patientState.vitals.O2,
        temperature: (patientState.vitals.TEMP * 9 / 5) + 32 // Convert C to F for monitor
    };

    return (
        <div className="flex flex-col h-screen bg-black text-gray-100 font-mono overflow-hidden crt-container crt-overlay">
            {/* Top Bar: Vitals Monitor */}
            <div className="flex-none p-2 bg-gray-950 border-b border-gray-800 crt-border m-2">
                <VitalSignsMonitor
                    vitals={monitorVitals}
                    patientName={initialCase.title}
                    roomNumber="04"
                    rhythm="sinus_tachycardia" // Could be dynamic based on HR
                />
            </div>

            {/* Middle: Narrative and Scene */}
            <div className="flex-1 flex overflow-hidden p-4 relative">
                <div className="absolute inset-0 bg-[url('/grid.png')] opacity-5 pointer-events-none"></div>
                <div className="flex-1 flex flex-col max-w-5xl mx-auto w-full z-10 gap-4">
                    {/* Patient Info Header */}
                    <div className="flex justify-between items-center px-4 py-2 border-b border-gray-800 text-xs text-gray-500 uppercase tracking-widest">
                        <span>CASE: {initialCase.id}</span>
                        <span>ACUITY: {initialCase.difficulty}</span>
                        <span className="text-cyan-600">CONNECTED: CASE_ENGINE_V2</span>
                    </div>

                    <NarrativeLog history={history} />
                </div>
            </div>

            {/* Bottom: Action Palette */}
            <div className="flex-none z-20">
                <ActionPalette
                    choices={availableChoices}
                    onChoiceSelected={handleChoiceValues}
                    disabled={currentNode?.isTerminal}
                />
            </div>
        </div>
    );
};
