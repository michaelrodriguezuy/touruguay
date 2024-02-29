import React, { useState, useContext, useEffect } from "react";

import { DataContext } from "../../context/DataContext";
import Swal from "sweetalert2";

const AddCategory = ({ isOpen, onClose }) => {
  const { fetchAddCategory, fetchEditCategory } = useContext(DataContext);

  const [category_name, setCategory_name] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory_name(e.target.value);
  };

  const handleSubmit = async () => {
    if (images.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Debe seleccionar una imagen",
      });
      return;
    }

    const IMG = images.map((image) => ({ filename: image.name, data: image }));

    const categoryData = {
      category_name,
      description,
    };

    const resp = await fetchAddCategory(categoryData, IMG);

    console.log(resp);

    if (resp.success) {
      Swal.fire({
        icon: "success",
        title: "Categoria creada con éxito",
      });
    } else if (resp.error && resp.error.status === 409) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "La categoria ya existe",
      });
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
    setCategory_name("");
    setDescription("");
    setImages([]);
    onClose();
  };

  return (
    <section
      style={{ display: isOpen ? "block" : "none" }}
      className="z-50 fixed left-[50%] -translate-y-[50%] -translate-x-[50%] top-[50%]"
    >
      <div className="flex flex-col p-10 m-10 rounded-lg gap-3 bg-[#202a44] w-[25rem] border-2 border-white">
        <div className="flex flex-col">
          <label className="text-white m-1 flex-shrink-0">Nombre</label>
          <input
            className="rounded p-2 flex-grow"
            value={category_name}
            onChange={handleCategoryChange}
            placeholder="Escriba aqui"
          ></input>
        </div>
        <div className="flex flex-col">
          <label className="text-white m-1 flex-shrink-0 w-[6rem]">
            Descripción:
          </label>
          <textarea
            className="rounded p-1 flex-grow"
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-white m-1 flex-shrink-0 w-[6rem]">
            Imágenes:
          </label>
          <input
            className="p-2"
            type="file"
            multiple
            onChange={handleImageChange}
          />
        </div>

        <button
          className="text-white bg-[#017999] rounded p-1 hover:bg-[#1f4955]"
          onClick={handleSubmit}
        >
          Agregar
        </button>
        <button
          className="text-white bg-gray-500 rounded p-1 hover:bg-gray-700"
          onClick={handleClose}
        >
          Cerrar
        </button>
      </div>
    </section>
  );
};

export default AddCategory;
