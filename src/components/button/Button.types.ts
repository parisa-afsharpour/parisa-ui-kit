// Button.types.ts
import type {ReactNode, CSSProperties} from 'react';
export type ButtonVariant =
    | 'default'
    | 'primary'
    | 'secondary'
    | 'danger'
    | 'ghost'
    | 'link';

export type ButtonSize =
    | 'small'
    | 'middle'
    | 'large';


export interface ButtonProps {
    id?: string;
    label?: string;
    children?: ReactNode;

    disabled?: boolean;

    /** نشان‌دهنده وضعیت loading دکمه */
    loading?: boolean;
    block?: boolean;
    onClick?: () => void;


    /** unified variant */
    variant?: ButtonVariant;
    size?: ButtonSize;
    /** legacy API
    primary?: boolean;
    secondary?: boolean;*/


    /** new icon system */
    icon?: ReactNode;
    /*icon?: string;
    iconConfig?: {
        color?: string;
        size?: number | string;
    };*/

    tooltip?: string;
    style?: CSSProperties;
}
