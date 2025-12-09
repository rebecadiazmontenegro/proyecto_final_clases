import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import LogIn from './LogIn';
import FormLogIn from './FormLogIn/FormLogIn';
import { UserContext } from '../../../context/UserContext';
import { MemoryRouter } from 'react-router-dom';


// Comprueba que el componente FormLogIn se renderice correctamente dentro de LogIn.

vi.mock('./FormLogIn/FormLogIn', () => {
  return {
    default: vi.fn(() => <div data-testid="mock-form-login" />),
  };
});

describe('LogIn Component', () => {
  it('renders FormLogIn inside', () => {
    render(
      <MemoryRouter>
        <UserContext.Provider value={{ setUser: vi.fn() }}>
          <LogIn />
        </UserContext.Provider>
      </MemoryRouter>
    );

    // Verificar que el componente hijo FormLogIn se renderizó
    const formLogin = screen.getByTestId('mock-form-login');
    expect(formLogin).toBeInTheDocument();
  });
});
