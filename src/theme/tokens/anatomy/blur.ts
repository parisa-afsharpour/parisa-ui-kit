
/**
 * Anatomy / Blur Tokens
 * Source: ISC Core DS - Figma
 *
 * Values are in pixels.
 */

export const blur = {
    none: 0,

    xs: 4,
    s: 8,
    sm: 12,
    m: 16,
    ml: 24,
    l: 48,
    xl: 64,
} as const;

export type BlurToken =
    keyof typeof blur;
