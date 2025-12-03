import React, { useEffect, useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import { useParams } from "react-router-dom";

const ClassesDetail = () => {
  const { id } = useParams();
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

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const token = localStorage.getItem("token");
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const response = await fetch(
          `http://localhost:3000/classes/detail/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
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
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("¿Seguro que quieres eliminar esta clase?")) return;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:3000/classes/detail/${id}`,
        { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Error al eliminar la clase");
        return;
      }

      alert("Clase eliminada correctamente");
      window.location.href = "/classes";
    } catch (error) {
      console.error("Error al eliminar", error);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:3000/classes/detail/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Error al editar la clase");
        return;
      }

      alert("Clase actualizada correctamente");
      setClassDetail({
        ...classDetail, // Si no se pone esto los datos del rpofesor se borran cuando edito
        ...formData,   
});
      setIsEditing(false);
    } catch (error) {
      console.error("Error al editar", error);
    }
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
        <BeatLoader color="#4caf50" size={15} margin={2} loading={true} />
      </div>
    );
  }

  if (!classDetail) return <p>No se encontró la clase.</p>;

  return (
    <section>
      {!isEditing ? (
        <>
          <h2>{classDetail.subject_name}</h2>
          <p><strong>Horario:</strong> {classDetail.schedule}</p>
          <p><strong>Nivel:</strong> {classDetail.level}</p>
          <p><strong>Formato:</strong> {classDetail.format}</p>
          <p><strong>Materiales:</strong> {classDetail.materials}</p>

          <h3>Profesor</h3>
          <p>{classDetail.teacher_name}</p>
          <p>{classDetail.teacher_email}</p>

          <div>
            <button onClick={() => setIsEditing(true)}>Editar</button>
            <button onClick={handleDelete}>Eliminar</button>
          </div>
        </>
      ) : (
        // FORMULARIO DE EDICIÓN
        <form onSubmit={handleEditSubmit}>
          <h2>Editar clase</h2>

          <label>Asignatura:</label>
          <input
            type="text"
            value={formData.subject_name}
            onChange={(e) =>
              setFormData({ ...formData, subject_name: e.target.value })
            }
          />

          <label>Horario:</label>
          <input
            type="text"
            value={formData.schedule}
            onChange={(e) =>
              setFormData({ ...formData, schedule: e.target.value })
            }
          />

          <label>Nivel:</label>
          <input
            type="text"
            value={formData.level}
            onChange={(e) =>
              setFormData({ ...formData, level: e.target.value })
            }
          />

          <label>Formato:</label>
          <input
            type="text"
            value={formData.format}
            onChange={(e) =>
              setFormData({ ...formData, format: e.target.value })
            }
          />

          <label>Materiales:</label>
          <input
            type="text"
            value={formData.materials}
            onChange={(e) =>
              setFormData({ ...formData, materials: e.target.value })
            }
          />

          <button type="submit">Guardar</button>
          <button type="button" onClick={() => setIsEditing(false)}>
            Cancelar
          </button>
        </form>
      )}
    </section>
  );
};

export default ClassesDetail;
