import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import WeekClassesCard from "./WeekClassesCard";

// Renderiza el componente con props subject y schedule.
// Comprueba que el <h3> contiene el nombre de la materia.
// Comprueba que el <p> contiene el horario correctamente.

describe("WeekClassesCard component", () => {
  it("muestra el subject y el horario correctamente", () => {
    const subject = "Matemáticas";
    const schedule = "Lunes 10:00";

    render(<WeekClassesCard subject={subject} schedule={schedule} />);

    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(subject);
    const paragraph = screen.getByText(/Horario:/).closest("p");
    expect(paragraph).toHaveTextContent(schedule);
  });
});
