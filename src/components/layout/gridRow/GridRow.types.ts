import type { RowProps as AntRowProps } from 'antd';

export interface GridRowProps
    extends Pick<AntRowProps, 'align' | 'justify' | 'wrap'> {
    children?: React.ReactNode;

    /**
     * فاصله بین آیتم‌ها (design system)
     * جایگزین gutter در Ant
     */
    spacing?: number | [number, number];
}