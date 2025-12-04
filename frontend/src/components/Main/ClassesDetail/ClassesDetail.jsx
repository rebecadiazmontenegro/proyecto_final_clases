import React, { useEffect, useState } from "react";

import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import BeatLoader from "react-spinners/BeatLoader";

import { useParams, useNavigate } from "react-router-dom";

import {
  getClassDetail,
  deleteClass,
  editClass,
} from "../../../services/classes.service";

const ClassesDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [classDetail, setClassDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    subject_name: "",
    schedule: "",
    level: "",
    format: "",
    materials: "",
  });

  const notyf = new Notyf({
    duration: 3000,
    position: { x: "center", y: "top" },
  });

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        const data = await getClassDetail(id);
        setClassDetail(data);
        setFormData({
          subject_name: data.subject_name,
          schedule: data.schedule,
          level: data.level,
          format: data.format,
          materials: data.materials,
        });
      } catch (err) {
        console.error("Error al obtener detalle", err);
        notyf.error("Error al obtener detalle de la clase");
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("¿Seguro que quieres eliminar esta clase?")) return;

    try {
      await deleteClass(id);
      notyf.success("Clase eliminada correctamente");
      navigate("/classes");
    } catch (err) {
      console.error("Error al eliminar", err);
      notyf.error(err.message || "Error al eliminar clase");
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await editClass(id, formData);
      notyf.success("Clase actualizada correctamente");
      setClassDetail({ ...classDetail, ...formData });
      setIsEditing(false);
    } catch (err) {
      console.error("Error al editar", err);
      notyf.error(err.message || "Error al editar clase");
    }
  };

  if (loading) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}
      >
        <BeatLoader color="#4caf50" size={15} margin={2} loading={true} />
      </div>
    );
  }

  if (!classDetail) return <p>No se encontró la clase.</p>;

  return (
    <section className="classDatail">
      <button className="backButton" onClick={() => navigate(-1)}>
        Volver
      </button>
      <h1>Toda la información sobre tu clase</h1>
      {!isEditing ? (
        <article className="classDetailInfo">
          <h2>{classDetail.subject_name}</h2>
          <p>
            <strong>Horario:</strong> {classDetail.schedule}
          </p>
          <p>
            <strong>Nivel:</strong> {classDetail.level}
          </p>
          <p>
            <strong>Formato:</strong> {classDetail.format}
          </p>
          <h3>Materiales</h3>
          <ul>
            {classDetail.materials.map((url, idx) => (
              <li key={idx}>
                <a href={url} target="_blank">
                  Material {idx + 1}
                </a>
              </li>
            ))}
          </ul>

          <h3>Profesor</h3>
          <p>{classDetail.teacher_name}</p>
          <p>{classDetail.teacher_email}</p>

          <div>
            <button onClick={() => setIsEditing(true)}>Editar</button>
            <button onClick={handleDelete}>Eliminar</button>
          </div>
        </article>
      ) : (
        // Formulario para editar empieza aqui
        <form className="editForm" onSubmit={handleEditSubmit}>
          <h2>Editar clase</h2>
          <label>Asignatura:</label>
          <select
            name="subject_name"
            value={formData.subject_name}
            onChange={(e) =>
              setFormData({ ...formData, subject_name: e.target.value })
            }
            required
          >
            <option value="Historia del Arte">Historia del Arte</option>
            <option value="Matemáticas">Matemáticas</option>
            <option value="Lengua Castellana y Literatura">
              Lengua Castellana y Literatura
            </option>
            <option value="Inglés">Inglés</option>
            <option value="Ciencias Sociales, Geografía e Historia">
              Ciencias Sociales, Geografía e Historia
            </option>
            <option value="Biología y Geología">Biología y Geología</option>
            <option value="Física y Química">Física y Química</option>
            <option value="Educación Física">Educación Física</option>
            <option value="Tecnología">Tecnología</option>
            <option value="Educación Plástica y Visual">
              Educación Plástica y Visual
            </option>
            <option value="Música">Música</option>
            <option value="Filosofía">Filosofía</option>
            <option value="Segunda Lengua Extranjera">
              Segunda Lengua Extranjera
            </option>
            <option value="Matemáticas CCSS">Matemáticas CCSS</option>
            <option value="Matemáticas CCNN">Matemáticas CCNN</option>
            <option value="Física">Física</option>
            <option value="Química">Química</option>
            <option value="Biología">Biología</option>
            <option value="Geología">Geología</option>
            <option value="Tecnología Industrial">Tecnología Industrial</option>
            <option value="Dibujo Técnico">Dibujo Técnico</option>
            <option value="Historia del Mundo Contemporáneo">
              Historia del Mundo Contemporáneo
            </option>
            <option value="Economía">Economía</option>
            <option value="Geografía">Geografía</option>
            <option value="Literatura Universal">Literatura Universal</option>
            <option value="Diseño">Diseño</option>
            <option value="Cultura Audiovisual">Cultura Audiovisual</option>
            <option value="Dibujo Artístico">Dibujo Artístico</option>
          </select>
          <label>Horario:</label>
          <input
            type="text"
            placeholder="dd/mm/yy hh/mm"
            value={formData.schedule}
            onChange={(e) =>
              setFormData({ ...formData, schedule: e.target.value })
            }
          />
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
          <label>Materiales:</label>
          <input
            type="text"
            value={formData.materials}
            onChange={(e) =>
              setFormData({ ...formData, materials: e.target.value })
            }
          />
          <div>
            <button type="saveEdit">Guardar</button>
            <button type="cancelEdit" onClick={() => setIsEditing(false)}>
              Cancelar
            </button>
          </div>
        </form>
      )}
    </section>
  );
};

export default ClassesDetail;
