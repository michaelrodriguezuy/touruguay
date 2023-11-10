import React from "react";

import { Link, Outlet } from "react-router-dom";

function Navbar() {
  return (
    <>
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <img src="TOURuguaySinFondo.png" alt="Logo" />

        <h3 className="eslogan">Descubriendo el paisito</h3>
        </Link>
      </div>
      <ul className="nav-links">
        <li>
        <Link to="/iniciarSesion">Iniciar Sesion</Link>
        </li>
        <li>
          <a href="#">Crear Cuenta</a>
        </li>
      </ul>
    </nav>
    <Outlet />
    </>
  );
}

export default Navbar;
