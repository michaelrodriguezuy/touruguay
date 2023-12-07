import React, { useEffect, useState, useContext} from 'react';

import 'react-calendar/dist/Calendar.css';
import DatePicker, { DateObject } from "react-multi-date-picker";
import { Calendar } from "react-multi-date-picker";
import gregorian_sp from  "./gregorian_sp";
import { DataContext } from '../../context/DataContext';

/*const ocupadas= [
  [new DateObject().setDay(1).format(), new DateObject().setDay(5).format()],
];
*/


export default function CalendarReservas() {
  let ocupadas2 = []
  const { fetchBookingDatesById, fechasReserva} = useContext(DataContext)
  
  useEffect(() => {
    const obtenerFechas = async () => {    
      if (!fechasReserva || fechasReserva.length === 0) {
        await fetchBookingDatesById(27); // forEach
      }
    };    
    obtenerFechas();
  }, [fetchBookingDatesById, fechasReserva]);       

  useEffect(() => {        
    pruebaFechas();
  }, [fechasReserva]);


  function pruebaFechas(){
    console.log("hola2")
    if(!fechasReserva || fechasReserva.length===0){
      console.log("todo mal")}
    else {

  const [inicio,fin] = fechasReserva[0].split(" - ")
  const fechaInicio = new Date(inicio)
  const fechaFin = new Date(fin)
  const rango=[]

  for (let fecha = fechaInicio; fecha <= fechaFin; fecha.setDate(fecha.getDate() + 1)) {
    rango.push(new Date(fecha));
}
  rango.forEach((fecha) => {
    console.log(fecha.getDate())
  
  })
  ocupadas2 = [new DateObject().setDay(rango[0].getDate()).format(), new DateObject().setDay(rango[rango.length-1].getDate()).format()]
  console.log(rango[0].getMonth())
  }
}

  const initialValue = [...ocupadas2];
  const [values, setValues] = useState(initialValue);
console.log(initialValue)
  function isReserved(strDate) {
  return ocupadas2.some(([start, end]) => strDate >= start && strDate <= end);
}

  return (
    
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 ml-6">Reservá tu fecha</h1>

      <div className='m-2.5'>
        <div className="flex items-center gap-x-2.5 ml-6">
          <div className="bg-gray w-5 h-5 rounded-full border-1 border-black" />
          <p className='m-0'>No disponible</p>
        </div>
      </div>
      
      <Calendar className='container mx-auto'
        locale={gregorian_sp}
        multiple
        range
        rangeHover
        numberOfMonths={2}
        showOtherDays
        minDate={new DateObject().subtract(1, "months")}
        maxDate={new DateObject().add(3, "months")}
        value={values}
        onChange={(ranges) => { 
          const isClickedOutsideUnAvailbleDates = initialValue.every(
            ([start, end]) => ranges.some((range) => range[0]?.format?.() === start && range[1]?.format?.() === end)
          );
          
          if (!isClickedOutsideUnAvailbleDates) return false;
          
          setValues(ranges);
        }}
        mapDays={({ date }) => {
          let className;
          const strDate = date.format();
        
          if (isReserved(strDate)) className = "text-gray bg-transparent";
         
          if (className) return { className };
        }}
      />
    </div>
  )




/*


export default function CalendarReservas() {
  
  const [values, setValues] = useState([
    new DateObject().setDay(4).subtract(1, "month"),
    new DateObject().setDay(4).add(1, "month")
  ])
  
  return (
  <Calendar
    value={values}
    onChange={setValues}
    range
    numberOfMonths={2}
    showOtherDays
  />
  )
}

*/

}