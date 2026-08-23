import React from 'react';
import { Typography } from 'antd';
import type { FormControlLabelProps } from './FormControlLabel.types';

const { Text } = Typography;

export const FormControlLabel: React.FC<FormControlLabelProps> = ({
                                                                      label,
                                                                      isMandatory = false,
                                                                      style,
                                                                      className,
                                                                  }) => {
    if (!label) return null;

    return (
        <label
            className={className}
            style={{
                display: 'block',
                fontSize: 12,
                marginBottom: 4,
                ...style,
            }}
        >
            <Text>
                {label}
                {isMandatory && (
                    <Text type="danger" style={{ marginLeft: 4 }}>
                        *
                    </Text>
                )}
            </Text>
        </label>
    );
};