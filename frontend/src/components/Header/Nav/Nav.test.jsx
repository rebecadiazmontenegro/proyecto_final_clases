// src/components/Main/Nav/Nav.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Nav from "./Nav";

describe("Nav component", () => {
  test("renderiza el logo y los links", () => {
    render(
      <BrowserRouter>
        <Nav />
      </BrowserRouter>
    );

    // Logo
    expect(screen.getByAltText("Logo")).toBeInTheDocument();

    // Links
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Perfil")).toBeInTheDocument();
    expect(screen.getByText("Calendario")).toBeInTheDocument();
    expect(screen.getByText("Clases")).toBeInTheDocument();
  });

  test("abre y cierra el menú al hacer click en el botón", () => {
    render(
      <BrowserRouter>
        <Nav />
      </BrowserRouter>
    );

    const menuButton = screen.getByLabelText("Toggle menu");
    const navLinks = screen.getByText("Home").parentElement;

    // Inicialmente el menú no tiene clase "open"
    expect(navLinks.className).not.toContain("open");

    // Abrimos menú
    fireEvent.click(menuButton);
    expect(navLinks.className).toContain("open");

    // Cerramos menú
    fireEvent.click(menuButton);
    expect(navLinks.className).not.toContain("open");
  });

  test("cierra el menú al hacer click en un link", () => {
    render(
      <BrowserRouter>
        <Nav />
      </BrowserRouter>
    );

    const menuButton = screen.getByLabelText("Toggle menu");
    const navLinks = screen.getByText("Home").parentElement;

    // Abrimos menú
    fireEvent.click(menuButton);
    expect(navLinks.className).toContain("open");

    // Click en un link
    fireEvent.click(screen.getByText("Perfil"));
    expect(navLinks.className).not.toContain("open");
  });
});
