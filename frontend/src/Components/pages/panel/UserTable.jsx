import React, { useContext } from "react";
import { DataContext } from '../../context/dataContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// ! TODO agregar el endpoint de usuarios para renderizar tabla

export const userTable = () => {

    const { products } = useContext(DataContext);

    return (
        <div className="overflow:hidden">
            <table className='m-10 rounded-full'>
                <thead className='bg-gray-100 dark:bg-gray-700 text-white'>
                    <tr>
                        <th scope="col" className="p-4">ID</th>
                        <th scope="col" className="p-4">Nombre</th>
                        <th scope="col" className="p-4">Descripción</th>
                        <th scope="col" className="p-4">Precio</th>
                        <th scope="col" className="p-4">Ciudad</th>
                        <th scope="col" className="p-4">País</th>
                        <th scope="col" className="p-4 text-center" colSpan="2">Accion</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map((product) => (
                            <tr className='odd:bg-gray-200 even:bg-white' key={product.id}>
                                {/* <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap"><input type="checkbox" name="" id="" /></td> */}
                                <td className="py-4 px-6 text-sm font-medium text-gray-900">{product.product_id}</td>
                                <td className="py-4 px-6 text-sm font-medium text-gray-900">{product.product_name}</td>
                                <td className="py-4 px-6 text-sm font-medium text-gray-900">{product.description}</td>
                                <td className="py-4 px-6 text-sm font-medium text-gray-900">{product.price}</td>
                                <td className="py-4 px-6 text-sm font-medium text-gray-900">{product.city}</td>
                                <td className="py-4 px-6 text-sm font-medium text-gray-900">{product.pais}</td>
                                <td className='py-4 px-6 text-sm font-medium text-gray-900'>
                                    <button>
                                        <FontAwesomeIcon
                                            className="text-[#e66a54] hover:text-[#f2ebc3]"
                                            icon="fas fa-solid fa-pencil"
                                        />
                                    </button>
                                </td>
                                <td className='py-4 px-6 text-sm font-medium text-gray-900'>
                                    <button>
                                        <FontAwesomeIcon
                                            className="text-[#e66a54] hover:text-[#f2ebc3]"
                                            icon="fas fa-solid fa-trash"
                                        />
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}