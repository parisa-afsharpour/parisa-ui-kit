//این فایل می‌شود Theme اصلی UI-Kit.
import { colors } from './tokens/colors';
import { spacing } from './tokens/spacing';
import { radius } from './tokens/radius';
import { shadows } from './tokens/shadows';
import { typography } from './tokens/typography';

export const defaultTheme = {
    colors: {
        primary: colors.blue[600],

        success: colors.green[600],
        warning: colors.orange[600],
        error: colors.red[600],

        text: colors.gray[900],
        textSecondary: colors.gray[600],
        textDisabled: colors.gray[400],

        border: colors.gray[300],
        borderHover: colors.gray[400],

        background: colors.white,
        backgroundDisabled: colors.gray[100],
    },

    spacing,
    radius,
    shadows,
    typography,
} as const;

export type UITheme = typeof defaultTheme;

export type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object
        ? DeepPartial<T[P]>
        : T[P];
};

export type UIThemeConfig =
    DeepPartial<UITheme>;