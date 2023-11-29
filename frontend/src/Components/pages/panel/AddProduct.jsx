import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { DataContext } from "../../context/DataContext";

// ! Chequear el endpoint de los productos no funca

const AddProduct = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);

  const { fetchAddProduct } = useContext(DataContext);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleSubmit = async () => {
    const productData = {
        product_name: name,
        description,
    };
    const IMG = images.map((image) => ({ filename: image.name, data: image }))
    
    await fetchAddProduct(productData, IMG);
    onClose();
  };

  return (
    <section
      style={{ display: isOpen ? "block" : "none" }}
      className="z-50 fixed left-[50%] -translate-y-[50%] -translate-x-[50%] top-[50%]"
    >
      <div className="flex flex-col p-10 m-10 rounded-lg gap-5 bg-[#202a44] w-[25rem] border-2 border-white">
        <div className="flex flex-col">
          <label className="text-white m-2 flex-shrink-0 w-[6rem]">
            Nombre:
          </label>
          <input
            className="rounded p-2 flex-grow"
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
            className="rounded p-2 flex-grow"
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
