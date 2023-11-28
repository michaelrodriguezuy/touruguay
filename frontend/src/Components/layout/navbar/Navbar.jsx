import React, { useState } from "react";
import "../../../App.css";

import { Link, Outlet } from "react-router-dom";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="sticky top-0 z-50 flex flex-wrap items-center justify-between bg-[#202A44] pr-4">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <Link to="/">
            <img className="w-32" src="TOURuguaySinFondo.png" alt="Logo" />
          </Link>
          <Link to="/">
            <h3
              className={`ml-4 text-lg lg:text-xl hidden sm:block md:text-base ${isMenuOpen ? "hidden" : ""
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
          className={`lg:flex items-center space-x-2 ${isMenuOpen ? "block" : "hidden"
            }`}
        >
          <ul className="flex lg:justify-end lg:gap-4 md:gap-4">
            <li className="text-[#017999] hover:text-gray-300 font-bold"><Link to="/iniciarSesion" >Iniciar Sesión</Link></li>
            <li className="text-[#017999] hover:text-gray-300 font-bold"><Link to="/crearCuenta" >Crear Cuenta</Link></li>
          </ul>
        </div>
      </nav>
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default Navbar;
