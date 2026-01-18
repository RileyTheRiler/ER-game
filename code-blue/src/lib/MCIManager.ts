import { MCIState, MCIPatient, MCIResources, TriageLevel } from '../types/MCI';
import { PatientCase } from '../types/PatientCase';

export class MCIManager {
    state: MCIState;

    constructor(initialResources: MCIResources) {
        this.state = {
            active: false,
            patients: [],
            resources: initialResources,
            timeElapsed: 0,
            score: 0,
            livesSaved: 0,
            livesLost: 0
        };
    }

    public startIncident(cases: PatientCase[]) {
        this.state.active = true;
        this.state.patients = cases.map(c => ({
            caseId: c.id,
            patientName: c.title,
            triageLevel: 'YELLOW', // Default, player must assess
            assignedTo: null,
            status: 'WAITING',
            timeToCritical: this.calculateInitialTTL(c.difficulty),
            caseData: c,
            currentVitals: { ...c.initialState.vitals }
        }));
    }

    public tick(seconds: number) {
        if (!this.state.active) return;

        this.state.timeElapsed += seconds;

        this.state.patients.forEach(p => {
            if (p.status === 'DECEASED' || p.status === 'DISCHARGED' || p.status === 'STABLE') return;

            // Deterioration logic
            p.timeToCritical -= seconds;

            if (p.timeToCritical <= 0 && p.status !== 'CRITICAL') {
                p.status = 'CRITICAL';
                // Worsen vitals
                p.currentVitals.HR += 20;
                p.currentVitals.O2 -= 5;
            } else if (p.timeToCritical <= -60 && p.status === 'CRITICAL') {
                // If critical for too long without help -> Die
                p.status = 'DECEASED';
                this.state.livesLost++;
            }
        });
    }

    public assignTriage(patientIndex: number, level: TriageLevel) {
        const patient = this.state.patients[patientIndex];
        if (patient) {
            patient.triageLevel = level;
        }
    }

    public assignResource(patientIndex: number, resourceType: keyof MCIResources): boolean {
        const patient = this.state.patients[patientIndex];
        if (!patient || this.state.resources[resourceType] <= 0) return false;

        this.state.resources[resourceType]--;

        // Resource effects
        if (resourceType === 'beds') {
            patient.status = 'STABILIZING'; // Moved to a bed
        }

        return true;
    }

    public getState(): MCIState {
        return { ...this.state };
    }

    private calculateInitialTTL(difficulty: string): number {
        switch (difficulty) {
            case 'Legendary': return 60; // 1 minute
            case 'Hard': return 120;
            case 'Medium': return 300;
            default: return 600;
        }
    }
}
