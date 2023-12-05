import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";
import { DataContext } from "../../context/DataContext";
import { AuthContext } from "../../context/AuthContext";
import confetti from "canvas-confetti";

const ProductCard = ({ product }) => {
  const { favourites } = useContext(DataContext);
  const { isLogged } = useContext(AuthContext);

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const productInFavorites = favourites.find(
      (favorite) => favorite.product_id === product.product_id
    );
    setIsLiked(!!productInFavorites);
  }, [favourites, product]);

  const handleLike = () => {
    if (isLiked) {
      favourites.splice(favourites.indexOf(product), 1);
    } else {
      confetti({
        zindex: 999,
        particleCount: 100, //cantidad de papelitos
        spread: 70, //cuanto se esparcen
        origin: { y: 0.6 }, //desde donde salen
      });

      favourites.push(product);
    }
    setIsLiked(!isLiked);
  };

  return (
    <div className="w-full mx-auto bg-white shadow-2xl rounded-lg overflow-hidden relative border-2 cursor-pointer transition transform hover:scale-110">
      <img
        className="w-full h-48 object-cover"
        src={product.urlImagen}
        alt={product.product_name}
      />

      <div className="p-4">
        <h2 className="text-xl font-semibold text-[#e66a54]">
          <Link to={`/detalle/${product.product_id}`}>
            {product.product_name}
          </Link>
        </h2>
        <p className="text-gray-600">{product.description}</p>
        <p className="mt-2 text-[#202a44]">Precio: ${product.price}</p>

        {isLogged && (
          <button>
            <FontAwesomeIcon
              icon={isLiked ? fasHeart : farHeart}
              className="absolute bottom-4 right-4 text-[#e66a54] hover:text-[#f2ebc3]"
              onClick={handleLike}
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
