// src/components/game/SettingsScreen.tsx
// Game settings (placeholder for now)

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';

export interface SettingsScreenProps {
    onBack: () => void;
    className?: string;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
    onBack,
    className = '',
}) => {
    return (
        <div className={`min-h-screen bg-gray-950 flex flex-col items-center justify-center p-6 ${className}`}>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full"
            >
                <Card variant="default">
                    <CardHeader>
                        <h2 className="text-2xl font-bold text-white text-center">Settings</h2>
                    </CardHeader>
                    <CardContent className="space-y-6">

                        {/* Audio */}
                        <div>
                            <h3 className="text-gray-400 text-sm uppercase tracking-wider mb-2">Audio</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-300">Master Volume</span>
                                    <div className="w-32 h-2 bg-gray-700 rounded-full">
                                        <div className="w-[70%] h-full bg-cyan-500 rounded-full" />
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-300">Effects</span>
                                    <div className="w-32 h-2 bg-gray-700 rounded-full">
                                        <div className="w-[60%] h-full bg-cyan-500 rounded-full" />
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-300">Music</span>
                                    <div className="w-32 h-2 bg-gray-700 rounded-full">
                                        <div className="w-[40%] h-full bg-cyan-500 rounded-full" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Accessibility */}
                        <div>
                            <h3 className="text-gray-400 text-sm uppercase tracking-wider mb-2">Accessibility</h3>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-300">Text Size</span>
                                    <span className="text-cyan-400">Medium</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-300">High Contrast</span>
                                    <span className="text-gray-500">Off</span>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="pt-4 flex gap-4">
                            <Button onClick={onBack} className="w-full">
                                Back to Menu
                            </Button>
                        </div>

                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
};

export default SettingsScreen;
