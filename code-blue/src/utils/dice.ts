// src/utils/dice.ts
// Secure 2d6 dice rolling and probability calculations

// ============================================
// CORE DICE ROLLING
// ============================================

export interface DiceRoll {
    dice: [number, number];
    natural: number;  // Sum before modifiers
}

/**
 * Roll 2d6 with cryptographically strong randomness when available
 */
export const roll2d6 = (): DiceRoll => {
    const die1 = rollDie();
    const die2 = rollDie();
    return {
        dice: [die1, die2],
        natural: die1 + die2,
    };
};

/**
 * Roll a single d6
 */
const rollDie = (): number => {
    // Use crypto.getRandomValues for better randomness when available
    if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
        const array = new Uint32Array(1);
        window.crypto.getRandomValues(array);
        return (array[0] % 6) + 1;
    }
    // Fallback to Math.random
    return Math.floor(Math.random() * 6) + 1;
};

// ============================================
// CRITICAL DETECTION
// ============================================

export type CriticalType = 'NONE' | 'SUCCESS' | 'FAILURE';

/**
 * Check if a roll is a critical success (natural 12) or failure (natural 2)
 */
export const getCriticalType = (roll: DiceRoll): CriticalType => {
    if (roll.natural === 12) return 'SUCCESS';
    if (roll.natural === 2) return 'FAILURE';
    return 'NONE';
};

/**
 * Check for snake eyes (both dice = 1)
 */
export const isSnakeEyes = (roll: DiceRoll): boolean => {
    return roll.dice[0] === 1 && roll.dice[1] === 1;
};

/**
 * Check for boxcars (both dice = 6)
 */
export const isBoxcars = (roll: DiceRoll): boolean => {
    return roll.dice[0] === 6 && roll.dice[1] === 6;
};

// ============================================
// PROBABILITY CALCULATIONS
// ============================================

/**
 * Probability distribution for 2d6
 * Sum  | Ways | Probability
 * 2    | 1    | 2.78%
 * 3    | 2    | 5.56%
 * 4    | 3    | 8.33%
 * 5    | 4    | 11.11%
 * 6    | 5    | 13.89%
 * 7    | 6    | 16.67%
 * 8    | 5    | 13.89%
 * 9    | 4    | 11.11%
 * 10   | 3    | 8.33%
 * 11   | 2    | 5.56%
 * 12   | 1    | 2.78%
 */
const probabilityTable: Record<number, number> = {
    2: 1 / 36, 3: 2 / 36, 4: 3 / 36, 5: 4 / 36, 6: 5 / 36, 7: 6 / 36,
    8: 5 / 36, 9: 4 / 36, 10: 3 / 36, 11: 2 / 36, 12: 1 / 36,
};

/**
 * Calculate probability of rolling >= target with 2d6 + modifier
 */
export const successProbability = (dc: number, modifier: number): number => {
    const targetRoll = dc - modifier;  // What natural roll do we need?

    // If target is 2 or less, we auto-succeed (unless snake eyes)
    if (targetRoll <= 2) return 35 / 36; // ~97.22% (1 - snake eyes chance)

    // If target is 13 or more, we can't succeed
    if (targetRoll > 12) return 0;

    // Sum probabilities of all rolls >= target
    let probability = 0;
    for (let roll = targetRoll; roll <= 12; roll++) {
        probability += probabilityTable[roll] || 0;
    }

    return probability;
};

/**
 * Get human-readable probability description
 */
export const getProbabilityDescription = (probability: number): string => {
    if (probability >= 0.95) return 'Almost Certain';
    if (probability >= 0.85) return 'Very Likely';
    if (probability >= 0.70) return 'Likely';
    if (probability >= 0.50) return 'Even Odds';
    if (probability >= 0.35) return 'Unlikely';
    if (probability >= 0.15) return 'Very Unlikely';
    if (probability > 0) return 'Nearly Impossible';
    return 'Impossible';
};

/**
 * Get probability color class for UI
 */
export const getProbabilityColor = (probability: number): string => {
    if (probability >= 0.70) return 'text-green-400';
    if (probability >= 0.40) return 'text-yellow-400';
    return 'text-red-400';
};

// ============================================
// DIFFICULTY CLASS HELPERS
// ============================================

export const DC = {
    TRIVIAL: 6,
    EASY: 8,
    MODERATE: 10,
    HARD: 12,
    VERY_HARD: 14,
    EXTREME: 16,
    LEGENDARY: 18,
} as const;

export type DCLevel = keyof typeof DC;

export const getDCDescription = (dc: number): string => {
    if (dc <= 6) return 'Trivial';
    if (dc <= 8) return 'Easy';
    if (dc <= 10) return 'Moderate';
    if (dc <= 12) return 'Hard';
    if (dc <= 14) return 'Very Hard';
    if (dc <= 16) return 'Extreme';
    return 'Legendary';
};

// ============================================
// ADVANTAGE & DISADVANTAGE
// ============================================

/**
 * Roll with advantage (roll twice, take higher)
 */
export const roll2d6WithAdvantage = (): DiceRoll => {
    const roll1 = roll2d6();
    const roll2 = roll2d6();
    return roll1.natural >= roll2.natural ? roll1 : roll2;
};

/**
 * Roll with disadvantage (roll twice, take lower)
 */
export const roll2d6WithDisadvantage = (): DiceRoll => {
    const roll1 = roll2d6();
    const roll2 = roll2d6();
    return roll1.natural <= roll2.natural ? roll1 : roll2;
};
