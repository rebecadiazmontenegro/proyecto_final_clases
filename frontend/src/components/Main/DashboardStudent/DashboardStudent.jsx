import React from "react";
import { Link } from "react-router-dom";

const DashboardStudent = () => {
  return (
    <section>
      <Link to="/favorite/classes">
        <button className="showProfileButton">Clases favoritas</button>
      </Link>
      <Link to="/all/classes">
        <button className="showClassesButton">Ver todas las clases</button>
      </Link>
    </section>
  );
};

export default DashboardStudent;
