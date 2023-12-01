import React, { useContext, useEffect, useState } from "react";
import { ProductTable } from "./ProductTable";
import { UserTable } from "./UserTable";
import ProductForm from "./ProductForm";

import { DataContext } from "../../context/DataContext";

export const AdminPanel = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isChange, setIsChange] = useState(false);

  const {fetchUsers, fetchProducts, fetchAddProduct, fetchEditProduct,  fetchCategories, fetchCities, products, users, categories, cities } = useContext(DataContext);
  
  const [productShow, setProducts] = useState(false);
  const [userShow, setUsers] = useState(false);

  useEffect(() => {
    setIsChange(false);
    fetchProducts();
    fetchUsers();
    fetchCategories();
    fetchCities();
}, [isChange]);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section>
      <div className="flex justify-between">
        <div className="flex flex-row p-4 gap-4">
          <button
            onClick={() => setProducts((current) => !current)}
            className="bg-[#202a44] hover:bg-[#e66a54] text-white font-bold py-2 px-4 rounded-full"
          >
            Listado de Productos
          </button>
          <button
            onClick={() => setUsers((current) => !current)}
            className="bg-[#202a44] hover:bg-[#e66a54] text-white font-bold py-2 px-4 rounded-full"
          >
            Listado de Usuarios
          </button>
        </div>
        <div className="flex flex-row p-4 gap-4 justify-end">
          <button
            onClick={openModal}
            className="bg-[#202a44] hover:bg-[#e66a54] text-white font-bold py-2 px-4 rounded-full"
          >
            Agregar Producto
          </button>
          <button className="bg-[#202a44] hover:bg-[#e66a54] text-white font-bold py-2 px-4 rounded-full">
            Agregar categoría
          </button>
        </div>
      </div>
      <ProductForm isOpen={modalOpen} onClose={closeModal} categories={categories} cities={cities} fetchAddProduct={fetchAddProduct} setIsChange={setIsChange}/>
      
      {productShow && <ProductTable products={products} categories={categories} cities={cities} fetchEditProduct={fetchEditProduct} setIsChange={setIsChange}/>}
      {userShow && <UserTable users={users}/>}
    </section>
  );
};

export default AdminPanel;
