import React from "react";
import { Link } from "react-router-dom";

const ClassesCard = ({ id_class, subject, schedule, level }) => {
  return (
    <div className="allClassesCard">
      <h3>{subject}</h3>
      <p>Horario: {schedule}</p>
      <p>Nivel: {level}</p>
      <Link to={`/class/detail/${id_class}`}>
        <button>Detalles</button>
      </Link>
    </div>
  );
};

export default ClassesCard;
