// Checkbox.tsx

import React from "react";

import { Checkbox as AntCheckbox } from "antd";

import type {
    CheckboxProps,
} from "./Checkbox.types";

export const Checkbox: React.FC<
    CheckboxProps
> = ({
         checked,
         defaultChecked,
         disabled,
         label,
         onChange,
         ...rest
     }) => {

    return (

        <div
            style={{
                minHeight: 55,
                display: "flex",
                alignItems: "center",
            }}
        >

            <AntCheckbox
                checked={checked}
                defaultChecked={defaultChecked}
                disabled={disabled}
                onChange={(event) => {

                    onChange?.(
                        event,
                        event.target.checked,
                    );
                }}
                {...rest}
            >
                {label}
            </AntCheckbox>

        </div>
    );
};

export default Checkbox;