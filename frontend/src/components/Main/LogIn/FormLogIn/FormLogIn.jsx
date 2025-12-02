import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const FormLogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3000/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      navigate("/dashboardteacher");
    } else {
      alert(data.message);
    }
  };

  return (
    <form className="formLogin" onSubmit={handleSubmit}>
      <h2>Iniciar sesión</h2>

      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label>Contraseña</label>
        <input
          type="password"
          name="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button type="submit">Entrar</button>
    </form>
  );
};

export default FormLogIn;
