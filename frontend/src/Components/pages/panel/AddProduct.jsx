import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

// ! Chequear el endpoint de los productos no funca

const AddProduct = ({ isOpen, onClose }) => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]);

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleImageChange = (e) => {
        setImages(Array.from(e.target.files));
    };

    const { user, tokenDevelop } = useContext(AuthContext);

    let token;
    if (user && user.token) {
        token = user.token;
    } else {
        token = tokenDevelop;
    }

    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };

    const handleSubmit = async () => {
        try {
            const productData = {
                name,
                description,
                images: images.map((image) => ({ filename: image.name, data: image })),
            };

            const response = await axios.post('http://ec2-3-93-192-148.compute-1.amazonaws.com:8080/producto', productData);

            console.log('Product created successfully:', response.data);

            onClose();

        } catch (error) {

            console.error('Error creating product:', error);
        }
    };

    return (
        <section style={{ display: isOpen ? 'block' : 'none' }} className='z-50 fixed left-[50%] -translate-y-[50%] -translate-x-[50%] top-[50%]'>
            <div className="flex flex-col p-10 m-10 rounded-lg gap-5 bg-[#202a44] w-[25rem] border-2 border-white">
                <div className='flex flex-col'>
                    <label className='text-white m-2 flex-shrink-0 w-[6rem]'>Nombre:</label>
                    <input className='rounded p-2 flex-grow' type="text" value={name} onChange={handleNameChange} />
                </div>
                <div className='flex flex-col'>
                    <label className='text-white m-2 flex-shrink-0 w-[6rem]'>Descripción:</label>
                    <textarea className='rounded p-2 flex-grow' value={description} onChange={handleDescriptionChange} />
                </div>
                <div className='flex flex-col'>
                    <label className='text-white m-2 flex-shrink-0 w-[6rem]'>Imágenes:</label>
                    <input className='p-2' type="file" multiple onChange={handleImageChange} />
                </div>
                <button className='text-white bg-[#017999] rounded p-2 hover:bg-[#e66a54]' onClick={handleSubmit}>
                    Agregar
                </button>
                <button className='text-white bg-gray-500 rounded p-2 hover:bg-gray-700' onClick={onClose}>
                    Cerrar
                </button>
            </div >
        </section >
    );
};

export default AddProduct;
