// src/components/game/RelationshipPanel.tsx
// Panel showing NPC relationships and status

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { NPC, Relationship } from '@/types/character';
import { ProfessionalLevels, PersonalLevels } from '@/types/character';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useRelationships } from '@/hooks/useGameState';
import { getNPC } from '@/data/npcs';

// ============================================
// TYPES
// ============================================

export interface RelationshipPanelProps {
    npcIds?: string[];
    compact?: boolean;
    className?: string;
}

export interface NPCCardProps {
    npc: NPC;
    relationship: Relationship | null;
    compact?: boolean;
    onClick?: () => void;
}

// ============================================
// NPC CARD COMPONENT
// ============================================

export const NPCCard: React.FC<NPCCardProps> = ({
    npc,
    relationship,
    compact = false,
    onClick,
}) => {
    const professional = relationship?.professional ?? 0;
    const personal = relationship?.personal ?? 0;

    const professionalLabel = ProfessionalLevels[professional] ?? 'Unknown';
    const personalLabel = PersonalLevels[personal] ?? 'Unknown';

    // Get a random greeting
    const greeting = npc.voiceLines.greeting[0];

    // Professional bar color based on level
    const professionalColor = professional < 0
        ? 'bg-red-500'
        : professional > 1
            ? 'bg-green-500'
            : 'bg-cyan-500';

    if (compact) {
        return (
            <motion.div
                whileHover={{ scale: 1.02 }}
                onClick={onClick}
                className="p-3 bg-gray-800 rounded-lg border border-gray-700 cursor-pointer hover:border-cyan-600 transition-colors"
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center text-white font-bold">
                            {npc.nickname?.[0] || npc.name[0]}
                        </div>
                        <div>
                            <div className="text-white font-medium">{npc.nickname || npc.name}</div>
                            <div className="text-gray-500 text-xs">{npc.role}</div>
                        </div>
                    </div>
                    <Badge variant={professional < 0 ? 'danger' : professional > 1 ? 'success' : 'default'}>
                        {professionalLabel}
                    </Badge>
                </div>
            </motion.div>
        );
    }

    return (
        <Card
            variant="default"
            hoverable
            className="cursor-pointer"
            onClick={onClick}
        >
            <CardHeader>
                <div className="flex items-center gap-4">
                    {/* Avatar placeholder */}
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center text-2xl text-white font-bold">
                        {npc.nickname?.[0] || npc.name[0]}
                    </div>

                    <div className="flex-1">
                        <h3 className="text-white font-semibold text-lg">{npc.name}</h3>
                        {npc.nickname && (
                            <div className="text-cyan-400 text-sm">&quot;{npc.nickname}&quot;</div>
                        )}
                        <div className="text-gray-400 text-sm mt-1">{npc.role}</div>
                    </div>
                </div>
            </CardHeader>

            <CardContent>
                {/* Personality traits */}
                <div className="flex flex-wrap gap-1 mb-4">
                    {npc.personality.traits.slice(0, 3).map(trait => (
                        <Badge key={trait} variant="default" size="sm">{trait}</Badge>
                    ))}
                </div>

                {/* Relationship meters */}
                <div className="space-y-3">
                    <div>
                        <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-400">Professional</span>
                            <span className={`
                ${professional < 0 ? 'text-red-400' :
                                    professional > 1 ? 'text-green-400' : 'text-gray-300'}
              `}>
                                {professionalLabel}
                            </span>
                        </div>
                        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${((professional + 3) / 6) * 100}%` }}
                                className={`h-full ${professionalColor} rounded-full`}
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-400">Personal</span>
                            <span className="text-gray-300">{personalLabel}</span>
                        </div>
                        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${(personal / 4) * 100}%` }}
                                className="h-full bg-purple-500 rounded-full"
                            />
                        </div>
                    </div>
                </div>

                {/* Preview quote */}
                <div className="mt-4 pt-4 border-t border-gray-700">
                    <p className="text-gray-400 text-sm italic">&quot;{greeting}&quot;</p>
                </div>
            </CardContent>
        </Card>
    );
};

// ============================================
// NPC DETAIL MODAL CONTENT
// ============================================

export const NPCDetail: React.FC<{ npc: NPC; relationship: Relationship | null }> = ({
    npc,
    relationship,
}) => {
    const professional = relationship?.professional ?? 0;
    const personal = relationship?.personal ?? 0;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center text-3xl text-white font-bold">
                    {npc.nickname?.[0] || npc.name[0]}
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-white">{npc.name}</h2>
                    <p className="text-cyan-400">{npc.role}</p>
                </div>
            </div>

            {/* Appearance */}
            <div>
                <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-2">
                    Appearance
                </h3>
                <p className="text-gray-300">{npc.appearance.description}</p>
            </div>

            {/* Personality */}
            <div>
                <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-2">
                    Personality
                </h3>
                <div className="flex flex-wrap gap-2 mb-2">
                    {npc.personality.traits.map(trait => (
                        <Badge key={trait} variant="info">{trait}</Badge>
                    ))}
                </div>
                <p className="text-gray-400 text-sm">
                    <span className="text-gray-500">Teaching style: </span>
                    {npc.personality.teachingStyle}
                </p>
            </div>

            {/* Background */}
            <div>
                <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-2">
                    Background
                </h3>
                <p className="text-gray-300 text-sm">{npc.background.backstory}</p>
            </div>

            {/* Teaching Moments (unlocked ones) */}
            {npc.teachingMoments.length > 0 && (
                <div>
                    <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-2">
                        Teaching Moments
                    </h3>
                    <div className="space-y-2">
                        {npc.teachingMoments.map(moment => (
                            <div
                                key={moment.id}
                                className="p-3 bg-gray-800/50 rounded-lg border border-gray-700"
                            >
                                <div className="text-white font-medium text-sm">{moment.title}</div>
                                <div className="text-gray-400 text-xs mt-1 italic">&quot;{moment.lesson}&quot;</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Unique Dialogue */}
            {npc.uniqueDialogue && (
                <div className="pt-4 border-t border-gray-700">
                    <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-2">
                        Insights
                    </h3>
                    {Object.entries(npc.uniqueDialogue).slice(0, 2).map(([key, value]) => (
                        <p key={key} className="text-gray-400 text-sm italic mb-2">
                            &quot;{value}&quot;
                        </p>
                    ))}
                </div>
            )}
        </div>
    );
};

// ============================================
// MAIN PANEL
// ============================================

const RelationshipPanelComponent: React.FC<RelationshipPanelProps> = ({
    npcIds = ['jimmy', 'maria', 'okonkwo'],
    compact = false,
    className = '',
}) => {
    const { getRelationship } = useRelationships();
    const [selectedNpc, setSelectedNpc] = useState<NPC | null>(null);

    const npcs = npcIds.map(id => getNPC(id)).filter(Boolean) as NPC[];

    if (npcs.length === 0) {
        return (
            <div className={`text-center py-8 text-gray-500 ${className}`}>
                No NPCs available
            </div>
        );
    }

    return (
        <div className={className}>
            <div className={`grid gap-4 ${compact ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
                {npcs.map(npc => (
                    <NPCCard
                        key={npc.id}
                        npc={npc}
                        relationship={getRelationship(npc.id)}
                        compact={compact}
                        onClick={() => setSelectedNpc(npc)}
                    />
                ))}
            </div>

            {/* Detail Modal would go here - using AnimatePresence */}
            <AnimatePresence>
                {selectedNpc && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 flex items-center justify-center p-6 z-50"
                        onClick={() => setSelectedNpc(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-gray-900 border border-gray-700 rounded-xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto"
                        >
                            <NPCDetail
                                npc={selectedNpc}
                                relationship={getRelationship(selectedNpc.id)}
                            />
                            <button
                                onClick={() => setSelectedNpc(null)}
                                className="mt-6 w-full py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors"
                            >
                                Close
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export const RelationshipPanel = React.memo(RelationshipPanelComponent);
RelationshipPanel.displayName = 'RelationshipPanel';

export default RelationshipPanel;
