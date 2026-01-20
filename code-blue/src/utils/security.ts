// src/utils/security.ts
// Security utilities for input validation

export const SECURITY_LIMITS = {
    MAX_PLAYER_NAME: 50,
    MAX_BOARD_CONTENT: 200,
    MAX_BOARD_DESCRIPTION: 1000,
    MAX_RELATIONSHIP_REASON: 200,
    MIN_PLAYER_NAME: 2,
} as const;

/**
 * Sanitizes a string by trimming whitespace and ensuring it doesn't exceed maxLength.
 * Removes control characters (except newlines/tabs).
 */
export const sanitizeString = (input: string, maxLength: number): string => {
    if (!input) return '';

    // Trim and remove non-printable control chars (keeping \t, \n, \r)
    let sanitized = input.trim().replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');

    if (sanitized.length > maxLength) {
        sanitized = sanitized.substring(0, maxLength);
    }

    return sanitized;
};
