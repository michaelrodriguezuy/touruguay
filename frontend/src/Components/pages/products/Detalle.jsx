import React, { useContext } from "react";
import MyCalendar from "../../layout/MyCalendar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { DataContext } from "../../context/dataContext";

const Detalle = () => {
  const { productId } = useParams();
  const { product, fetchProductById } = useContext(DataContext);

  useEffect(() => {
    fetchProductById(productId);
  }, [productId]);

  if (!product) {    
    return <p>Cargando...</p>;
  }

  return (
    <section className="w-screen">
      <div className="flex justify-end pr-8 pt-4 pb-4 ">
        <Link to="/">
          <FontAwesomeIcon
            className="hover:bg-[#017999] cursor-pointer"
            icon="fa-solid fa-arrow-left"
            size="2xl"
          />
        </Link>
      </div>
      <section className="flex flex-wrap w-screen justify-center ">
        <section>
          <h1 id="title" className="text-left text-3xl sm:pl-8">
            {" "}
            {product.product_name}{" "}
          </h1>
          <div className="">
            <img className="p-8 max-w-2xl" src={product.urlImagen[0]} />
          </div>
          <h2 className="sm:pl-8 pb-4 text-xl">
          {product.city}
          </h2>
          <div className="max-w-prose">
            <p id="description" className="pb-4 px-36 sm:px-8">
              {" "}
              {product.description}
            </p>
          </div>
          <h2 id="price" className="sm:pl-8 pb-4 text-xl">
            {" "}
            $ {product.price}{" "}
          </h2>
        </section>
        <section className="pt-16">
          <div className="grid gap-2 grid-cols-2 grid-rows-2 mx-12">
            
            {product.urlImagen.slice(1, 5).map((url, index) => (
              
              <img
              key={index}
              className="w-72 h-full shadow-md"
              src={url}
              alt={`Imagen ${index + 2}`}
              />
            ))}
            
          </div>
          <p className="flex justify-end hover:text-gray-600 cursor-pointer pt-2 mr-12">
            {" "}
            <Link to={`/galeria/${productId}`}>Ver más...</Link>{" "}
          </p>
          <MyCalendar></MyCalendar>
          <div className="flex justify-end pb-4">
            <button className="rounded-xl bg-[#017999] text-white h-10 w-36 pt-2 mr-12">
              {" "}
              Lo quiero!{" "}
            </button>
          </div>
        </section>
      </section>
    </section>
  );
};

export default Detalle;
