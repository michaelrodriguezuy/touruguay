import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserForm from "./UserForm";
import { useState } from "react";
import Swal from "sweetalert2";

export const UserTable = ({
  users,
  fetchDeleteUser,
  fetchEditUser,
  setIsChange,
  roles,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [userSelected, setUserSelected] = useState(null);

  const confirmDelete = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esto.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminarlo",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUser(id);
      }
    });
  };

  const deleteUser = async (id) => {
    fetchDeleteUser(id);
    setIsChange(true);
  };

  const handleOpen = (user) => {
    setUserSelected(user);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

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
          {users &&
            users.map((user) => (
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
                      onClick={() => handleOpen(user)}
                    />
                  </button>
                </td>
                <td className="py-4 px-6 text-sm font-medium text-gray-900">
                  <button>
                    <FontAwesomeIcon
                      className="text-[#e66a54] hover:text-[#f2ebc3]"
                      icon="fas fa-solid fa-trash"
                      onClick={() => confirmDelete(user.user_id)}
                    />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <UserForm
        isOpen={modalOpen}
        onClose={closeModal}
        setIsChange={setIsChange}
        userSelected={userSelected}
        setUserSelected={setUserSelected}
        roles={roles || []}
        fetchEditUser={fetchEditUser}
      />
    </div>
  );
};
