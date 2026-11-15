// Button.types.ts


import type {
    CSSProperties,
    MouseEventHandler,
    ReactNode,
} from "react";

import type {
    ButtonVariant,
    ButtonRelevance,
    ButtonSize,
} from "../../theme/tokens/components/button";

// Re-export public Button types
export type {
    ButtonVariant,
    ButtonRelevance,
    ButtonSize,
} from "../../theme/tokens/components/button";

export interface ButtonProps {
    /**
     * HTML button identifier
     */
    id?: string;

    /**
     * Button content
     */
    children?: ReactNode;
    label?: string;

    /**
     * Visual appearance
     * solid | outline | tone | textual
     */
    variant?: ButtonVariant;

    /**
     * Semantic relevance
     * base | primary | danger
     */
    relevance?: ButtonRelevance;

    /**
     * Button size
     * xs | s | m | l | xl
     */
    size?: ButtonSize;

    /**
     * Optional icons
     */
    startIcon?: ReactNode;
    endIcon?: ReactNode;

    /**
     * Optional tooltip
     */
    tooltip?: string;

    /**
     * Logical states controlled by consumer
     */
    loading?: boolean;
    disabled?: boolean;

    /**
     * Fill parent width
     */
    block?: boolean;

    /**
     * Button click event
     */
    onClick?: MouseEventHandler<HTMLButtonElement>;

    /**
     * Custom styles and class
     */
    style?: CSSProperties;
    className?: string;
}


   /* import type {
        CSSProperties,
        MouseEventHandler,
        ReactNode,
    } from 'react';

    export type ButtonVariant =
        | 'outline'
        | 'solid'
        | 'tone'
        | 'textual';

    export type ButtonRelevance =
        | 'primary'
        | 'secondary';

    export type ButtonSize =
        | 's'
        | 'm'
        | 'l'
        | 'xl'
        | '3xl';

    export interface ButtonProps {
        id?: string;

        label?: string;
        children?: ReactNode;

        variant?: ButtonVariant;
        relevance?: ButtonRelevance;
        size?: ButtonSize;

        startIcon?: ReactNode;
        endIcon?: ReactNode;

        tooltip?: string;

        loading?: boolean;
        disabled?: boolean;
        block?: boolean;

        onClick?: MouseEventHandler<HTMLButtonElement>;

        style?: CSSProperties;
        className?: string;
    }*/
// import type {ReactNode, CSSProperties} from 'react';
// export type ButtonVariant =
//     | 'default'
//     | 'primary'
//     | 'secondary'
//     | 'danger'
//     | 'ghost'
//     | 'link';
//
// export type ButtonSize =
//     | 'small'
//     | 'middle'
//     | 'large';
//
//
// export interface ButtonProps {
//     id?: string;
//     label?: string;
//     children?: ReactNode;
//
//     disabled?: boolean;
//
//     /** نشان‌دهنده وضعیت loading دکمه */
//     loading?: boolean;
//     block?: boolean;
//     onClick?: () => void;
//
//
//     /** unified variant */
//     variant?: ButtonVariant;
//     size?: ButtonSize;
//     /** legacy API
//     primary?: boolean;
//     secondary?: boolean;*/
//
//
//     /** new icon system */
//     icon?: ReactNode;
//     /*icon?: string;
//     iconConfig?: {
//         color?: string;
//         size?: number | string;
//     };*/
//
//     tooltip?: string;
//     style?: CSSProperties;
// }
