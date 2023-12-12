import React, { useState } from "react";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";

function Footer() {
  const [isTooltipVisible, setTooltipVisible] = useState(false);

  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Outlet />
      <footer className="bg-[#202A44] text-white sm:h-20 md:w-full p-0 mt-auto m-0 overflow-hidden">
        <div className="flex flex-col items-center justify-center lg:flex-row lg:justify-between">
          <div className="flex items-center">
            <img className="w-20" src="/TOURuguaySinFondo.png" alt="Logo" />
            <div className="md:ml-4 flex flex-col md:flex-row items-start md:items-center">
              <h5 className="text-left text-sm md:text-base lg:text-lg">
                © 2020-2023 TOURuguay, Inc. Todos los derechos reservados.
              </h5>
            </div>
          </div>
        </div>
                        <div className="flex items-end justify-end p-4 group">
          <Link
            to="https://api.whatsapp.com/send?phone=59899163200&text=Hola%20TOURuguay"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "whitesmoke", textDecoration: "none" }}
            onMouseEnter={() => setTooltipVisible(true)}
            onMouseLeave={() => setTooltipVisible(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="currentColor"
              style={{ color: "#128c7e" }}
              viewBox="0 0 24 24"
            >
              <path d="M0.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
          </Link>
          {isTooltipVisible && (
            <div className="absolute bg-gray-800 text-white text-xs py-1 px-2 rounded-md -mt-8 ml-2">
              Envía un whatsapp
            </div>
          )}
        </div>
      </footer>
    </div>
  );
}

export default Footer;
