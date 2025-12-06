import React from "react";
import { useNavigate } from "react-router-dom";

const InforUser = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    // Si no hay usuario logeado, redirige al login
    navigate("/login");
    return null; // no renderiza nada
  }

  return (
    <section className="userInfo">
      <p><strong>Nombre:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Rol:</strong> {user.role}</p>
    </section>
  );
};

export default InforUser;
