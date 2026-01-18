import React from 'react';
import { Choice } from '../../types/PatientCase';

interface ActionPaletteProps {
    choices: Choice[];
    onChoiceSelected: (choiceId: string) => void;
    disabled?: boolean;
}

export const ActionPalette: React.FC<ActionPaletteProps> = ({ choices, onChoiceSelected, disabled }) => {
    if (choices.length === 0) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 bg-gray-950 border-t border-gray-800">
            {choices.map((choice) => (
                <button
                    key={choice.id}
                    onClick={() => onChoiceSelected(choice.id)}
                    disabled={disabled}
                    className={`
                        p-3 rounded-md text-left transition-all border
                        ${disabled
                            ? 'opacity-50 cursor-not-allowed border-gray-800 bg-gray-900 text-gray-500'
                            : 'hover:bg-gray-800 border-gray-700 bg-gray-900 text-gray-200 hover:border-cyan-500 active:scale-[0.99]'}
                    `}
                >
                    <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">{choice.text}</span>
                        {choice.timeCost && choice.timeCost > 0 && (
                            <span className="text-xs text-gray-500 font-mono ml-2">
                                +{choice.timeCost}m
                            </span>
                        )}
                    </div>
                    <div className="flex gap-2 mt-1">
                        <span className={`text-[10px] px-1.5 py-0.5 rounded border ${getTypeColor(choice.type)}`}>
                            {choice.type}
                        </span>
                    </div>
                </button>
            ))}
        </div>
    );
};

function getTypeColor(type: Choice['type']) {
    switch (type) {
        case 'MEDICAL': return 'border-red-900 text-red-400 bg-red-950/30';
        case 'DIALOGUE': return 'border-blue-900 text-blue-400 bg-blue-950/30';
        case 'EXAM': return 'border-yellow-900 text-yellow-400 bg-yellow-950/30';
        case 'PROCEDURE': return 'border-purple-900 text-purple-400 bg-purple-950/30';
        default: return 'border-gray-700 text-gray-400';
    }
}
