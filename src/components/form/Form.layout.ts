// Form.layout.ts

import type {
    GridLayout,
    ResponsiveGridObject,
    FormField,
} from "./Form.types";

// ------------------------------------
// normalize form layout
// convert layout to responsive columns
// ------------------------------------
export const normalizeResponsiveLayout = (
    layout?: GridLayout,
): ResponsiveGridObject => {

    // responsive object
    if (
        layout &&
        typeof layout === "object"
    ) {

        return {
            xs: layout.xs ?? 1,
            sm: layout.sm ?? layout.xs ?? 1,
            md: layout.md ?? layout.sm ?? 2,
            lg: layout.lg ?? layout.md ?? 4,
            xl: layout.xl ?? layout.lg ?? 4,
        };
    }

    // single numeric layout
    const columns = layout || 4;

    return {
        xs: 1,
        sm: columns >= 2 ? 2 : 1,
        md: columns >= 3 ? 3 : columns,
        lg: columns,
        xl: columns,
    };
};

// ------------------------------------
// resolve antd col span
// ------------------------------------
export const resolveColSpan = (
    formColumns: number,
    elementSpan?: number,
) => {

    const span = elementSpan || 1;

    return Math.floor(
        (24 / formColumns) * span
    );
};

// ------------------------------------
// resolve responsive spans
// ------------------------------------
export const resolveResponsiveColSpan = (
    formLayout?: GridLayout,
    elementLayout?: GridLayout,
) => {

    const normalizedForm =
        normalizeResponsiveLayout(formLayout);

    // ------------------------------------
    // element span = number
    // ------------------------------------
    if (
        typeof elementLayout === "number"
    ) {

        return {
            xs: resolveColSpan(
                normalizedForm.xs || 1,
                elementLayout,
            ),

            sm: resolveColSpan(
                normalizedForm.sm || 1,
                elementLayout,
            ),

            md: resolveColSpan(
                normalizedForm.md || 1,
                elementLayout,
            ),

            lg: resolveColSpan(
                normalizedForm.lg || 1,
                elementLayout,
            ),

            xl: resolveColSpan(
                normalizedForm.xl || 1,
                elementLayout,
            ),
        };
    }

    // ------------------------------------
    // element span = responsive object
    // ------------------------------------
    return {

        xs: resolveColSpan(
            normalizedForm.xs || 1,
            elementLayout?.xs || 1,
        ),

        sm: resolveColSpan(
            normalizedForm.sm || 1,
            elementLayout?.sm ||
            elementLayout?.xs ||
            1,
        ),

        md: resolveColSpan(
            normalizedForm.md || 1,
            elementLayout?.md ||
            elementLayout?.sm ||
            1,
        ),

        lg: resolveColSpan(
            normalizedForm.lg || 1,
            elementLayout?.lg ||
            elementLayout?.md ||
            1,
        ),

        xl: resolveColSpan(
            normalizedForm.xl || 1,
            elementLayout?.xl ||
            elementLayout?.lg ||
            1,
        ),
    };
};

// ------------------------------------
// build rows
// endpoint => break line
// ------------------------------------
export const buildRows = (
    elements: FormField[],
): FormField[][] => {

    const rows: FormField[][] = [];

    let currentRow: FormField[] = [];

    elements.forEach((el) => {

        if (el.hidden) {
            return;
        }

        if (el.type === "button") {
            return;
        }

        currentRow.push(el);

        if (el.layout?.endPoint) {

            rows.push(currentRow);

            currentRow = [];
        }
    });

    if (currentRow.length) {
        rows.push(currentRow);
    }

    return rows;
};