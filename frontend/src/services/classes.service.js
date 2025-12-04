
// Llamada para llamar a las ultimas 4 clases creadas en el perfil
export const getLatestClasses = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return [];

    const res = await fetch("http://localhost:3000/classes/profile", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    if (!res.ok) throw new Error("No se pudieron cargar las clases");

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Llamada para llamar a todas las clases 
export const getAllClasses = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return [];

    const res = await fetch("http://localhost:3000/classes/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("No se pudieron cargar las clases");

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error al cargar las clases:", error);
    return [];
  }
};

//Llamada para una clase con todos los detalles
export const getClassDetail = async (id) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`http://localhost:3000/classes/detail/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || `Error al obtener la clase`);
  }

  return await response.json();
};

//Llamada para borrar clase
export const deleteClass = async (id) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`http://localhost:3000/classes/detail/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error al eliminar la clase");
  }

  return data;
};

//Llamada para editar clase
export const editClass = async (id, formData) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`http://localhost:3000/classes/detail/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error al actualizar la clase");
  }

  return data;
};

// Llamada para crear una clase (Dashboard)
export const createClass = async (formData, token) => {

  const response = await fetch(`http://localhost:3000/classes/create`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData, 
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error al crear la clase");
  }

  return data;
};
