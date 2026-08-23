import type React from 'react';

/* ================= TYPES ================= */

export type TextFieldType =
    | 'text'
    | 'password'
    | 'number'
    | 'textarea';

export type TextFieldSize =
    | 'small'
    | 'medium'
    | 'large';

export type TextFieldStatus =
    | 'default'
    | 'success'
    | 'warning'
    | 'error';

/* ================= PROPS ================= */

export interface TextFieldProps {
    /* ---------- Content ---------- */

    label?: string;

    placeholder?: string;

    caption?: string;

    /* ---------- Style ---------- */

    className?: string;

    size?: TextFieldSize;

    status?: TextFieldStatus;

    /* ---------- Value ---------- */

    defaultValue?: string;

    value?: string;

    /* ---------- State ---------- */

    disabled?: boolean;

    /* ---------- HTML ---------- */

    id?: string;

    inputStyle?: React.CSSProperties;

    style?: React.CSSProperties;

    /* ---------- Events ---------- */

    onChange?: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        value: string
    ) => void;

    onFocus?: React.FocusEventHandler<
        HTMLInputElement | HTMLTextAreaElement
        >;

    onBlur?: React.FocusEventHandler<
        HTMLInputElement | HTMLTextAreaElement
        >;

    onEnter?: React.KeyboardEventHandler<HTMLInputElement>;

    /* ---------- Input ---------- */

    type?: TextFieldType;

    mandatoryPresentational?: boolean;

    autoFocus?: boolean;

    dir?: 'ltr' | 'rtl';

    getRef?: (
        ref: HTMLInputElement | HTMLTextAreaElement | null
    ) => void;

    allowClear?: boolean;

    length?: number;

    rows?: number;

    /* ---------- Layout ---------- */

    reserveCaptionSpace?: boolean;
}

/*
import type React from 'react';

/!* ================= TYPES ================= *!/

export type TextFieldType = 'text' | 'password' | 'number' | 'textarea';

export type FormMessageType = 'error' | 'warning' | 'info' | 'helper';

export interface FormMessage {
    type: FormMessageType;
    text: string;
}

/!* ================= PROPS ================= *!/

export interface TextFieldProps {
    label?: string;
    className?: string;

    defaultValue?: string;
    value?: string;

    disabled?: boolean;

    id?: string;

    inputStyle?: React.CSSProperties;
    style?: React.CSSProperties;

    onChange?: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        value: string
    ) => void;

    onFocus?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    onEnter?: React.KeyboardEventHandler<HTMLInputElement>;

    type?: TextFieldType;

    mandatoryPresentational?: boolean;
    autoFocus?: boolean;

    dir?: 'ltr' | 'rtl';

    getRef?: (
        ref: HTMLInputElement | HTMLTextAreaElement | null
    ) => void;

    allowClear?: boolean;
    noError?: boolean;

    length?: number;

    reserveMessageSpace?:boolean,

    rows?: number;

    messages?: FormMessage[];
}*/
