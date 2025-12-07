import React, { useState, useEffect, useContext } from "react";

import { Link, useNavigate } from "react-router-dom";
import { createClass } from "../../../services/classes.service";
import { logout } from "../../../services/users.service";
import { UserContext } from "../../../context/UserContext";

import dashboardPerson from "../../../assets/dashboard_person.png";

import { FaUser, FaPlus, FaSignOutAlt, FaSave, FaTimes } from "react-icons/fa";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

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

const DashboardTeacher = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    subjectName: "",
    materials: [],
    level: "",
    schedule: "",
    format: "",
  });
  const { user } = useContext(UserContext);
  const notyf = new Notyf({
    duration: 3000,
    position: { x: "center", y: "top" },
  });

  //Pasa las cookies que guarda el google auth al local storage
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

  const addMaterialInput = () => {
    setFormData({
      ...formData,
      materials: [...formData.materials, null],
    });
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      alert(error.message || "Error al cerrar sesión");
    }
  };
  const handleFileChange = (index, file) => {
    const updated = [...formData.materials];
    updated[index] = file;
    setFormData({ ...formData, materials: updated });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedSchedule = formatDate(new Date(formData.schedule));

      const form = new FormData();
      form.append("subjectName", formData.subjectName);
      formData.materials.forEach((file) => {
        form.append("materials", file);
      });
      form.append("level", formData.level);
      form.append("schedule", formattedSchedule);
      form.append("format", formData.format);
      const token =
        new URLSearchParams(window.location.search).get("token") ||
        localStorage.getItem("token");
      await createClass(form, token);
      notyf.success("Clase creada correctamente");
      setShowForm(false);
      setFormData({
        subjectName: "",
        materials: "",
        level: "",
        schedule: "",
        format: "",
      });
      navigate("/calendar");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <section className="dashboardTeacher">
      <article className="dashboardContent">
        <img
          className="dashboardPerson"
          src={dashboardPerson}
          alt="Dashboard Person"
        />
        <h1>¡ Bienvenid@ {user ? `, ${user.name}` : ""} ! Este es tu tablón</h1>
        <Link to="/profile">
          <button className="showProfileButton">
            <FaUser className="btnIcon" />
            Ver mi perfil
          </button>
        </Link>
        <button className="createClassButton" onClick={() => setShowForm(true)}>
          <FaPlus className="btnIcon" />
          Crear clase
        </button>
        <button className="logOutButton" onClick={handleLogout}>
          <FaSignOutAlt className="btnIcon" />
          Cerrar sesión
        </button>
      </article>

      {showForm && (
        <article className="createClassDashboard">
          <h2>¡Crea una nueva clase!</h2>
          <form className="createClassDashboardForm" onSubmit={handleSubmit}>
            <label>
              Materia:
              <select
                name="subjectName"
                className="selectSubjectDashboard"
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
            <label>Materiales complementario:</label>
            {formData.materials.map((mat, index) => (
              <input
                key={index}
                type="file"
                accept=".jpeg,.jpg,.png,.mp4,.mov,.mp3,.wav,.mkv,.avi,.pdf"
                onChange={(e) => handleFileChange(index, e.target.files[0])}
              />
            ))}

            <button
              className="addMaterialButton"
              type="button"
              onClick={addMaterialInput}
            >
              <FaPlus className="btnIcon" />
              Añadir material
            </button>

            <label>Nivel:</label>
            <select
              name="level"
              className="levelInputDashBoard"
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
                className="dateInputDashboard"
                value={formData.schedule}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    schedule: e.target.value,
                  })
                }
                required
              />
            </label>
            <label>Formato:</label>
            <select
              name="format"
              className="formatSelectDashboard"
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
              <button className="saveCreateButton" type="saveCreateButton">
                <FaSave className="btnIcon" />
                Guardar
              </button>
              <button
                className="cancelCreateButtom"
                type="cancelCreateButtom"
                onClick={() => setShowForm(false)}
              >
                <FaTimes className="btnIcon" />
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
