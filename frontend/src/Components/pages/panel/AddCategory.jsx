import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { DataContext } from "../../context/DataContext";

import Swal from "sweetalert2";

const AddCategory = ({ isOpen, onClose }) => {
  const { fetchAddCategory, fetchCategories} =
    useContext(DataContext);

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
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

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSubmit = async () => {
    const productData = {
      category: { category_id: selectedCategory }
    };

    const resp = await fetchAddCategory(productData, IMG);

    console.log(resp);

    if (resp.success) {
      Swal.fire({
        icon: "success",
        title: "Categoria creada con éxito",
      });
    }  else if (resp.error && resp.error.status === 409) {
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
            value={selectedCategory}
            onChange={handleCategoryChange}
            placeholder="Escriba aqui"
          >

          </input>
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
