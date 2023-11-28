import { useAdminData } from '../../context/adminContext';
import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const AdminPanel = ({ product }) => {

    const { products } = useAdminData();

    return (
        <>
            <div className='flex justify-between'>
                <div className='flex flex-row p-4 gap-4'>
                    <button className='bg-[#202a44] hover:bg-[#e66a54] text-white font-bold py-2 px-4 rounded-full'>Listado de Productos</button>
                    <button className='bg-[#202a44] hover:bg-[#e66a54] text-white font-bold py-2 px-4 rounded-full'>Listado de Usuarios</button>
                </div>
                <div className='flex flex-row p-4 gap-4 justify-end'>
                    <button className='bg-[#202a44] hover:bg-[#e66a54] text-white font-bold py-2 px-4 rounded-full'>Agregar Producto</button>
                    <button className='bg-[#202a44] hover:bg-[#e66a54] text-white font-bold py-2 px-4 rounded-full'>Agregar categoría</button>
                </div>
            </div >
            <div class="flex flex-col items-center justify-center mb-5">
                <div class="overflow-x-auto shadow-md sm:rounded-lg">
                    <table className='min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700'>
                        <thead className='bg-gray-100 dark:bg-gray-700 text-white'>
                            {/* <th></th> */}
                            <th scope="col" className="p-4">ID</th>
                            <th scope="col" className="p-4">Nombre</th>
                            <th scope="col" className="p-4">Descripción</th>
                            <th scope="col" className="p-4">Precio</th>
                            <th scope="col" className="p-4">Ciudad</th>
                            <th scope="col" className="p-4">País</th>
                            <th scope="col" className="p-4 text-center" colspan="2">Accion</th>
                        </thead>
                        <tbody>
                            {
                                products.map((product) => (
                                    <tr className='odd:bg-gray-200 even:bg-white' key={product.id}>
                                        {/* <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap"><input type="checkbox" name="" id="" /></td> */}
                                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">{product.product_id}</td>
                                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">{product.product_name}</td>
                                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">{product.description}</td>
                                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">{product.price}</td>
                                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">{product.city}</td>
                                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">{product.pais}</td>
                                        <td className='py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap'>
                                            <button>
                                                <FontAwesomeIcon
                                                    className="text-[#e66a54]"
                                                    icon="fas fa-solid fa-pencil"
                                                />
                                            </button>
                                        </td>
                                        <td className='py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap'>
                                            <button>
                                                <FontAwesomeIcon
                                                    className="text-[#e66a54] hover:text-[#f2ebc3]"
                                                    icon="fa-solid fa-trash"
                                                />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default AdminPanel;