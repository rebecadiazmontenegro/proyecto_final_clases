import React, { useEffect, useState } from "react";
import WeekClassesCard from './WeekClassesCard/WeekClassesCard';

const WeekClasses = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await fetch("http://localhost:3000/classes/profile", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        if (!res.ok) throw new Error("No se pudieron cargar las clases");

        const data = await res.json();
        setClasses(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchClasses();
  }, []);

  return (
    <article>
      {classes.length > 0 ? (
        classes.map((cls, index) => (
          <WeekClassesCard 
            key={index} 
            subject={cls.subject} 
            schedule={cls.schedule} 
          />
        ))
      ) : (
        <p>No hay clases disponibles</p>
      )}
    </article>
  );
};

export default WeekClasses;
