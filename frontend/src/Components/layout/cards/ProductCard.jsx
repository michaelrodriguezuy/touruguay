import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { DataContext } from "../../context/DataContext";
import confetti from "canvas-confetti";
import { AuthContext } from "../../context/AuthContext";

const ProductCard = ({ product }) => {
  const { isLogged } = useContext(AuthContext);
  const { favourites, setFavourites } = useContext(DataContext);

  const isProductLiked = favourites.some(
    (favorite) => favorite.product === product.product_id
  );

  const handleLikeClick = () => {
    setFavourites((prevFavourites) => {
      const updatedFavourites = isProductLiked
        ? prevFavourites.filter(
            (favorite) => favorite.product !== product.product_id
          )
        : [...prevFavourites, { product: product.product_id }];

      console.log("updatedFavourites:", updatedFavourites);

      localStorage.setItem("favourites", JSON.stringify(updatedFavourites));

      confetti({
        zindex: 999,
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });

      return updatedFavourites;
    });
  };

  return (
    <div className="w-full mx-auto bg-white shadow-2xl rounded-lg overflow-hidden relative border-2 cursor-pointer transition transform hover:scale-110">
      <Link to={`/detalle/${product.product_id}`}>
        <img
          className="w-full h-48 object-cover"
          src={product.urlImagen}
          alt={product.product_name}
        />
      </Link>
      <div className="p-4">
        <Link to={`/detalle/${product.product_id}`}>
          <h2 className="text-xl font-semibold text-[#e66a54]">
            {product.product_name}
          </h2>
          <p className="text-gray-600">{product.description}</p>
          <p className="mt-2 text-[#202a44]">Precio: ${product.price}</p>
        </Link>
        {isLogged && (
          <button onClick={handleLikeClick}>
            <FontAwesomeIcon
              icon={isProductLiked ? fasHeart : farHeart}
              className="absolute bottom-4 right-4 text-[#e66a54] hover:text-[#f2ebc3]"
            />
          </button>
        )}
      </div>      
    </div>
  );
};

export default ProductCard;
