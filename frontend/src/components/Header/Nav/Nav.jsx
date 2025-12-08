// Nav.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi"; // iconos de hamburguesa y X
import "./Nav.css";
import logo from "../../../assets/logotipo.png";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header>
      <nav>
        <button
          className="menuButton"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <FiX size={30} className="X-icon"/> : <FiMenu size={30} />}
        </button>

        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>

        <div className={`navLink ${isOpen ? "open" : ""}`}>
          <Link to="/dashboardteacher" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/profile" onClick={() => setIsOpen(false)}>Perfil</Link>
          <Link to="/calendar" onClick={() => setIsOpen(false)}>Calendario</Link>
          <Link to="/classes" onClick={() => setIsOpen(false)}>Clases</Link>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
