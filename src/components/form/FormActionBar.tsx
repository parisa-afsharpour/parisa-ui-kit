import React from "react";

import { GridRow } from "../layout/gridRow";
import { GridCol } from "../layout/gridCol";

import type {
    FormElement,
    FormActions,
} from "./Form.types";

import { Button } from "../button";

interface Props {
    buttons: FormElement[];
    actions?: FormActions;
    onAction: (id: string) => void;
    /*isFormValid: boolean;*/
    dir?: "rtl" | "ltr";
}

export const FormActionBar: React.FC<Props> = ({
                                                   buttons,
                                                   actions,
                                                   onAction,
                                                  /* isFormValid,*/
                                                   dir = "rtl",
                                               }) => {

    return (
        <GridRow>
            <GridCol span={24}>

                <div
                    style={{
                        display: "flex",
                        gap: 8,
                        justifyContent:
                            dir === "rtl"
                                ? "flex-end"
                                : "flex-start",
                    }}
                >

                    {buttons.map((btn) => {

                        const action =
                            actions?.[btn.id];

                        /*const shouldValidate =
                            action?.validationRequired !== false;

                        const disabled =
                            shouldValidate &&
                            !isFormValid;*/

                        return (
                            <Button
                                key={btn.id}
                                disabled={btn.disable}
                                onClick={() => onAction(btn.id)}
                            >
                                {btn.label}
                            </Button>
                        );
                    })}

                </div>

            </GridCol>
        </GridRow>
    );
};