//این فایل می‌شود Theme اصلی UI-Kit.

import { colors } from './tokens/colors';
import { spacing } from './tokens/spacing';
import { typography } from './tokens/typography';



/**
 * Supported product themes.
 *
 * These names are controlled by the UI Kit.
 * Consumers cannot define custom themes.
 */
export const themeNames = [
    "isc",
    "bsi",
    "samab",
    "opa",
    "dorsa",
] as const;

export type ThemeName = (typeof themeNames)[number];


// Figma: Software Identity

type Shade =
    | 50 | 100 | 200 | 300 | 400 | 500
    | 600 | 700 | 800 | 900 | 950;

export type ColorScale =
    Readonly<Record<Shade, string>>;

export interface SoftwareIdentity {
    brand: ColorScale;
    foundation: ColorScale;
    success: ColorScale;
    warning: ColorScale;
    error: ColorScale;
    info: ColorScale;
    achromatic: {
        brightness: ColorScale;
        neutral: ColorScale;
    };
}

// Default Software Identity = ISC
export const defaultIdentity: SoftwareIdentity = {
    brand: colors.picton,
    foundation: colors.slate,
    success: colors.green,
    warning: colors.yellow,
    error: colors.red,
    info: colors.blue,
    achromatic: {
        brightness: colors.brightness,
        neutral: colors.neutral,
    },
};

// Temporary compatibility for current AntD and CSS variables.
// Later these roles will come from PRSES Semantic Tokens.
export const createLegacyColors = (
    identity: SoftwareIdentity
) => ({
    primary: identity.brand[600],
    success: identity.success[600],
    warning: identity.warning[600],
    error: identity.error[600],

    text: identity.foundation[900],
    textSecondary: identity.foundation[600],
    textDisabled: identity.achromatic.neutral[400],

    border: identity.achromatic.neutral[300],
    borderHover: identity.achromatic.neutral[400],

    background: identity.achromatic.brightness[950],
    backgroundDisabled: identity.achromatic.neutral[100],
});

const baseTheme = {
    ...defaultIdentity,
    colors: createLegacyColors(defaultIdentity),
    spacing,
 /*   radius,
    shadows,*/
    typography,
};

type Widen<T> =
    T extends string ? string :
        T extends number ? number :
            T extends object ? { [K in keyof T]: Widen<T[K]> } :
                T;

export type UITheme = Widen<typeof baseTheme>;

export type DeepPartial<T> = {
    [K in keyof T]?: T[K] extends object
        ? DeepPartial<T[K]>
        : T[K];
};

export type UIThemeConfig = DeepPartial<UITheme>;

// Merge consumer overrides with ISC defaults.
export const createTheme = (
    overrides: UIThemeConfig = {}
): UITheme => {
    const identity: SoftwareIdentity = {
        brand: {
            ...defaultIdentity.brand,
            ...overrides.brand,
        },
        foundation: {
            ...defaultIdentity.foundation,
            ...overrides.foundation,
        },
        success: {
            ...defaultIdentity.success,
            ...overrides.success,
        },
        warning: {
            ...defaultIdentity.warning,
            ...overrides.warning,
        },
        error: {
            ...defaultIdentity.error,
            ...overrides.error,
        },
        info: {
            ...defaultIdentity.info,
            ...overrides.info,
        },
        achromatic: {
            brightness: {
                ...defaultIdentity.achromatic.brightness,
                ...overrides.achromatic?.brightness,
            },
            neutral: {
                ...defaultIdentity.achromatic.neutral,
                ...overrides.achromatic?.neutral,
            },
        },
    };

    return {
        ...identity,

        // Existing consumers still read theme.colors
        colors: {
            ...createLegacyColors(identity),
            ...overrides.colors,
        },

        spacing: { ...spacing, ...overrides.spacing },
       /* radius: { ...radius, ...overrides.radius },
        shadows: { ...shadows, ...overrides.shadows },*/

        typography,
    };
};

export const defaultTheme: UITheme = createTheme();