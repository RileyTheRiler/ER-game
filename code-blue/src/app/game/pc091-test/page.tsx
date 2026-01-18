'use client';

import { CaseDashboard } from '@/components/game/CaseDashboard';
import PC091 from '@/data/cases/PC091';

export default function PC091TestPage() {
    return (
        <CaseDashboard
            initialCase={PC091}
            onCaseComplete={(success) => console.log('Case Complete:', success)}
        />
    );
}
