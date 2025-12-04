import React, { useState, useEffect } from "react";
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

  // Pasa las cookies que guarda el google auth al local storage 
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      navigate("/dashboardteacher", { replace: true });
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      alert(error.message || "Error al cerrar sesión");
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
      <h1>Tu tablón</h1>
      <Link to="/profile">
        <button className="showProfileButton">Ver mi perfil</button>
      </Link>
      <button className="createClassButton" onClick={() => setShowForm(true)}>
        Crear clase
      </button>
      <button className="logOutButton" onClick={handleLogout}>
        Cerrar sesión
      </button>

      {showForm && (
        <article className="createClassDashboard">
          <h2>¡Crea una nueva clase!</h2>
          <form createClass="createClassForm" onSubmit={handleSubmit}>
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
            <label>
              Fecha y Hora:
              <input
                type="datetime-local"
                name="schedule"
                value={formData.schedule}
                onChange={handleChange}
                required
              />
            </label>
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
            <div className="createFormButtons">
              <button type="saveCreateButton">Guardar</button>
              <button
                type="cancelCreateButtom"
                onClick={() => setShowForm(false)}
              >
                Cancelar
              </button>
            </div>
          </form>
        </article>
      )}
    </section>
  );
};

export default DashboardTeacher;
