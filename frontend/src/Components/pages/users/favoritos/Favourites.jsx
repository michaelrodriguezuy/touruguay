import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../../context/DataContext";
import ProductCard from "../../../layout/cards/ProductCard";

const Favoritos = () => {
  const { fetchFavourites, favourites, products } = useContext(DataContext);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    fetchFavourites();
  }, []);

  useEffect(() => {
    //ver favorites
  }, [isLiked]);

  console.log(favourites);

  return (
    <section className="w-full flex flex-col bg-slate-200">
      <h2 className="text-center text-2xl p-10 font-bold">Mis favoritos</h2>

      <div className="grid grid-cols-1 gap-4 width-full md:grid-cols-2 md:max-w-4xl m-auto">
        {favourites && favourites.length > 0 ? (
          favourites.map((favorite) => {
            const product = products.find(
              (product) => product.product_id === favorite.product_id
            );
            
            <ProductCard
              key={product.product_id}
              product={product}
              setIsLiked={setIsLiked}
              isLiked={isLiked}
            />;
          })
        ) : (
          <p>No tienes favoritos</p>
        )}
      </div>
    </section>
  );
};

export default Favoritos;
