import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const UserForm = ({
  isOpen,
  onClose,
  setIsChange,

  userSelected,
  setUserSelected,
  roles,
  fetchEditUser,
}) => {
  const initialUserState = {
    username: "",
    name: "",
    lastname: "",
    rol: { role_id: "" },
  };

  const [newUser, setNewUser] = useState(initialUserState);

  useEffect(() => {
    if (userSelected) {
      setNewUser({
        username: userSelected.username || "",
        name: userSelected.name || "",
        lastname: userSelected.lastname || "",
        rol: userSelected.rol ? { role_id: userSelected.rol.role_id } : null,
      });
    } else {
      setNewUser(initialUserState);
    }
  }, [userSelected]);

  const handleTextChange = (e, name) => {
    const { value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value === "" ? null : value,
    }));
  };

  const handleSelectChange = (e, name) => {
    const { value } = e.target;

    setNewUser((prevUser) => {
      const updatedUser = {
        ...prevUser,
        [name]: value === "" ? null : { role_id: value },
      };

      return updatedUser;
    });
  };

  const handleSubmit = async () => {
    let resp = "";

    if (userSelected) {
      resp = await fetchEditUser({
        user_id: userSelected.user_id,
        ...newUser,
      });
    }

    if (resp.success) {
      Swal.fire({
        icon: "success",
        title: "Usuario modificado con éxito",
      });

      setIsChange(true);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error desconocido",
      });
    }

    handleClose();
  };

  const handleClose = () => {
    onClose();
    setNewUser(initialUserState);
  };

  return (
    <section
      style={{ display: isOpen ? "block" : "none" }}
      className="z-50 fixed left-[50%] -translate-y-[50%] -translate-x-[50%] top-[50%]"
    >
      <div className="flex flex-col p-10 m-10 rounded-lg gap-3 bg-[#202a44] w-[25rem] border-2 border-white">
        <div className="flex flex-col">
          <label className="text-white m-2 flex-shrink-0 w-[6rem]">
            Email:
          </label>
          <input
            className="rounded p-1 flex-grow"
            type="text"
            value={newUser.username}
            onChange={(e) => handleTextChange(e, "username")}
            name="username"
            readOnly
            style={{ backgroundColor: "#4b5963" }}
            title="Este campo es de solo lectura"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-white m-2 flex-shrink-0 w-[6rem]">
            Nombre:
          </label>
          <textarea
            className="rounded p-1 flex-grow"
            value={newUser.name}
            onChange={(e) => handleTextChange(e, "name")}
            name="name"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-white m-2 flex-shrink-0 w-[6rem]">
            Apellido:
          </label>
          <textarea
            className="rounded p-1 flex-grow"
            value={newUser.lastname}
            onChange={(e) => handleTextChange(e, "lastname")}
            name="lastname"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-white m-2 flex-shrink-0 w-[6rem]">Rol:</label>
          <select
            className="rounded p-2 flex-grow"
            value={newUser.rol ? newUser.rol.role_id : ""}
            onChange={(e) => handleSelectChange(e, "rol")}
            name="rol"
            key="rol-select"
          >
            <option value="" disabled>
              Seleccione un Rol
            </option>
            {roles.map((rol) => (
              <option key={rol.role_id} value={rol.role_id}>
                {rol.name}
              </option>
            ))}
          </select>
        </div>

        <button
          className="text-white bg-[#017999] rounded p-2 hover:bg-[#e66a54]"
          onClick={handleSubmit}
        >
          Modificar
        </button>
        <button
          className="text-white bg-gray-500 rounded p-2 hover:bg-gray-700"
          onClick={handleClose}
        >
          Cerrar
        </button>
      </div>
    </section>
  );
};

export default UserForm;
