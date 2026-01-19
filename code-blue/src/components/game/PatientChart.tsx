// src/components/game/PatientChart.tsx
// Patient chart display component

'use client';

import React, { useState, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Patient, VitalSigns } from '@/types/medical';
import { Badge } from '@/components/ui/Badge';

// ============================================
// TYPES
// ============================================

export interface PatientChartProps {
    patient: Patient;
    showVitals?: boolean;
    showAllergies?: boolean;
    showMedications?: boolean;
    showHistory?: boolean;
    compact?: boolean;
    className?: string;
}

// ============================================
// VITAL DISPLAY
// ============================================

const VitalDisplay: React.FC<{ vitals: VitalSigns }> = ({ vitals }) => {
    const isAbnormal = (value: number, range: [number, number]) =>
        value < range[0] || value > range[1];

    const vitalItems = [
        {
            label: 'HR',
            value: vitals.heartRate,
            unit: 'bpm',
            abnormal: isAbnormal(vitals.heartRate, [60, 100]),
        },
        {
            label: 'BP',
            value: `${vitals.bloodPressure.systolic}/${vitals.bloodPressure.diastolic}`,
            unit: 'mmHg',
            abnormal: vitals.bloodPressure.systolic > 140 || vitals.bloodPressure.diastolic > 90,
        },
        {
            label: 'RR',
            value: vitals.respiratoryRate,
            unit: '/min',
            abnormal: isAbnormal(vitals.respiratoryRate, [12, 20]),
        },
        {
            label: 'SpO2',
            value: vitals.oxygenSaturation,
            unit: '%',
            abnormal: vitals.oxygenSaturation < 94,
        },
        {
            label: 'Temp',
            value: vitals.temperature.toFixed(1),
            unit: '°F',
            abnormal: vitals.temperature > 100.4 || vitals.temperature < 96.8,
        },
    ];

    return (
        <div className="grid grid-cols-5 gap-2">
            {vitalItems.map(item => (
                <div
                    key={item.label}
                    className={`
            text-center p-2 rounded-lg
            ${item.abnormal ? 'bg-red-900/30 border border-red-600' : 'bg-gray-800'}
          `}
                >
                    <div className="text-xs text-gray-400 uppercase">{item.label}</div>
                    <div className={`text-lg font-mono font-bold ${item.abnormal ? 'text-red-400' : 'text-white'}`}>
                        {item.value}
                    </div>
                    <div className="text-xs text-gray-500">{item.unit}</div>
                </div>
            ))}
        </div>
    );
};

// ============================================
// SECTION COMPONENTS
// ============================================

const ChartSection: React.FC<{
    title: string;
    icon: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
}> = ({ title, icon, children, defaultOpen = true }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const contentId = useId();

    return (
        <div className="border-b border-gray-700 last:border-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-controls={contentId}
                className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-800/50 transition-colors focus:outline-none focus:bg-gray-800/80 focus:ring-1 focus:ring-inset focus:ring-cyan-500/50"
            >
                <div className="flex items-center gap-2">
                    <span aria-hidden="true">{icon}</span>
                    <span className="text-gray-300 font-medium">{title}</span>
                </div>
                <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    className="text-gray-500"
                    aria-hidden="true"
                >
                    ▼
                </motion.span>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        id={contentId}
                        role="region"
                        aria-label={title}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="px-4 pb-4">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// ============================================
// MAIN PATIENT CHART
// ============================================

export const PatientChart: React.FC<PatientChartProps> = ({
    patient,
    showVitals = true,
    showAllergies = true,
    showMedications = true,
    showHistory = true,
    compact = false,
    className = '',
}) => {
    const acuityColors = {
        1: 'bg-red-600',
        2: 'bg-orange-500',
        3: 'bg-yellow-500',
        4: 'bg-green-500',
        5: 'bg-blue-500',
    };

    if (compact) {
        return (
            <div className={`bg-gray-900 border border-gray-700 rounded-lg p-4 ${className}`}>
                <div className="flex items-center justify-between mb-2">
                    <div>
                        <span className="text-white font-medium">{patient.name}</span>
                        <span className="text-gray-400 ml-2">{patient.age}{patient.sex}</span>
                    </div>
                    <div className={`w-6 h-6 rounded-full ${acuityColors[patient.acuity]} flex items-center justify-center text-white text-xs font-bold`}>
                        {patient.acuity}
                    </div>
                </div>
                <div className="text-cyan-400 text-sm">{patient.chiefComplaint}</div>
            </div>
        );
    }

    return (
        <div className={`bg-gray-900 border border-gray-700 rounded-xl overflow-hidden ${className}`}>
            {/* Header */}
            <div className="bg-gray-800 px-6 py-4 border-b border-gray-700">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-3">
                            <h2 className="text-xl font-semibold text-white">
                                {patient.name}
                            </h2>
                            <Badge variant="info">{patient.age}{patient.sex}</Badge>
                            <div className={`w-6 h-6 rounded-full ${acuityColors[patient.acuity]} flex items-center justify-center text-white text-xs font-bold`}>
                                {patient.acuity}
                            </div>
                        </div>
                        <div className="text-cyan-400 mt-1">{patient.chiefComplaint}</div>
                    </div>

                    {/* Status Badge */}
                    <Badge
                        variant={
                            patient.currentStatus === 'CRITICAL' ? 'danger' :
                                patient.currentStatus === 'IN_PROGRESS' ? 'warning' :
                                    'default'
                        }
                        pulse={patient.currentStatus === 'CRITICAL'}
                    >
                        {patient.currentStatus.replace('_', ' ')}
                    </Badge>
                </div>
            </div>

            {/* Vitals */}
            {showVitals && (
                <ChartSection title="Vital Signs" icon="💓">
                    <VitalDisplay vitals={patient.vitals} />
                </ChartSection>
            )}

            {/* Allergies */}
            {showAllergies && (
                <ChartSection title="Allergies" icon="⚠️" defaultOpen={patient.allergies.length > 0}>
                    {patient.allergies.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                            {patient.allergies.map(allergy => (
                                <Badge key={allergy} variant="danger">{allergy}</Badge>
                            ))}
                        </div>
                    ) : (
                        <span className="text-gray-500">NKDA (No Known Drug Allergies)</span>
                    )}
                </ChartSection>
            )}

            {/* Medications */}
            {showMedications && (
                <ChartSection title="Medications" icon="💊" defaultOpen={false}>
                    {patient.medications.length > 0 ? (
                        <ul className="space-y-1">
                            {patient.medications.map((med, i) => (
                                <li key={i} className="text-gray-300 text-sm flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                                    {med}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <span className="text-gray-500">No medications</span>
                    )}
                </ChartSection>
            )}

            {/* Past Medical History */}
            {showHistory && (
                <ChartSection title="Past Medical History" icon="📋" defaultOpen={false}>
                    {patient.pastMedicalHistory.length > 0 ? (
                        <ul className="space-y-1">
                            {patient.pastMedicalHistory.map((dx, i) => (
                                <li key={i} className="text-gray-300 text-sm flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                    {dx}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <span className="text-gray-500">No significant history</span>
                    )}
                </ChartSection>
            )}

            {/* Family History */}
            {showHistory && (
                <ChartSection title="Family History" icon="👨‍👩‍👧" defaultOpen={false}>
                    {patient.familyHistory.length > 0 ? (
                        <ul className="space-y-1">
                            {patient.familyHistory.map((hx, i) => (
                                <li key={i} className="text-gray-300 text-sm flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                                    {hx}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <span className="text-gray-500">No significant family history</span>
                    )}
                </ChartSection>
            )}

            {/* Social History */}
            {showHistory && (
                <ChartSection title="Social History" icon="🏠" defaultOpen={false}>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <span className="text-gray-500">Smoking:</span>
                            <span className="text-gray-300 ml-2">
                                {patient.socialHistory.smoking ? patient.socialHistory.smokingDetails : 'Non-smoker'}
                            </span>
                        </div>
                        <div>
                            <span className="text-gray-500">Alcohol:</span>
                            <span className="text-gray-300 ml-2">{patient.socialHistory.alcohol}</span>
                        </div>
                        <div>
                            <span className="text-gray-500">Drugs:</span>
                            <span className="text-gray-300 ml-2">{patient.socialHistory.drugs}</span>
                        </div>
                        <div>
                            <span className="text-gray-500">Occupation:</span>
                            <span className="text-gray-300 ml-2">{patient.socialHistory.occupation}</span>
                        </div>
                    </div>
                </ChartSection>
            )}
        </div>
    );
};

export default PatientChart;
