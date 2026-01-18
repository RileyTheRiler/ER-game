'use client';

import React, { useState, useEffect } from 'react';
import { MCIManager } from '../../lib/MCIManager';
import { MCIResources, MCIPatient, TriageLevel } from '../../types/MCI';
import PC001 from '../../data/cases/PC001';

export const MassCasualtyDash: React.FC = () => {
    const [manager] = useState(() => new MCIManager({
        beds: 2,
        nurses: 3,
        residents: 2,
        attendings: 1,
        bloodUnits: 5,
        vents: 2,
        orSlots: 1
    }));

    const [patients, setPatients] = useState<MCIPatient[]>([]);
    const [resources, setResources] = useState<MCIResources>(manager.getState().resources);
    const [active, setActive] = useState(false);

    // Simulation Loop
    useEffect(() => {
        if (!active) return;

        const interval = setInterval(() => {
            manager.tick(1); // 1 second tick
            setPatients([...manager.getState().patients]);
            setResources({ ...manager.getState().resources });
        }, 1000);

        return () => clearInterval(interval);
    }, [active, manager]);

    const startMCI = () => {
        // Create 3 clones for testing
        const cases = [
            { ...PC001, id: 'PAT-1', title: 'John Doe (Trauma)' },
            { ...PC001, id: 'PAT-2', title: 'Jane Smith (Asthma)' },
            { ...PC001, id: 'PAT-3', title: 'Bob Jones (Chest Pain)' }
        ];
        manager.startIncident(cases);
        setActive(true);
        setPatients([...manager.getState().patients]);
    };

    return (
        <div className="flex flex-col h-full bg-gray-950 text-gray-200 font-sans p-6 rounded-lg border border-gray-800">
            <header className="flex justify-between items-center mb-6">
                <h1 className="text-xl font-bold tracking-widest text-red-600 uppercase flex items-center gap-2">
                    <span className="w-3 h-3 bg-red-600 rounded-full animate-pulse" />
                    MCI PROTOCOL ACTIVE
                </h1>
                {!active && (
                    <button
                        onClick={startMCI}
                        className="bg-red-700 hover:bg-red-600 px-6 py-2 rounded font-bold text-xs"
                    >
                        START SIMULATION
                    </button>
                )}
                {active && (
                    <div className="flex gap-4 text-xs font-mono">
                        <ResourceBadge label="BEDS" value={resources.beds} max={5} critical={resources.beds === 0} />
                        <ResourceBadge label="BLOOD" value={resources.bloodUnits} max={10} critical={resources.bloodUnits < 2} />
                    </div>
                )}
            </header>

            <div className="grid grid-cols-1 gap-4 overflow-y-auto max-h-[600px]">
                {patients.map((p, idx) => (
                    <PatientRow
                        key={idx}
                        patient={p}
                        onTriage={(level) => {
                            manager.assignTriage(idx, level);
                            setPatients([...manager.getState().patients]);
                        }}
                        onAssignBed={() => {
                            manager.assignResource(idx, 'beds');
                            setPatients([...manager.getState().patients]);
                            setResources({ ...manager.getState().resources });
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

const ResourceBadge = ({ label, value, max, critical }: { label: string, value: number, max: number, critical?: boolean }) => (
    <div className={`px-3 py-1 rounded border ${critical ? 'border-red-500 bg-red-900/20 text-red-500' : 'border-gray-700 bg-gray-900'}`}>
        <span className="opacity-50 mr-2">{label}</span>
        <span className="font-bold">{value}</span>
    </div>
);

const PatientRow = ({ patient, onTriage, onAssignBed }: {
    patient: MCIPatient,
    onTriage: (l: TriageLevel) => void,
    onAssignBed: () => void
}) => {
    return (
        <div className={`
            flex items-center justify-between p-4 rounded-lg border-l-4 bg-gray-900/50
            ${patient.status === 'CRITICAL' ? 'border-red-600 animate-pulse bg-red-950/20' : 'border-gray-600'}
            ${patient.status === 'DECEASED' ? 'opacity-50 grayscale border-gray-800' : ''}
        `}>
            <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                    <span className="font-bold text-base">{patient.patientName}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded uppercase tracking-wider ${getStatusColor(patient.status)}`}>
                        {patient.status}
                    </span>
                    {patient.status !== 'DECEASED' && (
                        <span className="text-xs font-mono text-gray-500">
                            TTL: {Math.max(0, Math.floor(patient.timeToCritical))}s
                        </span>
                    )}
                </div>
                <div className="text-xs text-gray-500 font-mono">
                    HR: {patient.currentVitals.HR} <span className="text-gray-700">|</span> BP: {patient.currentVitals.BP_SYS}/{patient.currentVitals.BP_DIA}
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex rounded overflow-hidden border border-gray-700 scale-90">
                    {(['GREEN', 'YELLOW', 'RED', 'BLACK'] as TriageLevel[]).map(level => (
                        <button
                            key={level}
                            onClick={() => onTriage(level)}
                            className={`
                               px-3 py-1 text-[10px] font-bold transition-all
                               ${patient.triageLevel === level ? getTriageColor(level) + ' text-black' : 'bg-gray-800 text-gray-500 hover:bg-gray-700'}
                           `}
                        >
                            {level[0]}
                        </button>
                    ))}
                </div>

                <button
                    onClick={onAssignBed}
                    disabled={patient.status === 'STABILIZING' || patient.status === 'DECEASED'}
                    className="px-3 py-1 bg-blue-900/20 border border-blue-800 hover:bg-blue-800 text-blue-300 rounded text-xs disabled:opacity-30 disabled:cursor-not-allowed"
                >
                    ADMIT
                </button>
            </div>
        </div>
    );
};

const getTriageColor = (level: TriageLevel) => {
    switch (level) {
        case 'GREEN': return 'bg-green-500';
        case 'YELLOW': return 'bg-yellow-500';
        case 'RED': return 'bg-red-600';
        case 'BLACK': return 'bg-gray-400';
    }
}

const getStatusColor = (status: string) => {
    switch (status) {
        case 'CRITICAL': return 'bg-red-950 text-red-400';
        case 'STABILIZING': return 'bg-blue-950 text-blue-400';
        case 'DECEASED': return 'bg-gray-800 text-gray-500';
        default: return 'bg-gray-800 text-gray-400';
    }
}
