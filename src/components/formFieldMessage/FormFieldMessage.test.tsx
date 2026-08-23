/*
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { FormFieldMessage } from './FormFieldMessage';

describe('FormFieldMessage', () => {
    it('renders nothing when text is empty', () => {
        const { container } = render(<FormFieldMessage />);
        expect(container.firstChild).toBeNull();
    });

    it('renders helper text', () => {
        render(<FormFieldMessage text="Helper text" />);
        expect(screen.getByText('Helper text')).toBeInTheDocument();
    });

    it('renders error text', () => {
        render(<FormFieldMessage text="Error text" variant="error" />);
        expect(screen.getByText('Error text')).toBeInTheDocument();
    });

    it('renders info text', () => {
        render(<FormFieldMessage text="Info text" variant="info" />);
        expect(screen.getByText('Info text')).toBeInTheDocument();
    });
});*/
