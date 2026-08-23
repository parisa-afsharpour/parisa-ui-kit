// Form.story-data.ts

import type {
    FormField,
} from "./Form.types";

// =====================================================
// Default
// =====================================================

export const defaultElements: FormField[] = [

    {
        id: "username",

        type: "input",

        label: "نام کاربری",

        props: {
            variant: "text",
            placeholder: "نام کاربری",
        },
    },

    {
        id: "password",

        type: "input",

        label: "رمز عبور",

        props: {
            variant: "password",
            placeholder: "رمز عبور",
        },

        layout: {
            endPoint: true,
        },
    },

    {
        id: "submit",

        type: "button",

        label: "ثبت",

        props: {
            text: "ثبت",
            variant: "primary",
        },
    },
];

// =====================================================
// Validation
// =====================================================

export const validationElements: FormField[] = [

    {
        id: "email",

        type: "input",

        label: "ایمیل",

        props: {
            variant: "text",
            placeholder: "example@gmail.com",
        },

        validation: [
            {
                type: "required",
            },

            {
                type: "email",
            },
        ],
    },

    {
        id: "mobile",

        type: "input",

        label: "شماره موبایل",

        props: {
            variant: "text",
            placeholder: "09123456789",
        },

        validation: [
            {
                type: "mobile",
            },
        ],

        layout: {
            endPoint: true,
        },
    },

    {
        id: "submit",

        type: "button",

        label: "ثبت",

        props: {
            text: "ثبت",
            variant: "primary",
        },
    },
];

// =====================================================
// Responsive Layout
// =====================================================

export const responsiveElements: FormField[] = [

    {
        id: "firstName",

        type: "input",

        label: "نام",

        props: {
            variant: "text",
        },

        layout: {
            span: {
                xs: 1,
                sm: 1,
                md: 2,
            },
        },
    },

    {
        id: "lastName",

        type: "input",

        label: "نام خانوادگی",

        props: {
            variant: "text",
        },

        layout: {
            span: {
                xs: 1,
                sm: 1,
                md: 2,
            },

            endPoint: true,
        },
    },

    {
        id: "email",

        type: "input",

        label: "ایمیل",

        props: {
            variant: "text",
        },

        layout: {
            span: 2,
        },
    },

    {
        id: "mobile",

        type: "input",

        label: "موبایل",

        props: {
            variant: "text",
        },

        layout: {
            span: 2,

            endPoint: true,
        },
    },

    {
        id: "description",

        type: "input",

        label: "توضیحات",

        props: {
            variant: "textarea",
            rows: 4,
        },

        layout: {
            span: {
                xs: 1,
                md: 4,
            },

            endPoint: true,
        },
    },

    {
        id: "submit",

        type: "button",

        label: "ثبت",

        props: {
            text: "ثبت",
            variant: "primary",
        },
    },
];

// =====================================================
// Business Layout
// =====================================================

export const businessElements: FormField[] = [

    {
        id: "province",

        type: "input",

        label: "استان",

        props: {
            variant: "text",
        },

        layout: {
            span: 1,
        },
    },

    {
        id: "city",

        type: "input",

        label: "شهر",

        props: {
            variant: "text",
        },

        layout: {
            span: 2,
        },
    },

    {
        id: "postalCode",

        type: "input",

        label: "کد پستی",

        props: {
            variant: "text",
        },

        layout: {
            span: 1,

            endPoint: true,
        },
    },

    {
        id: "address",

        type: "input",

        label: "آدرس",

        props: {
            variant: "textarea",
            rows: 3,
        },

        layout: {
            span: 4,

            endPoint: true,
        },
    },

    {
        id: "submit",

        type: "button",

        label: "ثبت",

        props: {
            text: "ثبت",
            variant: "primary",
        },
    },
];