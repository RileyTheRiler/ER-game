// src/components/game/CharacterCreation.tsx
// Character creation screen with background selection and personality axes

'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import type { PlayerBackground, PersonalityAxes } from '@/types/character';
import { BackgroundBonuses } from '@/types/character';
import type { SkillId } from '@/types/game';

// ============================================
// TYPES
// ============================================

export interface CharacterCreationProps {
    onComplete: (name: string, background: PlayerBackground, personality: PersonalityAxes) => void;
    onBack?: () => void;
}

interface BackgroundInfo {
    id: PlayerBackground;
    name: string;
    tagline: string;
    description: string;
    icon: string;
}

// ============================================
// CONSTANTS
// ============================================

const BACKGROUNDS: BackgroundInfo[] = [
    {
        id: 'EMT',
        name: 'EMT Experience',
        tagline: 'You\'ve seen emergencies—just from the other side.',
        description: 'Years on the ambulance taught you to stay calm when everything goes sideways. You know how to triage, how to stabilize, and when to call for backup.',
        icon: '🚑',
    },
    {
        id: 'RESEARCH',
        name: 'Research Track',
        tagline: 'You know the science; now learn the practice.',
        description: 'You spent extra years in the lab, publishing papers and dissecting mechanisms. UpToDate is your best friend. Now it\'s time to see if the textbooks were right.',
        icon: '🔬',
    },
    {
        id: 'LATE_BLOOMER',
        name: 'Late Bloomer',
        tagline: 'You lived life before medicine; you understand people.',
        description: 'You had a career before this. Maybe you were a teacher, a social worker, a parent. You came to medicine later, but you brought something the others don\'t have: life experience.',
        icon: '🌱',
    },
    {
        id: 'LEGACY',
        name: 'Legacy',
        tagline: 'Your parent is a doctor. You know the culture—for better or worse.',
        description: 'Medicine runs in the family. You grew up hearing war stories at the dinner table. You know the hierarchy, the politics, the unwritten rules. Whether that\'s a blessing or a curse remains to be seen.',
        icon: '🏛️',
    },
];

const SKILL_NAMES: Record<SkillId, string> = {
    TRIAGE: 'Triage',
    DIFFERENTIAL: 'Differential',
    PATHOPHYSIOLOGY: 'Pathophysiology',
    HISTORY: 'History',
    PHYSICAL_EXAM: 'Physical Exam',
    PROCEDURE: 'Procedure',
    PHARMACOLOGY: 'Pharmacology',
    INTERPRETATION: 'Interpretation',
    BEDSIDE: 'Bedside',
    EMPATHY: 'Empathy',
    COMMUNICATION: 'Communication',
    HIERARCHY: 'Hierarchy',
    TEAMWORK: 'Teamwork',
    ADVOCACY: 'Advocacy',
    COMPOSURE: 'Composure',
    INSTINCT: 'Instinct',
    DOUBT: 'Doubt',
    DRIVE: 'Drive',
    MEMORY: 'Memory',
    HUMANITY: 'Humanity',
};

const PERSONALITY_LABELS = {
    confidence: { low: 'Anxious', high: 'Confident', description: 'How you present under pressure' },
    approach: { low: 'By-the-Book', high: 'Intuitive', description: 'How you approach decision-making' },
    outlook: { low: 'Cynical', high: 'Idealistic', description: 'How you see the system' },
};

// ============================================
// COMPONENT
// ============================================

export const CharacterCreation: React.FC<CharacterCreationProps> = ({ onComplete, onBack }) => {
    const [step, setStep] = useState<'name' | 'background' | 'personality'>('name');
    const [name, setName] = useState('');
    const [selectedBackground, setSelectedBackground] = useState<PlayerBackground | null>(null);
    const [personality, setPersonality] = useState<PersonalityAxes>({
        confidence: 0,
        approach: 0,
        outlook: 0,
    });

    const backgroundBonuses = useMemo(() => {
        if (!selectedBackground) return {};
        return BackgroundBonuses[selectedBackground];
    }, [selectedBackground]);

    const handleNameSubmit = () => {
        if (name.trim().length >= 2) {
            setStep('background');
        }
    };

    const handleBackgroundSelect = (bg: PlayerBackground) => {
        setSelectedBackground(bg);
    };

    const handleBackgroundConfirm = () => {
        if (selectedBackground) {
            setStep('personality');
        }
    };

    const handleComplete = () => {
        if (name && selectedBackground) {
            onComplete(name.trim(), selectedBackground, personality);
        }
    };

    const handleBack = () => {
        if (step === 'background') setStep('name');
        else if (step === 'personality') setStep('background');
        else if (onBack) onBack();
    };

    return (
        <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-6 relative overflow-hidden text-white scanline">
            {/* Background Atmosphere */}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none mix-blend-overlay" />
            <div className="absolute inset-0 bg-radial-vignette pointer-events-none" />

            {/* Subtle ambient glow */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500/5 blur-[100px] rounded-full pointer-events-none" />

            {/* Content */}
            <div className="z-10 w-full max-w-4xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <h1 className="text-3xl font-bold text-cyan-400 tracking-wide mb-2">
                        {step === 'name' && 'BEGIN YOUR ROTATION'}
                        {step === 'background' && 'CHOOSE YOUR PATH'}
                        {step === 'personality' && 'DEFINE YOURSELF'}
                    </h1>
                    <div className="h-0.5 w-24 mx-auto bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
                </motion.div>

                {/* Progress indicator */}
                <div className="flex justify-center gap-2 mb-8">
                    {['name', 'background', 'personality'].map((s, idx) => (
                        <motion.div
                            key={s}
                            className={`w-16 h-1 rounded-full transition-colors ${step === s ? 'bg-cyan-500' :
                                    ['name', 'background', 'personality'].indexOf(step) > idx ? 'bg-cyan-700' : 'bg-gray-700'
                                }`}
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: idx * 0.1 }}
                        />
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    {/* Step 1: Name */}
                    {step === 'name' && (
                        <motion.div
                            key="name"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 50 }}
                            className="flex flex-col items-center gap-6"
                        >
                            <p className="text-gray-400 text-center max-w-md">
                                Third-year medical student. First day of emergency medicine rotation.
                                <br />
                                <span className="text-cyan-400/80 italic">Everything changes here.</span>
                            </p>

                            <div className="w-full max-w-md">
                                <label className="block text-gray-500 text-xs uppercase tracking-wider mb-2">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleNameSubmit()}
                                    placeholder="Dr. ..."
                                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-lg text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-colors"
                                    autoFocus
                                    maxLength={30}
                                />
                                <p className="text-gray-600 text-xs mt-2">
                                    At least 2 characters
                                </p>
                            </div>

                            <div className="flex gap-4 mt-4">
                                {onBack && (
                                    <Button variant="ghost" onClick={onBack}>
                                        ← Back
                                    </Button>
                                )}
                                <Button
                                    variant="primary"
                                    size="lg"
                                    onClick={handleNameSubmit}
                                    disabled={name.trim().length < 2}
                                >
                                    Continue →
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 2: Background Selection */}
                    {step === 'background' && (
                        <motion.div
                            key="background"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 50 }}
                            className="space-y-6"
                        >
                            <p className="text-gray-400 text-center mb-6">
                                Everyone comes to medicine from somewhere. Where did you come from?
                            </p>

                            <div
                                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                                role="radiogroup"
                                aria-label="Select your background"
                            >
                                {BACKGROUNDS.map((bg) => (
                                    <motion.div
                                        key={bg.id}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <Card
                                            className={`cursor-pointer transition-all p-4 h-full ${selectedBackground === bg.id
                                                    ? 'border-cyan-500 bg-cyan-950/30 shadow-[0_0_15px_rgba(34,211,238,0.2)]'
                                                    : 'hover:border-gray-600'
                                                } outline-none focus-visible:ring-2 focus-visible:ring-cyan-500`}
                                            onClick={() => handleBackgroundSelect(bg.id)}
                                            role="radio"
                                            aria-checked={selectedBackground === bg.id}
                                            tabIndex={0}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' || e.key === ' ') {
                                                    e.preventDefault();
                                                    handleBackgroundSelect(bg.id);
                                                }
                                            }}
                                        >
                                            <div className="flex items-start gap-3">
                                                <span className="text-3xl">{bg.icon}</span>
                                                <div className="flex-1">
                                                    <h3 className="text-lg font-semibold text-white mb-1">
                                                        {bg.name}
                                                    </h3>
                                                    <p className="text-cyan-400 text-sm italic mb-2">
                                                        {bg.tagline}
                                                    </p>
                                                    <p className="text-gray-400 text-sm leading-relaxed">
                                                        {bg.description}
                                                    </p>

                                                    {/* Skill bonuses preview */}
                                                    {selectedBackground === bg.id && (
                                                        <motion.div
                                                            initial={{ opacity: 0, height: 0 }}
                                                            animate={{ opacity: 1, height: 'auto' }}
                                                            className="mt-3 pt-3 border-t border-cyan-900/50"
                                                        >
                                                            <p className="text-cyan-500 text-xs uppercase tracking-wider mb-2">
                                                                Skill Bonuses
                                                            </p>
                                                            <div className="flex flex-wrap gap-1">
                                                                {Object.entries(BackgroundBonuses[bg.id]).map(([skill, bonus]) => (
                                                                    <span
                                                                        key={skill}
                                                                        className="text-xs bg-cyan-900/40 text-cyan-300 px-2 py-0.5 rounded"
                                                                    >
                                                                        {SKILL_NAMES[skill as SkillId]} +{bonus}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </div>
                                            </div>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="flex justify-center gap-4 mt-6">
                                <Button variant="ghost" onClick={handleBack}>
                                    ← Back
                                </Button>
                                <Button
                                    variant="primary"
                                    size="lg"
                                    onClick={handleBackgroundConfirm}
                                    disabled={!selectedBackground}
                                >
                                    Continue →
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 3: Personality Axes */}
                    {step === 'personality' && (
                        <motion.div
                            key="personality"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 50 }}
                            className="space-y-8"
                        >
                            <p className="text-gray-400 text-center">
                                Who are you, really? These shape how you think and speak.
                            </p>

                            <div className="max-w-xl mx-auto space-y-8">
                                {(Object.keys(PERSONALITY_LABELS) as Array<keyof PersonalityAxes>).map((axis) => (
                                    <div key={axis} className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className={`${personality[axis] < 0 ? 'text-cyan-400' : 'text-gray-500'}`}>
                                                {PERSONALITY_LABELS[axis].low}
                                            </span>
                                            <span className="text-gray-500 text-xs">
                                                {PERSONALITY_LABELS[axis].description}
                                            </span>
                                            <span className={`${personality[axis] > 0 ? 'text-cyan-400' : 'text-gray-500'}`}>
                                                {PERSONALITY_LABELS[axis].high}
                                            </span>
                                        </div>

                                        <div className="relative">
                                            <input
                                                type="range"
                                                min={-3}
                                                max={3}
                                                step={1}
                                                value={personality[axis]}
                                                aria-label={`${axis} level`}
                                                onChange={(e) => setPersonality({
                                                    ...personality,
                                                    [axis]: parseInt(e.target.value),
                                                })}
                                                className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer slider-cyan"
                                            />

                                            {/* Tick marks */}
                                            <div className="flex justify-between px-1 mt-1">
                                                {[-3, -2, -1, 0, 1, 2, 3].map((tick) => (
                                                    <div
                                                        key={tick}
                                                        className={`w-1 h-1 rounded-full ${personality[axis] === tick ? 'bg-cyan-400' : 'bg-gray-700'
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Character summary */}
                            <Card className="max-w-xl mx-auto mt-8 p-4 bg-gray-900/50">
                                <h3 className="text-cyan-400 text-sm uppercase tracking-wider mb-3">
                                    Your Character
                                </h3>
                                <div className="text-gray-300">
                                    <p className="font-semibold text-white mb-1">{name}</p>
                                    <p className="text-sm text-gray-400 mb-2">
                                        {BACKGROUNDS.find(b => b.id === selectedBackground)?.name}
                                    </p>
                                    <p className="text-sm italic text-gray-500">
                                        {personality.confidence < 0 ? 'Anxious' : personality.confidence > 0 ? 'Confident' : 'Balanced'}, {' '}
                                        {personality.approach < 0 ? 'methodical' : personality.approach > 0 ? 'intuitive' : 'adaptive'}, {' '}
                                        {personality.outlook < 0 ? 'and cynical about the system' : personality.outlook > 0 ? 'and still idealistic' : 'with a pragmatic outlook'}.
                                    </p>
                                </div>
                            </Card>

                            <div className="flex justify-center gap-4 mt-6">
                                <Button variant="ghost" onClick={handleBack}>
                                    ← Back
                                </Button>
                                <Button
                                    variant="medical"
                                    size="lg"
                                    onClick={handleComplete}
                                >
                                    BEGIN ROTATION
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <style jsx>{`
                .slider-cyan::-webkit-slider-thumb {
                    appearance: none;
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    background: #22d3ee;
                    cursor: pointer;
                    box-shadow: 0 0 10px rgba(34, 211, 238, 0.5);
                }
                .slider-cyan::-moz-range-thumb {
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    background: #22d3ee;
                    cursor: pointer;
                    border: none;
                    box-shadow: 0 0 10px rgba(34, 211, 238, 0.5);
                }
            `}</style>
        </div>
    );
};

export default CharacterCreation;
