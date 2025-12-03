import React, { useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import { useNavigate } from "react-router-dom";
import { logIn } from "../../../../services/users.service";

const FormLogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await logIn(email, password);
      navigate("/dashboardteacher");
    } catch (error) {
      alert(error.message || "Error al iniciar sesión");
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
    <section>
      <form className="formLogin" onSubmit={handleSubmit}>
        <h2>Iniciar sesión</h2>
          <label>Email</label>
          <input
            type="email"
            name="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        <button type="submit">Entrar</button>
      </form>
    </section>
  );
};

export default FormLogIn;
