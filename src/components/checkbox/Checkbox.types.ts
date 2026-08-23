// Checkbox.types.ts

export interface CheckboxProps {

    id?: string;

    checked?: boolean;

    defaultChecked?: boolean;

    disabled?: boolean;

    label?: string;

    onChange?: (
        event: React.ChangeEvent<HTMLInputElement>,
        checked: boolean,
    ) => void;
}