// Button.test.tsx


import { describe, it, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import { Button } from "./Button";
import { UIProvider } from "../../theme/UIProvider";

const renderButton = (
    props: React.ComponentProps<typeof Button> = {}
) => {
    return render(
        <UIProvider>
            <Button label="متن دکمه" {...props} />
        </UIProvider>
    );
};

// Expected values from ISC Core DS Figma
const sizeCases = [
    ["xs", 10, 8, 4, 14, 12, 20],
    ["s", 10, 10, 4, 16, 14, 20],
    ["m", 16, 12, 4, 20, 14, 20],
    ["l", 16, 12, 6, 24, 16, 24],
    ["xl", 20, 14, 8, 24, 16, 24],
] as const;

describe("Button", () => {
    it("renders the label", () => {
        renderButton();

        expect(
            screen.getByRole("button", { name: "متن دکمه" })
        ).toBeInTheDocument();
    });

    describe("Figma Size Tokens", () => {
        it.each(sizeCases)(
            "applies correct tokens for size %s",
            (
                size,
                paddingInline,
                paddingBlock,
                gap,
                iconSize,
                fontSize,
                lineHeight
            ) => {
                renderButton({ size });

                const button = screen.getByRole("button");

                expect(button).toHaveClass(
                    `ui-button--${size}`
                );

                const css = button.style;

                expect(
                    css.getPropertyValue("--button-padding-inline")
                ).toBe(`${paddingInline}px`);

                expect(
                    css.getPropertyValue("--button-padding-block")
                ).toBe(`${paddingBlock}px`);

                expect(
                    css.getPropertyValue("--button-gap")
                ).toBe(`${gap}px`);

                expect(
                    css.getPropertyValue("--button-icon-size")
                ).toBe(`${iconSize}px`);

                expect(
                    css.getPropertyValue("--button-font-size")
                ).toBe(`${fontSize}px`);

                expect(
                    css.getPropertyValue("--button-line-height")
                ).toBe(`${lineHeight}px`);

                expect(
                    css.getPropertyValue("--button-radius")
                ).toBe("12px");

                expect(
                    css.getPropertyValue("--button-height")
                ).toBe("");
            }
        );
    });

    describe("Variants and Relevances", () => {
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

        it.each(
            variants.flatMap((variant) =>
                relevances.map((relevance) => ({
                    variant,
                    relevance,
                }))
            )
        )(
            "renders $variant / $relevance",
            ({ variant, relevance }) => {
                renderButton({ variant, relevance });

                const button = screen.getByRole("button");

                expect(button).toHaveClass(
                    `ui-button--${variant}`,
                    `ui-button--${relevance}`
                );

                expect(
                    button.style.getPropertyValue(
                        "--button-default-bg"
                    )
                ).not.toBe("");
            }
        );
    });

    describe("Behavior", () => {
        it("calls onClick when clicked", () => {
            const onClick = vi.fn();

            renderButton({ onClick });

            fireEvent.click(screen.getByRole("button"));

            expect(onClick).toHaveBeenCalledTimes(1);
        });

        it("is disabled when disabled=true", () => {
            renderButton({ disabled: true });

            expect(
                screen.getByRole("button")
            ).toBeDisabled();
        });

        it("is disabled while loading", () => {
            renderButton({ loading: true });

            const button = screen.getByRole("button");

            expect(button).toBeDisabled();
            expect(button).toHaveAttribute(
                "aria-busy",
                "true"
            );
        });

        it("renders both icons", () => {
            const { container } = renderButton({
                startIcon: <span>Start</span>,
                endIcon: <span>End</span>,
            });

            expect(
                container.querySelector(".ui-button__start-icon")
            ).toBeInTheDocument();

            expect(
                container.querySelector(".ui-button__end-icon")
            ).toBeInTheDocument();
        });

        it("supports block layout", () => {
            renderButton({ block: true });

            expect(
                screen.getByRole("button")
            ).toHaveClass("ant-btn-block");
        });
    });
});


/*
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
    it('renders label', () => {
        render(<Button label="Click me" />);
        expect(screen.getByText('Click me')).toBeInTheDocument();
    });

    it('handles click', () => {
        const onClick = vi.fn();
        render(<Button label="Click" onClick={onClick} />);
        screen.getByText('Click').click();
        expect(onClick).toHaveBeenCalled();
    });
});
*/
