import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Notyf } from "notyf";
import BeatLoader from "react-spinners/BeatLoader";
import {
  FaEdit,
  FaTrash,
  FaArrowLeft,
  FaFileAlt,
  FaUser,
  FaTimes,
  FaPlus,
  FaSave,
} from "react-icons/fa";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "notyf/notyf.min.css";
import {
  getClassDetail,
  deleteClass,
  editClass,
} from "../../../services/classes.service";

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
  });
  const [existingMaterials, setExistingMaterials] = useState([]);
  const [newMaterials, setNewMaterials] = useState([]);
  const MySwal = withReactContent(Swal);
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
        });
        setExistingMaterials(data.materials || []);
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
    const result = await MySwal.fire({
      title: "¿Estás seguro?",
      text: "No podras recuperar esta clase",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#aaa",
      cancelButtonColor: "#d85e99ff",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await deleteClass(id);
        notyf.success("Clase eliminada correctamente");
        navigate("/classes");
      } catch (err) {
        notyf.error(err.message || "Error al eliminar clase");
      }
    }
  };

  const handleFileChange = (index, file) => {
    const updated = [...newMaterials];
    updated[index] = file;
    setNewMaterials(updated);
  };

  const addMaterialInput = () => {
    setNewMaterials([...newMaterials, null]);
  };

  const handleRemoveExistingMaterial = (index) => {
    const updated = [...existingMaterials];
    updated.splice(index, 1);
    setExistingMaterials(updated);
  };

  const handleRemoveNewMaterial = (index) => {
    const updated = [...newMaterials];
    updated.splice(index, 1);
    setNewMaterials(updated);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append("subject_name", formData.subject_name);
      form.append("level", formData.level);
      form.append("schedule", formData.schedule);
      form.append("format", formData.format);

      newMaterials.forEach((file) => {
        if (file) form.append("materials", file);
      });

      form.append("oldMaterials", JSON.stringify(existingMaterials));

      await editClass(id, form);
      notyf.success("Clase actualizada correctamente");

      const updatedData = await getClassDetail(id);
      setClassDetail(updatedData);
      setFormData({
        subject_name: updatedData.subject_name,
        schedule: updatedData.schedule,
        level: updatedData.level,
        format: updatedData.format,
      });
      setExistingMaterials(updatedData.materials || []);
      setNewMaterials([]);
      setIsEditing(false);
    } catch (err) {
      console.error("Error al editar", err);
      notyf.error(err.message || "Error al editar clase");
    }
  };

  if (loading) {
    return (
      <div className="beatLoader">
        <BeatLoader color="#ed5fa4ff" size={15} margin={2} loading={true} />
      </div>
    );
  }

  if (!classDetail) return <p>No se encontró la clase.</p>;

  return (
    <section className="classDatail">
      <button className="backButton" onClick={() => navigate(-1)}>
        <FaArrowLeft /> Volver
      </button>
      <h1>Todos los detalles</h1>

      {!isEditing ? (
        <article className="classDetailInfo">
          <h2>{classDetail.subject_name}</h2>
          <aside>
            <h3>Información de la clase</h3>
            <p>
              <strong>Horario:</strong> {classDetail.schedule}
            </p>
            <p>
              <strong>Nivel:</strong> {classDetail.level}
            </p>
            <p>
              <strong>Formato:</strong> {classDetail.format}
            </p>
          </aside>
          <aside>
            <h3>
              <FaFileAlt /> Materiales
            </h3>
            {existingMaterials.length > 0 ? (
              <ul>
                {existingMaterials.map((url, idx) => (
                  <li key={idx}>
                    <a
                      className="linkMaterial"
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Material {idx + 1}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No hay materiales disponibles</p>
            )}
          </aside>
          <aside>
            <h3>
              <FaUser /> Profesor
            </h3>
            <p>
              <strong>Nombre:</strong> {classDetail.teacher_name}
            </p>
            <p>
              <strong>Correo:</strong> {classDetail.teacher_email}
            </p>
          </aside>
          <div className="ClassesDetailsButtons">
            <button className="editButton" onClick={() => setIsEditing(true)}>
              <FaEdit /> Editar
            </button>
            <button className="deleteButton" onClick={handleDelete}>
              <FaTrash /> Eliminar
            </button>
          </div>
        </article>
      ) : (
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
            {subjects.map((subj, idx) => (
              <option key={idx} value={subj}>
                {subj}
              </option>
            ))}
          </select>

          <label>Horario:</label>
          <input
            className="dateEdit"
            type="datetime-local"
            name="schedule"
            value={formData.schedule}
            onChange={(e) =>
              setFormData({ ...formData, schedule: e.target.value })
            }
            required
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
          <article>
            <label className="labelMaterial">Materiales existentes:</label>
            {existingMaterials.length > 0 ? (
              <ul>
                {existingMaterials.map((url, idx) => (
                  <li key={idx}>
                    <a href={url} target="_blank" rel="noopener noreferrer">
                      Material {idx + 1}
                    </a>
                    <button
                      className="deleteMaterialButton"
                      type="button"
                      onClick={() => handleRemoveExistingMaterial(idx)}
                    >
                      <FaTimes />
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No hay materiales existentes</p>
            )}
          </article>
          <article>
            <label className="labelMaterial">Materiales nuevos:</label>
            {newMaterials.map((file, idx) => (
              <aside key={idx}>
                <p>{file ? file.name : "Archivo no seleccionado"}</p>
                <div className="newMaterial">
                  <input
                    className="newMaterialInput"
                    type="file"
                    accept=".jpeg,.jpg,.png,.mp4,.mov,.mp3,.wav,.mkv,.avi,.pdf"
                    onChange={(e) => handleFileChange(idx, e.target.files[0])}
                  />
                  <button
                    className="deleteMaterialButton"
                    type="button"
                    onClick={() => handleRemoveNewMaterial(idx)}
                  >
                    <FaTimes />
                  </button>
                </div>
              </aside>
            ))}
            <button
              className="addNewMaterialEdit"
              type="button"
              onClick={addMaterialInput}
            >
              <FaPlus /> Añadir material
            </button>
          </article>
          <div className="editButtons">
            <button className="saveEditButton" type="submit">
              <FaSave /> Guardar
            </button>
            <button
              className="cancelarEditButton"
              type="button"
              onClick={() => setIsEditing(false)}
            >
              <FaTimes /> Cancelar
            </button>
          </div>
        </form>
      )}
    </section>
  );
};

export default ClassesDetail;
