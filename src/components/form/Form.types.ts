//Form.types.ts

// ======================
// Core Types
// ======================

export type FormValue = Record<string, FormFieldValue>;

export type FormErrors = Record<string, string | undefined>;

/*export interface FormElement {
    id: string;
    type: "input" | "button";

    label?: string;
    hidden?: boolean;
    disable?: boolean;

    input?: {
        type?: "text" | "number" | "password" | "textarea";
        length?: number;
        hintText?: string;
    };

    button?: {
        text: string;
        isDisabled?: boolean;
    };

    validate?: ValidationRule;
}*/


/**
 * نتیجه validation داخلی engine
 */
export interface ValidationResult {
    isValid: boolean;
    message?: string;
    type?: "error" | "warning" | "success";
}

/**
 * Validator داخلی (generic rules)
 */
export type Validator = (
    value: FormFieldValue,
    config?: unknown,
    formValue?: FormValue
) => ValidationResult;


export type FormFieldValue =
    | string
    | number
    | boolean
    | null
    | undefined
    | Record<string, unknown>
    | unknown[];

// ======================
// Validation Rules (declarative)
// ======================

// ======================Validation Rules

export type ValidationRuleType =
    | "required"
    | "min"
    | "max"
    | "fixedLength"
    | "regex"
    | "number"
    | "positiveNumber"
    | "int"
    | "float"
    | "enAlphabet"
    | "faAlphabet"
    | "alphabet"
    | "alphabetAndNumber"
    | "email"
    | "mobile"
    | "custom";

// ======================Base

interface BaseValidationRule<
    TType extends ValidationRuleType,
    TValue = undefined,
> {
    type: TType;

    message?: string;

    value?: TValue;
}

// ======================Rules


export type ValidationRule =
    | BaseValidationRule<"required",undefined>

    | BaseValidationRule<"min", number>

    | BaseValidationRule<"max", number>

    | BaseValidationRule<"fixedLength", number>

    | BaseValidationRule<"regex", RegExp>

    | BaseValidationRule<"number",undefined>

    | BaseValidationRule<"positiveNumber",undefined>

    | BaseValidationRule<"int",undefined>

    | BaseValidationRule<"float",undefined>

    | BaseValidationRule<"enAlphabet",undefined>

    | BaseValidationRule<"faAlphabet",undefined>

    | BaseValidationRule<"alphabet",undefined>

    | BaseValidationRule<"alphabetAndNumber",undefined>

    | BaseValidationRule<"email",undefined>

    | BaseValidationRule<"mobile",undefined>

    | BaseValidationRule<"custom",
    (
        value: FormFieldValue,
        formValue?: FormValue,
    ) => string | undefined
>;

// ======================
// Layout
// ======================
export type ResponsiveGridValue =
    | 1
    | 2
    | 3
    | 4;

export interface ResponsiveGridObject {
    xs?: ResponsiveGridValue;
    sm?: ResponsiveGridValue;
    md?: ResponsiveGridValue;
    lg?: ResponsiveGridValue;
    xl?: ResponsiveGridValue;
}

export type GridLayout =
    | ResponsiveGridValue
    | ResponsiveGridObject;

/*___________________________________*/


export interface ElementLayout {
    span?: GridLayout;

    endPoint?: boolean;
}

export interface FieldLayout {
    columnSpan?: number;
    endPoint?: boolean;
}

// ======================
// Base Field (shared contract)
// ======================

export interface BaseField {
    id: string;
    label?: string;

    type: string; // renderer type (text/select/button...)

    hidden?: boolean;
    disable?: boolean;

    layout?: ElementLayout;

    /**
     * validation rules (engine-level)
     */
    validation?: ValidationRule[];

    /**
     * external/business validation result (optional injection)
     */
    error?: string;
}

// ======================
// Text Field
// ======================

export interface TextField extends BaseField {
    type: "input";

    props?: {
        variant?: "text" | "password" | "number" | "textarea";

        placeholder?: string;

        length?: number;

        rows?: number; //textarea

        allowClear?: boolean;

        autoFocus?: boolean;
    };
}

// ======================
// Select Field
// ======================

export interface SelectOption {
    label: string;
    value: FormFieldValue;
}

export interface SelectField extends BaseField {
    type: "select";

    props: {
        options: SelectOption[];

        multiple?: boolean;

        searchable?: boolean;
    };
}

// ======================
// Checkbox Field
// ======================

export interface CheckboxField extends BaseField {
    type: "checkbox";

    props?: {
        labelPosition?: "left" | "right";
    };
}

// ======================
// Switch Field
// ======================

export interface SwitchField extends BaseField {
    type: "switch";

    props?: {
        loading?: boolean;

        checkedText?: string;

        unCheckedText?: string;
    };
}

// ======================
// Business Field
// ======================
interface BaseFieldComponentProps {

    value: FormFieldValue;

    disabled?: boolean;

    messages?: Message[];

    onChange: (
        value: FormFieldValue
    ) => void;
}
export interface BusinessField extends BaseField {
    type: "business";

    component: React.ComponentType<any>;

    props?: Record<string, unknown>;
}
// ======================
// Button Field
// ======================

export interface ButtonField extends BaseField {
    type: "button";

    props: {
        text: string;
        variant?: "primary" | "secondary";

        submit?: boolean;
    };
}

// ======================
// Union Type (IMPORTANT)
// ======================

export type FormField =
    | TextField
    | SelectField
    | CheckboxField
    | SwitchField
    | BusinessField
    | ButtonField;

// ======================
// Actions (business layer trigger)
// ======================

export interface FormAction {
    id?: string;

    callback?: (value: FormValue) => void | Promise<void>;

    onClick?: (value: FormValue) => void | Promise<void>;

    validationRequired?: boolean;
}

// ======================
// Form Props (ENGINE API)
// ======================

export interface FormProps {
    /**
     * schema-driven fields
     */
    elements: FormField[];

    /**
     * controlled value (single source of truth)
     */
    value: FormValue;

    /**
     * emit change to business layer
     */
    onChange: (value: FormValue) => void;

    /**
     * external validation results (business layer)
     */
    errors?: FormErrors;


    /**
     * actions (buttons, submit, etc)
     */
    actions?: Record<string, FormAction>;

    /**
     * layout control
     */
    columnSpan?: number;

    /**
     * reset trigger (optional legacy support)
     */
    mustClear?: boolean;

    layout?: GridLayout;
}

