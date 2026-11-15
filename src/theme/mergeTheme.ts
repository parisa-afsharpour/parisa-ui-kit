import { createTheme, type UITheme, type UIThemeConfig } from './theme';

export const mergeTheme = (customTheme?: UIThemeConfig): UITheme =>
    createTheme(customTheme);


/*
import {
    defaultTheme,
    type UITheme,
    type UIThemeConfig,
} from './theme';

export const mergeTheme = (
    customTheme?: UIThemeConfig
): UITheme => {

    return {
        ...defaultTheme,

        ...customTheme,

        colors: {
            ...defaultTheme.colors,
            ...customTheme?.colors,
        },

        spacing: {
            ...defaultTheme.spacing,
            ...customTheme?.spacing,
        },

        radius: {
            ...defaultTheme.radius,
            ...customTheme?.radius,
        },

        shadows: {
            ...defaultTheme.shadows,
            ...customTheme?.shadows,
        },

        typography: {
            ...defaultTheme.typography,
            ...customTheme?.typography,
        },
    };
};*/
