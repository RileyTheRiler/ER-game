// src/components/game/InternalVoicePanel.tsx
// Panel showing skill voice commentary

'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { InternalVoice, SkillCategory } from '@/types/game';
import { skills } from '@/data/skills';

// ============================================
// TYPES
// ============================================

export interface InternalVoicePanelProps {
    voices: InternalVoice[];
    maxVisible?: number;
    autoScroll?: boolean;
    className?: string;
}

// ============================================
// SINGLE VOICE COMPONENT
// ============================================

interface VoiceEntryProps {
    voice: InternalVoice;
    isNew?: boolean;
}

const categoryStyles: Record<SkillCategory, {
    border: string;
    glow: string;
    text: string;
    bg: string;
}> = {
    CLINICAL: {
        border: 'border-cyan-500',
        glow: 'shadow-cyan-500/30',
        text: 'text-cyan-400',
        bg: 'bg-cyan-900/20',
    },
    SOCIAL: {
        border: 'border-green-500',
        glow: 'shadow-green-500/30',
        text: 'text-green-400',
        bg: 'bg-green-900/20',
    },
    PSYCHOLOGICAL: {
        border: 'border-amber-500',
        glow: 'shadow-amber-500/30',
        text: 'text-amber-400',
        bg: 'bg-amber-900/20',
    },
};

const VoiceEntry: React.FC<VoiceEntryProps> = ({ voice, isNew = false }) => {
    const style = categoryStyles[voice.category];

    return (
        <motion.div
            initial={{ opacity: 0, x: -20, height: 0 }}
            animate={{ opacity: 1, x: 0, height: 'auto' }}
            exit={{ opacity: 0, x: 20, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`
        relative border-l-2 pl-3 py-2
        ${style.border}
        ${isNew ? `shadow-lg ${style.glow}` : ''}
      `}
        >
            {/* Voice Name */}
            <div className={`text-xs font-bold uppercase tracking-wider ${style.text}`}>
                {voice.voiceName}
            </div>

            {/* Voice Text */}
            <div className="text-gray-300 text-sm italic mt-1">
                "{voice.text}"
            </div>

            {/* Skill indicator */}
            <div className={`
        absolute top-2 right-2 px-1.5 py-0.5 rounded text-xs
        ${style.bg} ${style.text}
      `}>
                {voice.skillName}
            </div>
        </motion.div>
    );
};

// ============================================
// MAIN PANEL
// ============================================

export const InternalVoicePanel: React.FC<InternalVoicePanelProps> = ({
    voices,
    maxVisible = 5,
    autoScroll = true,
    className = '',
}) => {
    const [newVoiceId, setNewVoiceId] = useState<string | null>(null);

    // Track when new voices arrive
    useEffect(() => {
        if (voices.length > 0) {
            const latestVoice = voices[voices.length - 1];
            const id = `${latestVoice.skillId}-${latestVoice.text.slice(0, 20)}`;
            setNewVoiceId(id);

            // Clear "new" indicator after animation
            const timeout = setTimeout(() => setNewVoiceId(null), 2000);
            return () => clearTimeout(timeout);
        }
    }, [voices.length]);

    const visibleVoices = voices.slice(-maxVisible);

    if (voices.length === 0) {
        return null;
    }

    return (
        <div className={`
      bg-gray-900/80 backdrop-blur border border-gray-700 rounded-lg 
      ${className}
    `}>
            {/* Header */}
            <div className="px-4 py-2 border-b border-gray-700 flex items-center justify-between">
                <span className="text-xs text-gray-500 uppercase tracking-wider">
                    Internal Voices
                </span>
                <span className="text-xs text-gray-600">
                    {voices.length} thought{voices.length !== 1 ? 's' : ''}
                </span>
            </div>

            {/* Voices */}
            <div className="p-3 space-y-3 max-h-64 overflow-y-auto">
                <AnimatePresence mode="popLayout">
                    {visibleVoices.map((voice, index) => {
                        const id = `${voice.skillId}-${voice.text.slice(0, 20)}`;
                        return (
                            <VoiceEntry
                                key={`${id}-${index}`}
                                voice={voice}
                                isNew={id === newVoiceId}
                            />
                        );
                    })}
                </AnimatePresence>
            </div>
        </div>
    );
};

// ============================================
// FLOATING VOICE (for single voice popup)
// ============================================

export interface FloatingVoiceProps {
    voice: InternalVoice | null;
    duration?: number;
    onDismiss?: () => void;
}

export const FloatingVoice: React.FC<FloatingVoiceProps> = ({
    voice,
    duration = 4000,
    onDismiss,
}) => {
    useEffect(() => {
        if (voice && duration > 0) {
            const timeout = setTimeout(() => {
                onDismiss?.();
            }, duration);
            return () => clearTimeout(timeout);
        }
    }, [voice, duration, onDismiss]);

    return (
        <AnimatePresence>
            {voice && (
                <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 max-w-md"
                    onClick={onDismiss}
                >
                    <div className={`
            px-4 py-3 rounded-lg border-l-4 backdrop-blur-md
            bg-gray-900/90 
            ${categoryStyles[voice.category].border}
            shadow-xl ${categoryStyles[voice.category].glow}
            cursor-pointer
          `}>
                        <div className="flex items-start gap-3">
                            <span className={`
                font-bold text-sm uppercase tracking-wider
                ${categoryStyles[voice.category].text}
              `}>
                                {voice.voiceName}
                            </span>
                            <span className="text-gray-300 italic text-sm flex-1">
                                "{voice.text}"
                            </span>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default InternalVoicePanel;
