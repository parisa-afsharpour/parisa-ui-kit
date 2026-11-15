
import { theme as antdTheme, type ThemeConfig } from 'antd';
import type { UITheme } from './theme';
import {
    createSemanticTokens,
    type SemanticTokens,
} from './tokens/semantic';
import { fontFamily } from './tokens/typography';
import type { ColorMode } from './UIProvider';

/**
 * Map UI Kit semantic tokens to Ant Design tokens.
 */
export function createAntdTheme(
    theme: UITheme,
    semantic: SemanticTokens = createSemanticTokens(theme),
    colorMode: ColorMode = 'light',
): ThemeConfig {
    return {
        algorithm:
            colorMode === 'dark'
                ? antdTheme.darkAlgorithm
                : antdTheme.defaultAlgorithm,

        token: {
            colorPrimary:
            semantic.primary.solid.bg.alter,

            colorError:
            semantic.base.solid.bg.state.error,

            colorSuccess:
            semantic.base.solid.bg.state.success,

            colorWarning:
            semantic.base.solid.border.state.warning,

            colorText:
            semantic.base.outline.text.default,

            colorTextSecondary:
            semantic.base.outline.text.paraghraph,

            colorTextDisabled:
            semantic.base.outline.text.state.disable,

            colorBorder:
            semantic.base.outline.border.default,

            colorBgContainer:
            semantic.base.outline.bg.default,

            colorBgContainerDisabled:
            semantic.base.outline.bg.state.disable,

            fontFamily:
                `"${fontFamily.primary}", Arial, sans-serif`,
        },
    };
}
