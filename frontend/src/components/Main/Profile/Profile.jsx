import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaChalkboard, FaCalendar, FaArrowLeft } from "react-icons/fa";
import InforUser from "./InforUser/InforUser";
import WeekClasses from "./WeekClasses/WeekClasses";
import profilePerson from "../../../assets/profile_person.png";

const Profile = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, []);
  return (
    <section className="profile">
      <button className="backButton" onClick={() => navigate(-1)}>
        <FaArrowLeft />
        Volver
      </button>
      <h1>Tu perfil</h1>
      <article className="infoUserCard">
        <img className="profilePerson" src={profilePerson} alt="Home Person" />
        <InforUser />
      </article>
      <article className="weekClases">
        <h2>Tus últimas clases añadidas</h2>
        <WeekClasses />
      </article>
      <div className="profileButtons">
        <Link to="/classes">
          <button className="allClassesButton">
            <FaChalkboard />
            Todas las clases
          </button>
        </Link>
        <Link to="/calendar">
          <button className="calendarButton">
            <FaCalendar />
            Calendario
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Profile;
