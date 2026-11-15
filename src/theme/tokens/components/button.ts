//theme/tokens/components/button.ts
import type { SemanticTokens } from "../semantic";
import {
    padding,
    gap,
    radius,
    width,
    height,
    border
} from "../anatomy";

import { typography,fontWeight } from "../typography";





/**
 * Button Typography Tokens
 *
 * S / M / L / XL:
 * ISC Core DS Typography specification
 *
 * XS:
 * Button Instances specification
 */

export const buttonTypography = {
    xs: typography.body.s, // 12px / 20px
    s: typography.body.m,  // 14px / 20px
    m: typography.body.m,  // 14px / 20px
    l: typography.body.l,  // 16px / 24px
    xl: typography.body.l, // 16px / 24px
} as const;

export type ButtonTypographySize =
    keyof typeof buttonTypography;


export const buttonFontWeight = fontWeight.regular;

/**
 * Button Size Tokens
 *
 * Source: Dev.ISC-DS / Button Instances
 *
 * Shared dimensions use Anatomy Tokens.
 * Values not available in Anatomy remain
 * component-specific tokens.
 */

export const buttonSizeTokens = {
    xs: {
        height: 36,
        paddingInline: padding.ml,
        paddingBlock: padding.m,
        iconSize: width["3ml"],
        gap: gap.s,
        radius: radius["2ml"],
    },

    s: {
        height: 40,
        paddingInline: padding.ml,
        paddingBlock: padding.ml,
        iconSize: width.l,
        gap: gap.s,
        radius: radius["2ml"],
    },

    m: {
        height: 44,
        paddingInline: padding.l,
        paddingBlock: padding["2ml"],
        iconSize: width.xl,
        gap: gap.s,
        radius: radius["2ml"],
    },

    l: {
        height: height["4xl"],
        paddingInline: padding.l,
        paddingBlock: padding["2ml"],
        iconSize: width["2xl"],
        gap: gap.sm,
        radius: radius["2ml"],
    },

    xl: {
        height: 52,
        paddingInline: padding.xl,
        paddingBlock: padding["3ml"],
        iconSize: width["2xl"],
        gap: gap.m,
        radius: radius["2ml"],
    },
} as const;

export type ButtonSize =
    keyof typeof buttonSizeTokens;


/**
 * Button Border Tokens
 *
 * Source: Anatomy / Border
 *
 * Border width is shared across all Button sizes.
 */

export const buttonBorderTokens = {
    width: border.odd,
} as const;



export type ButtonVariant =
    | "solid"
    | "outline"
    | "tone"
    | "textual";

export type ButtonRelevance =
    | "base"
    | "primary"
    | "danger";



/**
 * Button Color Tokens
 * Source: Figma / Dev.ISC-DS / Button Instances
 *
 * Visual states are internal.
 * They are NOT part of ButtonProps.
 */

type ButtonVisualState =
    | "default"
    | "hover"
    | "pressed"
    | "focus"
    | "disabled";

interface ButtonPaint {
    bg: string;
    text: string;
    border: string;
}

type ButtonStateColors =
    Record<ButtonVisualState, ButtonPaint>;

type ButtonAppearance =
    Record<ButtonVariant, ButtonStateColors>;

const transparent = "transparent";

const paint = (
    bg: string,
    text: string,
    border: string = transparent
): ButtonPaint => ({
    bg,
    text,
    border,
});

/**
 * Map PRSES Semantic Tokens to actual
 * Button variants and interaction states.
 */
function createRoleAppearance(
    role: SemanticTokens["base"] | SemanticTokens["primary"]
): ButtonAppearance {
    return {
        solid: {
            default: paint(
                role.solid.bg.state.active,
                role.solid.text.state.active
            ),
            hover: paint(
                role.solid.bg.state.hover,
                role.solid.text.state.hover
            ),
            pressed: paint(
                role.solid.bg.state.pressed,
                role.solid.text.state.pressed
            ),
            focus: paint(
                role.solid.bg.state.focus,
                role.solid.text.state.focus
            ),
            disabled: paint(
                role.solid.bg.state.disable,
                role.solid.text.state.disable
            ),
        },

        outline: {
            default: paint(
                transparent,
                role.outline.text.state.active,
                role.outline.border.state.active
            ),
            hover: paint(
                role.outline.bg.state.hover,
                role.outline.text.state.hover,
                role.outline.border.state.hover
            ),
            pressed: paint(
                role.outline.bg.state.pressed,
                role.outline.text.state.pressed,
                role.outline.border.state.pressed
            ),
            focus: paint(
                role.outline.bg.state.focus,
                role.outline.text.state.focus,
                role.outline.border.state.focus
            ),
            disabled: paint(
                role.outline.bg.state.disable,
                role.outline.text.state.disable,
                role.outline.border.state.disable
            ),
        },

        tone: {
            default: paint(
                role.tone.bg.default,
                role.tone.text.state.active
            ),
            hover: paint(
                role.tone.bg.state.hover,
                role.tone.text.state.hover
            ),
            pressed: paint(
                role.tone.bg.state.pressed,
                role.tone.text.state.pressed
            ),
            focus: paint(
                role.tone.bg.state.focus,
                role.tone.text.state.focus
            ),
            disabled: paint(
                role.tone.bg.state.disable,
                role.tone.text.state.disable
            ),
        },

        textual: {
            default: paint(
                transparent,
                role.outline.text.state.active
            ),
            hover: paint(
                role.outline.bg.state.hover,
                role.outline.text.state.hover
            ),
            pressed: paint(
                role.outline.bg.state.pressed,
                role.outline.text.state.pressed
            ),
            focus: paint(
                role.outline.bg.state.focus,
                role.outline.text.state.focus
            ),
            disabled: paint(
                transparent,
                role.outline.text.state.disable
            ),
        },
    };
}

/**
 * Figma currently specifies only Default
 * appearance for Danger Button.
 *
 * Other interaction states remain equal to
 * Default until UX defines their values.
 * Disabled uses the shared neutral-disabled style.
 */
function createDangerAppearance(
    semantic: SemanticTokens
): ButtonAppearance {
    const base = createRoleAppearance(semantic.base);

    const defaults: Record<ButtonVariant, ButtonPaint> = {
        solid: paint(
            semantic.base.solid.bg.state.error,
            semantic.base.solid.text.state.error
        ),
        outline: paint(
            transparent,
            semantic.base.outline.text.state.error,
            semantic.base.outline.border.state.error
        ),
        tone: paint(
            semantic.base.tone.bg.state.error,
            semantic.base.tone.text.state.error
        ),
        textual: paint(
            transparent,
            semantic.base.outline.text.state.error
        ),
    };

    return {
        solid: {
            default: defaults.solid,
            hover: defaults.solid,
            pressed: defaults.solid,
            focus: defaults.solid,
            disabled: base.solid.disabled,
        },
        outline: {
            default: defaults.outline,
            hover: defaults.outline,
            pressed: defaults.outline,
            focus: defaults.outline,
            disabled: base.outline.disabled,
        },
        tone: {
            default: defaults.tone,
            hover: defaults.tone,
            pressed: defaults.tone,
            focus: defaults.tone,
            disabled: base.tone.disabled,
        },
        textual: {
            default: defaults.textual,
            hover: defaults.textual,
            pressed: defaults.textual,
            focus: defaults.textual,
            disabled: base.textual.disabled,
        },
    };
}

/**
 * Button consumes the currently active
 * Semantic Tokens, independent of the brand.
 */
export function createButtonColorTokens(
    semantic: SemanticTokens,
    relevance: ButtonRelevance
): ButtonAppearance {
    if (relevance === "danger") {
        return createDangerAppearance(semantic);
    }

    return createRoleAppearance(semantic[relevance]);
}





/*
*
import { semanticTokens } from "../semantic";

export const buttonTokens = {
  primary: {
    background: semanticTokens.action.primary,
    backgroundHover: semanticTokens.action.primaryHover,
    backgroundActive: semanticTokens.action.primaryActive,

    text: semanticTokens.text.inverse,

    border: "transparent",
  },

  secondary: {
    background: semanticTokens.background.surface,
    backgroundHover: semanticTokens.background.subtle,

    text: semanticTokens.text.primary,
    border: semanticTokens.border.default,
  },

  height: {
    sm: 32,
    md: 40,
    lg: 48,
  },

  radius: {
    sm: 4,
    md: 8,
    lg: 12,
  },

  paddingX: {
    sm: 12,
    md: 16,
    lg: 20,
  },
} as const;

* */







/*export const buttonTokens = {
    size: {
        s: {
            height: spacing.XL,
            paddingInline: spacing.M,
        },

        m: {
            height: spacing.XXL,
            paddingInline: spacing.L,
        },
    },

    relevance: {
        primary: {
            color: semantic.primary,
            ...
        },

        secondary: {
            color: semantic.secondary,
            ...
        },
    },
};*/


//buttonTokens.height.m = spacing.XXL;