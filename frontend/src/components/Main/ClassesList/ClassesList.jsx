import React, { useEffect, useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import ClassesCard from "./ClassesCard/ClassesCard";

const ClassesList = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await fetch("http://localhost:3000/classes/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("No se pudieron cargar las clases");

        const data = await res.json();
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setClasses(data);
      } catch (error) {
        console.error("Error al cargar las clases:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchClasses();
  }, []);

  if (loading) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}
      >
        <BeatLoader
          color="#4caf50" 
          size={15} 
          margin={2} 
          loading={true} 
        />
      </div>
    );
  }

  return (
    <section>
      {classes.length > 0 ? (
        classes.map((cls, index) => (
          <ClassesCard
            key={index}
            id_class={cls.id_class}
            subject={cls.subject}
            schedule={cls.schedule}
            level={cls.level}
          />
        ))
      ) : (
        <p>No hay clases disponibles</p>
      )}
    </section>
  );
};

export default ClassesList;
