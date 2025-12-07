import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import { FaArrowLeft } from "react-icons/fa";
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
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterSubject, setFilterSubject] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, []);

  useEffect(() => {
    const fetchClasses = async () => {
      const data = await getAllClasses();
      await new Promise((resolve) => setTimeout(resolve, 1500)); //Espera falsa para poder poner el spinner
      setClasses(data);
      setLoading(false);
    };
    fetchClasses();
  }, []);

  if (loading) {
    return (
      <div className="beatLoader"
      >
        <BeatLoader color="#ed5fa4ff" size={15} margin={2} loading={true} />
      </div>
    );
  }
  //Para filtrar las clases por asignatura
  const filteredClasses = filterSubject
    ? classes.filter((cls) => cls.subject === filterSubject)
    : classes;

  return (
    <section className="allClasses">
      <button className="backButton" onClick={() => navigate(-1)}>
        <FaArrowLeft />
        Volver
      </button>
      <h1>Todas tus clases</h1>
      <label>
        Filtrar por materia:
        <select
          className="filterSelect"
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
      <div className="cardsGrid">
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
  </div>
    </section>
  );
};

export default ClassesList;
