import React, { useEffect, useRef } from 'react';

interface NarrativeEntry {
    id: string;
    text: string;
    type: 'NARRATIVE' | 'DIALOGUE' | 'ACTION';
    speaker?: string;
}

interface NarrativeLogProps {
    history: NarrativeEntry[];
}

export const NarrativeLog: React.FC<NarrativeLogProps> = ({ history }) => {
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-900/80 rounded-lg border border-gray-700 h-[400px]">
            {history.map((entry) => (
                <div key={entry.id} className={`flex flex-col ${entry.type === 'ACTION' ? 'items-center' : 'items-start'}`}>
                    {entry.speaker && (
                        <span className="text-xs font-bold text-cyan-400 mb-1 uppercase tracking-wider">
                            {entry.speaker}
                        </span>
                    )}
                    <div className={`
                        max-w-[80%] p-3 rounded-lg text-sm leading-relaxed
                        ${entry.type === 'NARRATIVE' ? 'text-gray-300 italic bg-transparent' : ''}
                        ${entry.type === 'DIALOGUE' ? 'bg-gray-800 text-white border border-gray-600' : ''}
                        ${entry.type === 'ACTION' ? 'text-yellow-400 font-mono text-xs border-t border-b border-yellow-900/30 py-1' : ''}
                    `}>
                        {entry.text}
                    </div>
                </div>
            ))}
            <div ref={bottomRef} />
        </div>
    );
};
