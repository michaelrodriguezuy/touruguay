import React, { useContext } from "react";
import ProductCard from "../../../layout/cards/ProductCard";
import { DataContext } from "../../../context/DataContext";

const Favoritos = ({ handleLike }) => {
  const { favourites, products } = useContext(DataContext);

  const favoriteProducts = favourites.map((favorite) => {
    const product = products.find(
      (product) => product.product_id === favorite.product
    );
    return product ? { ...product, isLiked: true } : null;
  });

  const validFavoriteProducts = favoriteProducts.filter(
    (product) => product !== null
  );

  return (
    <div className="bg-slate-200">
      <div className="relative">
        <img
          className="w-full h-80 object-cover"
          src="favourites.jpg"
          alt="Banner"
        />
        <div class="absolute top-1/2 left-60 transform -translate-x-1/2 -translate-y-1/2 text-white">
          <h1 class="text-6xl font-bold">Mis favoritos</h1>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 width-full md:grid-cols-2 md:max-w-4xl m-auto">
        {validFavoriteProducts.length > 0 &&
          validFavoriteProducts.map((product) => (
            <ProductCard
              key={product.product_id}
              product={product}
              handleLike={handleLike}
            />
          ))}
      </div>
    </div>
  );
};

export default Favoritos;
