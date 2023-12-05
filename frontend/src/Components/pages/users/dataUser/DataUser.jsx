import React, { useContext, useEffect } from "react";
import { DataContext } from "../../../context/DataContext";
import { AuthContext } from "../../../context/AuthContext";

const DataUser = () => {

  const { user } = useContext(AuthContext);


  return (
    <section className="w-full flex flex-col bg-slate-200">
      <div>
      {/* texto centrado */}
      <div className="text-center">
        <h1 className="text-3xl font-semibold text-gray-800 dark:text-black">
          Mis datos
        </h1>
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
          {user &&
             (
              <tr
                className="odd:bg-gray-200 even:bg-white"
                key={user.user_id}
              >
                
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
            )
          }            
        </tbody>
      </table>
    </div>
    </section>
  );
};

export default DataUser;
