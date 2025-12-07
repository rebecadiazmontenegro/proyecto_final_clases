import React, { useState, useContext } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import { useNavigate } from "react-router-dom";
import { logIn } from "../../../../services/users.service";
import { UserContext } from "../../../../context/UserContext";

import loginPerson from "../../../../assets/login_person.png";
import { FaGoogle } from "react-icons/fa";

import { Notyf } from "notyf";
import "notyf/notyf.min.css";

const FormLogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();
  const notyf = new Notyf({ duration: 3000, position: { x: "center", y: "top" } });

  const handleGoogleLogin = () => {
    window.location.href = import.meta.env.VITE_GOOGLE_LOGIN_URL;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await logIn(email, password);
      navigate("/dashboardteacher");
      setUser(response.user);
    } catch (error) {
      notyf.error(error.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}
      >
        <BeatLoader color="#4caf50" size={15} margin={2} loading={true} />
      </div>
    );
  }

  return (
    <section className="logIn">
      <img className="loginPerson" src={loginPerson} alt="Home Person" />
      <form className="formLogin" onSubmit={handleSubmit}>
        <h1>Iniciar sesión</h1>
        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Introduce tu correo"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Contraseña</label>
        <input
          type="password"
          name="password"
          placeholder="Introduce tu contraseña"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="loginButtons">
        <button className="acceptButton" type="submit">Aceptar</button>
        <button className="googleButton" onClick={handleGoogleLogin}>
          <FaGoogle size={20} />
          Iniciar sesión con Google
        </button>
        </div>
      </form>
    </section>
  );
};

export default FormLogIn;
