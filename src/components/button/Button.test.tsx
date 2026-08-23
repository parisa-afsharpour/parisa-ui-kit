// Button.test.tsx
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
