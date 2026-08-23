import React from 'react';
import { Row } from 'antd';
import type { GridRowProps } from './GridRow.types';

export const GridRow: React.FC<GridRowProps> = ({
                                                    children,
                                                    spacing = [16, 16],
                                                    ...rest
                                                }) => {
    return (
        <Row gutter={spacing} {...rest} style={{
            width: "100%",
        }}>
            {children}
        </Row>
    );
};

export default GridRow;