import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../../../services/users.service";

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
    <form className="formRegister" onSubmit={handleSubmit}>
      <h2>Registro</h2>

      <div>
        <label>Nombre</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Contraseña</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Rol</label>
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="alumno">Alumno</option>
          <option value="profesor">Profesor</option>
        </select>
      </div>

      <button type="submit">Registrarse</button>
    </form>
  );
};

export default FormSignUp;
