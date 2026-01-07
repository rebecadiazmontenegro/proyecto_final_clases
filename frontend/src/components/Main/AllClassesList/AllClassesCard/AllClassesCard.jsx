import React, { useState } from "react";
import { addFavorite, removeFavorite } from "../../../../services/classes.service"; 

const AllClassesCard = ({ classItem, userFavorites, setUserFavorites }) => {
  // Estado local para saber si la clase es favorita
  const [isFavorite, setIsFavorite] = useState(
    userFavorites.some(fav => fav.id_class === classItem.id_class)
  );

  const handleFavorite = async () => {
    try {
      if (isFavorite) {
        await removeFavorite(classItem.id_class);
        setIsFavorite(false);
        // Actualizar array de favoritos del padre
        setUserFavorites(prev => prev.filter(fav => fav.id_class !== classItem.id_class));
      } else {
        const newFav = await addFavorite(classItem.id_class);
        setIsFavorite(true);
        setUserFavorites(prev => [...prev, { id_class: classItem.id_class, ...newFav }]);
      }
    } catch (error) {
      console.error("Error al actualizar favorito:", error);
    }
  };

  return (
    <article>
      <h3>{classItem.subject_name}</h3>
      <p><strong>Profesor:</strong> {classItem.teacher_name}</p>
      <p><strong>Nivel:</strong> {classItem.level}</p>
      <p><strong>Formato:</strong> {classItem.format}</p>
      <p><strong>Horario:</strong> {classItem.schedule}</p>
      <p><strong>Materiales:</strong> {classItem.materials.join(", ")}</p>

      <button
        onClick={handleFavorite}
      >
        {isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
      </button>
    </article>
  );
};

export default AllClassesCard;
