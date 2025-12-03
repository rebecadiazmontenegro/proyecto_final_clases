import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createClass } from "../../../services/classes.service";
import { logout } from "../../../services/users.service";

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

const DashboardTeacher = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    subjectName: "",
    materials: "",
    level: "",
    schedule: "",
    format: "",
  });

const handleLogout = async () => {
  try {
    await logout();
    navigate("/login");
  } catch (error) {
    alert(error.message || "No se pudo cerrar sesión");
  }
};

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await createClass(formData);
    alert("Clase creada con éxito");
    navigate("/profile");
    setShowForm(false);
    setFormData({
      subjectName: "",
      materials: "",
      level: "",
      schedule: "",
      format: "",
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
  return (
    <section>
      <h1>DashboardTeacher</h1>
      <Link to="/profile">
        <button>Ver mi perfil</button>
      </Link>
      <button onClick={() => setShowForm(true)}>Crear clase</button>
      <button onClick={handleLogout}>Cerrar sesión</button>

      {showForm && (
        <div>
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
              onChange={(e) =>
                setFormData({ ...formData, level: e.target.value })
              }
              required
            >
              <option value="">Selecciona un nivel</option>
              <option value="Iniciación">Iniciación</option>
              <option value="Medio">Medio</option>
              <option value="Avanzado">Avanzado</option>
            </select>
            <br />
            <label>
              Horario:
              <input
                type="text"
                name="schedule"
                value={formData.schedule}
                onChange={handleChange}
                required
              />
            </label>
            <br />
            <label>Formato:</label>
            <select
              name="format"
              value={formData.format}
              onChange={(e) =>
                setFormData({ ...formData, format: e.target.value })
              }
              required
            >
              <option value="">Selecciona un formato</option>
              <option value="Online">Online</option>
              <option value="Presencial">Presencial</option>
            </select>
            <br />
            <button type="submit">Guardar</button>
            <button type="button" onClick={() => setShowForm(false)}>
              Cancelar
            </button>
          </form>
        </div>
      )}
    </section>
  );
};

export default DashboardTeacher;
