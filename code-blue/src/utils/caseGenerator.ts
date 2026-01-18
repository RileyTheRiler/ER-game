// src/utils/caseGenerator.ts
// Utility for generating patient cases for the queue

import { mrsMartinezCase } from '@/data/cases/mrsMartinez';
import type { PatientCase } from '@/types/medical';

// In a real game, we'd have a large database of cases.
// For now, we'll generate variations or use the implemented case.

export const generateCase = (shiftNumber: number, difficulty: number): PatientCase => {
    // For Shift 1, always ensure Mrs. Martinez appears first
    if (shiftNumber === 1 && difficulty === 1) {
        return mrsMartinezCase;
    }

    // Placeholder for other cases
    // We can just clone Mrs Martinez and change name/complaint to simulate other patients for now
    const baseCase = { ...mrsMartinezCase };
    const patient = { ...baseCase.patient };

    // Randomize slightly for flavor
    const randomId = Math.random().toString(36).substring(7);

    const placeholders = [
        { name: 'John Smith', age: 45, sex: 'M', complaint: 'Back pain', acuity: 4 },
        { name: 'Emma Wilson', age: 28, sex: 'F', complaint: 'Migraine', acuity: 3 },
        { name: 'Robert Chen', age: 62, sex: 'M', complaint: 'Shortness of breath', acuity: 2 },
        { name: 'Sarah Johnson', age: 35, sex: 'F', complaint: 'Abdominal pain', acuity: 3 },
        { name: 'Michael Brown', age: 50, sex: 'M', complaint: 'Chest pain', acuity: 2 },
    ] as const;

    const template = placeholders[Math.floor(Math.random() * placeholders.length)];

    return {
        ...baseCase,
        id: `case-${randomId}`,
        patient: {
            ...patient,
            id: `patient-${randomId}`,
            name: template.name,
            age: template.age,
            sex: template.sex as 'M' | 'F',
            chiefComplaint: template.complaint,
            acuity: template.acuity as 1 | 2 | 3 | 4 | 5,
        }
    };
};

export const getIncomingCaseChance = (timeRemaining: number, currentLoad: number): number => {
    // Logic to determine if a new case should arrive
    // Higher chance if load is low
    // Higher chance during peak hours (middle of shift)

    let chance = 0.1; // Base 10% per tick

    // Increase chance if empty
    if (currentLoad === 0) chance += 0.4;
    else if (currentLoad < 3) chance += 0.2;

    // Reduce chance if full
    if (currentLoad >= 5) chance = 0;

    return chance;
};
