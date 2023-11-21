import React from "react";
import { Outlet } from "react-router";

function Footer() {
  return (
    <>
      <Outlet />
      <footer className="bg-[#202A44] text-white sm:h-20 md:w-full p-0 mt-auto m-0 overflow-hidden">
        <div className="flex flex-col items-center justify-center lg:flex-row lg:justify-between">
          <div className="flex items-center">
            <img className="w-20" src="TOURuguaySinFondo.png" alt="Logo" />
            <div className="md:ml-4 flex flex-col md:flex-row items-start md:items-center">
              <h5 className="text-left text-sm md:text-base lg:text-lg">
                © 2020-2023 TOURuguay, Inc. Todos los derechos reservados.
              </h5>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
