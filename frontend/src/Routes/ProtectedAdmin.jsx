import { useContext } from "react";
import { AuthContext } from "../Components/context/AuthContext";
import { Navigate, Outlet } from "react-router";

const ProtectedAdmin = () => {
  const { user } = useContext(AuthContext);
  const rolAdmin = import.meta.env.VITE_ROLADMIN;
  return <>{user?.rol === rolAdmin ? <Outlet /> : <Navigate to="/" />}</>;
};

export default ProtectedAdmin;
