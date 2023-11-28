import React, { useState } from 'react'
import { ProductTable } from './ProductTable';
// import { UserTable } from './UserTable';
import AddProduct from './AddProduct';


export const AdminPanel = ({ product }) => {

    const [productShow, setProducts] = useState(false);
    const [userShow, setUsers] = useState(false);

    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <section>
            <div className='flex justify-between'>
                <div className='flex flex-row p-4 gap-4'>
                    <button onClick={() => setProducts(current => !current)} className='bg-[#202a44] hover:bg-[#e66a54] text-white font-bold py-2 px-4 rounded-full'>Listado de Productos</button>
                    <button onClick={() => setUsers(current => !current)} className='bg-[#202a44] hover:bg-[#e66a54] text-white font-bold py-2 px-4 rounded-full'>Listado de Usuarios</button>
                </div>
                <div className='flex flex-row p-4 gap-4 justify-end'>
                    <button onClick={openModal} className='bg-[#202a44] hover:bg-[#e66a54] text-white font-bold py-2 px-4 rounded-full'>Agregar Producto</button>
                    <button className='bg-[#202a44] hover:bg-[#e66a54] text-white font-bold py-2 px-4 rounded-full'>Agregar categoría</button>
                </div>
            </div>
            <AddProduct isOpen={modalOpen} onClose={closeModal} />
            {productShow && (
                <ProductTable />
            )}
            {/* {userShow && (
                <UserTable />
            )} */}
        </section>
    )
}

export default AdminPanel;