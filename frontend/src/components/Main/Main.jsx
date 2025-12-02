import React, { Profiler } from "react";
import { Route, Routes, Navigate } from 'react-router-dom';

import Home from "./Home/Home"
import SignUp from "./SignUp/SignUp"
import LogIn from './LogIn/LogIn'
import DashboarTeacher from "./DashboarTeacher/DashboarTeacher";
import Profile from './Profile/Profile'

const Main = () => {
  return <main>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/dashboardteacher' element={<DashboarTeacher />} />
         <Route path='/profile' element={<Profile />} />
      </Routes>
  </main>;
};

export default Main;
