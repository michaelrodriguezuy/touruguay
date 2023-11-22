import React, { useContext, useState } from "react";
import "../../../App.css";

import { Link, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { user, isLogged, handleLogout } = useContext(AuthContext);

  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const Logout = () => {
    try {
      handleLogout();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <nav className="flex flex-wrap items-center justify-between bg-[#202A44] p-4">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <Link to="/">
            <img className="w-32" src="TOURuguaySinFondo.png" alt="Logo" />
          </Link>
          <Link to="/">
            <h3
              className={`ml-4 text-lg lg:text-xl hidden sm:block md:text-base ${
                isMenuOpen ? "hidden" : ""
              }`}
            >
              Descubriendo el paisito
            </h3>
          </Link>
        </div>
        <div className="block lg:hidden">
          <button
            className="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-white hover:border-white"
            onClick={toggleMenu}
          >
            Menu
          </button>
        </div>
        <div
          className={`lg:flex items-center space-x-2 ${
            isMenuOpen ? "block" : "hidden"
          }`}
        >
          <ul className="flex lg:justify-end lg:gap-4 md:gap-4">
            {/* Provisorio */}
            {!isLogged ? (
              <>                
                <li className="text-[#017999] hover:text-gray-300">
                  <Link to="/iniciarSesion">Iniciar Sesión</Link>
                </li>
                <li className="text-[#017999] hover:text-gray-300">
                  <Link to="/crearCuenta">Crear Cuenta</Link>
                </li>
              </>
            ) : (
              <>
                {user.name && user.lastname && (
                  <>                  

                    <li className="text-[#017999] hover:text-gray-300">
                      {user.nombre} {user.apellido}
                    </li>
                    <li className="text-[#017999] hover:text-gray-300">
                      {user.name[0]}
                      {user.lastname[0]}
                    </li>
                    <li className="text-[#017999] hover:text-gray-300">
                      <button onClick={Logout}>Cerrar Sesión</button>
                    </li>
                  </>
                )}
              </>
            )}
          </ul>
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default Navbar;
