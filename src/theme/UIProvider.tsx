import React, {
    createContext,
    useContext,
    useMemo,
} from 'react';
import { createCSSVariables } from './cssVariables';
import { ConfigProvider } from 'antd';

import type {
    UITheme,
    UIThemeConfig,
} from './theme';

import { mergeTheme } from './mergeTheme';

import { createAntdTheme } from './antd-theme';

interface UIThemeContextValue {
    theme: UITheme;
}

const UIThemeContext =
    createContext<UIThemeContextValue | null>(null);

export interface UIProviderProps {
    children: React.ReactNode;
    theme?: UIThemeConfig;
}

export const UIProvider: React.FC<UIProviderProps> = ({
                                                          children,
                                                          theme: customTheme,
                                                      }) => {

    const theme = useMemo(
        () => mergeTheme(customTheme),
        [customTheme]
    );

    const antdTheme = useMemo(
        () => createAntdTheme(theme),
        [theme]
    );

    const cssVariables = useMemo(
        () => createCSSVariables(theme),
        [theme]
    );

    return (
        <UIThemeContext.Provider value={{ theme }}>
            <ConfigProvider theme={antdTheme}>
                <div style={cssVariables}>
                    {children}
                </div>
            </ConfigProvider>
        </UIThemeContext.Provider>
    );
};

export const useUITheme = () => {

    const context =
        useContext(UIThemeContext);

    if (!context) {
        throw new Error(
            'useUITheme must be used inside UIProvider'
        );
    }

    return context.theme;
};