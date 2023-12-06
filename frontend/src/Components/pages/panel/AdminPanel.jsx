import React, { useContext, useEffect, useState } from "react";
import { ProductTable } from "./ProductTable";
import { UserTable } from "./UserTable";
import ProductForm from "./ProductForm";
import CategoryForm from "./CategoryForm";
import { DataContext } from "../../context/DataContext";

export const AdminPanel = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const [modalOpenCategory, setModalOpenCategory] = useState(false);

  const {
    users,
    roles,
    fetchUsers,
    fetchEditUser,
    fetchDeleteUser,
    fetchRoles,

    productsPanel,
    fetchProductsPanel,
    fetchAddProduct,
    fetchEditProduct,
    fetchDeleteProduct,
    fetchCategories,
    fetchCities,

    categories,
    fetchAddCatergory,
    fetchEditCategory,
    cities,
  } = useContext(DataContext);

  const [productShow, setProducts] = useState(false);
  const [userShow, setUsers] = useState(false);

  useEffect(() => {
    setIsChange(false);
    fetchProductsPanel();
    fetchUsers();
    fetchRoles();
    fetchCategories();
    fetchCities();
  }, [isChange]);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const openModalCategory = () => {
    setModalOpenCategory(true);
  };
  const closeModalCategory = () => {
    setModalOpenCategory(false);
  };

  return (
    <section>
      <div className="flex justify-between bg-slate-200">
        <div className="flex flex-row p-4 gap-4">
          <button
            onClick={() => setProducts((current) => !current)}
            className="bg-[#202a44] hover:bg-[#017999] text-white font-bold py-2 px-4 rounded-full"
          >
            Listado de Productos
          </button>
          <button
            onClick={() => setUsers((current) => !current)}
            className="bg-[#202a44] hover:bg-[#017999] text-white font-bold py-2 px-4 rounded-full"
          >
            Listado de Usuarios
          </button>
        </div>
        <div className="flex flex-row p-4 gap-4 justify-end">
          <button
            onClick={openModal}
            className="bg-[#202a44] hover:bg-[#017999] text-white font-bold py-2 px-4 rounded-full"
          >
            Agregar Producto
          </button>
          <button
            onClick={openModalCategory}
            className="bg-[#202a44] hover:bg-[#017999] text-white font-bold py-2 px-4 rounded-full"
          >
            Agregar categoría
          </button>
        </div>
      </div>
      <ProductForm
        isOpen={modalOpen}
        onClose={closeModal}
        categories={categories}
        cities={cities}
        fetchAddProduct={fetchAddProduct}
        setIsChange={setIsChange}
      />
      <CategoryForm
        isOpen={modalOpenCategory}
        onClose={closeModalCategory}
        categories={categories}

        fetchAddCatergory={fetchAddCatergory}
        fetchEditCategory={fetchEditCategory}
        setIsChange={setIsChange}
      />

      {productShow && (
        <ProductTable
          products={productsPanel}
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
