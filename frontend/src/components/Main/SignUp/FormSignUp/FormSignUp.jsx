import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../../../services/users.service";

import signupPerson from "../../../../assets/signup_person.png";


const FormSignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "alumno",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await signUp(formData);
      alert("Usuario creado correctamente: " + data.message);
      navigate("/login");
    } catch (error) {
      alert(error.message || "Error en el servidor");
    }
  };

  return (
    <section className="signUp">
      <img className="signUpPerson" src={signupPerson} alt="Home Person" />
      <form className="formRegister" onSubmit={handleSubmit}>
        <h1>Crea tu cuenta</h1>
        <label>Nombre</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label>Contraseña</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <label>Rol</label>
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="alumno">Alumno</option>
          <option value="profesor">Profesor</option>
        </select>
        <button type="submit">Registrarse</button>
      </form>
    </section>
  );
};

export default FormSignUp;
