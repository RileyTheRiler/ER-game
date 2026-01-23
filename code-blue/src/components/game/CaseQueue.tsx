// src/components/game/CaseQueue.tsx
// Display of pending and active patient cases

'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { PatientCase } from '@/types/medical';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';

// ============================================
// TYPES
// ============================================

export interface CaseQueueProps {
    activeCases: PatientCase[];
    waitingCases?: Array<{
        id: string;
        chiefComplaint: string;
        waitTime: number;
        acuity: 1 | 2 | 3 | 4 | 5;
    }>;
    onSelectCase?: (caseId: string) => void;
    selectedCaseId?: string;
    className?: string;
}

// ============================================
// ACUITY COLORS
// ============================================

const acuityInfo: Record<number, { color: string; label: string }> = {
    1: { color: 'bg-red-600', label: 'Resus' },
    2: { color: 'bg-orange-500', label: 'Emergent' },
    3: { color: 'bg-yellow-500', label: 'Urgent' },
    4: { color: 'bg-green-500', label: 'Less Urgent' },
    5: { color: 'bg-blue-500', label: 'Non-urgent' },
};

// ============================================
// CASE CARD
// ============================================

interface CaseCardProps {
    patient: PatientCase['patient'];
    isActive?: boolean;
    isSelected?: boolean;
    waitTime?: number;
    onClick?: () => void;
}

const CaseCard: React.FC<CaseCardProps> = ({
    patient,
    isActive = false,
    isSelected = false,
    waitTime,
    onClick,
}) => {
    const acuity = acuityInfo[patient.acuity];

    return (
        <motion.div
            layout
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            whileHover={{ scale: 1.02 }}
            onClick={onClick}
            className={`
        p-3 rounded-lg border-2 cursor-pointer transition-colors
        ${isSelected
                    ? 'border-cyan-500 bg-cyan-900/20'
                    : isActive
                        ? 'border-gray-600 bg-gray-800/50 hover:border-cyan-600'
                        : 'border-gray-700 bg-gray-800/30 hover:border-gray-500'
                }
      `}
        >
            <div className="flex items-center justify-between gap-3">
                {/* Acuity Badge */}
                <div className={`w-8 h-8 rounded-full ${acuity.color} flex items-center justify-center text-white font-bold text-sm`}>
                    {patient.acuity}
                </div>

                {/* Patient Info */}
                <div className="flex-1 min-w-0">
                    <div className="text-white font-medium truncate">
                        {patient.name}
                    </div>
                    <div className="text-gray-400 text-sm truncate">
                        {patient.chiefComplaint}
                    </div>
                </div>

                {/* Status / Wait Time */}
                <div className="text-right">
                    {isActive ? (
                        <Badge variant="warning" size="sm">In Progress</Badge>
                    ) : waitTime !== undefined ? (
                        <div className="text-gray-500 text-xs">
                            Wait: {waitTime}m
                        </div>
                    ) : null}
                </div>
            </div>

            {/* Quick vitals preview */}
            <div className="flex gap-4 mt-2 text-xs text-gray-500">
                <span>HR {patient.vitals.heartRate}</span>
                <span>BP {patient.vitals.bloodPressure.systolic}/{patient.vitals.bloodPressure.diastolic}</span>
                <span>SpO2 {patient.vitals.oxygenSaturation}%</span>
            </div>
        </motion.div>
    );
};

// ============================================
// MAIN COMPONENT
// ============================================

// Memoized to prevent re-renders when parent state (like time) updates but cases haven't changed
export const CaseQueue: React.FC<CaseQueueProps> = React.memo(({
    activeCases,
    waitingCases = [],
    onSelectCase,
    selectedCaseId,
    className = '',
}) => {
    return (
        <div className={`bg-gray-900/80 backdrop-blur rounded-xl border border-gray-700 ${className}`}>
            {/* Header */}
            <div className="px-4 py-3 border-b border-gray-700 flex items-center justify-between">
                <h3 className="text-white font-medium">The Board</h3>
                <div className="flex items-center gap-2">
                    <Badge variant={activeCases.length > 2 ? 'warning' : 'info'}>
                        {activeCases.length} Active
                    </Badge>
                    {waitingCases.length > 0 && (
                        <Badge variant="default">
                            {waitingCases.length} Waiting
                        </Badge>
                    )}
                </div>
            </div>

            {/* Active Cases */}
            <div className="p-4 space-y-3">
                {activeCases.length > 0 ? (
                    <>
                        <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">
                            Your Patients
                        </div>
                        <AnimatePresence mode="popLayout">
                            {activeCases.map(patientCase => (
                                <CaseCard
                                    key={patientCase.id}
                                    patient={patientCase.patient}
                                    isActive
                                    isSelected={selectedCaseId === patientCase.id}
                                    onClick={() => onSelectCase?.(patientCase.id)}
                                />
                            ))}
                        </AnimatePresence>
                    </>
                ) : (
                    <div className="text-center py-6 text-gray-500">
                        <div className="text-2xl mb-2">📋</div>
                        <p>No active cases</p>
                        <p className="text-sm">Check the waiting room</p>
                    </div>
                )}

                {/* Waiting Cases */}
                {waitingCases.length > 0 && (
                    <div className="pt-4 border-t border-gray-700">
                        <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">
                            Waiting Room
                        </div>
                        <div className="space-y-2">
                            {waitingCases.slice(0, 3).map(waiting => (
                                <div
                                    key={waiting.id}
                                    className="p-2 bg-gray-800/30 rounded border border-gray-700 flex items-center gap-3"
                                >
                                    <div className={`w-6 h-6 rounded-full ${acuityInfo[waiting.acuity].color} flex items-center justify-center text-white text-xs font-bold`}>
                                        {waiting.acuity}
                                    </div>
                                    <div className="flex-1 text-sm text-gray-400 truncate">
                                        {waiting.chiefComplaint}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        {waiting.waitTime}m
                                    </div>
                                </div>
                            ))}
                            {waitingCases.length > 3 && (
                                <div className="text-center text-gray-500 text-xs">
                                    +{waitingCases.length - 3} more waiting
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Legend */}
            <div className="px-4 py-2 border-t border-gray-700 flex gap-3 text-xs">
                {Object.entries(acuityInfo).slice(0, 3).map(([level, info]) => (
                    <div key={level} className="flex items-center gap-1">
                        <div className={`w-3 h-3 rounded-full ${info.color}`} />
                        <span className="text-gray-500">{info.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
});

export default CaseQueue;
