// src/hooks/useSound.ts
// Hook for playing UI and game sounds
// Uses Howler.js for audio management

import { useCallback, useEffect, useRef } from 'react';
import { Howl } from 'howler';

// Sound manifest - keys map to file paths
// In a real app, these would be actual files in public/sounds/
const SOUNDS = {
    // UI Sounds
    CLICK: '/sounds/ui/click.mp3',
    HOVER: '/sounds/ui/hover.mp3',
    SUCCESS: '/sounds/ui/success.mp3',
    ERROR: '/sounds/ui/error.mp3',
    NOTIFICATION: '/sounds/ui/notification.mp3',

    // Game Sounds
    SHIFT_START: '/sounds/game/shift-start.mp3',
    HEARTBEAT_NORMAL: '/sounds/game/heartbeat-normal.mp3',
    HEARTBEAT_FAST: '/sounds/game/heartbeat-fast.mp3',
    SKILL_CHECK_SUCCESS: '/sounds/game/skill-success.mp3',
    SKILL_CHECK_FAIL: '/sounds/game/skill-fail.mp3',
} as const;

type SoundKey = keyof typeof SOUNDS;

export const useSound = () => {
    // Cache Howl instances
    const howls = useRef<Record<string, Howl>>({});

    // Preload sounds on mount
    useEffect(() => {
        // Only preload critical UI sounds to save bandwidth
        const preloadList: SoundKey[] = ['CLICK', 'HOVER', 'SUCCESS', 'ERROR'];

        preloadList.forEach(key => {
            if (!howls.current[key]) {
                howls.current[key] = new Howl({
                    src: [SOUNDS[key]],
                    volume: 0.5,
                    preload: true,
                });
            }
        });

        return () => {
            // Cleanup if needed, though usually we want to keep them cached
            // Object.values(howls.current).forEach(h => h.unload());
        };
    }, []);

    const play = useCallback((key: SoundKey, options?: { volume?: number, loop?: boolean, rate?: number }) => {
        // In a real implementation with files, we would play here.
        // For this prototype without assets, we'll just log or fail gracefully.

        // Check if sound exists in cache, if not create it
        if (!howls.current[key]) {
            howls.current[key] = new Howl({
                src: [SOUNDS[key]],
                volume: options?.volume ?? 0.5,
                loop: options?.loop ?? false,
                rate: options?.rate ?? 1.0,
            });
        }

        const sound = howls.current[key];
        sound.volume(options?.volume ?? 0.5);
        sound.loop(options?.loop ?? false);
        sound.rate(options?.rate ?? 1.0);

        sound.play();

    }, []);

    const stop = useCallback((key: SoundKey) => {
        if (howls.current[key]) {
            howls.current[key].stop();
        }
    }, []);

    return { play, stop };
};
