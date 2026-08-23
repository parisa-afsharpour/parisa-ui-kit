// Button.tsx
import { Button as AntButton, Tooltip } from 'antd';
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
}
