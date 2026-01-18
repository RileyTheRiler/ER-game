import { PatientCase, PatientState } from './PatientCase';

export type TriageLevel = 'BLACK' | 'RED' | 'YELLOW' | 'GREEN';

export interface MCIPatient {
    caseId: string;
    patientName: string;
    triageLevel: TriageLevel;
    assignedTo: string | null; // Staff ID or null if waiting
    status: 'WAITING' | 'STABILIZING' | 'CRITICAL' | 'STABLE' | 'DECEASED' | 'DISCHARGED';
    timeToCritical: number; // Seconds until condition worsens
    caseData: PatientCase;
    currentVitals: PatientState['vitals'];
}

export interface MCIResources {
    beds: number;
    // Staff availability
    nurses: number;
    residents: number;
    attendings: number;
    // Critical supplies
    bloodUnits: number;
    vents: number;
    orSlots: number;
}

export interface MCIState {
    active: boolean;
    patients: MCIPatient[];
    resources: MCIResources;
    timeElapsed: number;
    score: number;
    livesSaved: number;
    livesLost: number;
}
