import React, { useCallback, useRef } from 'react';
import { Input } from 'antd';

import { FormControlLabel } from '../formControlLabel';
import { FormFieldMessage } from '../formFieldMessage';

import type {
    TextFieldProps,
    TextFieldType,
    TextFieldStatus,
} from './TextField.types';

const { TextArea } = Input;

export const TextField: React.FC<TextFieldProps> = (props) => {

    const {
        label,
        placeholder,
        caption,

        defaultValue,
        value,

        disabled,
        id,

        inputStyle,
        style,

        type = 'text',
        size = 'medium',
        status = 'default',

        mandatoryPresentational = false,
        autoFocus,
        className,
        dir,

        getRef,

        allowClear = false,
        length,

        reserveCaptionSpace = false,

        rows,

        onChange,
        onBlur,
        onFocus,
        onEnter,
    } = props;

    const inputRef =
        useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

    /* ================= CHANGE ================= */

    const handleChange = useCallback(
        (
            inputType: TextFieldType,
            e: React.ChangeEvent<
                HTMLInputElement | HTMLTextAreaElement
                >
        ) => {
            let allowedValue = e.target.value;

            if (inputType === 'number') {
                allowedValue = allowedValue
                    .replace(/,/g, '')
                    .replace(/[^\d]/g, '');
            } else if (
                inputType !== 'password' &&
                inputType !== 'textarea'
            ) {
                const reg =
                    /[~`!^&()+=\[\]\\';/{}|\\:"<>?]/g;

                allowedValue = allowedValue.replace(reg, '');
            }

            if (typeof length === 'number') {
                allowedValue =
                    allowedValue.substring(0, length);
            }

            onChange?.(e, allowedValue);
        },
        [length, onChange]
    );

    /* ================= REF ================= */

    const exposeRef = useCallback(
        (
            ref:
                | HTMLInputElement
                | HTMLTextAreaElement
                | null
        ) => {
            inputRef.current = ref;
            getRef?.(ref);
        },
        [getRef]
    );

    /* ================= CONTROL ================= */

    const isControlled = value !== undefined;

    const valueProps = isControlled
        ? { value }
        : { defaultValue };

    /* ================= STATUS ================= */

    const getInputStatus = (
        currentStatus: TextFieldStatus
    ) => {
        if (currentStatus === 'default') {
            return undefined;
        }

        return currentStatus;
    };

    const inputStatus = getInputStatus(status);

    /* ================= SIZE ================= */

    const getInputSize = () => {
        switch (size) {
            case 'small':
                return 'small';

            case 'large':
                return 'large';

            case 'medium':
            default:
                return 'middle';
        }
    };

    const inputSize = getInputSize();

    /* ================= BASE PROPS ================= */

    const baseProps = {
        dir,
        id,
        className,
        disabled,
        autoFocus,
        placeholder,
        style: inputStyle,

        onBlur,
        onFocus,

        ref: exposeRef,

        ...valueProps,

        size: inputSize,
    };

    /* ================= INPUT ================= */

    const renderInput = () => {

        switch (type) {

            case 'password':
                return (
                    <Input.Password
                        {...baseProps}
                        autoComplete="new-password"
                        status={inputStatus}
                        onChange={(e) =>
                            handleChange(
                                'password',
                                e
                            )
                        }
                    />
                );

            case 'textarea':
                return (
                    <TextArea
                        {...baseProps}
                        status={inputStatus}
                        rows={rows}
                        onChange={(e) =>
                            handleChange(
                                'textarea',
                                e
                            )
                        }
                    />
                );

            case 'number':
                return (
                    <Input
                        {...baseProps}
                        status={inputStatus}
                        onChange={(e) =>
                            handleChange(
                                'number',
                                e
                            )
                        }
                    />
                );

            default:
                return (
                    <Input
                        {...baseProps}
                        type={type}
                        allowClear={allowClear}
                        onPressEnter={onEnter}
                        status={inputStatus}
                        onChange={(e) =>
                            handleChange(
                                'text',
                                e
                            )
                        }
                    />
                );
        }
    };

    /* ================= CAPTION ================= */

    const renderCaption = () => {

        if (!caption) {
            return null;
        }

        const variant =
            status === 'default'
                ? 'helper'
                : status;

        return (
            <FormFieldMessage
                variant={variant}
                text={caption}
            />
        );
    };

    /* ================= RENDER ================= */

    return (
        <div
            dir={dir}
            style={style}
            className="ui-textfield"
        >

            {label && (
                <FormControlLabel
                    label={label}
                    isMandatory={
                        mandatoryPresentational
                    }
                />
            )}

            {renderInput()}

            {!reserveCaptionSpace &&
                renderCaption()}

            {reserveCaptionSpace && (
                <div className="ui-textfield__caption-space">
                    {renderCaption()}
                </div>
            )}

        </div>
    );
};

export default TextField;

/*
import React, { useCallback, useRef } from 'react';
import { Input } from 'antd';
import { FormControlLabel } from '../formControlLabel';
import { FormFieldMessage } from '../formFieldMessage';

import type {
    TextFieldProps,
    TextFieldType,
    FormMessage,
    FormMessageType,
} from './TextField.types';

const { TextArea } = Input;

export const TextField: React.FC<TextFieldProps> = (props) => {

    const {
        label,
        defaultValue,
        disabled,
        id,
        inputStyle,
        value,
        type = 'text',
        mandatoryPresentational = false,
        style,
        autoFocus,
        className,
        dir,
        getRef,
        allowClear = false,
        length,
        reserveMessageSpace = false,
        rows,
        onChange,
        onBlur,
        onFocus,
        onEnter,
        messages = [],
    } = props;

    const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

    /!* ================= CHANGE ================= *!/

    const handleChange = useCallback(
        (inputType: TextFieldType, e: React.ChangeEvent<any>) => {
            let allowedValue = e.target.value;

            if (inputType === 'number') {
                allowedValue = allowedValue.replace(/,/g, '').replace(/[^\d]/g, '');
            } else if (inputType !== 'password' && inputType !== 'textarea') {
                const reg = /[~`!^&()+=\[\]\\';/{}|\\:"<>?]/g;
                allowedValue = allowedValue.replace(reg, '');
            }

            if (typeof length === 'number') {
                allowedValue = allowedValue.substring(0, length);
            }

            onChange?.(e, allowedValue);
        },
        [length, onChange]
    );

    /!* ================= REF ================= *!/

    const exposeRef = useCallback(
        (ref: any) => {
            inputRef.current = ref;
            getRef?.(ref);
        },
        [getRef]
    );

    /!* ================= CONTROL ================= *!/

    const isControlled = value !== undefined;

    const valueProps = isControlled
        ? { value }
        : { defaultValue };

    /!* ================= MESSAGES ================= *!/

    const resolveMessages = (): FormMessage[] => {


        const priority: Record<FormMessageType, number> = {
            error: 0,
            warning: 1,
            info: 2,
            helper: 3,
        };

        const sorted = [...messages].sort(
            (a, b) => priority[a.type] - priority[b.type]
        );

        if (sorted.length > 0) {
            return [sorted[0]];
        }

        return [];
    };

    const resolvedMessages = resolveMessages();

    const getStatus = () => {
        if (messages.some((m) => m.type === 'error')) {
            return 'error';
        }

        if (messages.some((m) => m.type === 'warning')) {
            return 'warning';
        }

        return undefined;
    };

    /!* ================= INPUT ================= *!/

    const baseProps = {
        dir,
        id,
        className,
        disabled,
        autoFocus,
        style: inputStyle,
        onBlur,
        onFocus,
        ref: exposeRef,
        ...valueProps,
    };

    const renderInput = () => {
        switch (type) {
            case 'password':
                return (
                    <Input.Password
                        {...baseProps}
                        autoComplete="new-password"
                        status={getStatus()}
                        onChange={(e) => handleChange('password', e)}
                    />
                );

            case 'textarea':
                return (
                    <TextArea
                        {...baseProps}
                        status={getStatus()}
                        rows={rows}
                        onChange={(e) => handleChange('textarea', e)}
                    />
                );

            case 'number':
                return (
                    <Input
                        {...baseProps}
                        status={getStatus()}
                        onChange={(e) => handleChange('number', e)}
                    />
                );

            default:
                return (
                    <Input
                        {...baseProps}
                        type={type}
                        allowClear={allowClear}
                        onPressEnter={onEnter}
                        status={getStatus()}
                        onChange={(e) => handleChange('text', e)}
                    />
                );
        }
    };

    /!* ================= RENDER ================= *!/

    return (
        <div style={style} className="ui-textfield">
            {label && (
                <FormControlLabel
                    label={label}
                    isMandatory={mandatoryPresentational}
                />
            )}

            {renderInput()}

            {!reserveMessageSpace && resolvedMessages.map((msg, index) => (
                <FormFieldMessage
                    key={index}
                    variant={msg.type}
                    text={msg.text}
                />
            ))}
        </div>
    );
};

export default TextField;*/
