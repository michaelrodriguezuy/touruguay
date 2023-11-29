<<<<<<< .merge_file_a26696
import React, { useState, useContext } from "react";
=======
import React, { useState, useContext, useEffect } from "react";
>>>>>>> .merge_file_a31712
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { DataContext } from "../../context/DataContext";

<<<<<<< .merge_file_a26696
// ! Chequear el endpoint de los productos no funca
=======
import Swal from "sweetalert2";
>>>>>>> .merge_file_a31712

const AddProduct = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);

<<<<<<< .merge_file_a26696
  const { fetchAddProduct } = useContext(DataContext);
=======
  const { fetchAddProduct, fetchCategories, fetchCities } =
    useContext(DataContext);

  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const resp = await fetchCategories();
        setCategories(resp);
      } catch (error) {
        console.error("Error obteniendo categorías:", error);
      }
    };

    const loadCities = async () => {
      try {
        const resp = await fetchCities();

        setCities(resp);
      } catch (error) {
        console.error("Error obteniendo ciudades:", error);
      }
    };

    loadCategories();
    loadCities();
  }, []);
>>>>>>> .merge_file_a31712

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

<<<<<<< .merge_file_a26696
  const handleSubmit = async () => {
    const productData = {
        product_name: name,
        description,
    };
    const IMG = images.map((image) => ({ filename: image.name, data: image }))
    
    await fetchAddProduct(productData, IMG);
=======
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const handleSubmit = async () => {
    const productData = {
      product_name: name,
      description,
      category: { category_id: selectedCategory },
      city: { city_id: selectedCity },
    };
    const IMG = images.map((image) => ({ filename: image.name, data: image }));

    const resp = await fetchAddProduct(productData, IMG);

    console.log(resp);

    if (resp.success) {
      Swal.fire({
        icon: "success",
        title: "Producto creado con éxito",
      });
    }  else if (resp.error && resp.error.status === 409) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "El producto ya existe",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error desconocido",
      });
    }
>>>>>>> .merge_file_a31712
    onClose();
  };

  return (
    <section
      style={{ display: isOpen ? "block" : "none" }}
      className="z-50 fixed left-[50%] -translate-y-[50%] -translate-x-[50%] top-[50%]"
    >
<<<<<<< .merge_file_a26696
      <div className="flex flex-col p-10 m-10 rounded-lg gap-5 bg-[#202a44] w-[25rem] border-2 border-white">
=======
      <div className="flex flex-col p-10 m-10 rounded-lg gap-3 bg-[#202a44] w-[25rem] border-2 border-white">
>>>>>>> .merge_file_a31712
        <div className="flex flex-col">
          <label className="text-white m-2 flex-shrink-0 w-[6rem]">
            Nombre:
          </label>
          <input
<<<<<<< .merge_file_a26696
            className="rounded p-2 flex-grow"
=======
            className="rounded p-1 flex-grow"
>>>>>>> .merge_file_a31712
            type="text"
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-white m-2 flex-shrink-0 w-[6rem]">
            Descripción:
          </label>
          <textarea
<<<<<<< .merge_file_a26696
            className="rounded p-2 flex-grow"
=======
            className="rounded p-1 flex-grow"
>>>>>>> .merge_file_a31712
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-white m-2 flex-shrink-0 w-[6rem]">
            Imágenes:
          </label>
          <input
            className="p-2"
            type="file"
            multiple
            onChange={handleImageChange}
          />
        </div>
<<<<<<< .merge_file_a26696
=======

        <div className="flex flex-col">
          <label className="text-white m-2 flex-shrink-0 w-[6rem]">
            Categoría:
          </label>
          <select
            className="rounded p-2 flex-grow"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="" disabled>
              Seleccione una categoría
            </option>
            {categories.map((category) => (
              <option key={category.category_id} value={category.category_id}>
                {category.category_name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-white m-2 flex-shrink-0 w-[6rem]">
            Ciudad:
          </label>
          <select
            className="rounded p-2 flex-grow"
            value={selectedCity}
            onChange={handleCityChange}
          >
            <option value="" disabled>
              Seleccione una ciudad
            </option>
            {cities.map((city) => (
              <option key={city.city_id} value={city.city_id}>
                {city.city_name}
              </option>
            ))}
          </select>
        </div>

>>>>>>> .merge_file_a31712
        <button
          className="text-white bg-[#017999] rounded p-2 hover:bg-[#e66a54]"
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

export default AddProduct;
