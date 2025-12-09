import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SignUp from './SignUp';

vi.mock('./FormSignUp/FormSignUp', () => {
  return {
    default: () => <div data-testid="form-signup-mock">FormSignUp Mock</div>,
  };
});

describe('SignUp Component', () => {
  it('renders the SignUp section and FormSignUp component', () => {
    const { container } = render(<SignUp />);

    // Comprobar que hay un <section>
    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();

    // Comprobar que se renderiza FormSignUp
    expect(screen.getByTestId('form-signup-mock')).toBeInTheDocument();
  });
});
