import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

const AuthContextComponent = ({ children }) => {
  //esto es para el usuario logueado, cargo sus datos para mostrar nombre y apellido
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || {}
  );

  //esto es para chequear si el usuario esta logueado para ver que mostrar
  const [isLogged, setIsLogged] = useState(
    JSON.parse(localStorage.getItem("isLogged")) || false
  );

  //esto es para guardar el token que me da el backend, en desarrollo este token es siempre igual
  //en produccion se genera uno nuevo cada vez que se loguea un usuario o se registran
//   const token =
//     process.env.NODE_ENV === "production"
//       ? JSON.parse(localStorage.getItem("token")) || ""
//       : "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBob3RtYWlsLmNvbSIsImlhdCI6MTcwMDI1Mzk0OCwiZXhwIjoxNzA4MDI5OTQ4fQ.UN5LrttadKVTDf5HG9PDjlI3NwqKc2rTPBY3bNRUDCI";

      //por el momento para facilitar el desarrollo, el token es siempre el mismo
      const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBob3RtYWlsLmNvbSIsImlhdCI6MTcwMDI1Mzk0OCwiZXhwIjoxNzA4MDI5OTQ4fQ.UN5LrttadKVTDf5HG9PDjlI3NwqKc2rTPBY3bNRUDCI";

  //esta funcion es para guardar el usuario logueado en el local storage y setear el estado de isLogged en true
  const handleLogin = (userLogged) => {
    setUser(userLogged);
    setIsLogged(true);
    localStorage.setItem("user", JSON.stringify(userLogged));
    localStorage.setItem("isLogged", JSON.stringify(true));
  };

  //esta funcion es para borrar el usuario logueado del local storage y setear el estado de isLogged en false
  const handleLogout = () => {
    setUser({});
    setIsLogged(false);
    localStorage.removeItem("user");
    localStorage.removeItem("isLogged");
    localStorage.clear(); //esto es para borrar todo el local storage, borra el token
  };

  let data = { user, isLogged, token, handleLogin, handleLogout };

  return <AuthContext.Provider value={data}> {children} </AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error("useAuth must be used within an AuthContextProvider");
    }
    return context;
  };export default AuthContextComponent;
