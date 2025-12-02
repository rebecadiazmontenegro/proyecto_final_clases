import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const FormLogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        //GUARDAR TODO PARA LUEGO PODER VER PERFIL
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user)); 

        navigate("/dashboardteacher"); // redirigimos
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error en login:", error);
      alert("Error al iniciar sesión");
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
