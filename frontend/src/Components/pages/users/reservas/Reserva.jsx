import React, { useContext, useEffect } from "react";
import { DataContext } from "../../../context/DataContext";
import { AuthContext } from "../../../context/AuthContext";

const Reserva = () => {
  const { fetchReservas, bookings } = useContext(DataContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {

    if (user && user?.id){
      fetchReservas(user.id);
    }

  }, [user]);

  return (
    <div>
      {/* texto centrado */}
      <div className="text-center">
        <h1 className="text-3xl font-semibold text-gray-800 dark:text-black">
          Mis reservas
        </h1>
      </div>
      
      <table className="m-10 rounded-full">
        <thead className="bg-gray-100 dark:bg-gray-700 text-white">
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
  );
};

export default Reserva;
