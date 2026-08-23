// Form.stories.tsx

import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import Form from "./Form";

import type {
    FormField, FormProps,
    FormValue,
} from "./Form.types";
import {
    validationElements,
    responsiveElements,
    businessElements,
} from "./Form.story-data";

const meta: Meta<typeof Form> = {
    title: "Components/Form",
    component: Form,

    parameters: {
        layout: "centered",
    },
};

export default meta;

type Story = StoryObj<typeof Form>;

// -------------------------------------
// elements
// -------------------------------------
const elements: FormField[] = [

    // ---------------------------------
    // username
    // ---------------------------------
    {
        id: "agreement",

        type: "checkbox",

        label: "قوانین را می‌پذیرم",
    },
    {
        id: "username",

        type: "input",

        label: "نام کاربری",

        props: {
            variant: "text",

            placeholder:
                "نام کاربری را وارد کنید",

            length: 20,
        },

        validation: [
            {
                type: "required",
                value: undefined,
            },

            {
                type: "min",
                value: 3,
            },
        ],

        layout: {
            span: {
                xs: 1,
                md: 2,
            },
        },
    },

    // ---------------------------------
    // password
    // ---------------------------------
    {
        id: "password",

        type: "input",

        label: "رمز عبور",

        props: {
            variant: "password",

            placeholder:
                "رمز عبور را وارد کنید",
        },

        validation: [
            {
                type: "required",
                value: undefined,
            },

            {
                type: "min",
                value: 6,
            },
        ],

        layout: {
            span: {
                xs: 1,
                md: 2,
            },

            endPoint: true,
        },
    },

    {
        id: "status",

        type: "switch",

        label: "وضعیت",

        props: {
            checkedText: "T",
            unCheckedText: "F",
        },
        layout:{
            endPoint: true,
        }
    },

    // ---------------------------------
    // first name
    // ---------------------------------
    {
        id: "firstName",

        type: "input",

        label: "نام",

        props: {
            variant: "text",

            placeholder: "نام",
        },

        layout: {
            span: 1,
        },
    },

    // ---------------------------------
    // last name
    // ---------------------------------
    {
        id: "lastName",

        type: "input",

        label: "نام خانوادگی",

        props: {
            variant: "text",

            placeholder:
                "نام خانوادگی",
        },

        layout: {
            span: 1,
        },
    },

    // ---------------------------------
    // mobile
    // ---------------------------------
    {
        id: "mobile",

        type: "input",

        label: "شماره موبایل",

        props: {
            variant: "text",

            placeholder:
                "09123456789",
        },

        validation: [
            {
                type: "mobile",
                value: undefined,
            },
        ],

        layout: {
            span: 1,
        },
    },

    // ---------------------------------
    // email
    // ---------------------------------
    {
        id: "email",

        type: "input",

        label: "ایمیل",

        props: {
            variant: "text",

            placeholder:
                "example@gmail.com",
        },

        validation: [
            {
                type: "email",
                value: undefined,
            },
        ],

        layout: {
            span: 1,

            endPoint: true,
        },
    },

    // ---------------------------------
    // address
    // ---------------------------------
    {
        id: "address",

        type: "input",

        label: "آدرس",

        props: {
            variant: "textarea",

            placeholder:
                "آدرس را وارد کنید",

            rows: 4,
        },

        layout: {
            span: {
                lg:4
            },

            endPoint: true,
        },
    },

    // ---------------------------------
    // buttons
    // ---------------------------------
    {
        id: "submit",

        type: "button",

        label: "ثبت اطلاعات",

        props: {
            text: "ثبت اطلاعات",

            variant: "primary",

            submit: true,
        },
    },

    {
        id: "reset",

        type: "button",

        label: "پاک کردن",

        props: {
            text: "پاک کردن",

            variant: "secondary",
        },
    },
];

// -------------------------------------
// story
//Default
// Validation
// ResponsiveLayout
// BusinessLayout
// FullWidthFields
// DisabledFields
// CustomValidation
// -------------------------------------
export const Default: Story = {

    render: () => {

        const [formValue, setFormValue] =
            useState<FormValue>({
                username: "",
                password: "",
                firstName: "",
                lastName: "",
                mobile: "",
                email: "",
                address: "",
            });

        return (

            <div
                style={{
                    width: "100%",
                    maxWidth: 1000,
                }}
            >

                <Form
                    elements={elements}
                    value={formValue}
                    onChange={setFormValue}
                    layout={{
                        xs: 1,
                        sm: 2,
                        md: 3,
                        lg: 4,
                    }}
                    actions={{

                        submit: {
                            onClick: (value) => {

                                console.log(
                                    "submit",
                                    value
                                );
                            },
                        },

                        reset: {
                            validationRequired: false,

                            onClick: () => {

                                setFormValue({
                                    username: "",
                                    password: "",
                                    firstName: "",
                                    lastName: "",
                                    mobile: "",
                                    email: "",
                                    address: "",
                                });
                            },
                        },
                    }}
                />

                <pre
                    style={{
                        marginTop: 24,
                        padding: 16,
                        borderRadius: 8,
                        background: "#f5f5f5",
                        direction: "ltr",
                    }}
                >
                    {JSON.stringify(
                        formValue,
                        null,
                        2
                    )}
                </pre>

            </div>
        );
    },
};



/*__________________________________*/

// =====================================================
// reusable render
// =====================================================

const createFormStory = (
    elements: FormProps["elements"],
    layout: FormProps["layout"] = 4,
) => {

    return () => {

        const [formValue, setFormValue] =
            useState<FormValue>({});

        return (

            <div>

                <Form
                    elements={elements}
                    value={formValue}
                    onChange={setFormValue}
                    layout={layout}
                    actions={{

                        submit: {

                            onClick: (value) => {

                                console.log(
                                    "submit",
                                    value,
                                );
                            },
                        },

                        reset: {

                            validationRequired: false,

                            onClick: () => {

                                setFormValue({});
                            },
                        },
                    }}
                />

                <pre
                    /*style={{
                        marginTop: 24,
                        padding: 16,
                        borderRadius: 8,
                        background: "#f5f5f5",
                        direction: "ltr",
                        fontSize: 12,
                    }}*/
                >
                    {/*{
                        JSON.stringify(
                            formValue,
                            null,
                            2,
                        )
                    }*/}
                </pre>

            </div>
        );
    };
};

// =====================================================
// stories
// =====================================================

/*export const Default: Story = {

    render: createFormStory(
        defaultElements,
    ),
};*/

// -----------------------------------------------------

export const Validation: Story = {

    render: createFormStory(
        validationElements,
    ),
};

// -----------------------------------------------------

export const ResponsiveLayout: Story = {

    render: createFormStory(

        responsiveElements,

        {
            xs: 1,
            sm: 2,
            md: 3,
            lg: 4,
        },
    ),
};

// -----------------------------------------------------

export const BusinessLayout: Story = {

    render: createFormStory(

        businessElements,

        {
            xs: 1,
            md: 4,
        },
    ),
};

