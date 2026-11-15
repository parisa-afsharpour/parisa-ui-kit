// Button.stories.tsx

import { Markdown } from "@storybook/addon-docs/blocks";
import buttonDocs from "./BUTTON_DOCS.md?raw";

import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./Button";

const sizes = ["xs", "s", "m", "l", "xl"] as const;

const variants = [
    "solid",
    "outline",
    "tone",
    "textual",
] as const;

const relevances = [
    "base",
    "primary",
    "danger",
] as const;

// ---------------------------------------------
// Storybook Configuration
// ---------------------------------------------

const meta = {
    title: "Components/Button",
    component: Button,
    tags: ["autodocs"],

    parameters: {
        layout: "padded",

        docs: {
            page: () => (
                <Markdown>{buttonDocs}</Markdown>
            ),
        },
    },


    /* parameters: {
         layout: "padded",
         docs: {
             description: {
                 component:
                     "Shared Button component based on ISC Core Design System. " +
                     "Colors are theme-dependent; dimensions and typography " +
                     "are defined by the UI Kit.",
             },
         },
     },*/

    args: {
        label: "متن دکمه",
        variant: "solid",
        relevance: "primary",
        size: "m",

        loading: false,
        disabled: false,
        block: false,
    },

    argTypes: {
        variant: {
            control: "select",
            options: variants,
            description: "Button visual variant",
        },

        relevance: {
            control: "select",
            options: relevances,
            description: "Semantic color role",
        },

        size: {
            control: "select",
            options: sizes,
            description: "Button size from Figma",
        },

        label: {
            control: "text",
        },

        loading: {
            control: "boolean",
        },

        disabled: {
            control: "boolean",
        },

        block: {
            control: "boolean",
        },

        tooltip: {
            control: "text",
        },

        startIcon: {
            control: false,
        },

        endIcon: {
            control: false,
        },

        children: {
            control: false,
        },

        style: {
            control: false,
        },
    },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

// ---------------------------------------------
// 1. Playground
// ---------------------------------------------

export const Playground: Story = {};

// ---------------------------------------------
// 2. All Sizes
// ---------------------------------------------

export const AllSizes: Story = {
    render: () => (
        <div
            dir="rtl"
            style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 24,
            }}
        >
            {sizes.map((size) => (
                <div
                    key={size}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 12,
                    }}
                >
                    <span>{size.toUpperCase()}</span>

                    <Button
                        size={size}
                        variant="solid"
                        relevance="primary"
                        label="متن دکمه"
                    />
                </div>
            ))}
        </div>
    ),
};

// ---------------------------------------------
// 3. All Variants / Relevances
// ---------------------------------------------

export const AllVariants: Story = {
    args: {
        size: "xs"
    },

    render: () => (
        <div
            dir="rtl"
            style={{
                display: "grid",
                gridTemplateColumns:
                    "repeat(4, minmax(120px, 1fr))",
                gap: 24,
                overflowX: "auto",
                minWidth: 600,
            }}
        >
            {variants.map((variant) => (
                <div key={variant}>
                    <strong>{variant}</strong>
                </div>
            ))}

            {relevances.map((relevance) =>
                variants.map((variant) => (
                    <div
                        key={`${relevance}-${variant}`}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            gap: 8,
                        }}
                    >
                        <small>{relevance}</small>

                        <Button
                            size="m"
                            variant={variant}
                            relevance={relevance}
                            label="متن دکمه"
                        />
                    </div>
                ))
            )}
        </div>
    )
};

// ---------------------------------------------
// 4. States
// ---------------------------------------------

export const States: Story = {
    render: () => (
        <div
            dir="rtl"
            style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: 24,
            }}
        >
            <Button
                label="Default"
                variant="solid"
                relevance="primary"
            />

            <Button
                label="Disabled"
                variant="solid"
                relevance="primary"
                disabled
            />

            <Button
                label="Loading"
                variant="solid"
                relevance="primary"
                loading
            />
        </div>
    ),
};

// ---------------------------------------------
// 5. With Icons
// ---------------------------------------------

export const WithIcons: Story = {
    render: () => (
        <div
            dir="rtl"
            style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 16,
            }}
        >
            <Button
                label="افزودن"
                variant="solid"
                relevance="primary"
                startIcon={<span aria-hidden="true">＋</span>}
            />

            <Button
                label="ادامه"
                variant="outline"
                relevance="base"
                endIcon={<span aria-hidden="true">←</span>}
            />

            <Button
                label="ثبت"
                variant="tone"
                relevance="primary"
                startIcon={<span aria-hidden="true">＋</span>}
                endIcon={<span aria-hidden="true">←</span>}
            />
        </div>
    ),
};

// ---------------------------------------------
// 6. Tooltip
// ---------------------------------------------

export const WithTooltip: Story = {
    args: {
        label: "راهنما",
        variant: "outline",
        relevance: "base",
        tooltip: "توضیحات مربوط به دکمه",
    },
};

// ---------------------------------------------
// 7. Full Width
// ---------------------------------------------

export const FullWidth: Story = {
    args: {
        label: "ثبت اطلاعات",
        variant: "solid",
        relevance: "primary",
        block: true,
    },
};




export const VisualAudit: Story = {
    args: {
        variant: "tone"
    },

    parameters: {
        layout: "padded",
    },

    render: () => (
        <div
            dir="rtl"
            style={{
                display: "flex",
                flexDirection: "column",
                gap: 40,
                padding: 16,
            }}
        >
            {/* Size inspection */}
            <section>
                <h3>Button Sizes — Figma</h3>

                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "center",
                        gap: 24,
                        marginTop: 20,
                    }}
                >
                    {sizes.map((size) => (
                        <div
                            key={size}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: 12,
                            }}
                        >
                            <span>{size.toUpperCase()}</span>

                            <Button
                                size={size}
                                variant="outline"
                                relevance="base"
                                label="متن دکمه"
                                startIcon={
                                    <span aria-hidden="true">＋</span>
                                }
                                endIcon={
                                    <span aria-hidden="true">←</span>
                                }
                            />
                        </div>
                    ))}
                </div>
            </section>

            {/* Interaction inspection */}
            <section>
                <h3>Interactive States</h3>

                <p>
                    Hover, Pressed و Focus را روی دکمه‌ها
                    بررسی کنید.
                </p>

                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "center",
                        gap: 16,
                        marginTop: 20,
                    }}
                >
                    {variants.map((variant) => (
                        <Button
                            key={variant}
                            size="m"
                            variant={variant}
                            relevance="primary"
                            label={variant}
                        />
                    ))}
                </div>
            </section>

            {/* Disabled / Loading */}
            <section>
                <h3>Disabled & Loading</h3>

                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "center",
                        gap: 16,
                        marginTop: 20,
                    }}
                >
                    <Button
                        label="دکمه فعال"
                        variant="solid"
                        relevance="primary"
                    />

                    <Button
                        label="دکمه غیرفعال"
                        variant="solid"
                        relevance="primary"
                        disabled
                    />

                    <Button
                        label="در حال بارگذاری"
                        variant="solid"
                        relevance="primary"
                        loading
                    />

                    <Button
                        label="راهنمای دکمه"
                        variant="outline"
                        relevance="base"
                        tooltip="توضیحات دکمه"
                    />
                </div>
            </section>
        </div>
    )
};

