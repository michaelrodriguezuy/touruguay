import React, { useContext, useState } from "react";
import "../../../App.css";

import { Link, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { DataContext } from "../../context/DataContext";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { user, isLogged, handleLogout } = useContext(AuthContext);
  const rolAdmin = import.meta.env.VITE_ROLADMIN;

  const { fetchAddFavourite } = useContext(DataContext);

  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsOpen(!isOpen);
  };

  const closeAvatarMenu = () => {
    setIsOpen(false);
  };

  const Logout = () => {
    try {
      fetchAddFavourite(); //actualizo los favoritos en la base de datos
      handleLogout(); //limpio el local storage
      closeAvatarMenu();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-10 flex flex-wrap items-center justify-between bg-[#202A44] pr-4 shadow-md">
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
            Menú
          </button>
        </div>
        <div
          className={`lg:flex items-center space-x-2 ${
            isMenuOpen ? "block" : "hidden"
          }`}
        >
          <ul className="flex lg:justify-end lg:gap-4 md:gap-4">
            {!isLogged ? (
              <>
                <li className="text-[#63c1dc] hover:text-gray-300">
                  <Link to="/iniciarSesion">Iniciar Sesion</Link>
                </li>
                <li className="text-[#63c1dc] hover:text-gray-300">
                  <Link to="/crearCuenta">Crear Cuenta</Link>
                </li>
              </>
            ) : (
              <>
                {user.name && user.lastname && (
                  <>
                    <div className="relative">
                      <button
                        onClick={toggleMenu}
                        className="flex items-center ml-6 focus:outline-none"
                        aria-label="Toggle dropdown"
                      >
                        <li className="w-10 h-10 flex items-center justify-center bg-gray-300 rounded-full">
                          {user.name[0]}
                          {user.lastname[0]}
                        </li>
                      </button>
                      {isOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg">
                          <Link
                            to="/dataUser"
                            onClick={closeAvatarMenu}
                            className="block py-2 px-4 hover:bg-gray-200 rounded-lg"
                          >
                            Mis datos
                          </Link>

                          <Link
                            to="/booking"
                            onClick={closeAvatarMenu}
                            className="block py-2 px-4 hover:bg-gray-200 rounded-lg"
                          >
                            Mis reservas
                          </Link>
                          <Link
                            to="/favorite"
                            onClick={closeAvatarMenu}
                            className="block py-2 px-4 hover:bg-gray-200 rounded-lg"
                          >
                            Mis favoritos
                          </Link>

                          {user?.rol === rolAdmin && (
                            <Link
                              to="/AdminPanel"
                              onClick={closeAvatarMenu}
                              className="block py-2 px-4 hover:bg-gray-200 rounded-lg"
                            >
                              Panel de control
                            </Link>
                          )}
                        </div>
                      )}
                      <li className="text-[#63c1dc] hover:text-gray-300">
                        <button onClick={Logout}>Cerrar Sesión</button>
                      </li>
                    </div>
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
