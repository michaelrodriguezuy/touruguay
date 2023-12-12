import React, { useEffect, useState, useContext } from "react";

import "react-calendar/dist/Calendar.css";
import DatePicker, { DateObject } from "react-multi-date-picker";
import { Calendar } from "react-multi-date-picker";
import gregorian_sp from "./gregorian_sp";
import { DataContext } from "../../context/DataContext";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router";
import { isSameDay, isAfter, isBefore, format } from "date-fns";

import Swal from "sweetalert2";
//import { format, set } from "date-fns";

import "./calendar.css";

/*const ocupadas= [
  [new DateObject().setDay(1).format(), new DateObject().setDay(5).format()],
];
*/

export default function CalendarReservas({ fechaReservaLocalStorage }) {
  const { fetchBookingDatesById, fechasReservas } = useContext(DataContext);
  const { isLogged } = useContext(AuthContext);

  const productId = useParams().productId;

  const [rangoFechas, setRangoFechas] = useState([]);
  const [fechasSeleccionadas, setFechasSeleccionadas] = useState([]);

  // const [primeraFechaSeleccionada, setPrimeraFechaSeleccionada] = useState();

  const [primerFechaSeleccionada2, setPrimeraFechaSeleccionada2] = useState();
  const [ultimaFechaSeleccionada, setUltimaFechaSeleccionada] = useState();

  const navigate = useNavigate();

  // JOSEFINA
  // let ocupadas2 = [];
  // const initialValue = [...ocupadas2];
  // const [values, setValues] = useState(initialValue);

  useEffect(() => {
    const obtenerFechas = async () => {
      if (!fechasReservas || fechasReservas.length === 0) {
        await fetchBookingDatesById(productId);
      }
    };
    obtenerFechas();
  }, [fetchBookingDatesById, fechasReservas]);

  useEffect(() => {
    if (fechasReservas && fechasReservas.length > 0) {
      const rangos = fechasReservas.map((rango) => {
        const [inicio, fin] = rango.split(" - ");
        const fechaInicio = new Date(inicio);
        const fechaFin = new Date(fin);
        const fechasRango = [];
  
        for (
          let fecha = fechaInicio;
          fecha <= fechaFin;
          fecha.setDate(fecha.getDate() + 1)
        ) {
          fechasRango.push(new Date(fecha));
        }
  
        return fechasRango;
      });
  
      setRangoFechas(rangos.flat());
    }
  }, [fechasReservas]);
  

  const rangoFechasStrings = rangoFechas.map(
    (date) => date.toISOString().split("T")[0]
  );
  const isReservedBase = (strDate) => {
    // Lógica para verificar las fechas de base de datos
    return rangoFechasStrings.includes(strDate);
  };

  const isReservedLocal = (date) => {
    if (!fechaReservaLocalStorage || fechaReservaLocalStorage.length !== 2) {
      return false;
    }

    const reservaInicio = fechaReservaLocalStorage[0]
      .toISOString()
      .split("T")[0];

    const reservaFin = fechaReservaLocalStorage[1].toISOString().split("T")[0];

    return date >= reservaInicio && date <= reservaFin;
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
    if (value && value.length > 0) {
      const valor = value[0];
      const [startDate, endDate] = valor;

      const startDateObj = new Date(startDate);
      const endDateObj = new Date(endDate);

      if (endDate) {
        if (!isNaN(startDateObj.getTime()) && !isNaN(endDateObj.getTime())) {
          const startDay = startDateObj.toDateString();
          const endDay = endDateObj.toDateString();

          if (startDay === endDay) {
            setFechasSeleccionadas([startDateObj, startDateObj]);
            // setPrimeraFechaSeleccionada(true);
          } else {
            setFechasSeleccionadas([startDateObj, endDateObj]);
            // setPrimeraFechaSeleccionada(true);
          }
        } else {
          console.error("Error: Una o ambas fechas no son válidas");
        }
      }
    } else {
      console.error("Error: No se proporcionaron fechas válidas");
    }
  };

  //nuevo rango de fechas
  useEffect(() => {
    setPrimeraFechaSeleccionada2(fechasSeleccionadas[0]);
    setUltimaFechaSeleccionada(fechasSeleccionadas[1]);
  }, [fechasSeleccionadas]);

  const isDateDisabled = (date) => {
    const strDate = date.format("YYYY-MM-DD");
    return rangoFechasStrings.includes(strDate) || isReservedBase(strDate);
  };

  const onClickDay = (date) => {
    const strDate = date.format("YYYY-MM-DD");
    if (isDateDisabled(date)) {
      return;
    }
  };

  const beforeDateChange = (newDate) => {
    const strDate = newDate.format("YYYY-MM-DD");
    return !isDateDisabled(newDate) && !rangoFechasStrings.includes(strDate);
  };

  const onSaveClick = () => {
    if (
      fechasSeleccionadas.some((date) =>
        rangoFechasStrings.includes(date.toISOString().split("T")[0])
      )
    ) {
      console.log("Fechas no disponibles");
      return;
    }

    const hoy = new Date();
    const reserva = {
      fechaHoy: obtenerFormatoFecha(hoy),
      primeraFecha: obtenerFormatoFecha(primerFechaSeleccionada2),
      ultimaFecha: obtenerFormatoFecha(ultimaFechaSeleccionada),
      productId: productId,
    };

    
    localStorage.setItem("reserva", JSON.stringify(reserva));

    if (isLogged) {
    
      navigate(`/booking/${productId}`);
    } else {
    
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Inicia sesion y vuelve, tu reserva te estará esperando",
      });

      navigate("/IniciarSesion");
      //luego de login o register navego a la pagina de reserva y levanto la reserva del localStorage
    }
  };

  useEffect(() => {
    const calendarContainer = document.querySelector(".bloqueo");
    if (calendarContainer) {
      const clickHandler = (e) => {
        const dateElement = e.target.closest(".bloqueo");
        if (dateElement) {
          e.preventDefault();
        }
      };
      calendarContainer.addEventListener("click", clickHandler);

      return () => {
        calendarContainer.removeEventListener("click", clickHandler);
      };
    }
  }, [rangoFechasStrings]);

  const obtenerFormatoFecha = (fecha) => {
    const year = fecha.getFullYear();
    const month = String(fecha.getMonth() + 1).padStart(2, "0");
    const day = String(fecha.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const mapDays = ({ date }) => {
    const strDate = date.format("YYYY-MM-DD");
    const isReservedFromBase = isReservedBase(strDate);
    const isReservedLocalStorage = isReservedLocal(strDate);

    return {
      className: isReservedFromBase
        ? "bloqueo base"
        : isReservedLocalStorage
        ? "bloqueo local"
        : "",
      style: isReservedFromBase
        ? { backgroundColor: "lightgray", cursor: "not-allowed" }
        : isReservedLocalStorage
        ? { backgroundColor: "lightblue", cursor: "pointer" }
        : {},
    };
  };

  return (
    <div className="container mx-auto p-4 relative">
      <h1 className="text-2xl font-bold mb-2 ml-6">Reservá tu fecha</h1>

      {primerFechaSeleccionada2 && ultimaFechaSeleccionada && (
        <div className="absolute top-[-1rem] left-[21rem] p-2 mt-2 flex flex-col bg-white shadow-md rounded-md">
          <div className="mb-2 flex flex-col">
            <p style={{ color: "black", fontSize: "0.8rem" }}>
              Fecha de inicio: {primerFechaSeleccionada2.toLocaleDateString()}
            </p>
            <p style={{ color: "black", fontSize: "0.8rem" }}>
              Fecha de fin: {ultimaFechaSeleccionada.toLocaleDateString()}
            </p>
          </div>
          <button
            className="rounded-md bg-[#017999] text-white h-8 w-20 text-xs flex items-center justify-center mx-auto"
            onClick={onSaveClick}
          >
            Lo quiero!
          </button>
        </div>
      )}

      <div className="m-2.5">
      <div className="flex items-center gap-x-2.5 ml-6">
  <div className="bg-gray w-5 h-5 rounded-full bloqueo" />
  <p className="m-0 ">No disponible</p>
</div>

      </div>
      <div className="flex flex-col">
        <Calendar
          className="container mx-auto"
          locale={gregorian_sp}
          multiple
          range
          rangeHover
          numberOfMonths={2}
          //   showDoubleView={true}
          showOtherDays
          selectRange
          tileClassName={tileClassName}
          tileDisabled={({ date }) => isDateDisabled(date)}
          beforeDateChange={beforeDateChange}
          minDate={new DateObject().subtract(1, "months")}
          maxDate={new DateObject().add(3, "months")}
          value={rangoFechas}
          onChange={onChangeHandler}
          onClickDay={onClickDay}
          mapDays={mapDays}
        />
      </div>
    </div>
  );
}
