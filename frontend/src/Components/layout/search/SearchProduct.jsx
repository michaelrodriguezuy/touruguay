import React, { useState, useContext, useEffect } from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DataContext } from '../../context/DataContext';

const ProductSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { products } = useContext(DataContext);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [fetchedProducts, setFetchedProducts] = useState([]);

    useEffect(() => {
    }, [products]);

    const handleSearch = async (e) => {
        const term = e.target.value;
        setSearchTerm(term);

        if (term.trim() === '') {
            setFilteredProducts([]);
            return;
        }

        if (fetchedProducts) {
            const filteredProducts = products.filter((product) =>
                product.product_name && product.product_name.toLowerCase().includes(term.toLowerCase())
            );
            setFilteredProducts(filteredProducts);
        }
    };


    return (
        <div className="flex flex-col bg-gray-100 rounded-md relative">
            <div className='flex'>
                <label htmlFor="productSearch" className="sr-only">
                </label>
                <input
                    id="productSearch"
                    type="search"
                    placeholder="Salto en paracaídas, tour por..."
                    className="md:w-full w-full px-4 py-2 rounded-lg focus:outline-none"
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <FontAwesomeIcon
                    className="searchIcon text-gray-600 ml-2"
                    icon="fas fa-search"
                />
            </div>
            <div className='w-full absolute top-10 bg-white z-10 rounded-md'>
                <ul className=''>
                    {filteredProducts.map((product) => (
                        <li className='pl-2' key={product.product_id}>{product.product_name}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ProductSearch;