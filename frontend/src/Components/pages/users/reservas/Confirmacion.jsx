import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";


const Confirmacion = () => {

return (
<div className="flex flex-col justify-center content-center">
    <h2 className="text-4xl text-center p-10 pt-20">¡Felicidades! Realizaste la reserva con éxito</h2>
    <div className="flex justify-center"><FontAwesomeIcon className= "h-64 pt-8 pb-8" icon="fa-solid fa-circle-check" size="2xl" style={{color: "#017999",}} /></div>
    <p className="text-center text-2xl pt-10">TOURuguay te agradece y desea que tengas una excelente experiencia</p>
</div>

)

}


export default Confirmacion;