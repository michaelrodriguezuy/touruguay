import React, { useContext, useEffect, useState } from "react";
import { ProductTable } from "./ProductTable";
import { UserTable } from "./UserTable";
import ProductForm from "./ProductForm";

import { DataContext } from "../../context/DataContext";

const MobileMessage = () => {
  return (
    <div className="flex justify-between bg-slate-200'">
      <p>Esta página no esta disponible en dispositivos móviles</p>
    </div>
  );
};

export const AdminPanel = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const {
    users,
    roles,
    fetchUsers,
    fetchEditUser,
    fetchDeleteUser,
    fetchRoles,

    products,
    fetchProducts,
    fetchAddProduct,
    fetchEditProduct,
    fetchDeleteProduct,
    fetchCategories,
    fetchCities,

    categories,
    cities,
  } = useContext(DataContext);

  const [productShow, setProducts] = useState(false);
  const [userShow, setUsers] = useState(false);

  useEffect(() => {
    setIsChange(false);
    fetchProducts();
    fetchUsers();
    fetchRoles();
    fetchCategories();
    fetchCities();
  }, [isChange]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section>
      {isMobile && <MobileMessage />}
      {!isMobile && (
        <div className='flex justify-between bg-slate-200'>
          <div className="flex flex-row p-4 gap-4">
            <button
              onClick={() => setProducts((current) => !current)}
              className='bg-[#202a44] hover:bg-[#017999] text-white font-bold py-2 px-4 rounded-full'
            >
              Listado de Productos
            </button>
            <button
              onClick={() => setUsers((current) => !current)}
              className='bg-[#202a44] hover:bg-[#017999] text-white font-bold py-2 px-4 rounded-full'
            >
              Listado de Usuarios
            </button>
          </div>
          <div className="flex flex-row p-4 gap-4 justify-end">
            <button
              onClick={openModal}
              className='bg-[#202a44] hover:bg-[#017999] text-white font-bold py-2 px-4 rounded-full'
            >
              Agregar Producto
            </button>
            <button className='bg-[#202a44] hover:bg-[#017999] text-white font-bold py-2 px-4 rounded-full'>
              Agregar categoría
            </button>
          </div>
        </div>
      )}
      <ProductForm
        isOpen={modalOpen}
        onClose={closeModal}
        categories={categories}
        cities={cities}
        fetchAddProduct={fetchAddProduct}
        setIsChange={setIsChange}
      />

      {productShow && (
        <ProductTable
          products={products}
          categories={categories}
          cities={cities}
          fetchDeleteProduct={fetchDeleteProduct}
          fetchEditProduct={fetchEditProduct}
          setIsChange={setIsChange}
        />
      )}
      {userShow && (
        <UserTable
          users={users}
          roles={roles}
          fetchEditUser={fetchEditUser}
          fetchDeleteUser={fetchDeleteUser}
          setIsChange={setIsChange}
        />
      )}
    </section>
  );
};

export default AdminPanel;
