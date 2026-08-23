import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { TextField } from './TextField';

import type { TextFieldProps } from './TextField.types';

const meta: Meta<typeof TextField> = {
    title: 'Components/TextField',
    component: TextField,

    parameters: {
        layout: 'centered',
    },

    tags: ['autodocs'],

    argTypes: {
        size: {
            control: 'select',
            options: [
                'small',
                'medium',
                'large',
            ],
        },

        status: {
            control: 'select',
            options: [
                'default',
                'success',
                'warning',
                'error',
            ],
        },

        type: {
            control: 'select',
            options: [
                'text',
                'password',
                'number',
                'textarea',
            ],
        },

        disabled: {
            control: 'boolean',
        },

        allowClear: {
            control: 'boolean',
        },

        mandatoryPresentational: {
            control: 'boolean',
        },

        reserveCaptionSpace: {
            control: 'boolean',
        },

        autoFocus: {
            control: 'boolean',
        },

        onChange: {
            action: 'changed',
        },

        onFocus: {
            action: 'focused',
        },

        onBlur: {
            action: 'blurred',
        },

        onEnter: {
            action: 'pressed-enter',
        },
    },

    args: {
        label: 'نام کاربری',
        placeholder: 'نام کاربری را وارد کنید',
        size: 'medium',
        status: 'default',
        type: 'text',
        disabled: false,
        allowClear: false,
        mandatoryPresentational: false,
        reserveCaptionSpace: false,
    },
};

export default meta;

type Story = StoryObj<typeof TextField>;

/* =========================================================
   DEFAULT
========================================================= */

export const Default: Story = {
    args: {
        label: 'نام کاربری',
        placeholder: 'نام کاربری را وارد کنید',
    },
};

/* =========================================================
   SIZES
========================================================= */

export const Small: Story = {
    args: {
        size: 'small',
        label: 'Small',
        placeholder: 'Small input',
    },
};

export const Medium: Story = {
    args: {
        size: 'medium',
        label: 'Medium',
        placeholder: 'Medium input',
    },
};

export const Large: Story = {
    args: {
        size: 'large',
        label: 'Large',
        placeholder: 'Large input',
    },
};

/* =========================================================
   STATUS
========================================================= */

export const Success: Story = {
    args: {
        status: 'success',
        label: 'شماره موبایل',
        value: '09121234567',
        caption: 'شماره موبایل با موفقیت تأیید شد',
    },
};

export const Warning: Story = {
    args: {
        status: 'warning',
        label: 'رمز عبور',
        value: '123456',
        caption: 'رمز عبور شما ضعیف است',
    },
};

export const Error: Story = {
    args: {
        status: 'error',
        label: 'شماره موبایل',
        value: '09123',
        caption: 'شماره موبایل صحیح نیست',
    },
};

/* =========================================================
   CAPTION
========================================================= */

export const WithCaption: Story = {
    args: {
        label: 'شماره کارت',
        placeholder: 'شماره کارت را وارد کنید',
        caption: 'شماره کارت باید ۱۶ رقم باشد',
    },
};

/* =========================================================
   REQUIRED
========================================================= */

export const Required: Story = {
    args: {
        label: 'نام',
        placeholder: 'نام را وارد کنید',
        mandatoryPresentational: true,
    },
};

/* =========================================================
   PASSWORD
========================================================= */

export const Password: Story = {
    args: {
        type: 'password',
        label: 'رمز عبور',
        placeholder: 'رمز عبور را وارد کنید',
    },
};

/* =========================================================
   NUMBER
========================================================= */

export const Number: Story = {
    args: {
        type: 'number',
        label: 'مبلغ',
        placeholder: 'مبلغ را وارد کنید',
    },
};

/* =========================================================
   TEXTAREA
========================================================= */

export const Textarea: Story = {
    args: {
        type: 'textarea',
        label: 'توضیحات',
        placeholder: 'توضیحات را وارد کنید',
        rows: 5,
    },
};

/* =========================================================
   DISABLED
========================================================= */

export const Disabled: Story = {
    args: {
        label: 'نام کاربری',
        value: 'parisa',
        disabled: true,
    },
};

/* =========================================================
   CLEARABLE
========================================================= */

export const Clearable: Story = {
    args: {
        label: 'جستجو',
        placeholder: 'جستجو کنید',
        value: 'مقدار نمونه',
        allowClear: true,
    },
};

/* =========================================================
   LENGTH
========================================================= */

export const MaxLength: Story = {
    args: {
        label: 'کد ملی',
        placeholder: 'کد ملی را وارد کنید',
        length: 10,
        caption: 'حداکثر ۱۰ رقم',
    },
};

/* =========================================================
   RESERVE CAPTION
========================================================= */

export const ReserveCaptionSpace: Story = {
    args: {
        label: 'نام',
        placeholder: 'نام را وارد کنید',
        reserveCaptionSpace: true,
    },
};

/* =========================================================
   CONTROLLED
========================================================= */

const ControlledExample = (
    args: TextFieldProps
) => {

    const [value, setValue] =
        useState('');

    return (
        <div style={{ width: 320 }}>
            <TextField
                {...args}
                value={value}
                onChange={(_, newValue) => {
                    setValue(newValue);
                }}
                caption={`Value: ${value}`}
            />
        </div>
    );
};

export const Controlled: Story = {
    render: (args) => (
        <ControlledExample {...args} />
    ),

    args: {
        label: 'Controlled Input',
        placeholder: 'شروع به تایپ کنید',
    },
};



/*
import type { Meta, StoryObj } from '@storybook/react';
import { TextField } from './TextField';

const meta: Meta<typeof TextField> = {
    title: 'Components/TextField',
    component: TextField,
    args: {
        label: 'Label',
    },
};

export default meta;

type Story = StoryObj<typeof TextField>;

export const Default: Story = {
    args: {
        value: '',
    },
};

export const Number: Story = {
    args: {
        type: 'number',
        label: 'Amount',
    },
};

export const TextArea: Story = {
    args: {
        type: 'textarea',
        label: 'Description',
        rows: 4,
    },
};

export const Disabled: Story = {
    args: {
        label: 'Disabled field',
        disabled: true,
        value: 'Cannot edit',
    },
};

export const Compact: Story = {
    args: {
        label: 'Compact',
        noError: true,
    },
};


*/
