import React from "react";

const WeekClassesCard = ({ subject, schedule }) => {
  return (
    <article className="latesClassCard">
      <h3>{subject}</h3>
      <p><strong>Horario: </strong>{schedule}</p>
    </article>
  );
};

export default WeekClassesCard;
