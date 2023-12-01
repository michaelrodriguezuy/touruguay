import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const ProductForm = ({
  isOpen,
  onClose,
  setIsChange,
  productSelected,
  setProductSelected,
  categories,
  cities,
  fetchAddProduct,
  fetchEditProduct,
}) => {
  const initialProductState = {
    product_name: "",
    description: "",
    price: 0,
    category: null,
    city: null,
  };

  const [newProduct, setNewProduct] = useState(initialProductState);
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (productSelected) {
      setNewProduct((prevProduct) => ({
        ...prevProduct,
        product_name: productSelected.product_name || "",
        description: productSelected.description || "",
        price: productSelected.price || 0,
        category: productSelected?.category?.category_id || "",
        city: productSelected?.city?.city_id || "",
      }));
    } else {
      setNewProduct(initialProductState);
    }
  }, [productSelected]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value === "" ? null : value,
    }));
  };
  

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleSubmit = async () => {

    if (images.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Debe seleccionar al menos una imagen",
      });
      return;
    }

    const IMG = images.map((image) => ({ filename: image.name, data: image }));

    let resp = "";

    if (productSelected) {
      resp = await fetchEditProduct(productSelected, IMG);
    } else {
      const { category, city, ...rest } = newProduct;
      const modifiedProduct = {
        ...rest,
        category: { category_id: category !== "" ? category : null },
        city: { city_id: city !== "" ? city : null },
      };

      resp = await fetchAddProduct(modifiedProduct, IMG);
    }

    if (resp.success) {
      Swal.fire({
        icon: "success",
        title: "Producto creado con éxito",
      });
      setIsChange(true);
    } else if (resp.error && resp.error.status === 409) {
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
    handleClose();
  };

  const handleClose = () => {
    onClose();
    setNewProduct(initialProductState);
  };

  return (
    <section
      style={{ display: isOpen ? "block" : "none" }}
      className="z-50 fixed left-[50%] -translate-y-[50%] -translate-x-[50%] top-[50%]"
    >
      <div className="flex flex-col p-10 m-10 rounded-lg gap-3 bg-[#202a44] w-[25rem] border-2 border-white">
        <div className="flex flex-col">
          <label className="text-white m-2 flex-shrink-0 w-[6rem]">
            Nombre:
          </label>
          <input
            className="rounded p-1 flex-grow"
            type="text"
            value={newProduct.product_name}
            onChange={handleChange}
            name="product_name"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-white m-2 flex-shrink-0 w-[6rem]">
            Descripción:
          </label>
          <textarea
            className="rounded p-1 flex-grow"
            value={newProduct.description}
            onChange={handleChange}
            name="description"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-white m-2 flex-shrink-0 w-[6rem]">
            Precio:
          </label>
          <input
            type="number"
            step="0.01"
            className="rounded p-1 flex-grow text-right"
            value={newProduct.price}
            onChange={handleChange}
            name="price"
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

        <div className="flex flex-col">
          <label className="text-white m-2 flex-shrink-0 w-[6rem]">
            Categoría:
          </label>
          <select
            className="rounded p-2 flex-grow"
            value={newProduct.category || ""}
            onChange={(e) => handleChange(e, "category")}
            name="category"
            key="category-select"
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
            value={newProduct.city || ""}
            onChange={(e) => handleChange(e, "city")}
            name="city"
            key="city-select"
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

        <button
          className="text-white bg-[#017999] rounded p-2 hover:bg-[#e66a54]"
          onClick={handleSubmit}
        >
          {productSelected ? "Modificar" : "Agregar"}
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

export default ProductForm;
