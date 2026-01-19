// src/components/game/IntroSequence.tsx
// Narrative introduction sequence with typewriter effect

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { usePlayer } from '@/hooks/useGameState';

// ============================================
// TYPES
// ============================================

export interface IntroSequenceProps {
    onComplete: () => void;
    onSkip?: () => void;
}

interface NarrativeBeat {
    id: string;
    type: 'narration' | 'dialogue' | 'internal' | 'scene';
    speaker?: string;
    speakerRole?: string;
    text: string;
    voiceSkill?: string;
    delay?: number;
}

// ============================================
// NARRATIVE CONTENT
// ============================================

const INTRO_NARRATIVE: NarrativeBeat[] = [
    {
        id: 'open-1',
        type: 'scene',
        text: 'COUNTY GENERAL HOSPITAL',
    },
    {
        id: 'open-2',
        type: 'scene',
        text: 'Emergency Department • 06:45 AM',
    },
    {
        id: 'narration-1',
        type: 'narration',
        text: 'The automatic doors hiss open, and the smell hits you first.',
    },
    {
        id: 'narration-2',
        type: 'narration',
        text: 'Antiseptic. Coffee. Something metallic under it all that you try not to think about.',
    },
    {
        id: 'internal-1',
        type: 'internal',
        voiceSkill: 'COMPOSURE',
        text: 'Breathe. You\'ve prepared for this. Two years of lectures, countless simulations. You know medicine.',
    },
    {
        id: 'internal-2',
        type: 'internal',
        voiceSkill: 'DOUBT',
        text: 'You know *textbook* medicine. This is the real thing. These are real people.',
    },
    {
        id: 'narration-3',
        type: 'narration',
        text: 'The waiting room is already full. A child coughs. Someone\'s grandmother stares at the ceiling. A man in work boots clutches his arm.',
    },
    {
        id: 'dialogue-1',
        type: 'dialogue',
        speaker: 'Jimmy Reyes',
        speakerRole: 'PGY-3 Resident',
        text: 'You the new third-year?',
    },
    {
        id: 'narration-4',
        type: 'narration',
        text: 'He appears from behind a curtain. Scrubs that have seen better days. Dark circles under his eyes. Coffee in one hand, tablet in the other.',
    },
    {
        id: 'dialogue-2',
        type: 'dialogue',
        speaker: 'Jimmy',
        speakerRole: 'PGY-3 Resident',
        text: 'Cool. I\'m Jimmy. I\'ll be your babysitter for the next four weeks. Don\'t worry—I\'m too tired to be mean.',
    },
    {
        id: 'internal-3',
        type: 'internal',
        voiceSkill: 'INSTINCT',
        text: 'He\'s testing you. Watching how you react. Don\'t look scared.',
    },
    {
        id: 'dialogue-3',
        type: 'dialogue',
        speaker: 'Jimmy',
        speakerRole: 'PGY-3 Resident',
        text: 'Rule one: ABC. Airway, breathing, circulation. Rule two: when in doubt, see rule one. Rule three: coffee is not optional.',
    },
    {
        id: 'dialogue-4',
        type: 'dialogue',
        speaker: 'Jimmy',
        speakerRole: 'PGY-3 Resident',
        text: 'You know the difference between a medical student and a large pizza?',
    },
    {
        id: 'narration-5',
        type: 'narration',
        text: 'You shake your head.',
    },
    {
        id: 'dialogue-5',
        type: 'dialogue',
        speaker: 'Jimmy',
        speakerRole: 'PGY-3 Resident',
        text: 'A large pizza can feed a family.',
    },
    {
        id: 'internal-4',
        type: 'internal',
        voiceSkill: 'HUMANITY',
        text: 'Behind the joke, there\'s something else. Exhaustion. Maybe cynicism. Maybe just survival.',
    },
    {
        id: 'dialogue-6',
        type: 'dialogue',
        speaker: 'Jimmy',
        speakerRole: 'PGY-3 Resident',
        text: 'Welcome to emergency medicine. Try not to kill anyone on your first day.',
    },
    {
        id: 'narration-6',
        type: 'narration',
        text: 'He takes a long sip of coffee.',
    },
    {
        id: 'dialogue-7',
        type: 'dialogue',
        speaker: 'Jimmy',
        speakerRole: 'PGY-3 Resident',
        text: 'That\'s my job.',
    },
    {
        id: 'narration-7',
        type: 'narration',
        text: 'Somewhere behind you, a monitor starts to alarm.',
    },
    {
        id: 'ending',
        type: 'scene',
        text: 'Your first shift begins.',
    },
];

// ============================================
// TYPEWRITER HOOK
// ============================================

function useTypewriter(text: string, speed: number = 30, enabled: boolean = true) {
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
                setIsComplete(true);
                clearInterval(interval);
            }
        }, speed);

        return () => clearInterval(interval);
    }, [text, speed, enabled]);

    const complete = useCallback(() => {
        setDisplayedText(text);
        setIsComplete(true);
    }, [text]);

    return { displayedText, isComplete, complete };
}

// ============================================
// COMPONENT
// ============================================

export const IntroSequence: React.FC<IntroSequenceProps> = ({ onComplete, onSkip }) => {
    const { player } = usePlayer();
    const [currentBeatIndex, setCurrentBeatIndex] = useState(0);
    const [useTypewriterEffect, setUseTypewriterEffect] = useState(true);

    const currentBeat = INTRO_NARRATIVE[currentBeatIndex];
    const { displayedText, isComplete, complete } = useTypewriter(
        currentBeat?.text || '',
        currentBeat?.type === 'scene' ? 50 : 25,
        useTypewriterEffect
    );

    const handleAdvance = () => {
        if (!isComplete) {
            complete();
            return;
        }

        if (currentBeatIndex < INTRO_NARRATIVE.length - 1) {
            setCurrentBeatIndex(prev => prev + 1);
        } else {
            onComplete();
        }
    };

    const handleSkip = () => {
        if (onSkip) {
            onSkip();
        } else {
            onComplete();
        }
    };

    // Voice skill color mapping
    const getVoiceColor = (skill?: string) => {
        switch (skill) {
            case 'COMPOSURE': return 'text-cyan-400';
            case 'DOUBT': return 'text-amber-400';
            case 'INSTINCT': return 'text-purple-400';
            case 'HUMANITY': return 'text-green-400';
            default: return 'text-gray-400';
        }
    };

    return (
        <div
            className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-6 relative overflow-hidden text-white cursor-pointer"
            onClick={handleAdvance}
        >
            {/* Background Atmosphere */}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none mix-blend-overlay" />
            <div className="absolute inset-0 bg-radial-vignette pointer-events-none" />

            {/* Subtle moving gradient */}
            <motion.div
                className="absolute inset-0 opacity-20 pointer-events-none"
                animate={{
                    background: [
                        'radial-gradient(circle at 20% 50%, rgba(8,145,178,0.1) 0%, transparent 50%)',
                        'radial-gradient(circle at 80% 50%, rgba(8,145,178,0.1) 0%, transparent 50%)',
                        'radial-gradient(circle at 20% 50%, rgba(8,145,178,0.1) 0%, transparent 50%)',
                    ],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Skip Button */}
            <div className="absolute top-6 right-6 z-20">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => { e.stopPropagation(); handleSkip(); }}
                    className="text-gray-600 hover:text-gray-400"
                >
                    Skip Intro
                </Button>
            </div>

            {/* Progress bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gray-900">
                <motion.div
                    className="h-full bg-cyan-700"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentBeatIndex + 1) / INTRO_NARRATIVE.length) * 100}%` }}
                    transition={{ duration: 0.3 }}
                />
            </div>

            {/* Content */}
            <div className="z-10 w-full max-w-2xl text-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentBeat.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="min-h-[200px] flex flex-col items-center justify-center"
                    >
                        {/* Scene markers */}
                        {currentBeat.type === 'scene' && (
                            <div className="space-y-2">
                                <motion.p
                                    className="text-xs uppercase tracking-[0.3em] text-cyan-500/50"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    ━━━━━━
                                </motion.p>
                                <p className="text-2xl font-mono tracking-widest text-cyan-400">
                                    {displayedText}
                                </p>
                                <motion.p
                                    className="text-xs uppercase tracking-[0.3em] text-cyan-500/50"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    ━━━━━━
                                </motion.p>
                            </div>
                        )}

                        {/* Narration */}
                        {currentBeat.type === 'narration' && (
                            <p className="text-lg text-gray-300 leading-relaxed italic">
                                {displayedText}
                            </p>
                        )}

                        {/* Dialogue */}
                        {currentBeat.type === 'dialogue' && (
                            <div className="space-y-3">
                                <div className="flex items-center justify-center gap-2">
                                    <span className="text-cyan-400 font-semibold">
                                        {currentBeat.speaker}
                                    </span>
                                    {currentBeat.speakerRole && (
                                        <span className="text-gray-600 text-sm">
                                            — {currentBeat.speakerRole}
                                        </span>
                                    )}
                                </div>
                                <p className="text-xl text-white">
                                    "{displayedText}"
                                </p>
                            </div>
                        )}

                        {/* Internal voice */}
                        {currentBeat.type === 'internal' && (
                            <div className="space-y-2">
                                {currentBeat.voiceSkill && (
                                    <p className={`text-xs uppercase tracking-widest ${getVoiceColor(currentBeat.voiceSkill)}`}>
                                        [ {currentBeat.voiceSkill} ]
                                    </p>
                                )}
                                <p className={`text-lg italic ${getVoiceColor(currentBeat.voiceSkill)}`}>
                                    {displayedText}
                                </p>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* Click to continue hint */}
                <motion.p
                    className="text-gray-700 text-sm mt-12"
                    animate={{ opacity: isComplete ? [0.3, 0.7, 0.3] : 0 }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    {currentBeatIndex < INTRO_NARRATIVE.length - 1 ? 'Click to continue...' : 'Click to begin your shift...'}
                </motion.p>
            </div>
        </div>
    );
};

export default IntroSequence;
