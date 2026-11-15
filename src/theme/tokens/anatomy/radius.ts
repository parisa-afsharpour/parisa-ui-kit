
/**
 * Anatomy / Radius Tokens
 * Source: ISC Core DS - Figma
 *
 * Values are in pixels.
 */

export const radius = {
    none: 0,
    odd: 1,

    xs: 2,
    s: 4,
    sm: 6,
    m: 8,
    ml: 10,
    "2ml": 12,

    l: 16,
    xl: 24,
    "2xl": 32,
    "3xl": 48,
    "4xl": 64,
    "5xl": 80,
    "6xl": 96,
    "7xl": 112,
} as const;

export type RadiusToken =
    keyof typeof radius;
