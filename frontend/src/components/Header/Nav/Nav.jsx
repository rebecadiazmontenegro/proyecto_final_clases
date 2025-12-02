import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
          <Link to="/profile">Perfil</Link>
          <Link to="/calendar">Calendario</Link>
          <Link to="/classes">Clases</Link>

        </li>
      </ul>
    </nav>
  );
};

export default Nav;
