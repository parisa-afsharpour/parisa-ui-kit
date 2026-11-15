
/**
 * Anatomy / Spacing Tokens
 * Source: ISC Core DS - Figma
 *
 * Padding, Margin, Gap
 * Values are in pixels.
 */

// Shared spacing scale
const spacingScale = {
    none: 0,

    xs: 2,
    s: 4,
    sm: 6,
    m: 8,
    ml: 10,
    "2ml": 12,
    "3ml": 14,

    l: 16,
    xl: 20,
    "2xl": 24,
    "3xl": 32,
    "4xl": 48,
    "5xl": 64,
    "6xl": 80,
    "7xl": 96,
    "8xl": 112,
    "9xl": 128,
    "10xl": 144,
    "11xl": 160,
    "12xl": 176,
    "13xl": 192,
    "14xl": 208,
} as const;

/**
 * Spacing / Padding
 */
export const padding = spacingScale;

/**
 * Spacing / Margin
 */
export const margin = spacingScale;

/**
 * Spacing / Gap
 */
export const gap = spacingScale;

export type SpacingToken = keyof typeof spacingScale;
