export {
    UIProvider,
    useUITheme,
    useUISemanticTokens,
    useUIColorMode,
    type UIProviderProps,
    type ColorMode,
} from './UIProvider';

export {
    createTheme,
    createLegacyColors,
    defaultTheme,
    defaultIdentity,
    type UITheme,
    type UIThemeConfig,
    type SoftwareIdentity,
    type ColorScale,
} from './theme';

export { colors } from './tokens/colors';
export {
    createSemanticTokens,
    semanticTokens,
    type SemanticTokens,
} from './tokens/semantic';




/*export {
    UIProvider,
    useUITheme,
} from './UIProvider';

export {
    defaultTheme,
    type UITheme,
    type UIThemeConfig,
} from './theme';*/

/*
* حالا پروژه‌ای که UI-Kit را استفاده می‌کند می‌تواند:

import {
    UIProvider,
} from '@your-ui-kit';

const theme = {
    colors: {
        primary: '#9157FF',
        error: '#D92D20',
        success: '#12B76A',
        warning: '#F79009',
    },
};

function App() {
    return (
        <UIProvider theme={theme}>
            <YourApp />
        </UIProvider>
    );
}
*
* --------------------------------------------------
*
*
* فعلاً یک component آزمایشی بساز:

import { useUITheme } from '@your-ui-kit';

export const ThemeTest = () => {

    const theme = useUITheme();

    return (
        <div
            style={{
                color: theme.colors.primary,
            }}
        >
            Primary Color
        </div>
    );
};

اگر از بیرون این را بدهی:

<UIProvider
    theme={{
        colors: {
            primary: '#9157FF',
        },
    }}
>

باید متن بنفش شود.
* */