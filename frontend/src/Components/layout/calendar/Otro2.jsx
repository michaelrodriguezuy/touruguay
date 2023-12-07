import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import { isBefore, isAfter, isSameDay, isToday, startOfMonth, addMonths } from "date-fns";

import "./Calendario.css";

// Combina las configuraciones específicas de gregorian_sp con es de date-fns/locale
const customEsLocale = {
  ...es,
};

registerLocale("es", customEsLocale);
setDefaultLocale("es"); // Establece el locale predeterminado

const Otro = () => {
  const rangoFechasBD = {
    fechaInicio: new Date("2023-12-10T00:00:00"),
    fechaFin: new Date("2023-12-20T23:59:59"),
  };

  const mesActual = new Date();
  const mesSiguiente = addMonths(mesActual, 1);

  const [startDate, setStartDate] = useState(mesActual);
  const [endDate, setEndDate] = useState(mesSiguiente);

  const isDateDisabled = (date) =>
    isBefore(date, startOfMonth(new Date())) || // Deshabilita fechas anteriores al mes actual
    (isBefore(date, rangoFechasBD.fechaInicio) && !isSameDay(date, rangoFechasBD.fechaInicio)) || // Deshabilita fechas anteriores al rango
    isAfter(date, rangoFechasBD.fechaFin) || // Deshabilita fechas después del rango
    isToday(date); // Deshabilita la fecha actual

  return (
    <div>
      <div>
        <label>Fecha de inicio:</label>
        <Calendar
          onChange={(date) => setStartDate(date)}
          value={startDate}
          minDate={mesActual}
          maxDate={mesSiguiente}
          locale="es"
          tileDisabled={({ date }) => isDateDisabled(date)}
          tileClassName={({ date }) => (isDateDisabled(date) ? "fecha-deshabilitada" : null)}
        />
      </div>
      <div>
        <label>Fecha de fin:</label>
        <Calendar
          onChange={(date) => setEndDate(date)}
          value={endDate}
          minDate={startDate}
          maxDate={addMonths(mesSiguiente, 1)} // Mostrar el mes siguiente
          locale="es"
          tileDisabled={({ date }) => isDateDisabled(date)}
          tileClassName={({ date }) => (isDateDisabled(date) ? "fecha-deshabilitada" : null)}
        />
      </div>
    </div>
  );
};

export default Otro;
