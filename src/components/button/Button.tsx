// Button.tsx



import type { CSSProperties } from "react";
import { Button as AntButton, Tooltip } from "antd";

import { useUISemanticTokens } from "../../theme/UIProvider";

import {
    buttonSizeTokens,
    buttonTypography,
    buttonBorderTokens,
    buttonFontWeight,
    createButtonColorTokens,
} from "../../theme/tokens/components/button";

import { fontFamily } from "../../theme/tokens/typography";
import type { ButtonProps } from "./Button.types";

import "./Button.css";

type ButtonCSSVariables = CSSProperties & {
    [key: `--button-${string}`]: string;
};

const visualStates = [
    "default",
    "hover",
    "pressed",
    "focus",
    "disabled",
] as const;

export function Button({
                           variant = "solid",
                           relevance = "primary",
                           size = "m",

                           label,
                           children,
                           startIcon,
                           endIcon,
                           tooltip,

                           loading = false,
                           disabled = false,
                           block = false,

                           id,
                           onClick,
                           style,
                           className,
                       }: ButtonProps) {
    // -------------------------------------------
    // 1. Semantic Color Tokens
    // -------------------------------------------

    const semantic = useUISemanticTokens();

    // -------------------------------------------
    // 2. Anatomy / Component Size Tokens
    // -------------------------------------------

    const sizeToken = buttonSizeTokens[size];

    // -------------------------------------------
    // 3. Typography Tokens
    // -------------------------------------------

    const typographyToken = buttonTypography[size];

    // -------------------------------------------
    // 4. Appearance Tokens
    // -------------------------------------------

    const colorTokens = createButtonColorTokens(
        semantic,
        relevance
    );

    const appearance = colorTokens[variant];

    if (!appearance) {
        throw new Error(
            `Invalid Button appearance: ${relevance}/${variant}`
        );
    }

    // -------------------------------------------
    // 5. CSS Variables - Dimensions & Typography
    // -------------------------------------------

    const cssVariables: ButtonCSSVariables = {
        // "--button-height": `${sizeToken.height}px`,

        "--button-padding-inline":
            `${sizeToken.paddingInline}px`,

        "--button-padding-block":
            `${sizeToken.paddingBlock}px`,

        "--button-icon-size":
            `${sizeToken.iconSize}px`,

        "--button-gap": `${sizeToken.gap}px`,

        "--button-radius": `${sizeToken.radius}px`,

        "--button-font-size": typographyToken.fontSize,

        "--button-line-height": typographyToken.lineHeight,

        "--button-border-width": `${buttonBorderTokens.width}px`,
    };

    // -------------------------------------------
    // 6. CSS Variables - Visual States
    // -------------------------------------------

    for (const state of visualStates) {
        cssVariables[`--button-${state}-bg`] =
            appearance[state].bg;

        cssVariables[`--button-${state}-text`] =
            appearance[state].text;

        cssVariables[`--button-${state}-border`] =
            appearance[state].border;
    }

    // -------------------------------------------
    // 7. Component Classes
    // -------------------------------------------

    const buttonClassName = [
        "ui-button",
        `ui-button--${variant}`,
        `ui-button--${relevance}`,
        `ui-button--${size}`,
        className,
    ]
        .filter(Boolean)
        .join(" ");

    // -------------------------------------------
    // 8. Render Button
    // -------------------------------------------

    const button = (
        <AntButton
            type="default"
            id={id}
            className={buttonClassName}
            loading={loading}
            disabled={disabled || loading}
            block={block}
            onClick={onClick}
            aria-busy={loading}
            style={{
                ...cssVariables,
                fontFamily: `"${fontFamily.primary}", sans-serif`,
                fontWeight: buttonFontWeight,
                ...style,
            }}
        >
                {startIcon != null && (
                <span className="ui-button__start-icon">
          {startIcon}
        </span>
            )}

            {(label != null || children != null) && (
                <span className="ui-button__label">
          {label ?? children}
        </span>
            )}

            {endIcon != null && (
                <span className="ui-button__end-icon">
          {endIcon}
        </span>
            )}
        </AntButton>
    );

    // -------------------------------------------
    // 9. Optional Tooltip
    // -------------------------------------------

    if (tooltip) {
        return (
            <Tooltip title={tooltip} placement="bottom">
                {button}
            </Tooltip>
        );
    }

    return button;
}





/*import { Button as AntButton, Tooltip } from 'antd';
import './Button.css';

import type { ButtonProps } from './Button.types';

export function Button({
                           variant = 'solid',
                           relevance = 'primary',
                           size = 'm',
                           label,
                           children,
                           startIcon,
                           endIcon,
                           tooltip,
                           loading = false,
                           id,
                           onClick,
                           disabled = false,
                           block = false,
                           style,
                           className,
                       }: ButtonProps) {
    const buttonClassName = [
        'ui-button',
        `ui-button--${variant}`,
        `ui-button--${relevance}`,
        `ui-button--${size}`,
        className,
    ]
        .filter(Boolean)
        .join(' ');

    const content = (
        <AntButton
            id={id}
            loading={loading ?? false}
            disabled={disabled ?? false || loading ?? false}
            block={block ?? false}
            onClick={onClick}
            style={style}
            className={buttonClassName}
        >
            {startIcon && (
                <span className="ui-button__start-icon">
                    {startIcon}
                </span>
            )}

            {label ?? children}

            {endIcon && (
                <span className="ui-button__end-icon">
                    {endIcon}
                </span>
            )}
        </AntButton>
    );

    if (!tooltip) {
        return content;
    }

    return (
        <Tooltip
            title={tooltip}
            placement="bottom"
        >
            {content}
        </Tooltip>
    );
}*/
/*import { Button as AntButton, Tooltip } from 'antd';
import type { ButtonProps, ButtonVariant } from './Button.types';

type AntType = 'default' | 'primary' | 'dashed' | 'link';

const variantMap: Record<
    ButtonVariant,
    { type: AntType; danger?: boolean; ghost?: boolean }
> = {
    default: { type: 'default' },
    primary: { type: 'primary' },
    secondary: { type: 'dashed' },
    danger: { type: 'primary', danger: true },
    ghost: { type: 'default', ghost: true },
    link: { type: 'link' },
};

export function Button({
                           variant = 'default',
                           size = 'middle',
                           loading = false,
                           ...props
                       }: ButtonProps) {
    const {
        id,
        label,
        children,
        disabled,
        block,
        onClick,
        icon,
        tooltip,
        style,
    } = props;

    const antProps = variantMap[variant];

    const content = (
        <AntButton
            {...antProps}
            id={id}
            size={size}
            disabled={disabled}
            loading={loading}
            block={block}
            icon={icon}
            onClick={onClick}
            style={style}
        >
            {label ?? children}
        </AntButton>
    );

    if (!tooltip) return content;

    return (
        <Tooltip title={tooltip} placement="bottom">
            {content}
        </Tooltip>
    );
}*/
