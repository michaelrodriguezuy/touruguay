import { createContext, useState } from "react";

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

  //por el momento para facilitar el desarrollo, el token es siempre el mismo
  const tokenDevelop = import.meta.env.VITE_TOKEN_DEVELOP;
  
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
    localStorage.removeItem("favourites");
    localStorage.clear(); //esto es para borrar todo el local storage, borra el token
  };

  let data = {
    user,
    isLogged,
    handleLogin,
    handleLogout,
    tokenDevelop,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export default AuthContextComponent;
