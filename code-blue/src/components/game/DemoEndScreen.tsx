// src/components/game/DemoEndScreen.tsx
// Screen shown when the demo content is exhausted

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';

export interface DemoEndScreenProps {
    onReturnToMenu: () => void;
    className?: string;
}

export const DemoEndScreen: React.FC<DemoEndScreenProps> = ({
    onReturnToMenu,
    className = '',
}) => {
    return (
        <div className={`min-h-screen bg-gray-950 flex flex-col items-center justify-center p-6 ${className}`}>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-xl w-full text-center"
            >
                <div className="mb-8">
                    <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-4">
                        Thank You for Playing
                    </h1>
                    <p className="text-xl text-gray-300">
                        You have reached the end of the CODE BLUE Preview.
                    </p>
                </div>

                <Card variant="default" className="mb-8 text-left">
                    <CardHeader>
                        <h2 className="text-xl font-bold text-white">What's Next?</h2>
                    </CardHeader>
                    <CardContent className="space-y-4 text-gray-300">
                        <p>
                            In the full version of CODE BLUE:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-2">
                            <li><span className="text-cyan-400">Deep Narrative:</span> Navigate complex hospital politics and relationships.</li>
                            <li><span className="text-cyan-400">Advanced Cases:</span> Trauma, Pediatrics, Psychiatry, and more.</li>
                            <li><span className="text-cyan-400">CPC Exam:</span> The ultimate test of your diagnostic skills.</li>
                            <li><span className="text-cyan-400">Character Growth:</span> Evolve your skills and internal voices.</li>
                        </ul>
                    </CardContent>
                </Card>

                <Button
                    size="lg"
                    variant="primary"
                    className="w-full py-4 text-lg"
                    onClick={onReturnToMenu}
                >
                    Return to Main Menu
                </Button>
            </motion.div>
        </div>
    );
};

export default DemoEndScreen;
