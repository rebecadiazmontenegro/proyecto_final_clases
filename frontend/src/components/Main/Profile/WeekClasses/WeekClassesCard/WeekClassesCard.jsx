import React from "react";

const WeekClassesCard = ({ subject, schedule }) => {
  return (
    <div className="week-class-card">
      <h3>{subject}</h3>
      <p>{schedule}</p>
    </div>
  );
};

export default WeekClassesCard;
