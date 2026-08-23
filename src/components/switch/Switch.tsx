// Switch.tsx

import React from "react";

import {
    Switch as AntSwitch,
} from "antd";

import type {
    SwitchProps,
} from "./Switch.types";

export const Switch: React.FC<
    SwitchProps
> = ({
         checked,
         defaultChecked,
         disabled,
         loading,
         checkedText,
         unCheckedText,
         onChange,
     }) => {

    return (

        <div
            style={{
                minHeight: 55,
                display: "flex",
                alignItems: "center",
            }}
        >

            <AntSwitch
                checked={checked}
                defaultChecked={
                    defaultChecked
                }
                disabled={disabled}
                loading={loading}
                checkedChildren={
                    checkedText
                }
                unCheckedChildren={
                    unCheckedText
                }
                onChange={onChange}
            />

        </div>
    );
};

export default Switch;