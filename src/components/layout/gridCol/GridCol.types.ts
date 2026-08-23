import type { ColProps as AntColProps } from 'antd';
import React from "react";

export interface GridColProps extends Pick<
    AntColProps,
    'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'span'
> {
    children?: React.ReactNode;

    // 👇 اینا value add هستن
    fullWidth?: boolean;
}