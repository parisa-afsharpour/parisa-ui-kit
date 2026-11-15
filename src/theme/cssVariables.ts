import type { CSSProperties } from 'react';
import type { UITheme } from './theme';
import { createSemanticTokens, type SemanticTokens } from './tokens/semantic';

type CSSVariables = CSSProperties & {
    [key: `--${string}`]: string | number;
};

type TokenTree = { readonly [key: string]: string | TokenTree };

/** Publish active Light/Dark semantic tokens as CSS variables. */
function appendSemanticVariables(
    target: CSSVariables,
    tokens: TokenTree,
    segments: string[] = [],
): void {
    for (const [key, value] of Object.entries(tokens)) {
        const path = [...segments, key];
        if (typeof value === 'string') {
            target[`--ui-semantic-${path.join('-')}`] = value; //semantic.base.outline.bg.default ---> --ui-semantic-base-outline-bg-default
        } else {
            appendSemanticVariables(target, value, path);
        }
    }
}

export function createCSSVariables(
    theme: UITheme,
    semantic: SemanticTokens = createSemanticTokens(theme),
): CSSVariables {
    const vars: CSSVariables = {};

    // Identity palettes are resolved from the selected predefined theme.
    const palettes = ['brand', 'foundation', 'success', 'warning', 'error', 'info'] as const;
    for (const palette of palettes) {
        for (const [shade, color] of Object.entries(theme[palette])) {
            if (shade !== 'key') vars[`--ui-${palette}-${shade}`] = color;
        }
    }
    for (const palette of ['brightness', 'neutral'] as const) {
        for (const [shade, color] of Object.entries(theme.achromatic[palette])) {
            if (shade !== 'key') vars[`--ui-${palette}-${shade}`] = color;
        }
    }

    // Include the actual PRSES semantic roles, not only generic color aliases.
    appendSemanticVariables(vars, semantic as unknown as TokenTree);

    // Legacy contract, retained until TextField/other components migrate.
    vars['--ui-color-primary'] = semantic.color.primary;
    vars['--ui-color-success'] = semantic.color.success;
    vars['--ui-color-warning'] = semantic.color.warning;
    vars['--ui-color-error'] = semantic.color.error;
    vars['--ui-color-text'] = semantic.color.text;
    vars['--ui-color-text-secondary'] = semantic.color.textSecondary;
    vars['--ui-color-text-disabled'] = semantic.color.textDisabled;
    vars['--ui-color-border'] = semantic.color.border;
    vars['--ui-color-border-hover'] = semantic.color.borderHover;
    vars['--ui-color-background'] = semantic.color.background;
    vars['--ui-color-background-disabled'] = semantic.color.backgroundDisabled;
    vars['--ui-textfield-border-focus'] = semantic.color.primary;
    vars['--ui-textfield-error'] = semantic.color.error;
    vars['--ui-textfield-success'] = semantic.color.success;
    vars['--ui-textfield-warning'] = semantic.color.warning;

    return vars;
}

