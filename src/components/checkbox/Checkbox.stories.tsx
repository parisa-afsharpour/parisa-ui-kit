// Checkbox.stories.tsx

import type {
    Meta,
    StoryObj,
} from "@storybook/react-vite";

import React, {
    useState,
} from "react";

import { Checkbox } from "./Checkbox";

// =====================================================
// meta
// =====================================================

const meta: Meta<typeof Checkbox> = {

    title: "Components/Checkbox",

    component: Checkbox,

    parameters: {
        layout: "centered",
    },

    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

// =====================================================
// default
// =====================================================

export const Default: Story = {

    render: () => {

        const [checked, setChecked] =
            useState(false);

        return (

            <Checkbox
                label="پذیرش قوانین"
                checked={checked}
                onChange={(
                    _event,
                    value,
                ) => {

                    setChecked(value);
                }}
            />
        );
    },
};

// =====================================================
// checked
// =====================================================

export const Checked: Story = {

    render: () => {

        return (

            <Checkbox
                label="فعال"
                checked
            />
        );
    },
};

// =====================================================
// disabled
// =====================================================

export const Disabled: Story = {

    render: () => {

        return (

            <Checkbox
                label="غیرفعال"
                disabled
            />
        );
    },
};

// =====================================================
// default checked
// =====================================================

export const DefaultChecked: Story = {

    render: () => {

        return (

            <Checkbox
                label="انتخاب شده پیشفرض"
                defaultChecked
            />
        );
    },
};

// =====================================================
// without label
// =====================================================

export const WithoutLabel: Story = {

    render: () => {

        return (
            <Checkbox />
        );
    },
};

// =====================================================
// interactive group
// =====================================================

export const Interactive: Story = {

    render: () => {

        const [newsletter, setNewsletter] =
            useState(false);

        const [terms, setTerms] =
            useState(true);

        return (

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 16,
                    minWidth: 300,
                }}
            >

                <Checkbox
                    label="عضویت در خبرنامه"
                    checked={newsletter}
                    onChange={(
                        _event,
                        checked,
                    ) => {

                        setNewsletter(
                            checked
                        );
                    }}
                />

                <Checkbox
                    label="پذیرش قوانین"
                    checked={terms}
                    onChange={(
                        _event,
                        checked,
                    ) => {

                        setTerms(
                            checked
                        );
                    }}
                />

                <pre
                    style={{
                        padding: 12,
                        borderRadius: 8,
                        background: "#f5f5f5",
                        direction: "ltr",
                        fontSize: 12,
                    }}
                >
                    {
                        JSON.stringify(
                            {
                                newsletter,
                                terms,
                            },
                            null,
                            2,
                        )
                    }
                </pre>

            </div>
        );
    },
};