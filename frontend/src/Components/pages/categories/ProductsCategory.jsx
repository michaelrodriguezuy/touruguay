import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../context/DataContext";
import { useParams } from "react-router";
import ProductCard from "../../layout/cards/ProductCard";

const ProductsCategory = () => {
  const { categories } = useContext(DataContext);
  //aca muestro los productos de la categoria

  const { categoryId } = useParams();
  const { productsPanel, fetchProductsPanel } = useContext(DataContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProductsPanel();
  }, []);

  if (!categoryId) {
    return <p>Cargando...</p>;
  }

  useEffect(() => {
    setProducts(
      productsPanel.filter(
        (product) =>
          parseInt(product.category.category_id) === parseInt(categoryId)
      )
    );
  }, [productsPanel]);

  return (
    <section className="flex flex-col p-4">
      <h2 className="text-center text-2xl p-10 font-bold">
        {categories &&
          categories.map((category) => {
            if (parseInt(category.category_id) === parseInt(categoryId)) {
              return category.category_name;
            }
            return null;
          })}
      </h2>
      <div className="grid grid-cols-1 gap-4 width-full md:grid-cols-2 md:max-w-4xl m-auto">
        {products &&
          products.map((product) => (
            <ProductCard key={product.product_id} product={product} />
          ))}
      </div>
    </section>
  );
};

export default ProductsCategory;
