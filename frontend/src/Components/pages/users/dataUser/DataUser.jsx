import React, { useContext, useEffect } from "react";
import { DataContext } from "../../../context/DataContext";
import { AuthContext } from "../../../context/AuthContext";

const DataUser = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="bg-slate-200">
      <div className="bg-slate-200">
        <div className="relative">
          <img
            className="w-full h-80 object-cover"
            src="dataUser.jpg"
            alt="Banner"
          />
          <div class="absolute top-1/2 left-60 transform -translate-x-1/2 -translate-y-1/2 text-white">
            <h1 class="text-6xl font-bold">Mis datos</h1>
          </div>
        </div>
        <table className="m-10 rounded-full">
          <thead className="bg-gray-100 dark:bg-gray-700 text-white">
            <tr>
              <th scope="col" className="p-4">
                Usuario
              </th>
              <th scope="col" className="p-4">
                Nombre
              </th>

              <th scope="col" className="p-4">
                Apellido
              </th>

              <th scope="col" className="p-4">
                Tipo de usuario
              </th>
            </tr>
          </thead>
          <tbody>
            {user && (
              <tr className="odd:bg-gray-200 even:bg-white" key={user.user_id}>
                <td className="py-4 px-6 text-sm font-medium text-gray-900">
                  {user.username}
                </td>
                <td className="py-4 px-6 text-sm font-medium text-gray-900">
                  {user.name}
                </td>

                <td className="py-4 px-6 text-sm font-medium text-gray-900">
                  {user.lastname}
                </td>

                <td className="py-4 px-6 text-sm font-medium text-gray-900">
                  {user.rol}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataUser;
