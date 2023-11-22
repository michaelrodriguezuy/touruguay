import React, { useContext } from "react";
import { DataContext } from "../../context/dataContext";


export const AdminPanel = ({ product }) => {
  const { products } = useContext(DataContext);
  
  console.log(products);

  return (
    <>
      <div className="flex justify-end gap-4 p-4">
        <button className="bg-[#e66a54] hover:bg-[#017999] text-white font-bold py-2 px-4 rounded-full">
          Agregar
        </button>
        <button className="bg-[#e66a54] hover:bg-[#017999] text-white font-bold py-2 px-4 rounded-full">
          Eliminar
        </button>
        <button className="bg-[#e66a54] hover:bg-[#017999] text-white font-bold py-2 px-4 rounded-full">
          Editar
        </button>
      </div>
      <div class="flex flex-col items-center justify-center mb-5">
        <div class="overflow-x-auto shadow-md sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-700 text-white">
              <th></th>
              <th scope="col" class="p-4">
                ID
              </th>
              <th scope="col" class="p-4">
                Nombre
              </th>
              <th scope="col" class="p-4">
                Descripción
              </th>
              <th scope="col" class="p-4">
                Precio
              </th>
              <th scope="col" class="p-4">
                Ciudad
              </th>
              <th scope="col" class="p-4">
                País
              </th>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr className="odd:bg-gray-200 even:bg-white" key={product.id}>
                  <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">
                    <input type="checkbox" name="" id="" />
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">
                    {product.product_id}
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">
                    {product.product_name}
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">
                    {product.description}
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">
                    {product.price}
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">
                    {product.city}
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">
                    {product.pais}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
