import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaUserShield } from "react-icons/fa";

const InforUser = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    // Si no hay usuario logeado, redirige al login
    navigate("/login");
    return null;
  }

  return (
    <section className="userInfo">
      <article className="infoUserCard">
        <p>
          <FaUser />
          <strong>Nombre:</strong> {user.name}
        </p>
        <p>
          <FaEnvelope />
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <FaUserShield />
          <strong>Rol:</strong> {user.role}
        </p>
      </article>
    </section>
  );
};

export default InforUser;
