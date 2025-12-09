import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import InforUser from "./InforUser";
import { BrowserRouter } from "react-router-dom";

//Comprueba si redirige a /login si no hay usuario
//Muestra la información del usuario si hay usuario en localStorage

const navigateMock = vi.fn();

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => navigateMock, // aquí devolvemos nuestro vi.fn()
  };
});

describe("InforUser component", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    vi.stubGlobal("localStorage", {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
    });
  });

  it("redirige a /login si no hay usuario", () => {
    localStorage.getItem.mockReturnValue(null);

    render(
      <BrowserRouter>
        <InforUser />
      </BrowserRouter>
    );

    expect(navigateMock).toHaveBeenCalledWith("/login");
  });

  it("muestra la información del usuario si hay usuario en localStorage", () => {
    const user = { name: "Rebeca", email: "rebeca@example.com", role: "admin" };
    localStorage.getItem.mockReturnValue(JSON.stringify(user));

    render(
      <BrowserRouter>
        <InforUser />
      </BrowserRouter>
    );

    expect(screen.getByText(/Nombre:/).parentElement).toHaveTextContent(user.name);
    expect(screen.getByText(/Email:/).parentElement).toHaveTextContent(user.email);
    expect(screen.getByText(/Rol:/).parentElement).toHaveTextContent(user.role);
  });
});
