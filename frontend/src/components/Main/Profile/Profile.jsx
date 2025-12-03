import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import InforUser from "./InforUser/InforUser"
import WeekClasses from './WeekClasses/WeekClasses'


const Profile = () => {
   const navigate = useNavigate();
       useEffect(() => {
       const token = localStorage.getItem("token");
       if (!token) {
         navigate("/login", { replace: true });
       }
     }, []);
  return <section>
    <button className="backButton" onClick={() => navigate(-1)}>Volver</button>
    <h1>Perfil del usuario</h1>
    <InforUser />
    <WeekClasses />
    <Link to="/classes">
          <button>Todas las clases</button>
        </Link>
     <Link to="/calendar">
          <button>Calendario</button>
        </Link>
  </section>;
};

export default Profile;
