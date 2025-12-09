import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import DashboardTeacher from "./DashboarTeacher";
import { UserContext } from "../../../context/UserContext";
import { MemoryRouter } from "react-router-dom";
import { createClass } from "../../../services/classes.service";


vi.mock("notyf", () => {
  return {
    Notyf: class {
      success = vi.fn();
      error = vi.fn();
    },
  };
});

vi.mock("../../../services/users.service", () => ({
  logout: vi.fn().mockResolvedValue(),
}));
vi.mock("../../../services/classes.service", () => ({
  createClass: vi
    .fn()
    .mockResolvedValue({ message: "Clase creada correctamente" }),
}));

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    Link: ({ children }) => <div>{children}</div>,
  };
});

describe("DashboardTeacher", () => {
  const user = { name: "Rebeca" };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders user name, buttons and allows creating a class (sin materiales)", async () => {
    render(
      <MemoryRouter>
        <UserContext.Provider value={{ user }}>
          <DashboardTeacher />
        </UserContext.Provider>
      </MemoryRouter>
    );

    // Comprobar nombre y botones principales
    expect(screen.getByText(/Bienvenid@ , Rebeca/i)).toBeInTheDocument();
    expect(screen.getByText(/Crear clase/i)).toBeInTheDocument();
    expect(screen.getByText(/Cerrar sesión/i)).toBeInTheDocument();

    // Mostrar formulario de crear clase
    fireEvent.click(screen.getByText(/Crear clase/i));
    expect(screen.getByText(/¡Crea una nueva clase!/i)).toBeInTheDocument();

    // Rellenar el formulario (sin materiales)
    const selects = screen.getAllByRole("combobox");
    fireEvent.change(selects[0], { target: { value: "Matemáticas" } }); // Materia
    fireEvent.change(selects[1], { target: { value: "Iniciación" } }); // Nivel
    fireEvent.change(screen.getByLabelText(/Fecha y Hora:/i), {
      target: { value: "2025-12-10T10:00" },
    });
    fireEvent.change(selects[2], { target: { value: "Online" } });
    // Enviar formulario
    fireEvent.click(screen.getByText(/Guardar/i));

    await waitFor(() => {
      expect(createClass).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith("/calendar");
    });
  });
});
