import React from 'react';
import { Col } from 'antd';
import type { GridColProps } from './GridCol.types';

export const GridCol: React.FC<GridColProps> = ({
                                                    children,
                                                    fullWidth,
                                                    span,
                                                    ...rest
                                                }) => {
    return (
        <Col
            span={fullWidth ? 24 : span}
            {...rest}
        >
            {children}
        </Col>
    );
};