// Switch.types.ts

export interface SwitchProps {

    id?: string;

    checked?: boolean;

    defaultChecked?: boolean;

    disabled?: boolean;

    loading?: boolean;

    checkedText?: string;

    unCheckedText?: string;

    onChange?: (
        checked: boolean,
    ) => void;
}