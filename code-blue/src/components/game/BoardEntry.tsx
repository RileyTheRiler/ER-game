// src/components/game/BoardEntry.tsx
// Individual entry on the diagnostic board

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { BoardEntry as BoardEntryType } from '@/types/medical';
import { Badge } from '@/components/ui/Badge';

// ============================================
// TYPES
// ============================================

export interface BoardEntryProps {
    entry: BoardEntryType;
    isSelected?: boolean;
    isLinkMode?: boolean;
    linkedEntryIds?: string[];
    onSelect?: (id: string) => void;
    onPin?: (id: string) => void;
    onUnpin?: (id: string) => void;
    onRemove?: (id: string) => void;
    onLink?: (id: string) => void;
    onViewDetails?: (entry: BoardEntryType) => void;
}

// ============================================
// ENTRY TYPE STYLES
// ============================================

const entryTypeStyles: Record<BoardEntryType['type'], {
    bg: string;
    border: string;
    icon: string;
    label: string;
}> = {
    SYMPTOM: {
        bg: 'bg-amber-900/20',
        border: 'border-amber-600',
        icon: '🔍',
        label: 'Symptom',
    },
    FINDING: {
        bg: 'bg-cyan-900/20',
        border: 'border-cyan-600',
        icon: '📋',
        label: 'Finding',
    },
    DIFFERENTIAL: {
        bg: 'bg-purple-900/20',
        border: 'border-purple-600',
        icon: '💭',
        label: 'Differential',
    },
    TEST_RESULT: {
        bg: 'bg-blue-900/20',
        border: 'border-blue-600',
        icon: '🧪',
        label: 'Test Result',
    },
    LESSON: {
        bg: 'bg-green-900/20',
        border: 'border-green-600',
        icon: '📚',
        label: 'Lesson',
    },
    NOTE: {
        bg: 'bg-gray-800/50',
        border: 'border-gray-600',
        icon: '📝',
        label: 'Note',
    },
};

// ============================================
// MAIN COMPONENT
// ============================================

export const BoardEntry: React.FC<BoardEntryProps> = ({
    entry,
    isSelected = false,
    isLinkMode = false,
    linkedEntryIds = [],
    onSelect,
    onPin,
    onUnpin,
    onRemove,
    onLink,
    onViewDetails,
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const style = entryTypeStyles[entry.type];
    const isLinked = linkedEntryIds.includes(entry.id);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
                opacity: 1,
                scale: 1,
                boxShadow: isSelected
                    ? '0 0 20px rgba(8, 145, 178, 0.4)'
                    : isLinked
                        ? '0 0 15px rgba(168, 85, 247, 0.3)'
                        : 'none',
            }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={{ scale: 1.02 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => isLinkMode ? onLink?.(entry.id) : onSelect?.(entry.id)}
            className={`
        relative p-3 rounded-lg border-2 cursor-pointer
        transition-colors
        ${style.bg} ${style.border}
        ${isSelected ? 'ring-2 ring-cyan-500 ring-offset-2 ring-offset-gray-900' : ''}
        ${isLinkMode ? 'hover:border-purple-400' : 'hover:border-cyan-400'}
      `}
        >
            {/* Header */}
            <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                    <span className="text-lg">{style.icon}</span>
                    <Badge variant="default" size="sm">{style.label}</Badge>
                </div>

                {/* Pin indicator */}
                {entry.pinned && (
                    <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-yellow-400"
                    >
                        📌
                    </motion.span>
                )}
            </div>

            {/* Content */}
            <h4 className="text-white font-medium text-sm mb-1">
                {entry.content}
            </h4>

            {entry.description && (
                <p className="text-gray-400 text-xs line-clamp-2">
                    {entry.description}
                </p>
            )}

            {/* Source */}
            {entry.source && (
                <div className="mt-2 text-xs text-gray-500">
                    Source: {entry.source}
                </div>
            )}

            {/* Links indicator */}
            {entry.linkedTo.length > 0 && (
                <div className="mt-2 flex items-center gap-1">
                    <span className="text-xs text-purple-400">
                        🔗 {entry.linkedTo.length} linked
                    </span>
                </div>
            )}

            {/* Hover Actions */}
            {isHovered && !isLinkMode && (
                <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-1"
                >
                    {entry.pinned ? (
                        <button
                            onClick={(e) => { e.stopPropagation(); onUnpin?.(entry.id); }}
                            className="p-1.5 bg-gray-800 rounded border border-gray-600 text-xs hover:bg-gray-700"
                            title="Unpin"
                        >
                            📌
                        </button>
                    ) : (
                        <button
                            onClick={(e) => { e.stopPropagation(); onPin?.(entry.id); }}
                            className="p-1.5 bg-gray-800 rounded border border-gray-600 text-xs hover:bg-gray-700"
                            title="Pin"
                        >
                            📍
                        </button>
                    )}

                    <button
                        onClick={(e) => { e.stopPropagation(); onViewDetails?.(entry); }}
                        className="p-1.5 bg-gray-800 rounded border border-gray-600 text-xs hover:bg-gray-700"
                        title="Details"
                    >
                        👁️
                    </button>

                    {!entry.pinned && (
                        <button
                            onClick={(e) => { e.stopPropagation(); onRemove?.(entry.id); }}
                            className="p-1.5 bg-gray-800 rounded border border-red-600 text-xs hover:bg-red-900/30"
                            title="Remove"
                        >
                            ✕
                        </button>
                    )}
                </motion.div>
            )}
        </motion.div>
    );
};

export default BoardEntry;
