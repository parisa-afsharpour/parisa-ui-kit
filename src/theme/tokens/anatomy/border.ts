
/**
 * Anatomy / Border Tokens
 * Source: ISC Core DS - Figma
 *
 * Values are in pixels.
 * Used for border and stroke widths.
 */

export const border = {
    none: 0,
    odd: 1,

    xs: 2,
    m: 4,
    l: 6,
    xl: 8,
    "2xl": 12,
} as const;

export type BorderToken =
    keyof typeof border;
