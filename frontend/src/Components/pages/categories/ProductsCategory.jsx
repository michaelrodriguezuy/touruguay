import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../context/DataContext";
import { useParams } from "react-router";
import ProductCard from "../../layout/cards/ProductCard";

const ProductsCategory = () => {
  const { fetchCategories, fetchProducts, categories, products } =
    useContext(DataContext);

  //aca muestro los productos de la categoria

  const { categoryId } = useParams();
  const [productsTemp, setProductsTemp] = useState([]);

  if (!categoryId) {
    return <p>Cargando...</p>;
  }

  useEffect(() => {
    fetchProducts();
    fetchCategories();

    setProductsTemp(
      products.filter(
        (product) => parseInt(product.categoria) === parseInt(categoryId)
      )
    );
  }, [categoryId]);

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
        {productsTemp &&
          productsTemp.map((product) => (
            <ProductCard key={product.product_id} product={product} />
          ))}
      </div>
    </section>
  );
};

export default ProductsCategory;
