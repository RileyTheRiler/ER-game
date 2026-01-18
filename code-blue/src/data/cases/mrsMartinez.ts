// src/data/cases/mrsMartinez.ts
// First patient case: Elena Martinez - Inferior STEMI

import type { PatientCase, Symptom, Patient, VitalSigns, KeyFinding, CaseOutcome } from '@/types/medical';
import type { SkillId } from '@/types/game';

// ============================================
// PATIENT DATA
// ============================================

export const mrsMartinezVitals: VitalSigns = {
    heartRate: 96,
    bloodPressure: { systolic: 142, diastolic: 88 },
    respiratoryRate: 18,
    oxygenSaturation: 98,
    temperature: 98.6,
};

export const mrsMartinezPatient: Patient = {
    id: 'mrs-martinez',
    name: 'Elena Martinez',
    age: 52,
    sex: 'F',
    chiefComplaint: 'Chest pain × 2 hours',
    vitals: mrsMartinezVitals,
    allergies: ['Penicillin'],
    medications: ['Metformin 1000mg BID', 'Lisinopril 10mg daily'],
    pastMedicalHistory: ['Type 2 Diabetes Mellitus', 'Hypertension'],
    familyHistory: ['Father - MI at age 55', 'Mother - HTN'],
    socialHistory: {
        smoking: false,
        smokingDetails: 'Never smoker',
        alcohol: 'Occasional, 1-2 drinks per week',
        drugs: 'None',
        occupation: 'Elementary school teacher',
        livingSituation: 'Lives with husband and adult daughter',
    },
    hiddenCondition: 'Inferior STEMI',
    acuity: 2,
    currentStatus: 'IN_PROGRESS',
};

// ============================================
// SYMPTOMS
// ============================================

export const mrsMartinezSymptoms: Symptom[] = [
    {
        id: 'symptom-chest-pressure',
        name: 'Chest Pressure',
        description: '"It\'s not really pain, exactly. More like... someone\'s sitting on my chest."',
        revealedBy: 'HISTORY',
        isRedFlag: true,
        clinicalSignificance: 'Atypical description common in women having MI. The word "pressure" rather than "pain" is cardiac language.',
    },
    {
        id: 'symptom-jaw-pain',
        name: 'Jaw Pain',
        description: '"My jaw, maybe? I thought it was a toothache at first."',
        revealedBy: 'HISTORY',
        requiredSkillCheck: {
            skillId: 'HISTORY',
            dc: 8,
            modifiers: [],
        },
        isRedFlag: true,
        clinicalSignificance: 'Radiation to the jaw is a classic sign of cardiac ischemia, especially in women.',
    },
    {
        id: 'symptom-diaphoresis',
        name: 'Diaphoresis',
        description: '"I\'ve been a little sweaty. But it\'s hot in here."',
        revealedBy: 'HISTORY',
        isRedFlag: true,
        clinicalSignificance: 'Diaphoresis (sweating) without exertion is a red flag for acute MI.',
    },
    {
        id: 'symptom-tums-ineffective',
        name: 'Tums Ineffective',
        description: '"Tums didn\'t help."',
        revealedBy: 'HISTORY',
        isRedFlag: false,
        clinicalSignificance: 'Failure of antacids suggests this is not simple GERD.',
    },
    {
        id: 'symptom-onset-at-rest',
        name: 'Onset at Rest',
        description: '"I was making breakfast, and it just... started."',
        revealedBy: 'HISTORY',
        isRedFlag: true,
        clinicalSignificance: 'Resting onset is concerning for unstable angina or acute MI.',
    },
    {
        id: 'symptom-minimizing',
        name: 'Symptom Minimization',
        description: '"It\'s not that bad. I\'m probably wasting your time."',
        revealedBy: 'HISTORY',
        requiredSkillCheck: {
            skillId: 'EMPATHY',
            dc: 8,
            modifiers: [],
        },
        isRedFlag: true,
        clinicalSignificance: 'Patients having MI often minimize symptoms. This may reflect denial or atypical presentation.',
    },
    {
        id: 'finding-anxious',
        name: 'Visible Anxiety',
        description: 'She\'s gripping the bed rail. Her knuckles are white.',
        revealedBy: 'AUTOMATIC',
        isRedFlag: false,
        clinicalSignificance: 'Physical signs of distress that don\'t match her minimizing words.',
    },
    {
        id: 'finding-ekg-stemi',
        name: 'ST Elevations on EKG',
        description: 'ST elevations in leads II, III, aVF with reciprocal depressions in I, aVL',
        revealedBy: 'IMAGING',
        requiredSkillCheck: {
            skillId: 'INTERPRETATION',
            dc: 12,
            modifiers: [],
        },
        isRedFlag: true,
        clinicalSignificance: 'This is an inferior STEMI. The patient needs emergent cardiac catheterization.',
    },
];

// ============================================
// KEY FINDINGS
// ============================================

export const mrsMartinezKeyFindings: KeyFinding[] = [
    {
        finding: 'Chest pressure radiating to jaw',
        significance: 'Classic cardiac ischemia symptom, especially in women who may not say "pain"',
        skill: 'HISTORY',
    },
    {
        finding: 'Diaphoresis at rest',
        significance: 'Red flag for acute MI - autonomic response to ischemia',
        skill: 'INSTINCT',
    },
    {
        finding: 'ST elevations in II, III, aVF',
        significance: 'Inferior STEMI - right coronary artery occlusion',
        skill: 'INTERPRETATION',
    },
    {
        finding: 'Multiple cardiac risk factors',
        significance: 'DM, HTN, family history increase pretest probability',
        skill: 'DIFFERENTIAL',
    },
];

// ============================================
// OUTCOMES
// ============================================

export const mrsMartinezOutcomes: CaseOutcome[] = [
    {
        id: 'outcome-perfect',
        condition: 'Recognized ACS, escalated appropriately, identified STEMI on EKG',
        description: 'Mrs. Martinez goes to the cath lab within 30 minutes. They find a 100% RCA occlusion and place a stent. She thanks you before she leaves.',
        outcome: 'POSITIVE',
        xpReward: 150,
        lessonUnlock: 'lesson-stemi-recognition',
        relationshipChanges: [
            { npcId: 'jimmy', delta: 2 },
            { npcId: 'maria', delta: 1 },
        ],
    },
    {
        id: 'outcome-good',
        condition: 'Recognized ACS, escalated appropriately, missed EKG findings',
        description: 'Jimmy identifies the STEMI. You feel embarrassed, but he tells you the important thing was getting him involved early.',
        outcome: 'POSITIVE',
        xpReward: 100,
        relationshipChanges: [
            { npcId: 'jimmy', delta: 1 },
        ],
    },
    {
        id: 'outcome-delayed',
        condition: 'Delayed escalation or dismissed symptoms',
        description: 'The EKG eventually gets done, but precious time was lost. The cardiologist makes a comment about the delay.',
        outcome: 'NEGATIVE',
        xpReward: 25,
        relationshipChanges: [
            { npcId: 'jimmy', delta: -1 },
        ],
    },
    {
        id: 'outcome-missed',
        condition: 'Failed to recognize cardiac symptoms, patient left or deteriorated',
        description: 'Mrs. Martinez\'s condition worsens. She\'s rushed to the cath lab, but the delay may have cost her heart muscle.',
        outcome: 'NEGATIVE',
        xpReward: 0,
        lessonUnlock: 'lesson-never-dismiss-chest-pain',
        relationshipChanges: [
            { npcId: 'jimmy', delta: -2 },
        ],
    },
];

// ============================================
// FULL CASE
// ============================================

export const mrsMartinezCase: PatientCase = {
    id: 'case-mrs-martinez',
    patient: mrsMartinezPatient,
    symptoms: mrsMartinezSymptoms,
    correctDiagnoses: ['Inferior STEMI', 'Acute Coronary Syndrome', 'Myocardial Infarction'],
    redHerrings: ['GERD', 'Anxiety attack', 'Musculoskeletal pain'],
    keyFindings: mrsMartinezKeyFindings,
    teachingPoints: [
        'Women often describe MI as "pressure" rather than "pain"',
        'Jaw pain can be referred cardiac pain',
        'Diabetics may have atypical or "silent" presentations',
        'Inferior STEMI shows ST elevation in II, III, aVF',
        'When in doubt, get help - better to escalate than miss an MI',
    ],
    possibleOutcomes: mrsMartinezOutcomes,
    difficulty: 'EASY',
};

// ============================================
// DIALOGUE RESPONSES
// ============================================

export const mrsMartinezResponses: Record<string, string> = {
    'onset': 'About two hours ago. I was making breakfast, and it just... started.',
    'quality': "It's not really pain, exactly. More like... someone's sitting on my chest. Pressure.",
    'radiation': '[hesitates] My jaw, maybe? I thought it was a toothache at first.',
    'severity': "I don't know, maybe a 4? It's not that bad. I'm probably wasting your time.",
    'modifying': "Not really. Tums didn't help.",
    'associated': "I've been a little sweaty. But it's hot in here.",
    'pmh': 'I have type 2 diabetes. And high blood pressure, but I take medication for that.',
    'family': 'My father had a heart attack at 55.',
    'greeting-annoyed': "Finally. I've been waiting forty-five minutes.",
    'student-reaction': '[softening slightly] A student. Great. Is there an actual doctor coming, or...?',
    'daughter-interjects': 'Mom. Be nice.',
    'opening-up': "[sighing] Fine. It's probably nothing. I've just had this... pressure. Here.",
};

export default mrsMartinezCase;
