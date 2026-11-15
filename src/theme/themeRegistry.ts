
import { colors } from "./tokens/colors";

import {
    createTheme,
    type ThemeName,
    type UITheme,
} from "./theme";

/**
 * Registered product themes.
 *
 * Theme palettes are defined by the UI Kit.
 * Consumers will select a theme by name.
 */
export const themeRegistry = {
    isc: createTheme(),

    bsi: createTheme({
        brand: colors.cerulean,
    }),

    samab: createTheme({
        brand: colors.tangaroa,
    }),

    opa: createTheme({
        brand: colors.zinc,
    }),

    dorsa: createTheme({
        brand: colors.teal,
        foundation: colors.fiord,
    }),
};

/**
 * Resolves a predefined product theme.
 */
export function getTheme(name: ThemeName): UITheme {
    return themeRegistry[name];
}
