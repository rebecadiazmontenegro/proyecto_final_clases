import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import FormSignUp from './FormSignUp';
import * as userService from '../../../../services/users.service';
import { MemoryRouter } from 'react-router-dom';

//Lo que hace este test:
    //Comprueba que el formulario se renderiza bien.
    //Comprueba que los inputs y select actualizan su valor correctamente.
    //Comprueba que el flujo de registro funciona bien, incluyendo la llamada al backend, la alerta de éxito y la navegación.


const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock('sweetalert2', () => ({
  default: {
    fire: vi.fn(),
  },
}));

describe('FormSignUp Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders form elements correctly', () => {
    render(
      <MemoryRouter>
        <FormSignUp />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /Crea tu cuenta/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Introduce tu nombre/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Introduce tu correo/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Introduce una contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Registrarse/i })).toBeInTheDocument();
  });

  it('updates input values when typing', () => {
    render(
      <MemoryRouter>
        <FormSignUp />
      </MemoryRouter>
    );

    const nameInput = screen.getByPlaceholderText(/Introduce tu nombre/i);
    const emailInput = screen.getByPlaceholderText(/Introduce tu correo/i);
    const passwordInput = screen.getByPlaceholderText(/Introduce una contraseña/i);
    const roleSelect = screen.getByRole('combobox');

    fireEvent.change(nameInput, { target: { value: 'Rebeca' } });
    fireEvent.change(emailInput, { target: { value: 'rebeca@test.com' } });
    fireEvent.change(passwordInput, { target: { value: '12345678' } });
    fireEvent.change(roleSelect, { target: { value: 'profesor' } });

    expect(nameInput.value).toBe('Rebeca');
    expect(emailInput.value).toBe('rebeca@test.com');
    expect(passwordInput.value).toBe('12345678');
    expect(roleSelect.value).toBe('profesor');
  });

  it('calls signUp and navigate on successful submission', async () => {
    const mockData = { message: 'Usuario creado correctamente' };
    vi.spyOn(userService, 'signUp').mockResolvedValue(mockData);

    const { default: Swal } = await import('sweetalert2');

    render(
      <MemoryRouter>
        <FormSignUp />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/Introduce tu nombre/i), { target: { value: 'Rebeca' } });
    fireEvent.change(screen.getByPlaceholderText(/Introduce tu correo/i), { target: { value: 'rebeca@test.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Introduce una contraseña/i), { target: { value: '12345678' } });
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'alumno' } });

    fireEvent.click(screen.getByRole('button', { name: /Registrarse/i }));

    await waitFor(() => {
      expect(userService.signUp).toHaveBeenCalledWith({
        name: 'Rebeca',
        email: 'rebeca@test.com',
        password: '12345678',
        role: 'alumno',
      });
      expect(Swal.fire).toHaveBeenCalledWith({
        icon: 'success',
        title: '¡Registro exitoso!',
        text: 'Usuario creado correctamente',
        confirmButtonText: 'Aceptar',
      });
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
  });
});
