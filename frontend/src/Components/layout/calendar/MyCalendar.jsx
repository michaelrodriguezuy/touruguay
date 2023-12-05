import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const MyCalendar = () => {
  const [date, setDate] = useState(new Date());

  const onChange = (selectedDate) => {
    setDate(selectedDate);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 ml-6">Reservá tu fecha</h1>
      <div className="bg-white p-4 rounded shadow">
        <Calendar onChange={onChange} value={date} />
      </div>
    </div>
  );
};

export default MyCalendar;

