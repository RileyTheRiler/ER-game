// src/types/medical.ts
// Medical content types for patients, symptoms, and the diagnostic Board

import type { SkillCheck, SkillId } from './game';

// ============================================
// VITAL SIGNS
// ============================================

export interface VitalSigns {
    heartRate: number;
    bloodPressure: { systolic: number; diastolic: number };
    respiratoryRate: number;
    oxygenSaturation: number;
    temperature: number;
}

export const NormalVitalRanges = {
    heartRate: [60, 100] as [number, number],
    systolic: [90, 140] as [number, number],
    diastolic: [60, 90] as [number, number],
    respiratoryRate: [12, 20] as [number, number],
    oxygenSaturation: [95, 100] as [number, number],
    temperature: [97.8, 99.1] as [number, number],
};

// ============================================
// PATIENT
// ============================================

export type AcuityLevel = 1 | 2 | 3 | 4 | 5; // ESI triage levels

export type PatientStatus =
    | 'WAITING'
    | 'IN_PROGRESS'
    | 'CRITICAL'
    | 'STABLE'
    | 'DISCHARGED'
    | 'ADMITTED'
    | 'TRANSFERRED'
    | 'DECEASED';

export interface PatientSocialHistory {
    smoking: boolean;
    smokingDetails?: string;
    alcohol: string;
    drugs: string;
    occupation: string;
    livingSituation?: string;
}

export interface Patient {
    id: string;
    name: string;
    age: number;
    sex: 'M' | 'F';
    chiefComplaint: string;
    vitals: VitalSigns;
    allergies: string[];
    medications: string[];
    pastMedicalHistory: string[];
    familyHistory: string[];
    socialHistory: PatientSocialHistory;
    hiddenCondition: string;     // The actual diagnosis
    acuity: AcuityLevel;
    currentStatus: PatientStatus;
}

// ============================================
// SYMPTOMS
// ============================================

export type RevealMethod =
    | 'AUTOMATIC'                // Visible without any check
    | 'HISTORY'                  // Revealed through history taking
    | 'PHYSICAL_EXAM'            // Revealed through physical exam
    | 'LABS'                     // Revealed through lab results
    | 'IMAGING'                  // Revealed through imaging
    | 'TIME';                    // Revealed after time passes

export interface Symptom {
    id: string;
    name: string;
    description: string;
    revealedBy: RevealMethod;
    requiredSkillCheck?: SkillCheck;
    isRedFlag: boolean;
    clinicalSignificance?: string;
}

// ============================================
// PATIENT CASE
// ============================================

export interface KeyFinding {
    finding: string;
    significance: string;
    skill: SkillId;
}

export interface CaseOutcome {
    id: string;
    condition: string;           // What triggers this outcome
    description: string;
    outcome: 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE';
    xpReward: number;
    lessonUnlock?: string;
    relationshipChanges?: { npcId: string; delta: number }[];
}

export interface PatientCase {
    id: string;
    patient: Patient;
    symptoms: Symptom[];
    correctDiagnoses: string[];
    redHerrings: string[];
    keyFindings: KeyFinding[];
    teachingPoints: string[];
    possibleOutcomes: CaseOutcome[];
    difficulty: 'EASY' | 'MEDIUM' | 'HARD';
}

// ============================================
// DIAGNOSTIC BOARD
// ============================================

export type BoardEntryType =
    | 'SYMPTOM'          // A clinical finding from history
    | 'FINDING'          // A physical exam finding
    | 'DIFFERENTIAL'     // A possible diagnosis
    | 'TEST_RESULT'      // Lab or imaging result
    | 'LESSON'           // Something learned
    | 'NOTE';            // General clinical note

export interface BoardEntry {
    id: string;
    type: BoardEntryType;
    content: string;
    description?: string;
    pinned: boolean;
    linkedTo: string[];          // IDs of connected entries
    source: string;              // Where this came from
    createdAt: number;
}

// ============================================
// LABS & IMAGING
// ============================================

export interface LabValue {
    name: string;
    value: number | string;
    unit: string;
    normalRange: [number, number] | null;
    isAbnormal: boolean;
    interpretation?: string;
}

export interface LabPanel {
    id: string;
    name: string;
    timestamp: string;
    values: LabValue[];
    status: 'PENDING' | 'RESULTED' | 'CRITICAL';
}

export interface ImagingStudy {
    id: string;
    modality: 'XRAY' | 'CT' | 'MRI' | 'US' | 'EKG';
    region: string;
    timestamp: string;
    findings: string[];
    impression: string;
    isAbnormal: boolean;
}
