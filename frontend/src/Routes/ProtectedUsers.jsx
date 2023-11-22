import { useContext } from "react";
import { AuthContext } from "../Components/context/AuthContext";
import { Navigate, Outlet } from "react-router";

const ProtectedUsers = () => {
  const { isLogged } = useContext(AuthContext);

  return <> {isLogged ? <Outlet /> : <Navigate to="/IniciarSesion" />}</>;
};

export default ProtectedUsers;
