import { semanticTokens } from '../semantic';
import { radius } from '../radius';

export const textFieldTokens = {
    color: {
        background:
        semanticTokens.color.background,

        text:
        semanticTokens.color.text,

        textDisabled:
        semanticTokens.color.textDisabled,

        placeholder:
        semanticTokens.color.textSecondary,

        border:
        semanticTokens.color.border,

        borderHover:
        semanticTokens.color.borderHover,

        borderFocus:
        semanticTokens.color.primary,

        error:
        semanticTokens.color.error,

        success:
        semanticTokens.color.success,

        warning:
        semanticTokens.color.warning,
    },

    radius: {
        small: radius.small,
        medium: radius.medium,
        large: radius.large,
    },
} as const;