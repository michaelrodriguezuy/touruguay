import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { DataContext } from "../../../context/DataContext";
import { AuthContext } from "../../../context/AuthContext";
import CalendarReservas2 from "../../../layout/calendar/CalendarReservas2";

const Booking = () => {

  const { productId } = useParams();
  const { product, fetchProductById } = useContext(DataContext);
  const { user, isLogged } = useContext(AuthContext);

  useEffect(() => {
    fetchProductById(productId);
  }, [productId]);

  if (!product) {    
    return <p>Cargando...</p>;
  }


  return (
  <section>
    <h1 className="text-center text-4xl p-10 font-bold">Detalle de tu reserva:</h1>
    <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div class="md:flex">
        <div class="md:shrink-0">
          <img class="h-48 w-full object-cover md:h-full md:w-48" src={product.urlImagen[0]}/>
        </div>
        <div class="p-8">
          <div class="uppercase tracking-wide text-sm text-[#017999] font-semibold">{product.city}</div>
          <p class="block mt-1 text-lg leading-tight font-medium text-black hover:underline">{" "}
            {product.product_name}{" "}</p>
          <p class="mt-2 text-slate-500">{" "}
              {product.description}</p>
          <p className="mt-2 text-slate-500">
            {" "}
            $ {product.price}{" "}
          </p>
        </div>
      </div>
    </div>
    <div className="flex flex-col items-center p-10">
      <h2 className="text-2xl font-semibold">Usuario:</h2>
      <p className="text-[#017999] text-[#017999] p-3 text-xl">{user.name} {user.lastname}</p>
      <p className="text-[#017999] text-[#017999] text-xl">{user.username}</p>
    </div>
    <CalendarReservas2></CalendarReservas2>
    <div className="flex p-20 justify-center">
      <Link to="/booking/:productId/confirm"><button type="submit" className="rounded-xl bg-[#017999] text-white h-10 w-36 pt-2 mr-12">Confirmar</button></Link>
      <Link to="/">
        <button className="rounded-xl bg-[#E66A54] text-white h-10 w-36 pt-2 mr-12">Cancelar</button>
      </Link>
    </div>
  </section>  
  );
};

export default Booking;
