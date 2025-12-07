import React from "react";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";

const ClassesCard = ({ id_class, subject, schedule, level }) => {
  return (
    <div className="allClassesCard">
      <h3>{subject}</h3>
      <p><strong>Horario: </strong>{schedule}</p>
      <p><strong>Nivel: </strong>{level}</p>
      <Link to={`/class/detail/${id_class}`}>
        <button className="detailsButton">
          <FaEye />
          Detalles
          </button>
      </Link>
    </div>
  );
};

export default ClassesCard;
