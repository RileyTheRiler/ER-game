// src/components/game/DialogueBox.tsx
// Main dialogue display component with typewriter and choices

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { SkillId } from '@/types/game';
import { DialogueText, SkillVoice } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { SkillBadge } from '@/components/ui/Badge';
import { useDialogueStore, type DialogueChoice, type DialogueNode } from '@/store';

// ============================================
// TYPES
// ============================================

export interface DialogueBoxProps {
    className?: string;
    onChoiceSelected?: (choice: DialogueChoice) => void;
    playerSkills?: Record<SkillId, number>;
}

// ============================================
// CHOICE BUTTON COMPONENT
// ============================================

interface ChoiceButtonProps {
    choice: DialogueChoice;
    index: number;
    onClick: () => void;
    disabled?: boolean;
}

const ChoiceButton: React.FC<ChoiceButtonProps> = ({
    choice,
    index,
    onClick,
    disabled = false,
}) => {
    const isLocked = choice.isLocked;

    return (
        <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={!isLocked && !disabled ? { x: 5 } : undefined}
            whileTap={!isLocked && !disabled ? { scale: 0.98 } : undefined}
            onClick={!isLocked ? onClick : undefined}
            disabled={disabled || isLocked}
            className={`
        w-full text-left p-3 rounded-lg border transition-colors
        ${isLocked
                    ? 'bg-gray-800/30 border-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-800/50 border-gray-600 hover:border-cyan-500 hover:bg-gray-700/50 text-gray-200'
                }
      `}
        >
            <div className="flex items-start gap-3">
                <span className={`
          w-6 h-6 rounded-full border flex items-center justify-center text-sm
          ${isLocked ? 'border-gray-600 text-gray-600' : 'border-cyan-500 text-cyan-400'}
        `}>
                    {index + 1}
                </span>
                <div className="flex-1">
                    <p className={isLocked ? 'text-gray-500' : 'text-gray-200'}>
                        {choice.text}
                    </p>

                    {/* Show skill requirement */}
                    {choice.requiresSkill && (
                        <div className="mt-1 flex items-center gap-2">
                            <SkillBadge category={getSkillCategory(choice.requiresSkill.skillId)}>
                                {choice.requiresSkill.skillId}
                            </SkillBadge>
                            <span className={`text-xs ${isLocked ? 'text-red-400' : 'text-green-400'}`}>
                                {isLocked ? `Requires ${choice.requiresSkill.minLevel}` : '✓ Available'}
                            </span>
                        </div>
                    )}

                    {/* Lock reason */}
                    {choice.lockReason && (
                        <p className="text-xs text-gray-500 mt-1 italic">
                            {choice.lockReason}
                        </p>
                    )}
                </div>
            </div>
        </motion.button>
    );
};

// ============================================
// SPEAKER PORTRAIT PLACEHOLDER
// ============================================

const SpeakerPortrait: React.FC<{ speaker: string; mood?: string }> = ({
    speaker,
    mood
}) => {
    // Get initials for placeholder
    const initials = speaker
        .split(' ')
        .map(n => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();

    return (
        <div className="flex flex-col items-center gap-2">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 border-2 border-gray-600 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-400">{initials}</span>
            </div>
            <div className="text-center">
                <div className="text-sm font-medium text-gray-300">{speaker}</div>
                {mood && <div className="text-xs text-gray-500">{mood}</div>}
            </div>
        </div>
    );
};

// ============================================
// MAIN DIALOGUE BOX
// ============================================

export const DialogueBox: React.FC<DialogueBoxProps> = ({
    className = '',
    onChoiceSelected,
    playerSkills = {} as Record<SkillId, number>,
}) => {
    const {
        isActive,
        currentTree,
        getCurrentNode,
        getAvailableChoices,
        selectChoice,
        isTyping,
        setTyping,
        pendingVoices,
        displayNextVoice,
        displayedVoices,
    } = useDialogueStore();

    const [showChoices, setShowChoices] = useState(false);
    const currentNode = getCurrentNode();

    // Show choices after typing completes
    useEffect(() => {
        if (!isTyping && currentNode?.choices) {
            const timeout = setTimeout(() => setShowChoices(true), 300);
            return () => clearTimeout(timeout);
        }
        setShowChoices(false);
    }, [isTyping, currentNode]);

    // Handle choice selection
    const handleChoiceClick = useCallback((choice: DialogueChoice) => {
        onChoiceSelected?.(choice);
        selectChoice(choice.id);
        setShowChoices(false);
    }, [onChoiceSelected, selectChoice]);

    // Handle click to advance (when no choices)
    const handleAdvanceClick = useCallback(() => {
        if (isTyping) {
            // Skip typewriter
            setTyping(false);
        } else if (currentNode?.autoAdvance) {
            // Auto-advance nodes will handle themselves
        } else if (!currentNode?.choices) {
            // Terminal node or needs manual advance
        }
    }, [isTyping, currentNode, setTyping]);

    if (!isActive || !currentNode) {
        return null;
    }

    const availableChoices = getAvailableChoices(playerSkills);

    return (
        <div className={`bg-gray-900/95 backdrop-blur border border-gray-700 rounded-xl ${className}`}>
            {/* Internal Voices */}
            <AnimatePresence>
                {displayedVoices.length > 0 && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-b border-gray-700 px-4 py-3 space-y-1"
                    >
                        {displayedVoices.slice(-2).map((voice, i) => (
                            <SkillVoice
                                key={i}
                                voiceName={voice.voiceName}
                                category={voice.category}
                            >
                                {voice.text}
                            </SkillVoice>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Dialogue Area */}
            <div className="p-6 flex gap-6">
                {/* Speaker Portrait (if NPC) */}
                {currentNode.speaker !== 'NARRATOR' && currentNode.speaker !== 'PLAYER' && (
                    <SpeakerPortrait
                        speaker={currentNode.speaker}
                        mood={currentNode.speakerMood}
                    />
                )}

                {/* Dialogue Text */}
                <div className="flex-1">
                    <DialogueText
                        speaker={currentNode.speaker}
                        speakerType={
                            currentNode.speaker === 'NARRATOR' ? 'NARRATOR' :
                                currentNode.speaker === 'PLAYER' ? 'PLAYER' : 'NPC'
                        }
                        mood={currentNode.speakerMood}
                        onComplete={() => setTyping(false)}
                    >
                        {currentNode.text}
                    </DialogueText>
                </div>
            </div>

            {/* Choices */}
            <AnimatePresence>
                {showChoices && availableChoices.length > 0 && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-gray-700 p-4 space-y-2"
                    >
                        {availableChoices.map((choice, index) => (
                            <ChoiceButton
                                key={choice.id}
                                choice={choice}
                                index={index}
                                onClick={() => handleChoiceClick(choice)}
                            />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Continue prompt (no choices) */}
            {!showChoices && !isTyping && !currentNode.choices && !currentNode.isTerminal && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-t border-gray-700 p-4 text-center"
                >
                    <button
                        onClick={handleAdvanceClick}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        Click to continue...
                    </button>
                </motion.div>
            )}
        </div>
    );
};

// ============================================
// HELPERS
// ============================================

function getSkillCategory(skillId: SkillId): 'CLINICAL' | 'SOCIAL' | 'PSYCHOLOGICAL' {
    const clinicalSkills: SkillId[] = ['TRIAGE', 'DIFFERENTIAL', 'PATHOPHYSIOLOGY', 'HISTORY', 'PHYSICAL_EXAM', 'PROCEDURE', 'PHARMACOLOGY', 'INTERPRETATION'];
    const socialSkills: SkillId[] = ['BEDSIDE', 'EMPATHY', 'COMMUNICATION', 'HIERARCHY', 'TEAMWORK', 'ADVOCACY'];

    if (clinicalSkills.includes(skillId)) return 'CLINICAL';
    if (socialSkills.includes(skillId)) return 'SOCIAL';
    return 'PSYCHOLOGICAL';
}

export default DialogueBox;
