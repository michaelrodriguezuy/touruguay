import Cards from '../layout/cards/Cards'
import 'bootstrap/dist/css/bootstrap.min.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../../App.css';
import ProductCard from '../layout/ProductCard';
import { useContext } from 'react'
import { DataProvider, useData } from '../context/dataContext';

const Home = () => {

    const { products } = useData();

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-end">
                <section className="w-min sd:w-6 flex justify-end bg-gray-100 p-4 m-4 rounded-lg mb-4">
                    <input
                        type="search"
                        placeholder="Salto en paracaídas, tour por la ciudad..."
                        className="md:w-96 sd:w-14 px-4 py-2 rounded-lg focus:outline-none"
                    />
                    <FontAwesomeIcon
                        className="searchIcon text-gray-600 ml-2"
                        icon="fas fa-search"
                    />
                </section>
            </div>
            <section className="flex-row">
                <h2 className="text-center text-2xl">Recomendados de esta semana</h2>
                <div className="flex flex-wrap justify-center content-center">
                    <div>
                        <div className="product-list">
                            {products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </div>
                    <div className="grid grid-rows-2 grid-flow-col gap-4 sm:grid-cols-1 p-8">
                        <div className="relative group">
                            <img src="1.png" alt="Desayuno" className="w-full sm:w-12 md:w-64 h-auto m-2 max-w-full" />
                            <div className="absolute inset-0 bg-[#e66a54] opacity-0 hover:opacity-50 transition-opacity duration-300"></div>
                        </div>

                        <div className="relative group">
                            <img src="2.png" alt="Brunch" className="w-full sm:w-12 md:w-64 h-auto m-2 max-w-full" />
                            <div className="absolute inset-0 bg-yellow-500 opacity-0 hover:opacity-50 transition-opacity duration-300"></div>
                        </div>

                        <div className="relative group">
                            <img src="3.png" alt="Gourmet" className="w-full sm:w-12 md:w-64 h-auto m-2 max-w-full" />
                            <div className="absolute inset-0 bg-[#017999] opacity-0 hover:opacity-50 transition-opacity duration-300"></div>
                        </div>

                        <div className="relative group">
                            <img src="4.png" alt="Relax" className="w-full sm:w-12 md:w-64 h-auto m-2 max-w-full" />
                            <div className="absolute inset-0 bg-[#f2ebc3] opacity-0 hover:opacity-50 transition-opacity duration-300"></div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
};

export default Home;