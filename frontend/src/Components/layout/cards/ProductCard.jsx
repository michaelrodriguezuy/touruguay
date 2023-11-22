import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProductCard = ({ product }) => {
  return (
    <div className="w-full mx-auto bg-white shadow-lg rounded-lg overflow-hidden relative">
      <img
        className="w-full h-48 object-cover"
        src={product.urlImagen[0]}
        alt={product.product_name}
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-[#e66a54]">
          {product.product_name}
        </h2>
        <p className="text-gray-600">{product.description}</p>
        <p className="mt-2 text-[#202a44]">Precio: ${product.price}</p>
        <button>
          <FontAwesomeIcon
            className="absolute bottom-4 right-4 text-[#e66a54] hover:text-[#f2ebc3]"
            icon="fas fa-solid fa-heart"
          />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
