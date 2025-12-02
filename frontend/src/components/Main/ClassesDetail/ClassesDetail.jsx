import React, { useEffect, useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import { useParams } from "react-router-dom";

const ClassesDetail = () => {
  const { id } = useParams();
  const [classDetail, setClassDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const token = localStorage.getItem("token");

        await new Promise((resolve) => setTimeout(resolve, 1500));

        const response = await fetch(
          `http://localhost:3000/classes/detail/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setClassDetail(data);
      } catch (err) {
        console.error("Error al obtener detalle", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  if (loading) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}
      >
        <BeatLoader
          color="#4caf50" 
          size={15} 
          margin={2}
          loading={true} 
        />
      </div>
    );
  }
  if (!classDetail) return <p>No se encontró la clase.</p>;

  return (
    <div>
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
      <p>
        <strong>Materiales:</strong> {classDetail.materials}
      </p>

      <h3>Profesor</h3>
      <p>{classDetail.teacher_name}</p>
      <p>{classDetail.teacher_email}</p>
    </div>
  );
};

export default ClassesDetail;
