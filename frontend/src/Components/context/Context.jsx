import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const DataContext = createContext();

const DataContextComponent = ({ children }) => {
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
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBob3RtYWlsLmNvbSIsImlhdCI6MTcwMDI1Mzk0OCwiZXhwIjoxNzA4MDI5OTQ4fQ.UN5LrttadKVTDf5HG9PDjlI3NwqKc2rTPBY3bNRUDCI";


  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

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

  const fetchUsers = async () => {
    try {
      const getUsers = await axios.get(
        "http://ec2-3-93-192-148.compute-1.amazonaws.com:8080/usuario/todos",
        { headers }
      );
      setUsers(getUsers.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const productsAleatorios = await axios.get(
        "http://ec2-3-93-192-148.compute-1.amazonaws.com:8080/producto/aleatorios?cantidad=10",
        { headers }
      );
      setProducts(productsAleatorios.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    //fetchUsers();
    fetchProducts();
  }, [token]); //}, [token]);

  const registerUser = async (user) => {
      try {
          const response = await axios.post(
              "http://ec2-3-93-192-148.compute-1.amazonaws.com:8080/auth/register",
              user,
              { headers }
              );              
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  let data = {
    user,
    isLogged,
    token,
    handleLogin,
    handleLogout,
    users,
    products,
    registerUser,
  };

  return (
    <DataContext.Provider value={ data }>{children}</DataContext.Provider>
  );
};

export {DataContextComponent};
