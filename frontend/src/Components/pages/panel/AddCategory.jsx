import React, { useState, useContext, useEffect } from "react";

import { DataContext } from "../../context/DataContext";
import Swal from "sweetalert2";

const AddCategory = ({ isOpen, onClose }) => {
  const { fetchAddCategory, fetchCategories } = useContext(DataContext);

  const [categories, setCategories] = useState([]);
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const resp = await fetchCategories();
        setCategories(resp);
      } catch (error) {
        console.error("Error obteniendo categorías:", error);
      }
    };

    loadCategories();
  }, []);

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategories(e.target.value);
  };

  const handleSubmit = async () => {
    const productData = {
      description,
      category: { category_id: categories },
    };
    const IMG = images.map((image) => ({ filename: image.name, data: image }));

    const resp = await fetchAddCategory(productData, IMG);

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
    onClose();
  };

  return (
    <section
      style={{ display: isOpen ? "block" : "none" }}
      className="z-50 fixed left-[50%] -translate-y-[50%] -translate-x-[50%] top-[50%]"
    >
      <div className="flex flex-col p-10 m-10 rounded-lg gap-3 bg-[#202a44] w-[25rem] border-2 border-white">
        <div className="flex flex-col">
          <label className="text-white m-2 flex-shrink-0">
            Introduce el nombre de Categoria
          </label>
          <input
            className="rounded p-2 flex-grow"
            value={categories}
            onChange={handleCategoryChange}
            placeholder="Escriba aqui"
          ></input>
        </div>
        <div className="flex flex-col">
          <label className="text-white m-2 flex-shrink-0 w-[6rem]">
            Descripción:
          </label>
          <textarea
            className="rounded p-1 flex-grow"
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-white m-2 flex-shrink-0 w-[6rem]">
            Selecciona una imagen
          </label>
          <input
            className="p-2"
            type="file"
            multiple
            onChange={handleImageChange}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-white m-2 flex-shrink-0 w-[6rem]">
            Descripción:
          </label>
          <textarea
            className="rounded p-1 flex-grow"
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>
        <div className="flex flex-col">
              <label className="text-white m-2 flex-shrink-0 w-[6rem]">
                Selecciona una imagen
              </label>
              <input
                className="p-2"
                type="file"
                multiple
                onChange={handleImageChange}
              />
            </div>
        <button
          className="text-white bg-[#017999] rounded p-2 hover:bg-[#1f4955]"
          onClick={handleSubmit}
        >
          Agregar
        </button>
        <button
          className="text-white bg-gray-500 rounded p-2 hover:bg-gray-700"
          onClick={onClose}
        >
          Cerrar
        </button>
      </div>
    </section>
  );
};

export default AddCategory;
