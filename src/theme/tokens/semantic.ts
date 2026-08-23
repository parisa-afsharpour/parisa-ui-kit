import { colors } from './colors';

export const semanticTokens = {
    color: {
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
} as const;