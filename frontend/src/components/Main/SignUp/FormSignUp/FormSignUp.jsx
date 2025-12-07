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
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const renderErrors = (field) => {
    if (!errors[field]) return null;
    return (
      <p className="error">
        {errors[field].split("\n").map((msg, i) => (
          <span key={i}>
            {msg}
            <br />
          </span>
        ))}
      </p>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await signUp(formData);
      alert("Usuario creado correctamente: " + data.message);
      navigate("/login");
    } catch (error) {
      //Para poder enseñar el error debajo del input y no en un alert
      console.log(error);
      const newErrors = {};

      if (error.errors && Array.isArray(error.errors)) {
        error.errors.forEach((err) => {
          if (newErrors[err.path]) {
            newErrors[err.path] += `\n${err.msg}`;
          } else {
            newErrors[err.path] = err.msg;
          }
        });
      } else if (error.message) {
        newErrors.general = error.message;
      } else {
        newErrors.general = "Error en el servidor";
      }

      setErrors(newErrors);
    }
  };

  return (
    <section className="signUp">
      <img className="signUpPerson" src={signupPerson} alt="Home Person" />
      <form className="formRegister" onSubmit={handleSubmit}>
        <h1>Crea tu cuenta</h1>
        <article className="infoSignUp">
        <label>Nombre</label>
        <input
          type="text"
          name="name"
          placeholder="Introduce tu nombre"
          value={formData.name}
          onChange={handleChange}
          required
        />
        {renderErrors("name")}

        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Introduce tu correo"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {renderErrors("email")}
        </article>
        <div className="infoSignUp">
        <label>Contraseña</label>
        <input
          type="password"
          name="password"
          placeholder="Introduce una contraseña"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {renderErrors("password")}

        <label>Rol</label>
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="alumno">Alumno</option>
          <option value="profesor">Profesor</option>
        </select>
        {renderErrors("role")}

        {errors.general && <p className="error">{errors.general}</p>}
        </div>
        <button className="signUpButton" type="submit">Registrarse</button>
      </form>
    </section>
  );
};

export default FormSignUp;
