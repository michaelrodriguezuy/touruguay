import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../context/DataContext";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";

const CalendarReservas = () => {
  const { fetchBookingDatesById, fechasReservas } = useContext(DataContext);
  const { isLogged } = useContext(AuthContext);

  const productId = useParams().productId;

  const [rangoFechas, setRangoFechas] = useState([]);
  const [fechasSeleccionadas, setFechasSeleccionadas] = useState([]);
  const [primeraFechaSeleccionada, setPrimeraFechaSeleccionada] =
    useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const obtenerFechas = async () => {
      if (!fechasReservas || fechasReservas.length === 0) {
        await fetchBookingDatesById(27);
      }
    };
    obtenerFechas();
  }, [fetchBookingDatesById, fechasReservas]);

  useEffect(() => {
    if (fechasReservas && fechasReservas.length > 0) {
      const [inicio, fin] = fechasReservas[0].split(" - ");
      const fechaInicio = new Date(inicio);
      const fechaFin = new Date(fin);

      const rango = [];

      for (
        let fecha = fechaInicio;
        fecha <= fechaFin;
        fecha.setDate(fecha.getDate() + 1)
      ) {
        rango.push(new Date(fecha));
      }

      setRangoFechas(rango);
    }
    // console.log("reservas: ",rangoFechas);
  }, [fechasReservas]);

  const tileDisabled = ({ date }) => {
    // Deshabilitar fechas que están en rangoFechas
    return rangoFechas.some(
      (fecha) => fecha.toDateString() === date.toDateString()
    );
  };

  const tileClassName = ({ date }) => {
    if (
      fechasSeleccionadas.length === 2 &&
      date >= fechasSeleccionadas[0] &&
      date <= fechasSeleccionadas[1]
    ) {
      return "selected";
    }
    return "";
  };

  const onChangeHandler = (value) => {
    if (
      value.length === 2 &&
      !rangoFechas.some((date) => date >= value[0] && date <= value[1])
    ) {
      setFechasSeleccionadas([value[0], value[1]]);
      setPrimeraFechaSeleccionada(true);
    } else {
      if (primeraFechaSeleccionada) {
        setFechasSeleccionadas([value[0], value[0]]);
      }
    }
  };

  const onSaveClick = () => {
    const hoy = new Date();
    const reserva = {
      fechaHoy: obtenerFormatoFecha(hoy),
      primeraFecha: obtenerFormatoFecha(fechasSeleccionadas[0]),
      ultimaFecha: obtenerFormatoFecha(fechasSeleccionadas[1]),
      productId: productId,
    };

    // Guardar en localStorage
    localStorage.setItem("reserva", JSON.stringify(reserva));

    if (isLogged) {
      console.log("Fechas guardadas:", fechasSeleccionadas); //navego a la pagina de reserva
    } else {
      // Redirigir al usuario al formulario de inicio de sesión o mostrar un mensaje de error
      console.log(
        "Usuario no autenticado. Redirigiendo al formulario de inicio de sesión..."
      );

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Inicia sesion y vuelve, tu reserva te estará esperando",
      });

      navigate("/IniciarSesion");
      //luego de login o register navego a la pagina de reserva y levanto la reserva del localStorage
    }
  };

  const obtenerFormatoFecha = (fecha) => {
    const year = fecha.getFullYear();
    const month = String(fecha.getMonth() + 1).padStart(2, "0");
    const day = String(fecha.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 ml-6">Reservá tu fecha</h1>

      <div className="full-screen flex relative">
        <Calendar
          onChange={onChangeHandler}
          selectRange
          showDoubleView={true}
          tileDisabled={tileDisabled}
          tileClassName={tileClassName}
        />

        {fechasSeleccionadas.length === 2 && (
          <div className="absolute top-[18rem] right-[2rem] p-4 mt-2 flex flex-col">
            <div className="mb-4 flex justify-between">
              <div>
                <p>
                  <strong>Desde:</strong>{" "}
                  {fechasSeleccionadas[0].toDateString()}
                </p>
                <p>
                  <strong>Hasta:</strong>{" "}
                  {fechasSeleccionadas[1].toDateString()}
                </p>
              </div>
              <button
                className="rounded-xl bg-[#017999] text-white h-10 w-36 pt-2"
                onClick={onSaveClick}
              >
                Lo quiero!
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarReservas;
