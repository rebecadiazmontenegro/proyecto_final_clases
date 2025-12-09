import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import WeekClasses from "./WeekClasses";
import WeekClassesCard from "./WeekClassesCard/WeekClassesCard";
import * as classesService from "../../../../services/classes.service";

// Comprueba que renderiza las últimas clases
// Verrifica que:
    // Cuando hay clases, se renderizan todas.
    // Cuando no hay clases, se muestra el mensaje correspondiente.

vi.mock("./WeekClassesCard/WeekClassesCard", () => ({
  default: ({ subject, schedule }) => (
    <div data-testid="week-class-card">
      {subject} - {schedule}
    </div>
  ),
}));

describe("WeekClasses component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("muestra las clases cuando getLatestClasses devuelve datos", async () => {
    const mockClasses = [
      { subject: "Matemáticas", schedule: "Lunes 10:00" },
      { subject: "Historia", schedule: "Martes 12:00" },
    ];

    vi.spyOn(classesService, "getLatestClasses").mockResolvedValue(mockClasses);

    render(<WeekClasses />);

    // Esperamos a que las tarjetas se rendericen
    await waitFor(() => {
      expect(screen.getAllByTestId("week-class-card")).toHaveLength(mockClasses.length);
    });

    expect(screen.getByText(/Matemáticas - Lunes 10:00/)).toBeTruthy();
    expect(screen.getByText(/Historia - Martes 12:00/)).toBeTruthy();
  });

  it("muestra mensaje cuando no hay clases", async () => {
    vi.spyOn(classesService, "getLatestClasses").mockResolvedValue([]);

    render(<WeekClasses />);

    await waitFor(() => {
      expect(screen.getByText("No hay clases disponibles")).toBeTruthy();
    });
  });
});
