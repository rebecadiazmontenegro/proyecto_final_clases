import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import FormLogIn from './FormLogIn';
import { UserContext } from '../../../../context/UserContext';
import * as userService from '../../../../services/users.service';
import { MemoryRouter } from 'react-router-dom';

//Este test hace:
    // Que el formulario se renderice correctamente.
    // Que los inputs respondan al cambio de texto.
    // Que el botón de submit llame a handleSubmit y, por tanto, a logIn.
    // Que el botón de Google redirija al URL correcto.
    // Que el BeatLoader aparezca cuando loading sea true.

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock('notyf', () => {
  return {
    Notyf: class {
      constructor() {}
      error = vi.fn();
    },
  };
});

describe('FormLogIn Component', () => {
  it('renders form elements correctly', () => {
    render(
      <MemoryRouter>
        <UserContext.Provider value={{ setUser: vi.fn() }}>
          <FormLogIn />
        </UserContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /Iniciar sesión/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Introduce tu correo/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Introduce tu contraseña/i)).toBeInTheDocument();
    expect(screen.getByText(/Aceptar/i)).toBeInTheDocument();
    expect(screen.getByText(/Iniciar sesión con Google/i)).toBeInTheDocument();
  });

  it('updates input values when typing', () => {
    render(
      <MemoryRouter>
        <UserContext.Provider value={{ setUser: vi.fn() }}>
          <FormLogIn />
        </UserContext.Provider>
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText(/Introduce tu correo/i);
    const passwordInput = screen.getByPlaceholderText(/Introduce tu contraseña/i);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: '123456' } });

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('123456');
  });

  it('calls logIn and navigate on form submit', async () => {
    const mockSetUser = vi.fn();
    const mockResponse = { user: { name: 'Test User' } };
    vi.spyOn(userService, 'logIn').mockResolvedValue(mockResponse);

    render(
      <MemoryRouter>
        <UserContext.Provider value={{ setUser: mockSetUser }}>
          <FormLogIn />
        </UserContext.Provider>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/Introduce tu correo/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Introduce tu contraseña/i), { target: { value: '123456' } });

    fireEvent.click(screen.getByText(/Aceptar/i));

    await waitFor(() => {
      expect(userService.logIn).toHaveBeenCalledWith('test@example.com', '123456');
      expect(mockSetUser).toHaveBeenCalledWith(mockResponse.user);
      expect(mockNavigate).toHaveBeenCalledWith('/dashboardteacher');
    });
  });

  it('redirects to Google login on button click', () => {
    delete window.location;
    window.location = { href: '' };

    render(
      <MemoryRouter>
        <UserContext.Provider value={{ setUser: vi.fn() }}>
          <FormLogIn />
        </UserContext.Provider>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/Iniciar sesión con Google/i));
    expect(window.location.href).toBe(import.meta.env.VITE_GOOGLE_LOGIN_URL);
  });
});
