import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { DataContext } from "../../context/dataContext";

const Galeria = () => {
  const { productId } = useParams();
  const { imgProduct, fetchImgProductById } = useContext(DataContext);

  useEffect(() => {
    fetchImgProductById(productId);
  }, [productId]);

  if (!imgProduct) {
    return <p>Cargando...</p>;
  }

  return (
    <section className="pb-10 bg-slate-200">
      <div className="flex justify-end pr-8 pt-4 pb-4 ">
        <Link to={`/detalle/${productId}`}>
          <FontAwesomeIcon
            className="hover:bg-[#017999] cursor-pointer"
            icon="fa-solid fa-arrow-left"
            size="2xl"
          />
        </Link>
      </div>
      <div className="grid gap-2 gap-y-8 sm:grid-cols-2 grid-rows-3 justify-items-center grid-cols-1">
        {imgProduct.urlImagen.map((url, index) => (
          <img
            key={index}
            className="sm:w-1/2 h-full shadow-md"
            src={url}
            alt={`Imagen ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Galeria;


