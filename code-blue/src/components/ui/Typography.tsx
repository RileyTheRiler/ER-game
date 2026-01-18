// src/components/ui/Typography.tsx
// Typography components for dialogue, skill voices, and medical terms

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { SkillCategory } from '@/types/game';

// ============================================
// SKILL VOICE COMPONENT
// ============================================

export interface SkillVoiceProps {
    voiceName: string;
    category: SkillCategory;
    children: React.ReactNode;
    onComplete?: () => void;
    typewriter?: boolean;
    speed?: number;
}

const categoryColors = {
    CLINICAL: { text: 'text-cyan-400', glow: 'shadow-cyan-500/50' },
    SOCIAL: { text: 'text-green-400', glow: 'shadow-green-500/50' },
    PSYCHOLOGICAL: { text: 'text-amber-400', glow: 'shadow-amber-500/50' },
};

export const SkillVoice: React.FC<SkillVoiceProps> = ({
    voiceName,
    category,
    children,
    onComplete,
    typewriter = false,
    speed = 30,
}) => {
    const [displayedText, setDisplayedText] = useState('');
    const fullText = typeof children === 'string' ? children : '';
    const colors = categoryColors[category];

    useEffect(() => {
        if (!typewriter || !fullText) {
            setDisplayedText(fullText);
            onComplete?.();
            return;
        }

        let index = 0;
        setDisplayedText('');

        const interval = setInterval(() => {
            if (index < fullText.length) {
                setDisplayedText(fullText.slice(0, index + 1));
                index++;
            } else {
                clearInterval(interval);
                onComplete?.();
            }
        }, speed);

        return () => clearInterval(interval);
    }, [fullText, typewriter, speed, onComplete]);

    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex gap-3 my-2"
        >
            <span className={`
        font-bold uppercase text-xs tracking-wider
        ${colors.text}
        drop-shadow-[0_0_10px_var(--tw-shadow-color)]
        ${colors.glow}
      `}>
                {voiceName}
            </span>
            <span className="text-gray-300 italic flex-1">
                "{typewriter ? displayedText : children}"
                {typewriter && displayedText.length < fullText.length && (
                    <span className="animate-pulse">▋</span>
                )}
            </span>
        </motion.div>
    );
};

// ============================================
// MEDICAL TERM COMPONENT
// ============================================

export interface MedicalTermProps {
    term: string;
    definition?: string;
    onClick?: () => void;
}

export const MedicalTerm: React.FC<MedicalTermProps> = ({
    term,
    definition,
    onClick,
}) => {
    const [showTooltip, setShowTooltip] = useState(false);

    return (
        <span className="relative inline-block group">
            <span
                className="
          text-cyan-400 underline underline-offset-2 decoration-dotted
          cursor-help hover:text-cyan-300 transition-colors
        "
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                onClick={onClick}
            >
                {term}
            </span>
            <AnimatePresence>
                {showTooltip && definition && (
                    <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        className="
              absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2
              px-3 py-2 rounded bg-gray-800 border border-gray-600
              text-sm text-gray-200 whitespace-nowrap max-w-xs
              shadow-lg
            "
                    >
                        {definition}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1">
                            <div className="border-4 border-transparent border-t-gray-800" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </span>
    );
};

// ============================================
// DIALOGUE TEXT COMPONENT
// ============================================

export interface DialogueTextProps {
    speaker: string;
    speakerType?: 'PLAYER' | 'NPC' | 'NARRATOR';
    mood?: string;
    children: React.ReactNode;
    typewriter?: boolean;
    speed?: number;
    onComplete?: () => void;
}

const speakerColors = {
    PLAYER: 'text-white',
    NPC: 'text-cyan-400',
    NARRATOR: 'text-gray-500 italic',
};

export const DialogueText: React.FC<DialogueTextProps> = ({
    speaker,
    speakerType = 'NPC',
    mood,
    children,
    typewriter = true,
    speed = 25,
    onComplete,
}) => {
    const [displayedText, setDisplayedText] = useState('');
    const [isComplete, setIsComplete] = useState(false);
    const fullText = typeof children === 'string' ? children : '';

    useEffect(() => {
        if (!typewriter || !fullText) {
            setDisplayedText(fullText);
            setIsComplete(true);
            onComplete?.();
            return;
        }

        let index = 0;
        setDisplayedText('');
        setIsComplete(false);

        const interval = setInterval(() => {
            if (index < fullText.length) {
                setDisplayedText(fullText.slice(0, index + 1));
                index++;
            } else {
                clearInterval(interval);
                setIsComplete(true);
                onComplete?.();
            }
        }, speed);

        return () => clearInterval(interval);
    }, [fullText, typewriter, speed, onComplete]);

    // Click to skip typewriter
    const handleClick = () => {
        if (!isComplete && typewriter) {
            setDisplayedText(fullText);
            setIsComplete(true);
            onComplete?.();
        }
    };

    return (
        <div
            className="space-y-1 cursor-pointer select-none"
            onClick={handleClick}
        >
            {speakerType !== 'NARRATOR' && (
                <div className="flex items-center gap-2">
                    <span className={`font-semibold ${speakerColors[speakerType]}`}>
                        {speaker}
                    </span>
                    {mood && (
                        <span className="text-xs text-gray-500">({mood})</span>
                    )}
                </div>
            )}
            <p className={`
        text-gray-200 leading-relaxed
        ${speakerType === 'NARRATOR' ? speakerColors.NARRATOR : ''}
      `}>
                {typewriter ? displayedText : children}
                {!isComplete && typewriter && (
                    <span className="animate-pulse text-cyan-400">▋</span>
                )}
            </p>
        </div>
    );
};

// ============================================
// TYPEWRITER HOOK
// ============================================

export const useTypewriter = (
    text: string,
    speed: number = 30,
    enabled: boolean = true
) => {
    const [displayedText, setDisplayedText] = useState('');
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        if (!enabled) {
            setDisplayedText(text);
            setIsComplete(true);
            return;
        }

        setDisplayedText('');
        setIsComplete(false);
        let index = 0;

        const interval = setInterval(() => {
            if (index < text.length) {
                setDisplayedText(text.slice(0, index + 1));
                index++;
            } else {
                clearInterval(interval);
                setIsComplete(true);
            }
        }, speed);

        return () => clearInterval(interval);
    }, [text, speed, enabled]);

    const skip = () => {
        setDisplayedText(text);
        setIsComplete(true);
    };

    return { displayedText, isComplete, skip };
};

export default SkillVoice;
