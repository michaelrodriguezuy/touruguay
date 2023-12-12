import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../App.css";
import ProductCard from "../layout/cards/ProductCard";
import SearchProduct from "../layout/search/SearchProduct";

import { useContext, useState } from "react";
import { DataContext } from "../context/DataContext.jsx";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "../layout/cards/CategoryCard.css";
import CategoryCard from "../layout/cards/CategoryCard.jsx";

const Home = ({ handleLike }) => {
  const { productsRandom, categories } = useContext(DataContext);

  const itemsPerPage = 9;
  const pageCount = Math.ceil(productsRandom.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(0);

  const displayedProducts = productsRandom.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="w-full flex flex-col bg-slate-200">
      <div className="grid grid-cols-1 bg-[#017999] place-content-evenly gap-10 p-10 md:px-85 md:py-10 md:grid-cols-3">
        <SearchProduct />
        <div className="flex bg-gray-100 rounded-md overflow-hidden">
          <input
            type="search"
            placeholder="¿Qué fecha te interesa?"
            className="md:w-full w-full px-4 py-2 rounded-lg focus:outline-none"
          />
          <FontAwesomeIcon
            className="searchIcon text-gray-600 ml-2"
            icon="fas fa-calendar"
          />
        </div>
        <button className=" mx-auto bg-[#202A44] hover:bg-[#131a2b] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Realizar busqueda
        </button>
      </div>

      <section className="p-4">
        <h3 className="text-center text-4xl p-10 font-bold">
          Busca por categoría
        </h3>

        <div className="mx-auto max-w-6xl ">
          <Slider {...settings} className="slick-slider-custom">
            {categories &&
              categories.map((category) => (
                <div key={category.category_id}>
                  <CategoryCard category={category} />
                </div>
              ))}
          </Slider>
        </div>
      </section>

      <section className="flex flex-col p-4">
        <h2 className="text-center text-2xl p-10 font-bold">
          Recomendados de esta semana
        </h2>
        <div className="grid grid-cols-1 gap-4 width-full md:grid-cols-2 md:max-w-4xl m-auto">
          {productsRandom &&
            productsRandom.map((product) => (
              <ProductCard
                key={product.product_id}
                product={product}
                handleLike={handleLike}
              />
            ))}
        </div>
      </section>

      <nav aria-label="Page navigation example">
        <ul className="inline-flex -space-x-px text-sm">
          <li>
            <button
              onClick={() => handlePageClick(currentPage - 1)}
              disabled={currentPage === 0}
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Previous
            </button>
          </li>
          {Array.from({ length: pageCount }, (_, index) => (
            <li key={index}>
              <button
                onClick={() => handlePageClick(index)}
                className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border ${
                  index === currentPage
                    ? "text-blue-600 bg-blue-50"
                    : "hover:bg-gray-100 hover:text-gray-700"
                } dark:border-gray-700 dark:bg-gray-700 dark:text-white`}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={() => handlePageClick(currentPage + 1)}
              disabled={currentPage === pageCount - 1}
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border rounded-e-lg border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </section>
  );
};

export default Home;
