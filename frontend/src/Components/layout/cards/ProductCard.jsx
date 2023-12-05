import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";
import { DataContext } from "../../context/DataContext";
import { AuthContext } from "../../context/AuthContext";
import confetti from "canvas-confetti";

const ProductCard = ({ product, productFav }) => {
  const { favourites } = useContext(DataContext);
  const { isLogged } = useContext(AuthContext);

  const selectedProduct = productFav || product;

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const productInFavorites = favourites.some(
      (favorite) => favorite.product === selectedProduct.product_id
    );
    setIsLiked(productInFavorites);
  }, [favourites, selectedProduct]);

  const handleLike = () => {
    if (isLiked) {
      favourites.splice(favourites.indexOf(selectedProduct), 1);
    } else {
      confetti({
        zindex: 999,
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });

      favourites.push(selectedProduct);
    }
    setIsLiked(!isLiked);
  };

  console.log(favourites);

  return (
    <div className="w-full mx-auto bg-white shadow-2xl rounded-lg overflow-hidden relative border-2 cursor-pointer transition transform hover:scale-110">
      <img
        className="w-full h-48 object-cover"
        src={selectedProduct.urlImagen}
        alt={selectedProduct.product_name}
      />

      <div className="p-4">
        <h2 className="text-xl font-semibold text-[#e66a54]">
          <Link to={`/detalle/${selectedProduct.product_id}`}>
            {selectedProduct.product_name}
          </Link>
        </h2>
        <p className="text-gray-600">{selectedProduct.description}</p>
        <p className="mt-2 text-[#202a44]">Precio: ${selectedProduct.price}</p>

        {isLogged && (
          <button>
            <FontAwesomeIcon
              icon={isLiked ? fasHeart : farHeart}
              className="absolute bottom-4 right-4 text-[#e66a54] hover:text-[#f2ebc3]"
              onClick={() => handleLike(selectedProduct)}
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
