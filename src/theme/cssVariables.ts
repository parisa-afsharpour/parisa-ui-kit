//src/theme/cssVariables.ts

import type React from 'react';
import type { UITheme } from './theme';

type CSSVariables = React.CSSProperties & {
    [key: `--${string}`]: string | number;
};

export const createCSSVariables = (
    theme: UITheme
): CSSVariables => {
    return {
        '--ui-color-primary':
        theme.colors.primary,

        '--ui-color-success':
        theme.colors.success,

        '--ui-color-warning':
        theme.colors.warning,

        '--ui-color-error':
        theme.colors.error,

        '--ui-color-text':
        theme.colors.text,

        '--ui-color-text-secondary':
        theme.colors.textSecondary,

        '--ui-color-text-disabled':
        theme.colors.textDisabled,

        '--ui-color-border':
        theme.colors.border,

        '--ui-color-border-hover':
        theme.colors.borderHover,

        '--ui-color-background':
        theme.colors.background,

        '--ui-color-background-disabled':
        theme.colors.backgroundDisabled,

        '--ui-textfield-border-focus':
        theme.colors.primary,

        '--ui-textfield-error':
        theme.colors.error,

        '--ui-textfield-success':
        theme.colors.success,

        '--ui-textfield-warning':
        theme.colors.warning,
    };
};