import type React from 'react';

export type FormFieldMessageVariant =
    | 'error'
    | 'warning'
    | 'info'
    | 'helper';

export interface FormFieldMessageProps {
    text?: string;
    variant?: FormFieldMessageVariant;
    style?: React.CSSProperties;
    className?: string;
}