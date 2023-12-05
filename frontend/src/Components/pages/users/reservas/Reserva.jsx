import React, { useContext, useEffect } from "react";
import { DataContext } from "../../../context/DataContext";

const Booking = () => {
  const { fetchReservas, bookings } = useContext(DataContext);
  const { user } = useContext(DataContext);

  useEffect(() => {
    fetchReservas(user.user_id);
  }, []);

  return (
    <div>
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
              Usuario
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
                  {booking.user.name}
                </td>
                
                <td className="py-4 px-6 text-sm font-medium text-gray-900">
                  {booking.product.product_name}
                </td>
                <td className="py-4 px-6 text-sm font-medium text-gray-900">
                  {booking.start_date}
                </td>

                <td className="py-4 px-6 text-sm font-medium text-gray-900">
                  {booking.end_date}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Booking;
