import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Notyf } from "notyf";
import { Calendar, Views } from "react-big-calendar";
import "notyf/notyf.min.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { localizer } from "../../../calendar/localizer";
import { getAllClasses, createClass } from "../../../services/classes.service";

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
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showForm, setShowForm] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [currentView, setCurrentView] = useState(Views.MONTH);

  const [formData, setFormData] = useState({
    subjectName: "",
    materials: [],
    level: "",
    schedule: "",
    format: "",
  });

  const notyf = new Notyf({
    duration: 3000,
    position: { x: "center", y: "top" },
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, []);

  useEffect(() => {
    async function loadEvents() {
      try {
        const data = await getAllClasses();
        const formatted = data.map((ev) => ({
          id: ev.id_class,
          title: ev.subject,
          start: new Date(ev.schedule),
          end: new Date(ev.schedule),
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
      notyf.error("Solo puedes añadir clases en la vista Semana o Día");
      return;
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  const addMaterialInput = () => {
    setFormData({
      ...formData,
      materials: [...formData.materials, null],
    });
  };

  const handleFileChange = (index, file) => {
    const updated = [...formData.materials];
    updated[index] = file;
    setFormData({ ...formData, materials: updated });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const form = new FormData();
      form.append("subjectName", formData.subjectName);

      formData.materials.forEach((file) => {
        form.append("materials", file);
      });

      form.append("level", formData.level);
      form.append("schedule", formatDate(selectedSlot.start));
      form.append("format", formData.format);

      const saved = await createClass(form, token);

     setEvents((prev) => {
  const newEvents = [
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
  ];
  return [...newEvents]; 
});

      notyf.success("Clase creada correctamente");

      setShowForm(false);

      setFormData({
        subjectName: "",
        materials: [],
        level: "",
        schedule: "",
        format: "",
      });
    } catch (err) {
      console.error("Error al crear clase:", err);
    }
  }

  return (
    <section className="calendar">
      <article className="myCalendarContainer" style={{ height: "700px" }}>
        <Calendar
          localizer={localizer}
          events={events}
          selectable
          onSelectSlot={handleSelectSlot}
          onSelectEvent={(event) => {
            navigate(`/class/detail/${event.id}`);
          }}
          startAccessor="start"
          endAccessor="end"
          views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
          culture="es"
          date={currentDate}
          onNavigate={(date) => setCurrentDate(date)}
          view={currentView}
          onView={(view) => setCurrentView(view)}
          step={60}
          timeslots={1}
          showMultiDayTimes
        />
      </article>

      {showForm && (
        <div className="PopUp" onClick={() => setShowForm(false)}>
          <div
            className="formPopUp"
            onClick={(e) => e.stopPropagation()} // Sino se puede cerrar al tocar el PopUp
          >
            <h2>Crear Clase</h2>

            <form className="createFormCalendar" onSubmit={handleSubmit}>
              <label>
                Materia:
                <select
                  className="calendarInput"
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

              <label>Materiales:</label>

              {formData.materials.map((mat, index) => (
                <input
                  className="calendarInput"
                  key={index}
                  type="file"
                  accept=".jpeg,.jpg,.png,.mp4,.mov,.mp3,.wav,.mkv,.avi,.pdf"
                  onChange={(e) => handleFileChange(index, e.target.files[0])}
                />
              ))}

              <button className="addMaterialCalendar" type="button" onClick={addMaterialInput}>
                Añadir material
              </button>

              <label>Nivel:</label>
              <select
                className="calendarInput"
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

              <label>Formato:</label>
              <select
              className="calendarInput"
                name="format"
                value={formData.format}
                onChange={handleChange}
                required
              >
                <option value="">Selecciona un formato</option>
                <option value="Online">Online</option>
                <option value="Presencial">Presencial</option>
              </select>

              <label>
                Fecha y Hora:
                <input
                className="calendarInput"
                  type="datetime-local"
                  value={
                    selectedSlot
                      ? new Date(selectedSlot.start).toISOString().slice(0, 16)
                      : ""
                  }
                  disabled
                />
              </label>

              <div className="createClassCalendarButton">
                <button className="saveCreateCalendar" type="submit">Guardar</button>
                <button className="cancelCreateCalendar" type="button" onClick={() => setShowForm(false)}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
