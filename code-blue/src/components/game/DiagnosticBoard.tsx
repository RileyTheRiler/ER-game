// src/components/game/DiagnosticBoard.tsx
// The main diagnostic board - player's "thought cabinet" for the case

'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { BoardEntry as BoardEntryType } from '@/types/medical';
import { BoardEntry } from './BoardEntry';
import { BoardEntryDetail } from './BoardEntryDetail';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useBoard } from '@/hooks/useGameState';

// ============================================
// TYPES
// ============================================

export interface DiagnosticBoardProps {
    className?: string;
    compact?: boolean;
}

type FilterType = 'ALL' | BoardEntryType['type'];

// ============================================
// MAIN COMPONENT
// ============================================

export const DiagnosticBoard: React.FC<DiagnosticBoardProps> = ({
    className = '',
    compact = false,
}) => {
    const {
        entries,
        maxSlots,
        pinnedEntries,
        canAddEntry,
        pinEntry,
        unpinEntry,
        removeEntry,
        linkEntries,
    } = useBoard();

    const [selectedEntryId, setSelectedEntryId] = useState<string | null>(null);
    const [detailEntry, setDetailEntry] = useState<BoardEntryType | null>(null);
    const [isLinkMode, setIsLinkMode] = useState(false);
    const [linkSourceId, setLinkSourceId] = useState<string | null>(null);
    const [filter, setFilter] = useState<FilterType>('ALL');

    // Filter entries
    const filteredEntries = useMemo(() => {
        if (filter === 'ALL') return entries;
        return entries.filter(e => e.type === filter);
    }, [entries, filter]);

    // Separate pinned and unpinned
    const { pinned, unpinned } = useMemo(() => ({
        pinned: filteredEntries.filter(e => e.pinned),
        unpinned: filteredEntries.filter(e => !e.pinned),
    }), [filteredEntries]);

    // Get linked entry IDs for highlighting
    const linkedToSelected = useMemo(() => {
        if (!selectedEntryId) return [];
        const selected = entries.find(e => e.id === selectedEntryId);
        return selected?.linkedTo || [];
    }, [selectedEntryId, entries]);

    // Handle link mode
    const handleStartLink = (sourceId: string) => {
        setIsLinkMode(true);
        setLinkSourceId(sourceId);
        setSelectedEntryId(sourceId);
    };

    const handleLink = (targetId: string) => {
        if (linkSourceId && linkSourceId !== targetId) {
            linkEntries(linkSourceId, targetId);
        }
        setIsLinkMode(false);
        setLinkSourceId(null);
    };

    const handleCancelLink = () => {
        setIsLinkMode(false);
        setLinkSourceId(null);
    };

    // Get linked entries for detail view
    const getLinkedEntries = (entry: BoardEntryType): BoardEntryType[] => {
        return entries.filter(e => entry.linkedTo.includes(e.id));
    };

    // Available slots indicator
    const usedSlots = unpinned.length;
    const slotsRemaining = maxSlots - usedSlots;

    if (compact) {
        return (
            <div className={`bg-gray-900/80 backdrop-blur rounded-lg border border-gray-700 p-4 ${className}`}>
                <div className="flex items-center justify-between mb-3">
                    <h3 className="text-white font-medium">The Board</h3>
                    <Badge variant={slotsRemaining <= 1 ? 'warning' : 'default'}>
                        {entries.length} items
                    </Badge>
                </div>

                <div className="flex flex-wrap gap-2">
                    {entries.slice(0, 6).map(entry => (
                        <div
                            key={entry.id}
                            className="px-2 py-1 bg-gray-800 rounded text-xs text-gray-300 truncate max-w-24"
                            title={entry.content}
                        >
                            {entry.pinned && '📌 '}{entry.content}
                        </div>
                    ))}
                    {entries.length > 6 && (
                        <div className="px-2 py-1 text-xs text-gray-500">
                            +{entries.length - 6} more
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className={`bg-gray-900/80 backdrop-blur rounded-xl border border-gray-700 ${className}`}>
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-700 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <h2 className="text-xl font-semibold text-white">The Board</h2>
                    <Badge variant={slotsRemaining <= 1 ? 'warning' : 'info'}>
                        {slotsRemaining} slot{slotsRemaining !== 1 ? 's' : ''} remaining
                    </Badge>
                </div>

                <div className="flex items-center gap-3">
                    {/* Link Mode Button */}
                    {isLinkMode ? (
                        <Button variant="danger" size="sm" onClick={handleCancelLink}>
                            Cancel Link
                        </Button>
                    ) : (
                        selectedEntryId && (
                            <Button variant="outline" size="sm" onClick={() => handleStartLink(selectedEntryId)}>
                                🔗 Link Entry
                            </Button>
                        )
                    )}
                </div>
            </div>

            {/* Filter Bar */}
            <div className="px-6 py-3 border-b border-gray-800 flex gap-2 overflow-x-auto">
                {(['ALL', 'SYMPTOM', 'FINDING', 'DIFFERENTIAL', 'TEST_RESULT', 'LESSON'] as FilterType[]).map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`
              px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors
              ${filter === f
                                ? 'bg-cyan-600 text-white'
                                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                            }
            `}
                    >
                        {f === 'ALL' ? 'All' : f.replace('_', ' ')}
                    </button>
                ))}
            </div>

            {/* Link Mode Banner */}
            <AnimatePresence>
                {isLinkMode && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-purple-900/30 border-b border-purple-700 px-6 py-3"
                    >
                        <div className="flex items-center gap-2 text-purple-300">
                            <span>🔗</span>
                            <span>Click another entry to create a link</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Board Content */}
            <div className="p-6">
                {/* Pinned Section */}
                {pinned.length > 0 && (
                    <div className="mb-6">
                        <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                            <span>📌</span>
                            <span>Pinned ({pinned.length})</span>
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            <AnimatePresence mode="popLayout">
                                {pinned.map(entry => (
                                    <BoardEntry
                                        key={entry.id}
                                        entry={entry}
                                        isSelected={selectedEntryId === entry.id}
                                        isLinkMode={isLinkMode}
                                        linkedEntryIds={linkedToSelected}
                                        onSelect={setSelectedEntryId}
                                        onUnpin={unpinEntry}
                                        onLink={handleLink}
                                        onViewDetails={setDetailEntry}
                                    />
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>
                )}

                {/* Active Section */}
                <div>
                    <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <span>📋</span>
                        <span>Active ({unpinned.length}/{maxSlots})</span>
                    </h3>

                    {unpinned.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            <AnimatePresence mode="popLayout">
                                {unpinned.map(entry => (
                                    <BoardEntry
                                        key={entry.id}
                                        entry={entry}
                                        isSelected={selectedEntryId === entry.id}
                                        isLinkMode={isLinkMode}
                                        linkedEntryIds={linkedToSelected}
                                        onSelect={setSelectedEntryId}
                                        onPin={pinEntry}
                                        onRemove={removeEntry}
                                        onLink={handleLink}
                                        onViewDetails={setDetailEntry}
                                    />
                                ))}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <div className="text-center py-12 text-gray-500">
                            <div className="text-4xl mb-3">📋</div>
                            <p>No active entries on the board.</p>
                            <p className="text-sm mt-1">Examine patients and gather clues to add entries.</p>
                        </div>
                    )}
                </div>

                {/* Slot Indicators */}
                {unpinned.length < maxSlots && (
                    <div className="mt-4 flex gap-2">
                        {Array.from({ length: maxSlots }).map((_, i) => (
                            <div
                                key={i}
                                className={`
                  w-4 h-4 rounded border-2
                  ${i < unpinned.length
                                        ? 'bg-cyan-600 border-cyan-600'
                                        : 'bg-transparent border-gray-600'
                                    }
                `}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Detail Modal */}
            <BoardEntryDetail
                entry={detailEntry}
                isOpen={!!detailEntry}
                onClose={() => setDetailEntry(null)}
                onPin={pinEntry}
                onUnpin={unpinEntry}
                onRemove={removeEntry}
                linkedEntries={detailEntry ? getLinkedEntries(detailEntry) : []}
            />
        </div>
    );
};

export default DiagnosticBoard;
