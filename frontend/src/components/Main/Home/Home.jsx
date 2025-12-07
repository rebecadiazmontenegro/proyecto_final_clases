import React from "react";
import { Link } from "react-router-dom";
import homePerson from "../../../assets/home_person.png";

const Home = () => {
  return (
    <section className="Home">
      <img className="homePerson" src={homePerson} alt="Home Person" />
      <article className="infoHome">
      <h1>¡Bienvenid@!</h1>
      <p>Organiza tus clases de manera sencilla y efectiva. Crea, edita y gestiona tus sesiones en segundos, visualízalas en un calendario intuitivo y dedica más tiempo a inspirar y enseñar a tus alumnos.</p>
      </article>
      <article className="homeButtons">
        <Link to="/login">
          <button className="logInButton">Log In</button>
        </Link>
        <Link to="/signup">
          <button className="signUpButton">Sign Up</button>
        </Link>
      </article>
    </section>
  );
};

export default Home;