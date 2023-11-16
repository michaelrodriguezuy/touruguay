import React from "react";
import { Outlet } from "react-router";

function Footer() {
    return (
        <>
            <Outlet />
            <footer className="bg-[#202A44] text-white sm:h-20 md:w-full p-0">
                <div className="flex flex-col items-center justify-center lg:flex-row lg:justify-between">
                    <div className="scroll-p-0 m-0 md:mb-0">
                        <img className="w-24" src="TOURuguaySinFondo.png" alt="Logo" />
                    </div>
                    <h5 className="text-center lg:text-end text-sm lg:ml-4">
                        © 2020-2023 TOURuguay, Inc. Todos los derechos reservados.
                    </h5>
                </div>
            </footer>
        </>
    );
}

export default Footer;
