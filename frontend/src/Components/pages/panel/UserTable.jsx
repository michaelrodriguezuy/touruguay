import React, { useContext, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DataContext } from "../../context/DataContext";

export const UserTable = () => {
  const { users, fetchUsers} = useContext(DataContext);

  useEffect(() => {
    fetchUsers();
  }
    , []);    

  return (
    <div className="overflow:hidden">
      <table className="m-10 rounded-full">
        <thead className="bg-gray-100 dark:bg-gray-700 text-white">
          <tr>
            <th scope="col" className="p-4">
              ID
            </th>
            <th scope="col" className="p-4">
              Username
            </th>
            <th scope="col" className="p-4">
              Nombre
            </th>
            <th scope="col" className="p-4">
              Apellido
            </th>
            <th scope="col" className="p-4">
              Rol
            </th>
            <th scope="col" className="p-4 text-center" colSpan="2">
              Accion
            </th>
          </tr>
        </thead>
        <tbody>            
          {users.map((user) => (
            <tr className="odd:bg-gray-200 even:bg-white" key={user.user_id}>
              {/* <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap"><input type="checkbox" name="" id="" /></td> */}
              <td className="py-4 px-6 text-sm font-medium text-gray-900">
                {user.user_id}
              </td>
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
                {user.rol.name}
              </td>
              <td className="py-4 px-6 text-sm font-medium text-gray-900">
                <button>
                  <FontAwesomeIcon
                    className="text-[#e66a54] hover:text-[#f2ebc3]"
                    icon="fas fa-solid fa-pencil"
                  />
                </button>
              </td>
              <td className="py-4 px-6 text-sm font-medium text-gray-900">
                <button>
                  <FontAwesomeIcon
                    className="text-[#e66a54] hover:text-[#f2ebc3]"
                    icon="fas fa-solid fa-trash"
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
