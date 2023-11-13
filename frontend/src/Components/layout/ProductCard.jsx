import React from 'react';

const ProductCard = ({ product }) => {
    return (
        <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <img className="w-full h-48 object-cover" src={product.url} alt={product.product_name} />
            <div className="p-4">
                <h2 className="text-xl font-semibold">{product.product_name}</h2>
                <p className="text-gray-600">{product.description}</p>
                <p className="mt-2 text-gray-700">Score: {product.score}</p>
            </div>
        </div>
    );
};

export default ProductCard;