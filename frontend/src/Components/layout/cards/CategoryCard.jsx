import Slider from "react-slick";
import { Link } from "react-router-dom";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./CategoryCard.css";

const CategoryCard = ({ category }) => {
  return (
    <Link to={`/categorias/${category.category_id}`}>
      <div className="w-72 md:w-96 mx-auto bg-white shadow-lg rounded-lg overflow-hidden relative cursor-pointer transition transform hover:scale-110">
        <img
          src={category.urlImagen}
          className="w-full h-48 md:h-60 object-cover"
          alt={`Imagen ${category.category_name}`}
          style={{ width: "100%" }}
        />
        <h3 className="absolute bottom-1 right-1 text-2xl text-white font-bold opacity-50">
          {category.category_name}
        </h3>
      </div>
    </Link>
  );
};

export default CategoryCard;
