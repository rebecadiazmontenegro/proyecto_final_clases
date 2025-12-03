import React, { useEffect, useState } from "react";
import WeekClassesCard from './WeekClassesCard/WeekClassesCard';
import { getLatestClasses } from '../../../../services/classes.service';

const WeekClasses = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      const data = await getLatestClasses();
      setClasses(data);
    };

    fetchClasses();
  }, []);

  return (
    <section className="latestClasses">
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
    </section>
  );
};

export default WeekClasses;
