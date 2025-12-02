import React from "react";
import { Link } from "react-router-dom";

import InforUser from "./InforUser/InforUser"
import WeekClasses from './WeekClasses/WeekClasses'


const Profile = () => {
  return <section>
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
