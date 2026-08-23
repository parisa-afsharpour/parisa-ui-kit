// Form.tsx

import React, {useCallback, useMemo, useRef, useState} from "react";

import type {
    FormProps,
    FormField,
    ValidationResult, FormFieldValue,
} from "./Form.types";

import { TextField } from "../textField";

import { validateRules } from "./Form.validation";

import { GridRow } from "../layout/gridRow";
import { GridCol } from "../layout/gridCol";

import { FormActionBar } from "./FormActionBar";

import { Switch } from "../switch";

import {
    buildRows,
    resolveResponsiveColSpan,
} from "./Form.layout.ts";
import {Checkbox} from "../checkbox";

export const Form: React.FC<FormProps> = ({
                                       elements,
                                       value,
                                       onChange,
                                       actions,
                                       layout = 4,
                                   }) => {

    /*const touchedFieldsRef = useRef<Record<string, boolean>>({});*/
    /*const submittedRef = useRef(false);*///TODO
    const [submitted, setSubmitted] =
        useState(false);

    const [touchedFields, setTouchedFields] =
        useState<Record<string, boolean>>({});

    // -----------------------------
    // separate elements
    // -----------------------------
    const inputElements = elements.filter(
        (e) => e.type !== "button"
    );

    const buttonElements = elements.filter(
        (e) => e.type === "button"
    );

    // -----------------------------
    // validations
    // -----------------------------

    const [
        businessValidations,
        setBusinessValidations,
    ] = useState<
        Record<string, ValidationResult>
    >({});

    const validations = useMemo(() => {

        const result: Record<string, ValidationResult> = {};

        elements.forEach((element) => {

            result[element.id] = validateRules(
                value?.[element.id],
                element.validation,
            );

        });

        return result;

    }, [elements, value]);

    const getValidation = (
        id: string,
    ): ValidationResult => {

        const formValidation =
            validations[id];

        const businessValidation =
            businessValidations[id];

        if (!businessValidation) {
            return formValidation;
        }

        return {
            isValid:
                formValidation.isValid &&
                businessValidation.isValid,

            message:
                businessValidation.message ||
                formValidation.message,
        };
    };

    // -----------------------------
    // form valid
    // -----------------------------
    /*const isFormValid = useMemo(() => {

        return inputElements.every((el) => {

            const validation =
                getValidation(el.id);

            return validation?.isValid !== false;

        });

    }, [inputElements, validations]);*/

    // -----------------------------
    // validate form
    // -----------------------------

    const validateForm = useCallback(() => {

        return inputElements.every((element) => {

            return getValidation(
                element.id
            ).isValid;

        });

    }, [inputElements, validations]);
    /*const validateForm = useCallback(() => {

        const engineValid = Object
            .values(validations)
            .every(
                (v) => v.isValid
            );

        const businessValid = Object
            .values(
                businessValidationRef.current
            )
            .every(
                (v) => v.isValid
            );

        return (
            engineValid &&
            businessValid
        );

    }, [validations]);*/

    // -----------------------------
    // change
    // -----------------------------
    const handleChange = useCallback(
        (
            id: string,
            fieldValue: FormFieldValue,
        ) => {

            setTouchedFields(prev => ({
                ...prev,
                [id]: true,
            }));//show validation

            const newValue = {
                ...value,
                [id]: fieldValue,
            };

            onChange(newValue);

        },
        [value, onChange]
    );

    const handleValidationChange =
        useCallback(
            (
                id: string,
                validation: ValidationResult,
            ) => {

                setBusinessValidations(
                    prev => ({
                        ...prev,
                        [id]: validation,
                    })
                );
            },
            [],
        );

    // -----------------------------
    // actions
    // -----------------------------
    const handleAction = useCallback(
        async (buttonId: string) => {

            const action = actions?.[buttonId];

            if (!action) {
                return;
            }

            const shouldValidate =
                action.validationRequired !== false;

            if (shouldValidate) {
                setSubmitted(true);
            }

            if (shouldValidate && !validateForm()) {
                return;
            }

            if (action.onClick) {
                action.onClick(value);
            }

            if (action.callback) {
                await action.callback(value);
            }

        },
        [actions, validateForm, value]
    );

    // -----------------------------
    // render input
    // -----------------------------
    const renderInputElement = (
        element: FormField
    ) => {

        const validation =
            getValidation(element.id);

        const isRequired =
            element.validation?.some(
                (rule) =>
                    rule.type === "required"
            );

        // ---------------------------------
        // checkbox
        // ---------------------------------
        if (element.type === "checkbox") {

            return (

                <Checkbox
                    checked={
                        Boolean(
                            value[element.id]
                        )
                    }
                    disabled={element.disable}
                    label={element.label}
                    onChange={(
                        _,
                        checked,
                    ) => {

                        handleChange(
                            element.id,
                            checked,
                        );
                    }}
                />
            );
        }
        // ---------------------------------
        // switch
        // ---------------------------------
        if (element.type === "switch") {

            return (

                <Switch
                    checked={
                        Boolean(
                            value[element.id]
                        )
                    }
                    disabled={element.disable}
                    loading={
                        element.props?.loading
                    }
                    checkedText={
                        element.props?.checkedText
                    }
                    unCheckedText={
                        element.props?.unCheckedText
                    }
                    onChange={(checked) => {

                        handleChange(
                            element.id,
                            checked,
                        );
                    }}
                />
            );
        }

        // ---------------------------------
        // business
        // ---------------------------------
        if (element.type === "business") {

            const Component =
                element.component;

            return (
                <Component
                    value={value[element.id]}
                    disabled={element.disable}
                    messages={
                        (
                            touchedFields[element.id] ||
                            submitted
                        ) &&
                        validation?.isValid === false
                            ? [
                                {
                                    type: "error",
                                    text: validation.message || "",
                                },
                            ]
                            : []
                    }
                    onChange={(val: FormFieldValue) =>
                        handleChange(
                            element.id,
                            val,
                        )
                    }
                    onValidationChange={(
                        validation: ValidationResult,
                    ) =>
                        handleValidationChange(
                            element.id,
                            validation,
                        )
                    }
                />
            );
        }
        // ---------------------------------
        // input
        // ---------------------------------
        if (element.type === "input") {

            return (

                <TextField
                    key={element.id}
                    id={element.id}
                    label={element.label}
                    type={element.props?.variant}
                    value={
                        value[element.id] == null
                            ? undefined
                            : String(
                                value[element.id]
                            )
                    }
                    length={
                        element.props?.length
                    }
                    disabled={element.disable}
                    mandatoryPresentational={
                        isRequired
                    }
                    messages={
                        (
                            touchedFields[element.id] ||
                            submitted
                        ) &&
                        validation?.isValid === false
                            ? [
                                {
                                    type: "error",
                                    text: validation.message || "",
                                },
                            ]
                            : []
                    }
                    onChange={(
                        _,
                        val,
                    ) =>
                        handleChange(
                            element.id,
                            val
                        )
                    }
                />
            );
        }

        return null;
    };

    const rows = useMemo(
        () => buildRows(inputElements),
        [inputElements]
    );

    // -----------------------------
    // render
    // -----------------------------
    return (
        <div className="ui-form">

            {rows.map((row, rowIndex) => (

                <GridRow key={rowIndex}>

                    {row.map((el) => (

                        <GridCol
                            key={el.id}
                            {...resolveResponsiveColSpan(
                                layout,
                                el.layout?.span,
                            )}
                        >
                            {renderInputElement(el)}
                        </GridCol>

                    ))}

                </GridRow>

            ))}
            <FormActionBar
                buttons={buttonElements}
                actions={actions}
                /*isFormValid={isFormValid}*/
                onAction={handleAction}
                dir={'rtl'}
            />

        </div>
    );
};

export default Form;