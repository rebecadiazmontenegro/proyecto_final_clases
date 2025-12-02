import React from "react";
import { Link } from "react-router-dom";

const DashboardTeacher = () => {
  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:3000/user/logout", {
        method: "GET",
        credentials: "include", // para las cookies
      });

      if (res.ok) {
        // Borrar token guardado en localstorage
        localStorage.removeItem("token");
        window.location.href = "/login";
      } else {
        console.error("Error al cerrar sesión");
      }
    } catch (error) {
      console.error("Error en logout:", error);
    }
  };

  return (
    <section>
      <h1>DashboardTeacher</h1>
        <Link to="/profile">
          <button>Ver mi perfil</button>
        </Link>
      <button>Crear clase</button>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </section>
  );
};

export default DashboardTeacher;
