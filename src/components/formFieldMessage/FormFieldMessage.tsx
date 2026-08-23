import React from 'react';
import { Typography, theme } from 'antd';
import type {
    FormFieldMessageProps,
    FormFieldMessageVariant,
} from './FormFieldMessage.types';

const { Text } = Typography;

export const FormFieldMessage: React.FC<FormFieldMessageProps> = ({
                                                                      text,
                                                                      variant = 'helper',
                                                                      style,
                                                                      className,
                                                                  }) => {
    const { token } = theme.useToken();

    if (!text) return null;

    const getColor = (variant: FormFieldMessageVariant) => {
        switch (variant) {
            case 'error':
                return token.colorError;
            case 'warning':
                return token.colorWarning;
            case 'info':
                return token.colorInfo;
            default:
                return token.colorTextSecondary;
        }
    };

    return (
        <Text
            className={`ui-form-message ${className || ''}`}
            style={{
                display: 'block',
                marginTop: 4,
                fontSize: 11,
                minHeight: 14,
                color: getColor(variant), // 🔥 مهم: override type
                ...style,
            }}
        >
            {text}
        </Text>
    );
};