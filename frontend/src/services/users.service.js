const API_URL = import.meta.env.VITE_API_URL+'/user'; // Usar variable de entorno para la URL base


// Llamada para hacer signUp
export const signUp = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Error al crear usuario");
    }

    return data;
  } catch (error) {
    console.error("Error en signup:", error);
    throw error;
  }
};

// Llamada para hacer logIn
export const logIn = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Error al iniciar sesión");
    }

    // Guardar token y usuario en localStorage
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    return data;
  } catch (error) {
    console.error("Error en login:", error);
    throw error;
  }
};


// Llamada para hacer logout
export const logout = async () => {
  try {
    const response = await fetch(`${API_URL}/logout`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Error al cerrar sesión");
    }
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    return true;
  } catch (error) {
    console.error("Error en logout:", error);
    throw error;
  }
};
