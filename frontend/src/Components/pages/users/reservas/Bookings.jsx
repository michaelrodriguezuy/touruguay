import React, { useContext, useEffect } from "react";
import { DataContext } from "../../../context/DataContext";
import { AuthContext } from "../../../context/AuthContext";

const Reserva = () => {
  const { fetchReservas, bookings } = useContext(DataContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {

    if (user && user?.id) {
      fetchReservas(user.id);
    }

  }, [user]);

  return (
    <div className="bg-slate-200">
      <div className=" bg-slate-200">
        <div className="relative">
          <img
            className="w-full h-80 object-cover"            
            src='./src/assets/booking.jpg'
            alt='Banner'
          />
          <div class="absolute top-1/2 left-60 transform -translate-x-1/2 -translate-y-1/2 text-white">
            <h1 class="text-6xl font-bold">Mis reservas</h1>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
      <table className="m-10 rounded-full">
        <thead className="bg-gray-100 dark:bg-[#202A44] text-white ">
          <tr>
            <th scope="col" className="p-4">
              ID
            </th>
            <th scope="col" className="p-4">
              Titulo
            </th>
            <th scope="col" className="p-4">
              Descripción
            </th>

            <th scope="col" className="p-4">
              Fecha
            </th>

            <th scope="col" className="p-4">
              Producto
            </th>
            <th scope="col" className="p-4">
              Desde
            </th>
            <th scope="col" className="p-4">
              Hasta
            </th>
          </tr>
        </thead>
        
        <tbody>
          {bookings &&
            bookings.map((booking) => (
              <tr
                className="odd:bg-gray-200 even:bg-white"
                key={booking.booking_id}
              >
                <td className="py-4 px-6 text-sm font-medium text-gray-900">
                  {booking.booking_id}
                </td>
                <td className="py-4 px-6 text-sm font-medium text-gray-900">
                  {booking.title}
                </td>
                <td className="py-4 px-6 text-sm font-medium text-gray-900">
                  {booking.description}
                </td>

                <td className="py-4 px-6 text-sm font-medium text-gray-900">
                  {booking.date}
                </td>

                <td className="py-4 px-6 text-sm font-medium text-gray-900">
                  {booking.product}
                </td>
                <td className="py-4 px-6 text-sm font-medium text-gray-900">
                  {booking.desde}
                </td>

                <td className="py-4 px-6 text-sm font-medium text-gray-900">
                  {booking.hasta}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default Reserva;
