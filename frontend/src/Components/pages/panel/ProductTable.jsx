import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Swal from "sweetalert2";
import ProductForm from "./ProductForm";

export const ProductTable = ({
  setIsChange,
  fetchAddProduct,
  fetchEditProduct,
  fetchDeleteProduct,
  products,
  categories,
  cities,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [productSelected, setProductSelected] = useState(null);

  const confirmDelete = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esto.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminarlo",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(id);
      }
    });
  };

  const deleteProduct = (id) => {
    fetchDeleteProduct(id);
    setIsChange(true);
  };

  const handleOpen = (product) => {
    setProductSelected(product);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="overflow:hidden">
      <table className="m-10 rounded-full">
        <thead className="bg-gray-100 dark:bg-gray-700 text-white">
          <tr>
            <th scope="col" className="p-4">
              ID
            </th>
            <th scope="col" className="p-4">
              Nombre
            </th>
            <th scope="col" className="p-4">
              Descripción
            </th>
            <th scope="col" className="p-4">
              Categoría
            </th>
            <th scope="col" className="p-4">
              Precio
            </th>
            <th scope="col" className="p-4">
              Ciudad
            </th>
            <th scope="col" className="p-4">
              País
            </th>
            <th scope="col" className="p-4 text-center" colSpan="2">
              Accion
            </th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products.map((product) => (
              <tr
                className="odd:bg-gray-200 even:bg-white"
                key={product.product_id}
              >
                {/* <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap"><input type="checkbox" name="" id="" /></td> */}
                <td className="py-4 px-6 text-sm font-medium text-gray-900">
                  {product.product_id}
                </td>
                <td className="py-4 px-6 text-sm font-medium text-gray-900">
                  {product.product_name}
                </td>
                <td className="py-4 px-6 text-sm font-medium text-gray-900">
                  {product.description}
                </td>

                <td className="py-4 px-6 text-sm font-medium text-gray-900">
                  {product.category.category_name}
                </td>

                <td className="py-4 px-6 text-sm font-medium text-gray-900">
                  {product.price}
                </td>
                <td className="py-4 px-6 text-sm font-medium text-gray-900">
                  {product.city.city_name}
                </td>
                <td className="py-4 px-6 text-sm font-medium text-gray-900">
                  {product.city.country.country_name}
                </td>
                <td className="py-4 px-6 text-sm font-medium text-gray-900">
                  <button>
                    <FontAwesomeIcon
                      className="text-[#e66a54] hover:text-[#f2ebc3]"
                      icon="fas fa-solid fa-pencil"
                      onClick={() => handleOpen(product)}
                    />
                  </button>
                </td>
                <td className="py-4 px-6 text-sm font-medium text-gray-900">
                  <button>
                    <FontAwesomeIcon
                      className="text-[#e66a54] hover:text-[#f2ebc3]"
                      icon="fas fa-solid fa-trash"
                      onClick={() => confirmDelete(product.product_id)}
                    />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <ProductForm
        isOpen={modalOpen}
        onClose={closeModal}
        setIsChange={setIsChange}
        productSelected={productSelected}
        setProductSelected={setProductSelected}
        fetchAddProduct={fetchAddProduct}
        fetchEditProduct={fetchEditProduct}
        categories={categories}
        cities={cities}
      />
    </div>
  );
};
