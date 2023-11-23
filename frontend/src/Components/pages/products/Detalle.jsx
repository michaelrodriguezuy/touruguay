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
      <div className="flex justify-end pr-8 pt-4 ">
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
          <h1 className="text-3xl sm:pl-8 text-center sm:text-left">
            {" "}
            {product.product_name}{" "}
          </h1>
          <div className="">
            <img className="p-8 max-w-2xl" src={product.urlImagen[0]} />
          </div>
          <h2 className="sm:pl-8 pb-4 text-xl text-center sm:text-left">
            DESCRIPCIÓN
          </h2>
          <p className="sm:pl-8 pb-4 text-center sm:text-left">
            {" "}
            {product.description}
          </p>
          <h2 className="sm:pl-8 pb-4 text-xl text-center sm:text-left">
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

//Experiencia gastronómica
//"https://s3-alpha-sig.figma.com/img/e04f/ecbc/9098d19c98cc6f21f67e558682929444?Expires=1701043200&Signature=admEQBbE2n1tv96tS7MOlg4HM1aoI~g3pt04ya6mFphh-9--nznCPTxMAEOUmKelo2NYdYUqVSgtbP~lKyNd0xzCYRMZbcL~pSMNine1dklzSX5EeNDy3JaXIsDFZMJHKn1bAK1H76gEBvQMT5ubTbHj0kpFmXDOKm4FL9ppndgGZIKfvZheyZVnnAP1~g5mDJ029-SPzO~eSAtT77lpnoWAzGirSUcjTWjNQZrlbAPNcfwVsXglRfEE43VVKla1fUqSY3TRMyPx9HZPflo0l5zx-6KMT9Cg9AjUEkjP1CMjOtuj-ei2LIyv0AKgzLX10NSxqM5lcKchsFNkgrPYjw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" alt="English Breakfast"
//Disfruta un almuerzo-cena en el Restaurante ‘La cava’ en Punta del Este.
//<br />
//Luego, podrás degustar el postre en Francesco.
//<br />
//El paquete incluye Menú de 4 pasos y traslado hasta ambos lugares.
