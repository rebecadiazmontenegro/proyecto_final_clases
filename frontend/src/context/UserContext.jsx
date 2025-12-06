import { createContext, useState } from "react";

// Creamos el contexto
export const UserContext = createContext();

// Provider que envolverá la app o el dashboard
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // aquí guardaremos {name, email, role}

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
