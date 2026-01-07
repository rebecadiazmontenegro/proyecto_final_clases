import React, { useEffect, useState } from "react";
import AllClassesCard from './AllClassesCard';
import { allClassesList, getUserFavorites } from "../../../services/classes.service"; 

const AllClassesList = () => {
  const [classes, setClasses] = useState([]);
  const [userFavorites, setUserFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const classesData = await allClassesList();
        const favoritesData = await getUserFavorites(); 
        setClasses(Array.isArray(classesData) ? classesData : []);
        setUserFavorites(Array.isArray(favoritesData) ? favoritesData : []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Cargando clases...</p>;

  return (
    <section>
      {classes.length === 0 ? (
        <p>No se han encontrado clases.</p>
      ) : (
        classes.map(classItem => (
          <AllClassesCard
            key={classItem.id_class}
            classItem={classItem}
            userFavorites={userFavorites}
            setUserFavorites={setUserFavorites}
          />
        ))
      )}
    </section>
  );
};

export default AllClassesList;
