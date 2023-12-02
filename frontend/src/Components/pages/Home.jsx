import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../App.css";
import ProductCard from "../layout/cards/ProductCard";

import { useContext, useState } from "react";
import { DataContext } from "../context/dataContext";

const Home = () => {
  const { productsRandom } = useContext(DataContext);

  const itemsPerPage = 9;
  const pageCount = Math.ceil(productsRandom.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(0);

  const displayedProducts = productsRandom.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handlePageClick = ({ page }) => {
    setCurrentPage(page);
  };

  return (
    <section className="w-full flex flex-col bg-slate-200">
      <div className="grid grid-cols-1 bg-[#017999] place-content-evenly gap-10 p-10 md:px-85 md:py-10 md:grid-cols-3">
        <div className="flex bg-gray-100 rounded-md overflow-hidden">
        <h2 className="text-center">Realiza una busqueda</h2>
          <input
            type="search"
            placeholder="Salto en paracaídas, tour por..."
            className="md:w-full w-full px-6 py-2 rounded-lg focus:outline-none"
          />
          <FontAwesomeIcon
            className="searchIcon text-gray-600 ml-1"
            icon="fas fa-search"
          />
        </div>
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
          Realizar busqueda</button>
      </div>
      <section className="p-4">
        <h2 className="text-center text-2xl p-10 font-bold">Busca por categoria</h2>
        <div class="flex flex-row gap-4 justify-center m-auto">

          <div className="w-72 md:w-96 mx-auto bg-white shadow-lg rounded-lg overflow-hidden relative cursor-pointer transition transform hover:scale-110">
            <img src="https://images.unsplash.com/photo-1496429862132-5ab36b6ae330?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" class="w-full h-48 md:h-64 object-cover" alt="Imagen"></img>
            <h3 class="absolute bottom-1 right-1 text-2xl text-white font-bold opacity-50">
              Extremo
            </h3>
          </div>
          <div className="w-72 md:w-96 mx-auto bg-white shadow-lg rounded-lg overflow-hidden relative cursor-pointer transition transform hover:scale-110">
            <img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" class="w-full h-48 md:h-64 object-cover" alt="Imagen"></img>
            <h3 className="absolute bottom-1 right-1 text-2xl text-white font-bold opacity-50">
              Gastronomía
            </h3>
          </div>
          <div className="w-72 md:w-96 mx-auto bg-white shadow-lg rounded-lg overflow-hidden relative cursor-pointer transition transform hover:scale-110">
            <img src="https://images.unsplash.com/photo-1501555088652-021faa106b9b?q=80&w=2946&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" class="w-full h-48 md:h-64 object-cover" alt="Imagen"></img>
            <h3 className="absolute bottom-1 right-1 text-2xl text-white font-bold opacity-50">
              Aventura
            </h3>
          </div>
          <div className="w-72 md:w-96 mx-auto bg-white shadow-lg rounded-lg overflow-hidden relative cursor-pointer transition transform hover:scale-110">
            <img src="https://images.unsplash.com/photo-1533371452382-d45a9da51ad9?q=80&w=2946&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" class="w-full h-48 md:h-64 object-cover" alt="Imagen"></img>
            <h3 className="absolute bottom-1 right-1 text-2xl text-white font-bold opacity-50">
              Místico
            </h3>
          </div>
        </div>
      </section>

      <section className="flex flex-col p-4">
        <h2 className="text-center text-2xl p-10 font-bold">
          Recomendados de esta semana
        </h2>
        <div className="grid grid-cols-1 gap-4 width-full md:grid-cols-2 md:max-w-4xl m-auto">
          {productsRandom &&
            productsRandom.map((product) => (
              <ProductCard key={product.product_id} product={product} />
            ))}
        </div>
      </section>

      <section className="flex justify-center">
        <div>
          <h3 className="text-4xl font-bold text-center">Mas categorias</h3>
          <div className="flex flex-row py-4 space-x-4 gap-10">
          <button className=" mx-auto bg-slate-400 hover:bg-[#b4b6bc] text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline cursor-pointer transition transform hover:scale-110">
          Automovilismo</button>
          <button className=" mx-auto bg-slate-400 hover:bg-[#b4b6bc] text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline cursor-pointer transition transform hover:scale-110">
          Paseos</button>
          <button className=" mx-auto bg-slate-400 hover:bg-[#b4b6bc] text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline cursor-pointer transition transform hover:scale-110">
          Cursos y Talleres</button>
          <button className=" mx-auto bg-slate-400 hover:bg-[#b4b6bc] text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline cursor-pointer transition transform hover:scale-110">
          Imperdibles</button>
          <button className=" mx-auto bg-slate-400 hover:bg-[#b4b6bc] text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline cursor-pointer transition transform hover:scale-110">
          Arquitectura</button>
          <button className=" mx-auto bg-slate-400 hover:bg-[#b4b6bc] text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline cursor-pointer transition transform hover:scale-110">
          Deporte</button>
          <button className=" mx-auto bg-slate-400 hover:bg-[#b4b6bc] text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline cursor-pointer transition transform hover:scale-110">
          Museos</button>
            </div>
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