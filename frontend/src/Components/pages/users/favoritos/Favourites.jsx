import React, { useContext, useEffect } from "react";
import { DataContext } from "../../../context/DataContext";
import ProductCard from "../../../layout/cards/ProductCard";

const Favoritos = () => {
  const { fetchFavourites, favourites, products, setFavourites } =
    useContext(DataContext);

  useEffect(() => {
    fetchFavourites();
  }, []);

  const handleLike = (selectedProduct) => {
    const isLiked = favourites.some(
      (favorite) => favorite.product === selectedProduct.product_id
    );

    if (isLiked) {
      const updatedFavourites = favourites.filter(
        (favorite) => favorite.product !== selectedProduct.product_id
      );
      setFavourites(updatedFavourites);
    } else {
      const updatedFavourites = [
        ...favourites,
        { product: selectedProduct.product_id },
      ];
      setFavourites(updatedFavourites);
    }
  };

  const favoriteProducts = favourites.map((favorite) => {
    const product = products.find(
      (product) => +product.product_id === +favorite.product
    );
    return product;
  });

  return (
    <section className="w-full flex flex-col bg-slate-200">
      <h2 className="text-center text-2xl p-10 font-bold">Mis favoritos</h2>

      <div className="grid grid-cols-1 gap-4 width-full md:grid-cols-2 md:max-w-4xl m-auto">
        {favoriteProducts &&
          favoriteProducts.length > 0 &&
          favoriteProducts.map((product) =>
            product ? (
              <ProductCard
                key={product.product_id}
                productFav={product}
                handleLike={handleLike}
              />
            ) : null
          )}
      </div>
    </section>
  );
};

export default Favoritos;
