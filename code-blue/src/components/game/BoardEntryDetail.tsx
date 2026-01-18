// src/components/game/BoardEntryDetail.tsx
// Modal showing detailed view of a board entry

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { BoardEntry } from '@/types/medical';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

// ============================================
// TYPES
// ============================================

export interface BoardEntryDetailProps {
    entry: BoardEntry | null;
    isOpen: boolean;
    onClose: () => void;
    onPin?: (id: string) => void;
    onUnpin?: (id: string) => void;
    onRemove?: (id: string) => void;
    linkedEntries?: BoardEntry[];
}

// ============================================
// ENTRY TYPE INFO
// ============================================

const entryTypeInfo: Record<BoardEntry['type'], {
    icon: string;
    label: string;
    description: string;
}> = {
    SYMPTOM: {
        icon: '🔍',
        label: 'Symptom',
        description: 'A symptom reported by the patient or observed during examination.',
    },
    FINDING: {
        icon: '📋',
        label: 'Physical Finding',
        description: 'A finding from physical examination or observation.',
    },
    DIFFERENTIAL: {
        icon: '💭',
        label: 'Differential Diagnosis',
        description: 'A potential diagnosis under consideration.',
    },
    TEST_RESULT: {
        icon: '🧪',
        label: 'Test Result',
        description: 'A result from laboratory or imaging studies.',
    },
    LESSON: {
        icon: '📚',
        label: 'Lesson Learned',
        description: 'An insight or lesson gained from this case.',
    },
    NOTE: {
        icon: '📝',
        label: 'Clinical Note',
        description: 'A note or observation about the case.',
    },
};

// ============================================
// MAIN COMPONENT
// ============================================

export const BoardEntryDetail: React.FC<BoardEntryDetailProps> = ({
    entry,
    isOpen,
    onClose,
    onPin,
    onUnpin,
    onRemove,
    linkedEntries = [],
}) => {
    if (!entry) return null;

    const typeInfo = entryTypeInfo[entry.type];
    const createdDate = new Date(entry.createdAt).toLocaleString();

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={`${typeInfo.icon} ${typeInfo.label}`}
            size="md"
        >
            <div className="space-y-6">
                {/* Main Content */}
                <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                        {entry.content}
                    </h3>
                    {entry.description && (
                        <p className="text-gray-300">
                            {entry.description}
                        </p>
                    )}
                </div>

                {/* Metadata */}
                <div className="grid grid-cols-2 gap-4 p-4 bg-gray-800/50 rounded-lg">
                    <div>
                        <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                            Type
                        </div>
                        <div className="flex items-center gap-2">
                            <span>{typeInfo.icon}</span>
                            <span className="text-gray-300">{typeInfo.label}</span>
                        </div>
                    </div>

                    <div>
                        <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                            Status
                        </div>
                        <div>
                            {entry.pinned ? (
                                <Badge variant="warning">📌 Pinned</Badge>
                            ) : (
                                <Badge variant="default">Active</Badge>
                            )}
                        </div>
                    </div>

                    {entry.source && (
                        <div>
                            <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                                Source
                            </div>
                            <div className="text-gray-300">{entry.source}</div>
                        </div>
                    )}

                    <div>
                        <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                            Added
                        </div>
                        <div className="text-gray-300 text-sm">{createdDate}</div>
                    </div>
                </div>

                {/* Linked Entries */}
                {linkedEntries.length > 0 && (
                    <div>
                        <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">
                            🔗 Linked Entries
                        </h4>
                        <div className="space-y-2">
                            {linkedEntries.map((linked) => (
                                <div
                                    key={linked.id}
                                    className="p-3 bg-gray-800/50 rounded-lg border border-gray-700 flex items-center gap-3"
                                >
                                    <span className="text-lg">
                                        {entryTypeInfo[linked.type].icon}
                                    </span>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-white text-sm truncate">
                                            {linked.content}
                                        </div>
                                        <div className="text-gray-500 text-xs">
                                            {entryTypeInfo[linked.type].label}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Educational Note (for lessons) */}
                {entry.type === 'LESSON' && (
                    <div className="p-4 bg-green-900/20 border border-green-700 rounded-lg">
                        <h4 className="text-green-400 text-sm font-medium mb-2">
                            💡 Why This Matters
                        </h4>
                        <p className="text-gray-300 text-sm">
                            {typeInfo.description}
                        </p>
                    </div>
                )}

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t border-gray-700">
                    {entry.pinned ? (
                        <Button
                            variant="outline"
                            onClick={() => { onUnpin?.(entry.id); onClose(); }}
                        >
                            📌 Unpin Entry
                        </Button>
                    ) : (
                        <Button
                            variant="outline"
                            onClick={() => { onPin?.(entry.id); onClose(); }}
                        >
                            📍 Pin Entry
                        </Button>
                    )}

                    {!entry.pinned && (
                        <Button
                            variant="danger"
                            onClick={() => { onRemove?.(entry.id); onClose(); }}
                        >
                            Remove
                        </Button>
                    )}

                    <Button
                        variant="ghost"
                        onClick={onClose}
                        className="ml-auto"
                    >
                        Close
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default BoardEntryDetail;
