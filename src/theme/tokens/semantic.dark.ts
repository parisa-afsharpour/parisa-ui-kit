import { colors } from './colors';
import type { SoftwareIdentity } from '../theme';
import type { SemanticTokens } from './semantic';

/**
 * Figma: ISC Core DS → Semantic → Dark (356 variables).
 * Values match the Dark mode aliases in Figma, resolved against the active Theme.
 * Root aliases intentionally remain independent of the chosen product Theme.
 * This factory is not wired to UIProvider yet.
 */
export const createDarkSemanticTokens = (identity: SoftwareIdentity): SemanticTokens => ({
    base: {
        outline: {
            text: {
                heading: identity.foundation[50], // Color-Base-Outline-TextHeading
                title: identity.foundation[100], // Color-Base-Outline-TextTitle
                article: identity.foundation[100], // Color-Base-Outline-TextArticle
                default: identity.foundation[200], // Color-Base-Outline-Text
                placeholder: identity.achromatic.neutral[400], // Color-Base-Outline-TextPlaceholder
                paraghraph: identity.achromatic.neutral[400], // Color-Base-Outline-TextParaghraph
                span: identity.achromatic.brightness[50], // Color-Base-Outline-TextSpan
                caption: identity.achromatic.neutral[700], // Color-Base-Outline-TextCaption
                label: identity.foundation[300], // Color-Base-Outline-TextLabel
                dataList: identity.achromatic.brightness[50], // Color-Base-Outline-Text‌DataList
                state: {
                    hover: identity.foundation[500], // Color-Base-Outline-Text--Hover
                    active: identity.foundation[400], // Color-Base-Outline-Text--Active
                    pressed: identity.foundation[950], // Color-Base-Outline-Text--Pressed
                    focus: identity.foundation[50], // Color-Base-Outline-Text--Focus
                    disable: identity.achromatic.neutral[600], // Color-Base-Outline-Text--Disable
                    skeleton: identity.achromatic.brightness[50], // Color-Base-Outline-Text--Skeleton
                    error: identity.error[400], // Color-Base-Outline-Text--Error
                    success: identity.success[400], // Color-Base-Outline-Text--Success
                    warning: identity.warning[400], // Color-Base-Outline-Text--Warning
                    info: identity.info[400], // Color-Base-Outline-Text--Info
                },
            },
            bg: {
                layout: identity.achromatic.brightness[300], // Color-Base-Outline-BgLayout
                elevated: identity.achromatic.brightness[50], // Color-Base-Outline-BgElevated
                placeholder: identity.achromatic.brightness[200], // Color-Base-Outline-BgPlaceholder
                default: identity.foundation[800], // Color-Base-Outline-Bg
                alter: identity.achromatic.brightness[300], // Color-Base-Outline-BgAlter
                nav: identity.achromatic.brightness[50], // Color-Base-Outline-BgNav
                aside: identity.achromatic.brightness[50], // Color-Base-Outline-BgAside
                article: identity.achromatic.brightness[50], // Color-Base-Outline-BgArticle
                section: identity.achromatic.brightness[950], // Color-Base-Outline-BgSection
                block: identity.achromatic.brightness[50], // Color-Base-Outline-BgBlock
                dataList: identity.achromatic.brightness[50], // Color-Base-Outline-Bg‌DataList
                state: {
                    hover: identity.foundation[900], // Color-Base-Outline-Bg--Hover
                    active: identity.foundation[700], // Color-Base-Outline-Bg--Active
                    pressed: identity.foundation[200], // Color-Base-Outline-Bg--Pressed
                    focus: identity.foundation[950], // Color-Base-Outline-Bg--Focus
                    skeleton: identity.achromatic.brightness[50], // Color-Base-Outline-Bg--Skeleton
                    disable: identity.achromatic.neutral[950], // Color-Base-Outline-Bg--Disable
                    error: identity.achromatic.brightness[50], // Color-Base-Outline-Bg--Error
                    success: identity.achromatic.brightness[50], // Color-Base-Outline-Bg--Success
                    warning: identity.achromatic.brightness[50], // Color-Base-Outline-Bg--Warning
                    info: identity.achromatic.brightness[50], // Color-Base-Outline-Bg--Info
                },
            },
            border: {
                elevated: identity.achromatic.brightness[50], // Color-Base-Outline-BorderElevated
                placeholder: identity.achromatic.neutral[700], // Color-Base-Outline-BorderPlaceholder
                default: identity.foundation[500], // Color-Base-Outline-Border
                alter: identity.foundation[800], // Color-Base-Outline-BorderAlter
                nav: identity.achromatic.neutral[800], // Color-Base-Outline-BorderNav
                aside: identity.achromatic.brightness[50], // Color-Base-Outline-BorderAside
                article: identity.foundation[900], // Color-Base-Outline-BorderArticle
                section: identity.achromatic.neutral[800], // Color-Base-Outline-BorderSection
                block: identity.achromatic.neutral[800], // Color-Base-Outline-BorderBlock
                state: {
                    hover: identity.foundation[700], // Color-Base-Outline-Border--Hover
                    active: identity.foundation[600], // Color-Base-Outline-Border--Active
                    pressed: identity.foundation[200], // Color-Base-Outline-Border--Pressed
                    focus: identity.foundation[300], // Color-Base-Outline-Border--Focus
                    skeleton: identity.achromatic.brightness[50], // Color-Base-Outline-Border--Skeleton
                    disable: identity.achromatic.neutral[700], // Color-Base-Outline-Border--Disable
                    error: identity.error[600], // Color-Base-Outline-Border--Error
                    warning: identity.warning[600], // Color-Base-Outline-Border--Warning
                    success: identity.success[600], // Color-Base-Outline-Border--Success
                    info: identity.info[600], // Color-Base-Outline-Border--Info
                },
            },
        },
        solid: {
            text: {
                heading: identity.achromatic.brightness[50], // Color-Base-Solid-TextHeading
                title: identity.achromatic.brightness[50], // Color-Base-Solid-TextTitle
                article: identity.achromatic.brightness[50], // Color-Base-Solid-TextArticle
                default: identity.achromatic.brightness[50], // Color-Base-Solid-Text
                placeholder: identity.achromatic.brightness[50], // Color-Base-Solid-TextPlaceholder
                paraghraph: identity.achromatic.brightness[50], // Color-Base-Solid-TextParaghraph
                span: identity.achromatic.brightness[50], // Color-Base-Solid-TextSpan
                caption: identity.achromatic.brightness[50], // Color-Base-Solid-TextCaption
                dataList: identity.achromatic.brightness[50], // Color-Base-Solid-Text‌DataList
                state: {
                    hover: identity.achromatic.brightness[50], // Color-Base-Solid-Text--Hover
                    active: identity.achromatic.brightness[50], // Color-Base-Solid-Text--Active
                    pressed: identity.foundation[950], // Color-Base-Solid-Text--Pressed
                    focus: identity.foundation[950], // Color-Base-Solid-Text--Focus
                    skeleton: identity.achromatic.brightness[50], // Color-Base-Solid-Text--Skeleton
                    disable: identity.achromatic.neutral[600], // Color-Base-Solid-Text--Disable
                    error: identity.achromatic.brightness[950], // Color-Base-Solid-Text--Error
                    success: identity.achromatic.brightness[950], // Color-Base-Solid-Text--Success
                    warning: identity.warning[100], // Color-Base-Solid-Text--Warning
                    info: identity.achromatic.brightness[950], // Color-Base-Solid-Text--Info
                },
            },
            bg: {
                layout: identity.foundation[50], // Color-Base-Solid-BgLayout
                elevated: identity.achromatic.brightness[50], // Color-Base-Solid-BgElevated
                placeholder: identity.achromatic.neutral[900], // Color-Base-Solid-BgPlaceholder
                default: identity.foundation[300], // Color-Base-Solid-Bg
                alter: identity.foundation[400], // Color-Base-Solid-BgAlter
                nav: identity.achromatic.brightness[50], // Color-Base-Solid-BgNav
                aside: identity.achromatic.brightness[50], // Color-Base-Solid-BgAside
                article: identity.foundation[300], // Color-Base-Solid-BgArticle
                section: identity.achromatic.neutral[950], // Color-Base-Solid-BgSection
                block: identity.foundation[50], // Color-Base-Solid-BgBlock
                dataList: identity.achromatic.brightness[50], // Color-Base-Solid-Bg‌DataList
                state: {
                    hover: identity.foundation[500], // Color-Base-Solid-Bg--Hover
                    active: identity.foundation[600], // Color-Base-Solid-Bg--Active
                    pressed: identity.foundation[200], // Color-Base-Solid-Bg--Pressed
                    focus: identity.foundation[300], // Color-Base-Solid-Bg--Focus
                    skeleton: identity.achromatic.brightness[50], // Color-Base-Solid-Bg--Skeleton
                    disable: identity.achromatic.neutral[900], // Color-Base-Solid-Bg--Disable
                    error: identity.error[400], // Color-Base-Solid-Bg--Error
                    warning: identity.warning[500], // Color-Base-Solid-Bg--Warning
                    success: identity.success[400], // Color-Base-Solid-Bg--Success
                    info: identity.info[400], // Color-Base-Solid-Bg--Info
                },
            },
            border: {
                elevated: identity.achromatic.brightness[50], // Color-Base-Solid-BorderElevated
                placeholder: identity.achromatic.brightness[50], // Color-Base-Solid-BorderPlaceholder
                default: identity.foundation[300], // Color-Base-Solid-Border
                alter: identity.foundation[300], // Color-Base-Solid-BorderAlter
                nav: identity.achromatic.brightness[50], // Color-Base-Solid-BorderNav
                aside: identity.achromatic.brightness[50], // Color-Base-Solid-BorderAside
                article: identity.achromatic.brightness[50], // Color-Base-Solid-BorderArticle
                section: identity.achromatic.brightness[50], // Color-Base-Solid-BorderSection
                block: identity.achromatic.brightness[50], // Color-Base-Solid-BorderBlock
                state: {
                    hover: identity.foundation[500], // Color-Base-Solid-Border--Hover
                    active: identity.foundation[400], // Color-Base-Solid-Border--Active
                    pressed: identity.foundation[200], // Color-Base-Solid-Border--Pressed
                    focus: identity.foundation[300], // Color-Base-Solid-Border--Focus
                    skeleton: identity.achromatic.brightness[50], // Color-Base-Solid-Border--Skeleton
                    disable: identity.achromatic.neutral[900], // Color-Base-Solid-Border--Disable
                    error: identity.error[400], // Color-Base-Solid-Border--Error
                    success: identity.success[400], // Color-Base-Solid-Border--Success
                    warning: identity.warning[500], // Color-Base-Solid-Border--Warning
                    info: identity.info[400], // Color-Base-Solid-Border--Info
                },
            },
        },
        tone: {
            text: {
                heading: identity.foundation[50], // Color-Base-Tone-TextHeading
                title: identity.achromatic.brightness[50], // Color-Base-Tone-TextTitle
                article: identity.achromatic.brightness[50], // Color-Base-Tone-TextArticle
                default: identity.foundation[300], // Color-Base-Tone-Text
                paraghraph: identity.achromatic.brightness[50], // Color-Base-Tone-TextParaghraph
                placeholder: identity.foundation[400], // Color-Base-Tone-TextPlaceholder
                span: identity.achromatic.brightness[50], // Color-Base-Tone-TextSpan
                caption: identity.achromatic.neutral[400], // Color-Base-Tone-TextCaption
                dataList: identity.achromatic.brightness[50], // Color-Base-Tone-Text‌DataList
                state: {
                    hover: identity.foundation[500], // Color-Base-Tone-Text--Hover
                    active: identity.foundation[400], // Color-Base-Tone-Text--Active
                    pressed: identity.foundation[950], // Color-Base-Tone-Text--Pressed
                    focus: identity.foundation[50], // Color-Base-Tone-Text--Focus
                    skeleton: identity.achromatic.brightness[50], // Color-Base-Tone-Text--Skeleton
                    disable: identity.achromatic.neutral[600], // Color-Base-Tone-Text--Disable
                    error: identity.error[400], // Color-Base-Tone-Text--Error
                    success: identity.success[400], // Color-Base-Tone-Text--Success
                    warning: identity.warning[400], // Color-Base-Tone-Text--Warning
                    info: identity.info[400], // Color-Base-Tone-Text--Info
                },
            },
            bg: {
                layout: identity.achromatic.brightness[50], // Color-Base-Tone-BgLayout
                elevated: identity.achromatic.brightness[50], // Color-Base-Tone-BgElevated
                placeholder: identity.foundation[950], // Color-Base-Tone-BgPlaceholder
                default: identity.foundation[800], // Color-Base-Tone-Bg
                alter: identity.foundation[950], // Color-Base-Tone-BgAlter
                nav: identity.achromatic.brightness[50], // Color-Base-Tone-BgNav
                aside: identity.achromatic.brightness[50], // Color-Base-Tone-BgAside
                article: identity.achromatic.brightness[50], // Color-Base-Tone-BgArticle
                section: identity.achromatic.brightness[50], // Color-Base-Tone-BgSection
                block: identity.achromatic.brightness[50], // Color-Base-Tone-BgBlock
                dataList: identity.achromatic.brightness[50], // Color-Base-Tone-Bg‌DataList
                state: {
                    hover: identity.foundation[950], // Color-Base-Tone-Bg--Hover
                    active: identity.foundation[900], // Color-Base-Tone-Bg--Active
                    pressed: identity.foundation[200], // Color-Base-Tone-Bg--Pressed
                    focus: identity.foundation[800], // Color-Base-Tone-Bg--Focus
                    skeleton: identity.achromatic.brightness[50], // Color-Base-Tone-Bg--Skeleton
                    disable: identity.achromatic.neutral[900], // Color-Base-Tone-Bg--Disable
                    error: identity.error[950], // Color-Base-Tone-Bg--Error
                    success: identity.success[950], // Color-Base-Tone-Bg--Success
                    warning: identity.warning[950], // Color-Base-Tone-Bg--Warning
                    info: identity.info[950], // Color-Base-Tone-Bg--Info
                },
            },
            border: {
                elevated: '#FFFFFF', // Color-Base-Tone-BorderElevated
                placeholder: '#FFFFFF', // Color-Base-Tone-BorderPlaceholder
                default: identity.foundation[800], // Color-Base-Tone-Border
                alter: identity.foundation[800], // Color-Base-Tone-BorderAlter
                nav: '#FFFFFF', // Color-Base-Tone-BorderNav
                aside: '#FFFFFF', // Color-Base-Tone-BorderAside
                article: '#FFFFFF', // Color-Base-Tone-BorderArticle
                section: '#FFFFFF', // Color-Base-Tone-BorderSection
                block: '#FFFFFF', // Color-Base-Tone-BorderBlock
                state: {
                    hover: identity.foundation[950], // Color-Base-Tone-Border--Hover
                    active: identity.foundation[900], // Color-Base-Tone-Border--Active
                    focus: identity.foundation[800], // Color-Base-Tone-Border--Focus
                    pressed: identity.foundation[200], // Color-Base-Tone-Border--Pressed
                    skeleton: identity.achromatic.brightness[50], // Color-Base-Tone-Border--Skeleton
                    disable: identity.achromatic.brightness[50], // Color-Base-Tone-Border--Disable
                    error: identity.error[900], // Color-Base-Tone-Border--Error
                    success: identity.success[900], // Color-Base-Tone-Border--Success
                    warning: identity.warning[900], // Color-Base-Tone-Border--Warning
                    info: identity.info[900], // Color-Base-Tone-Border--Info
                },
            },
        },
    },
    primary: {
        outline: {
            text: {
                heading: identity.brand[50], // Color-Primary-Outline-TextHeading
                title: identity.brand[100], // Color-Primary-Outline-TextTitle
                article: identity.brand[100], // Color-Primary-Outline-TextArticle
                default: identity.brand[200], // Color-Primary-Outline-Text
                placeholder: identity.achromatic.neutral[400], // Color-Primary-Outline-TextPlaceholder
                paraghraph: identity.achromatic.neutral[400], // Color-Primary-Outline-TextParaghraph
                span: identity.achromatic.brightness[50], // Color-Primary-Outline-TextSpan
                caption: identity.achromatic.neutral[700], // Color-Primary-Outline-TextCaption
                label: identity.brand[300], // Color-Primary-Outline-TextLabel
                dataList: identity.achromatic.brightness[50], // Color-Primary-Outline-Text‌DataList
                state: {
                    hover: identity.brand[500], // Color-Primary-Outline-Text--Hover
                    active: identity.brand[400], // Color-Primary-Outline-Text--Active
                    pressed: identity.brand[950], // Color-Primary-Outline-Text--Pressed
                    focus: identity.brand[50], // Color-Primary-Outline-Text--Focus
                    disable: identity.achromatic.neutral[600], // Color-Primary-Outline-Text--Disable
                    skeleton: identity.achromatic.brightness[50], // Color-Primary-Outline-Text--Skeleton
                    error: identity.error[400], // Color-Primary-Outline-Text--Error
                    success: identity.success[400], // Color-Primary-Outline-Text--Success
                    warning: identity.warning[400], // Color-Primary-Outline-Text--Warning
                    info: identity.info[400], // Color-Primary-Outline-Text--Info
                },
            },
            bg: {
                layout: identity.achromatic.brightness[300], // Color-Primary-Outline-BgLayout
                elevated: identity.achromatic.brightness[50], // Color-Primary-Outline-BgElevated
                placeholder: identity.achromatic.brightness[200], // Color-Primary-Outline-BgPlaceholder
                default: identity.brand[800], // Color-Primary-Outline-Bg
                alter: identity.achromatic.brightness[300], // Color-Primary-Outline-BgAlter
                nav: identity.achromatic.brightness[50], // Color-Primary-Outline-BgNav
                aside: identity.achromatic.brightness[50], // Color-Primary-Outline-BgAside
                article: identity.achromatic.brightness[50], // Color-Primary-Outline-BgArticle
                section: identity.achromatic.brightness[950], // Color-Primary-Outline-BgSection
                block: identity.achromatic.brightness[50], // Color-Primary-Outline-BgBlock
                dataList: identity.achromatic.brightness[50], // Color-Primary-Outline-Bg‌DataList
                state: {
                    hover: identity.brand[900], // Color-Primary-Outline-Bg--Hover
                    active: identity.brand[700], // Color-Primary-Outline-Bg--Active
                    pressed: identity.brand[200], // Color-Primary-Outline-Bg--Pressed
                    focus: identity.brand[950], // Color-Primary-Outline-Bg--Focus
                    skeleton: identity.achromatic.brightness[50], // Color-Primary-Outline-Bg--Skeleton
                    disable: colors.neutral[900], // Color-Primary-Outline-Bg--Disable
                    error: identity.achromatic.brightness[50], // Color-Primary-Outline-Bg--Error
                    success: identity.achromatic.brightness[50], // Color-Primary-Outline-Bg--Success
                    warning: identity.achromatic.brightness[50], // Color-Primary-Outline-Bg--Warning
                    info: identity.achromatic.brightness[50], // Color-Primary-Outline-Bg--Info
                },
            },
            border: {
                elevated: identity.achromatic.brightness[50], // Color-Primary-Outline-BorderElevated
                placeholder: identity.achromatic.neutral[800], // Color-Primary-Outline-BorderPlaceholder
                default: identity.brand[500], // Color-Primary-Outline-Border
                alter: identity.brand[800], // Color-Primary-Outline-BorderAlter
                placeholder2: identity.achromatic.neutral[800], // Color-Primary-Outline-BorderPlaceholder 2
                aside: identity.achromatic.brightness[50], // Color-Primary-Outline-BorderAside
                article: identity.brand[900], // Color-Primary-Outline-BorderArticle
                section: identity.achromatic.neutral[800], // Color-Primary-Outline-BorderSection
                block: identity.achromatic.neutral[800], // Color-Primary-Outline-BorderBlock
                state: {
                    hover: identity.brand[700], // Color-Primary-Outline-Border--Hover
                    active: identity.brand[600], // Color-Primary-Outline-Border--Active
                    pressed: identity.brand[200], // Color-Primary-Outline-Border--Pressed
                    focus: identity.brand[300], // Color-Primary-Outline-Border--Focus
                    skeleton: identity.achromatic.brightness[50], // Color-Primary-Outline-Border--Skeleton
                    disable: identity.achromatic.neutral[700], // Color-Primary-Outline-Border--Disable
                    error: identity.error[600], // Color-Primary-Outline-Border--Error
                    warning: identity.warning[600], // Color-Primary-Outline-Border--Warning
                    success: identity.success[600], // Color-Primary-Outline-Border--Success
                    info: identity.info[600], // Color-Primary-Outline-Border--Info
                },
            },
        },
        solid: {
            text: {
                heading: identity.achromatic.brightness[50], // Color-Primary-Solid-TextHeading
                title: identity.achromatic.brightness[50], // Color-Primary-Solid-TextTitle
                article: identity.achromatic.brightness[50], // Color-Primary-Solid-TextArticle
                default: identity.achromatic.brightness[50], // Color-Primary-Solid-Text
                paraghraph: identity.achromatic.brightness[50], // Color-Primary-Solid-TextParaghraph
                placeholder: identity.achromatic.brightness[50], // Color-Primary-Solid-TextPlaceholder
                span: identity.achromatic.brightness[50], // Color-Primary-Solid-TextSpan
                caption: identity.achromatic.brightness[50], // Color-Primary-Solid-TextCaption
                dataList: identity.achromatic.brightness[50], // Color-Primary-Solid-TextDataList
                state: {
                    hover: identity.achromatic.brightness[50], // Color-Primary-Solid-Text--Hover
                    active: identity.achromatic.brightness[50], // Color-Primary-Solid-Text--Active
                    pressed: identity.brand[950], // Color-Primary-Solid-Text--Pressed
                    focus: identity.brand[950], // Color-Primary-Solid-Text--Focus
                    skeleton: identity.achromatic.brightness[50], // Color-Primary-Solid-Text--Skeleton
                    disable: identity.achromatic.neutral[600], // Color-Primary-Solid-Text--Disable
                    error: identity.achromatic.brightness[950], // Color-Primary-Solid-Text--Error
                    success: identity.achromatic.brightness[950], // Color-Primary-Solid-Text--Success
                    warning: identity.warning[100], // Color-Primary-Solid-Text--Warning
                    info: identity.achromatic.brightness[950], // Color-Primary-Solid-Text--Info
                },
            },
            bg: {
                layout: identity.brand[50], // Color-Primary-Solid-BgLayout
                elevated: colors.brightness[50], // Color-Primary-Solid-BgElevated
                placeholder: identity.achromatic.neutral[900], // Color-Primary-Solid-BgPlaceholder
                default: identity.brand[300], // Color-Primary-Solid-Bg
                alter: identity.brand[400], // Color-Primary-Solid-BgAlter
                nav: identity.achromatic.brightness[50], // Color-Primary-Solid-BgNav
                aside: identity.achromatic.brightness[50], // Color-Primary-Solid-BgAside
                article: identity.brand[300], // Color-Primary-Solid-BgArticle
                section: identity.achromatic.neutral[950], // Color-Primary-Solid-BgSection
                block: identity.brand[50], // Color-Primary-Solid-BgBlock
                dataList: identity.achromatic.brightness[50], // Color-Primary-Solid-BgDataList
                state: {
                    hover: identity.brand[500], // Color-Primary-Solid-Bg--Hover
                    active: identity.brand[600], // Color-Primary-Solid-Bg--Active
                    pressed: identity.brand[200], // Color-Primary-Solid-Bg--Pressed
                    focus: identity.brand[300], // Color-Primary-Solid-Bg--Focus
                    skeleton: identity.achromatic.brightness[50], // Color-Primary-Solid-Bg--Skeleton
                    disable: identity.achromatic.neutral[900], // Color-Primary-Solid-Bg--Disable
                    error: identity.error[400], // Color-Primary-Solid-Bg--Error
                    success: identity.success[400], // Color-Primary-Solid-Bg--Success
                    warning: identity.warning[500], // Color-Primary-Solid-Bg--Warning
                    info: identity.info[400], // Color-Primary-Solid-Bg--Info
                },
            },
            border: {
                elevated: identity.achromatic.brightness[50], // Color-Primary-Solid-BorderElevated
                placeholder: identity.achromatic.brightness[50], // Color-Primary-Solid-BorderPlaceholder
                default: identity.brand[300], // Color-Primary-Solid-Border
                alter: identity.brand[300], // Color-Primary-Solid-BorderAlter
                nav: identity.achromatic.brightness[50], // Color-Primary-Solid-BorderNav
                aside: identity.achromatic.brightness[50], // Color-Primary-Solid-BorderAside
                article: identity.achromatic.brightness[50], // Color-Primary-Solid-BorderArticle
                section: identity.achromatic.brightness[50], // Color-Primary-Solid-BorderSection
                block: identity.achromatic.brightness[50], // Color-Primary-Solid-BorderBlock
                state: {
                    hover: identity.brand[500], // Color-Primary-Solid-Border--Hover
                    active: identity.brand[400], // Color-Primary-Solid-Border--Active
                    pressed: identity.brand[200], // Color-Primary-Solid-Border--Pressed
                    focus: identity.brand[300], // Color-Primary-Solid-Border--Focus
                    skeleton: identity.achromatic.brightness[50], // Color-Primary-Solid-Border--Skeleton
                    disable: identity.achromatic.neutral[900], // Color-Primary-Solid-Border--Disable
                    error: identity.error[400], // Color-Primary-Solid-Border--Error
                    success: identity.success[400], // Color-Primary-Solid-Border--Success
                    warning: identity.warning[500], // Color-Primary-Solid-Border--Warning
                    info: identity.info[400], // Color-Primary-Solid-Border--Info
                },
            },
        },
        tone: {
            text: {
                heading: identity.achromatic.brightness[50], // Color-Primary-Tone-TextHeading
                title: identity.achromatic.brightness[50], // Color-Primary-Tone-TextTitle
                article: identity.achromatic.brightness[50], // Color-Primary-Tone-TextArticle
                default: identity.brand[300], // Color-Primary-Tone-Text
                paraghraph: identity.achromatic.brightness[50], // Color-Primary-Tone-TextParaghraph
                placeholder: identity.brand[400], // Color-Primary-Tone-TextPlaceholder
                span: identity.achromatic.brightness[50], // Color-Primary-Tone-TextSpan
                caption: identity.achromatic.neutral[400], // Color-Primary-Tone-TextCaption
                dataList: identity.achromatic.brightness[50], // Color-Primary-Tone-TextDataList
                state: {
                    hover: identity.brand[500], // Color-Primary-Tone-Text--Hover
                    active: identity.brand[400], // Color-Primary-Tone-Text--Active
                    pressed: identity.brand[950], // Color-Primary-Tone-Text--Pressed
                    focus: identity.brand[50], // Color-Primary-Tone-Text--Focus
                    disable: identity.achromatic.neutral[600], // Color-Primary-Tone-Text--Disable
                    skeleton: colors.brightness[50], // Color-Primary-Tone-Text--Skeleton
                    error: identity.error[400], // Color-Primary-Tone-Text--Error
                    success: identity.success[400], // Color-Primary-Tone-Text--Success
                    warning: identity.warning[400], // Color-Primary-Tone-Text--Warning
                    info: identity.info[400], // Color-Primary-Tone-Text--Info
                },
            },
            bg: {
                layout: identity.achromatic.brightness[50], // Color-Primary-Tone-BgLayout
                elevated: identity.achromatic.brightness[50], // Color-Primary-Tone-BgElevated
                placeholder: identity.brand[950], // Color-Primary-Tone-BgPlaceholder
                default: identity.brand[800], // Color-Primary-Tone-Bg
                alter: identity.brand[950], // Color-Primary-Tone-BgAlter
                nav: identity.achromatic.brightness[50], // Color-Primary-Tone-BgNav
                aside: identity.achromatic.brightness[50], // Color-Primary-Tone-BgAside
                article: identity.achromatic.brightness[50], // Color-Primary-Tone-BgArticle
                section: identity.achromatic.brightness[50], // Color-Primary-Tone-BgSection
                block: identity.achromatic.brightness[50], // Color-Primary-Tone-BgBlock
                dataList: identity.achromatic.brightness[50], // Color-Primary-Tone-BgDataList
                state: {
                    hover: identity.brand[950], // Color-Primary-Tone-Bg--Hover
                    active: identity.brand[900], // Color-Primary-Tone-Bg--Active
                    pressed: identity.brand[200], // Color-Primary-Tone-Bg--Pressed
                    focus: identity.brand[800], // Color-Primary-Tone-Bg--Focus
                    skeleton: identity.achromatic.brightness[50], // Color-Primary-Tone-Bg--Skeleton
                    disable: identity.achromatic.neutral[900], // Color-Primary-Tone-Bg--Disable
                    error: identity.error[950], // Color-Primary-Tone-Bg--Error
                    success: identity.success[950], // Color-Primary-Tone-Bg--Success
                    warning: identity.warning[950], // Color-Primary-Tone-Bg--Warning
                    info: identity.info[950], // Color-Primary-Tone-Bg--Info
                },
            },
            border: {
                elevated: identity.brand[400], // Color-Primary-Tone-BorderElevated
                placeholder: identity.brand[400], // Color-Primary-Tone-BorderPlaceholder
                default: identity.brand[800], // Color-Primary-Tone-Border
                alter: identity.brand[800], // Color-Primary-Tone-BorderAlter
                nav: identity.brand[400], // Color-Primary-Tone-BorderNav
                aside: identity.brand[400], // Color-Primary-Tone-BorderAside
                article: identity.brand[400], // Color-Primary-Tone-BorderArticle
                section: identity.brand[400], // Color-Primary-Tone-BorderSection
                block: identity.brand[400], // Color-Primary-Tone-BorderBlock
                state: {
                    hover: identity.brand[950], // Color-Primary-Tone-Border--Hover
                    active: identity.brand[900], // Color-Primary-Tone-Border--Active
                    pressed: identity.brand[200], // Color-Primary-Tone-Border--Pressed
                    focus: identity.brand[800], // Color-Primary-Tone-Border--Focus
                    skeleton: identity.achromatic.brightness[50], // Color-Primary-Tone-Border--Skeleton
                    disable: identity.achromatic.brightness[50], // Color-Primary-Tone-Border--Disable
                    error: identity.error[900], // Color-Primary-Tone-Border--Error
                    success: identity.success[900], // Color-Primary-Tone-Border--Success
                    warning: identity.warning[900], // Color-Primary-Tone-Border--Warning
                    info: identity.info[900], // Color-Primary-Tone-Border--Info
                },
            },
        },
    },

    // Transitional compatibility keys. These are NOT part of the 356 Figma variables.
    // Review separately when old consumers are removed.
    color: {
        primary: identity.brand[600],
        success: identity.success[600],
        warning: identity.warning[600],
        error: identity.error[600],
        text: identity.foundation[900],
        textSecondary: identity.foundation[600],
        textDisabled: identity.achromatic.neutral[400],
        border: identity.achromatic.neutral[300],
        borderHover: identity.achromatic.neutral[400],
        background: identity.achromatic.brightness[950],
        backgroundDisabled: identity.achromatic.neutral[100],
    },
});
