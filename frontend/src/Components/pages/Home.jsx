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
            <section className="flex flex-col">
                <h2 className="text-center text-2xl p-10">Recomendados de esta semana</h2>
                <div className="grid grid-cols-1 gap-2 width-full md:grid-cols-2 md:max-w-lg m-auto">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </section>
            <section>
                <h2 className="text-center text-2xl p-10">Buscar por categoría</h2>
                <div className='grid grid-cols-1 gap-2 width-full md:grid-cols-2 md:max-w-lg m-auto'>
                    <div className='w-full mx-auto bg-white shadow-lg rounded-lg overflow-hidden relative'>
                        <img src='https://images.unsplash.com/photo-1496429862132-5ab36b6ae330?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'></img>
                        <h3 className='absolute bottom-1 right-1 text-2xl text-white font-bold'>Extremo</h3>
                    </div>
                    <div className='w-full mx-auto bg-white shadow-lg rounded-lg overflow-hidden relative'>
                        <img src='https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'></img>
                        <h3 className='absolute bottom-1 right-1 text-2xl text-white font-bold'>Gastronomía</h3>
                    </div>
                    <div className='w-full mx-auto bg-white shadow-lg rounded-lg overflow-hidden relative'>
                        <img src='https://images.unsplash.com/photo-1501555088652-021faa106b9b?q=80&w=2946&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'></img>
                        <h3 className='absolute bottom-1 right-1 text-2xl text-white font-bold'>Aventura</h3>
                    </div>
                    <div className='w-full mx-auto bg-white shadow-lg rounded-lg overflow-hidden relative'>
                        <img src='https://images.unsplash.com/photo-1533371452382-d45a9da51ad9?q=80&w=2946&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'></img>
                        <h3 className='absolute bottom-1 right-1 text-2xl text-white font-bold'>Místico</h3>
                    </div>
                </div>
            </section>
        </div>
    )
};

export default Home;