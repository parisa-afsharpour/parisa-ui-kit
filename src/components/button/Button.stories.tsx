// Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

const meta: Meta<typeof Button> = {
    title: 'Components/Button',
    component: Button,
    tags: ['autodocs'],
    args: {
        label: 'Button',
        variant: 'default',
        size: 'middle',
        loading: false,
        disabled: false,
        block: false,
    },
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'primary', 'secondary', 'danger', 'ghost', 'link'],
        },
        size: {
            control: 'select',
            options: ['small', 'middle', 'large'],
        },
        loading: { control: 'boolean' },
        disabled: { control: 'boolean' },
        block: { control: 'boolean' },
        tooltip: { control: 'text' },
        icon: { control: false },
        onClick: { action: 'clicked' },
    },
};

export default meta;

type ButtonStory = StoryObj<typeof Button>;


// ─────────────────────────────────────────────
// 🔹 Playground (مهم‌ترین Story)
// ─────────────────────────────────────────────

export const Playground: ButtonStory = {
    args: {
        label: ""
    }
};


// ─────────────────────────────────────────────
// 🔹 Variants
// ─────────────────────────────────────────────

export const Default: ButtonStory = {
    args: { label: 'Default', variant: 'default' },
};

export const Primary: ButtonStory = {
    args: { label: 'Primary', variant: 'primary' },
};

export const Secondary: ButtonStory = {
    args: { label: 'Secondary', variant: 'secondary' },
};

export const Danger: ButtonStory = {
    args: {
        label: 'Delete',
        variant: 'danger',
        icon: <DeleteOutlined />,
    },
};

export const Ghost: ButtonStory = {
    args: { label: 'Ghost', variant: 'ghost' },
};

export const Link: ButtonStory = {
    args: { label: 'Link Button', variant: 'link' },
};


// ─────────────────────────────────────────────
// 🔹 States
// ─────────────────────────────────────────────

export const Loading: ButtonStory = {
    args: {
        label: 'Saving...',
        variant: 'primary',
        loading: true,
    },
};

export const LoadingWithIcon: ButtonStory = {
    args: {
        label: 'Adding',
        variant: 'primary',
        loading: true,
        icon: <PlusOutlined />,
    },
};

export const Disabled: ButtonStory = {
    args: {
        label: 'Disabled',
        variant: 'primary',
        disabled: true,
    },
};

export const Block: ButtonStory = {
    args: {
        label: 'Full Width Button',
        variant: 'primary',
        block: true,
    },
};

export const WithTooltip: ButtonStory = {
    args: {
        label: 'Hover me',
        variant: 'primary',
        tooltip: 'This is a tooltip',
    },
};

/*import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
    title: "Components/Button",
    component: Button,
    args: { children: "Click me" },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {};
export const Secondary: Story = { args: { variant: "secondary" } };*/
