
/**
 * ISC Core Design System
 * Typography Foundation Tokens
 *
 * Source: ISC-Core-DS-Typography.json
 *
 * Shared across all consumer applications.
 * Font sizes and line heights follow Figma.
 */

// --------------------------------------------------
// Font Family
// --------------------------------------------------

export const fontFamily = {
    primary: "IRANSansX",
} as const;

// --------------------------------------------------
// Font Weight
// --------------------------------------------------

export const fontWeight = {
    regular: 400,
    medium: 500,
    demibold: 600,
} as const;

export type FontWeightToken = keyof typeof fontWeight;

// All typography styles support these three weights.
// Figma does not specify a fixed weight per style.
export const typographyWeightOptions = [
    fontWeight.regular,
    fontWeight.medium,
    fontWeight.demibold,
] as const;

// --------------------------------------------------
// Shared Typography Properties
// --------------------------------------------------

const typographyBase = {
    fontFamily: fontFamily.primary,
    letterSpacing: 0,
} as const;

// --------------------------------------------------
// Typography Styles
// --------------------------------------------------

export const typography = {
    // Body
    body: {
        xs: {
            ...typographyBase,
            fontSize: "10px",
            lineHeight: "16px",
        },
        s: {
            ...typographyBase,
            fontSize: "12px",
            lineHeight: "20px",
        },
        m: {
            ...typographyBase,
            fontSize: "14px",
            lineHeight: "20px",
        },
        l: {
            ...typographyBase,
            fontSize: "16px",
            lineHeight: "24px",
        },
    },

    // Title
    title: {
        xs: {
            ...typographyBase,
            fontSize: "14px",
            lineHeight: "20px",
        },
        s: {
            ...typographyBase,
            fontSize: "16px",
            lineHeight: "24px",
        },
        m: {
            ...typographyBase,
            fontSize: "18px",
            lineHeight: "32px",
        },
        l: {
            ...typographyBase,
            fontSize: "20px",
            lineHeight: "34px",
        },
    },

    // Heading
    heading: {
        s: {
            ...typographyBase,
            fontSize: "22px",
            lineHeight: "36px",
        },
        m: {
            ...typographyBase,
            fontSize: "24px",
            lineHeight: "40px",
        },
        l: {
            ...typographyBase,
            fontSize: "26px",
            lineHeight: "42px",
        },
    },

    // Display
    display: {
        s: {
            ...typographyBase,
            fontSize: "30px",
            lineHeight: "48px",
        },
        m: {
            ...typographyBase,
            fontSize: "34px",
            lineHeight: "52px",
        },
        l: {
            ...typographyBase,
            fontSize: "38px",
            lineHeight: "64px",
        },
    },
} as const;

export type TypographyCategory =
    keyof typeof typography;

export type TypographyToken = {
    [K in TypographyCategory]:
    `${K}.${keyof typeof typography[K] & string}`;
}[TypographyCategory];
