
/**
 * Anatomy / Dimensions Tokens
 * Source: ISC Core DS - Figma
 * ->Width, Height
 * Values are in pixels.
 */

// Width Tokens
export const width = {
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

// Height Tokens
export const height = {
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

    export type WidthToken =
    keyof typeof width;

export type HeightToken =
    keyof typeof height;
