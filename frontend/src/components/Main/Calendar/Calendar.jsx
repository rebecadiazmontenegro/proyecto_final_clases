import React, { useState, useEffect } from "react";
import { Calendar, Views } from "react-big-calendar";
import { localizer } from "../../../calendar/localizer";
import "react-big-calendar/lib/css/react-big-calendar.css";

const API_URL = "http://localhost:3000/classes";

const subjects = [
  "Historia del Arte",
  "Matemáticas",
  "Lengua Castellana y Literatura",
  "Inglés",
  "Ciencias Sociales, Geografía e Historia",
  "Biología y Geología",
  "Física y Química",
  "Educación Física",
  "Tecnología",
  "Educación Plástica y Visual",
  "Música",
  "Filosofía",
  "Segunda Lengua Extranjera",
  "Matemáticas CCSS",
  "Matemáticas CCNN",
  "Física",
  "Química",
  "Biología",
  "Geología",
  "Tecnología Industrial",
  "Dibujo Técnico",
  "Historia del Mundo Contemporáneo",
  "Economía",
  "Geografía",
  "Literatura Universal",
  "Diseño",
  "Cultura Audiovisual",
  "Dibujo Artístico",
];

function formatDate(date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  const seconds = String(d.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export default function MyCalendar() {
  const [events, setEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showForm, setShowForm] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [currentView, setCurrentView] = useState(Views.MONTH);

  const [formData, setFormData] = useState({
    subjectName: "",
    materials: "",
    level: "",
    schedule: "",
    format: "",
  });

  useEffect(() => {
    async function loadEvents() {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await fetch(`${API_URL}/all`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("No se pudieron cargar las clases");

        const data = await res.json();
        const formatted = data.map((ev) => ({
          id: ev.id_class,
          title: ev.subject,
          start: new Date(ev.schedule),
          end: new Date(ev.schedule), // si no tienes hora final, puedes ajustar
          materials: ev.materials,
          level: ev.level,
          schedule: ev.schedule,
          format: ev.format,
        }));

        setEvents(formatted);
      } catch (err) {
        console.error("Error al cargar clases:", err);
      }
    }

    loadEvents();
  }, []);

  function handleSelectSlot({ start, end }) {
    if (currentView === Views.WEEK || currentView === Views.DAY) {
      setSelectedSlot({ start, end });
      setShowForm(true);
    }
    if (!(currentView === Views.WEEK || currentView === Views.DAY)) {
      alert("Solo puedes añadir clases en la vista Semana o Día");
      return;
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const newClass = {
        subjectName: formData.subjectName,
        materials: formData.materials,
        level: formData.level,
        schedule: formatDate(selectedSlot.start),
        format: formData.format,
      };

      const res = await fetch(`${API_URL}/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newClass),
      });

      if (!res.ok) throw new Error("No se pudo crear la clase");

      const saved = await res.json();

      // Añadir al estado para que aparezca en el calendario
      setEvents((prev) => [
        ...prev,
        {
          id: saved.class.id_class,
          title: saved.class.subjectName,
          start: new Date(saved.class.schedule),
          end: new Date(saved.class.schedule),
          materials: saved.class.materials,
          level: saved.class.level,
          schedule: saved.class.schedule,
          format: saved.class.format,
        },
      ]);

      // Limpiar formulario
      setShowForm(false);
      setFormData({
        subjectName: "",
        materials: "",
        level: "",
        schedule: "",
        format: "",
      });
    } catch (err) {
      console.error("Error al crear clase:", err);
    }
  }

  return (
    <div style={{ padding: 16 }}>
      <div style={{ height: "700px" }}>
        <Calendar
          localizer={localizer}
          events={events}
          selectable
          onSelectSlot={handleSelectSlot}
          startAccessor="start"
          endAccessor="end"
          views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
          culture="es"
          date={currentDate}
          onNavigate={(date) => setCurrentDate(date)}
          view={currentView} // <- vista controlada
          onView={(view) => setCurrentView(view)} // <- actualizar vista al cambiar
          step={60}
          timeslots={1}
          showMultiDayTimes
        />
      </div>

      {showForm && (
        <div style={{ marginTop: 20, padding: 20, border: "1px solid #ccc" }}>
          <h2>Crear Clase</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Materia:
              <select
                name="subjectName"
                value={formData.subjectName}
                onChange={handleChange}
                required
              >
                <option value="">Selecciona una materia</option>
                {subjects.map((subj, idx) => (
                  <option key={idx} value={subj}>
                    {subj}
                  </option>
                ))}
              </select>
            </label>
            <br />

            <label>
              Materiales:
              <input
                type="text"
                name="materials"
                value={formData.materials}
                onChange={handleChange}
                required
              />
            </label>
            <br />

            <label>Nivel:</label>
            <select
              name="level"
              value={formData.level}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona un nivel</option>
              <option value="Iniciación">Iniciación</option>
              <option value="Medio">Medio</option>
              <option value="Avanzado">Avanzado</option>
            </select>
            <br />

            <label>Formato:</label>
            <select
              name="format"
              value={formData.format}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona un formato</option>
              <option value="Online">Online</option>
              <option value="Presencial">Presencial</option>
            </select>
            <br />
            <label>
              Fecha y Hora:
              <input
                type="datetime-local"
                value={
                  selectedSlot
                    ? new Date(selectedSlot.start).toISOString().slice(0, 16)
                    : ""
                }
                readOnly
              />
            </label>
            <br />
            <button type="submit">Guardar</button>
            <button type="button" onClick={() => setShowForm(false)}>
              Cancelar
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
