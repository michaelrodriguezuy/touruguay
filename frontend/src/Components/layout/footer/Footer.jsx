import React from "react";
import { Outlet } from "react-router";



function Footer() {
    return (
        <>
        <Outlet />
        <footer>
                <div className="logoFooter">
                    <img src="TOURuguaySinFondo.png" alt="Logo" />
                </div>
                <h5>© 2020-2023 TOURuguay, Inc. Todos los derechos reservados.</h5>
        </footer>
        </>
    )

}

export default Footer;