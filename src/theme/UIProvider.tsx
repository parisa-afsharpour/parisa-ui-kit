import type { ReactNode } from 'react';
import { createContext, useContext, useMemo } from 'react';
import { ConfigProvider } from 'antd';
import { createCSSVariables } from './cssVariables';
import { createAntdTheme } from './antd-theme';
import { createSemanticTokens, type SemanticTokens } from './tokens/semantic';
import { createDarkSemanticTokens } from './tokens/semantic.dark';
import type { UITheme, ThemeName } from './theme';
import { getTheme } from './themeRegistry';
import "./fonts.css";


export type ColorMode = 'light' | 'dark';

interface UIThemeContextValue {
    theme: UITheme;
    semantic: SemanticTokens;
    colorMode: ColorMode;
}

const UIThemeContext = createContext<UIThemeContextValue | null>(null);

export interface UIProviderProps {
    children: ReactNode;

    /** Predefined product theme. Defaults to ISC. */
    theme?: ThemeName;

    /** Semantic color mode. Defaults to Light. */
    colorMode?: ColorMode;
}

export function UIProvider({
                               children,
                               theme: themeName = 'isc',
                               colorMode = 'light',
                           }: UIProviderProps) {

    const theme = useMemo(
        () => getTheme(themeName),
        [themeName]
    );


    const semantic = useMemo<SemanticTokens>(() => {
        return colorMode === 'dark'
            ? createDarkSemanticTokens(theme)
            : createSemanticTokens(theme);
    }, [theme, colorMode]);


    const antdTheme = useMemo(
        () => createAntdTheme(theme, semantic, colorMode),
        [theme, semantic, colorMode]
    );
    const cssVariables = useMemo(() => createCSSVariables(theme, semantic), [theme, semantic]);
    const contextValue = useMemo(
        () => ({ theme, semantic, colorMode }),
        [theme, semantic, colorMode],
    );

    return (
        <UIThemeContext.Provider value={contextValue}>
            <ConfigProvider theme={antdTheme}>
                <div data-ui-color-mode={colorMode} style={cssVariables}>
                    {children}
                </div>
            </ConfigProvider>
        </UIThemeContext.Provider>
    );
}

function useUIContext(): UIThemeContextValue {
    const context = useContext(UIThemeContext);
    if (!context) {
        throw new Error('UI Kit hooks must be used inside UIProvider');
    }
    return context;
}

export const useUITheme = (): UITheme => useUIContext().theme;
export const useUISemanticTokens = (): SemanticTokens => useUIContext().semantic;
export const useUIColorMode = (): ColorMode => useUIContext().colorMode;

