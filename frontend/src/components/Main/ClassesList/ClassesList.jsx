import React, { useEffect, useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import ClassesCard from "./ClassesCard/ClassesCard";
import { getAllClasses } from "../../../services/classes.service";

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

const ClassesList = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterSubject, setFilterSubject] = useState(""); //Estado para el filtro de materias

  useEffect(() => {
    const fetchClasses = async () => {
      const data = await getAllClasses();
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setClasses(data);
      setLoading(false);
    };

    fetchClasses();
  }, []);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
        <BeatLoader color="#4caf50" size={15} margin={2} loading={true} />
      </div>
    );
  }

  // Filtrar las clases según el subject
  const filteredClasses = filterSubject
    ? classes.filter((cls) => cls.subject === filterSubject)
    : classes;

  return (
    <section>
      <label>
        Filtrar por materia:
        <select
          value={filterSubject}
          onChange={(e) => setFilterSubject(e.target.value)}
        >
          <option value="">Todas</option>
          {subjects.map((subj, idx) => (
            <option key={idx} value={subj}>
              {subj}
            </option>
          ))}
        </select>
      </label>

      {filteredClasses.length > 0 ? (
        filteredClasses.map((cls, index) => (
          <ClassesCard
            key={index}
            id_class={cls.id_class}
            subject={cls.subject}
            schedule={cls.schedule}
            level={cls.level}
          />
        ))
      ) : (
        <p>No hay clases disponibles</p>
      )}
    </section>
  );
};

export default ClassesList;
