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
    <section className="w-full flex flex-col bg-slate-200">
      <h2 className="text-center text-2xl p-10 font-bold">Mis favoritos</h2>
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
    </section>
  );
};

export default Favoritos;
