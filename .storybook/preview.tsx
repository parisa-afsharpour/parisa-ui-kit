
import type { Preview } from "@storybook/react";
import { createElement, type ReactNode } from "react";

import {
    UIProvider,
    useUISemanticTokens,
} from "../src/theme/UIProvider";

import type { ColorMode } from "../src/theme/UIProvider";
import type { ThemeName } from "../src/theme/theme";

// Read background and text colors from active Semantic Tokens.
function StorySurface({ children }: { children: ReactNode }) {
    const semantic = useUISemanticTokens();

    return createElement(
        "div",
        {
            dir: "rtl",
            style: {
                padding: 24,
                minHeight: "100vh",
                boxSizing: "border-box",
                backgroundColor: semantic.base.outline.bg.default,
                color: semantic.base.outline.text.default,
            },
        },
        children
    );
}

const preview: Preview = {
    // Keep existing controls configuration.
    parameters: {
        controls: {
            expanded: true,
        },
        docs: {
            codePanel: true,

            canvas: {
                sourceState: "shown",
            },

            source: {
                language: "tsx",
            },
        },

    },

    // Toolbar selectors.
    globalTypes: {
        uiTheme: {
            description: "Product identity theme",
            toolbar: {
                title: "Product Theme",
                icon: "paintbrush",
                dynamicTitle: true,
                items: [
                    { value: "isc", title: "ISC" },
                    { value: "samab", title: "Samab" },
                    { value: "bsi", title: "BSI" },
                    { value: "opa", title: "OPA" },
                    { value: "dorsa", title: "Dorsa" },
                ],
            },
        },

        uiColorMode: {
            description: "Semantic color mode",
            toolbar: {
                title: "Color Mode",
                icon: "circlehollow",
                dynamicTitle: true,
                items: [
                    { value: "light", title: "Light" },
                    { value: "dark", title: "Dark" },
                ],
            },
        },
    },

    initialGlobals: {
        uiTheme: "isc",
        uiColorMode: "light",
    },

    decorators: [
        (Story, context) => {
            const selectedTheme =
                (context.globals.uiTheme ?? "isc") as ThemeName;

            const selectedMode =
                (context.globals.uiColorMode ?? "light") as ColorMode;

            return createElement(
                UIProvider,
                {
                    theme: selectedTheme,
                    colorMode: selectedMode,
                },
                createElement(
                    StorySurface,
                    null,
                    createElement(Story)
                )
            );
        },
    ],
};

export default preview;
