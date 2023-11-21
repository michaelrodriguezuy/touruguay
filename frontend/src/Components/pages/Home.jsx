import 'bootstrap/dist/css/bootstrap.min.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../../App.css';
import ProductCard from '../layout/ProductCard';
import {  useData } from '../context/dataContext';

const Home = () => {

    const { products } = useData();

    return (
        <section className="w-full flex flex-col">
            <div className="grid grid-cols-1 bg-[#017999] place-content-evenly gap-4 p-10 md:px-80 md:py-4 md:grid-cols-2">
                <div className="flex bg-gray-100 rounded-md overflow-hidden">
                    <input
                        type="search"
                        placeholder="Salto en paracaídas, tour por..."
                        className="md:w-full w-full px-4 py-2 rounded-lg focus:outline-none"
                    />
                    <FontAwesomeIcon
                        className="searchIcon text-gray-600 ml-2"
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
            </div>
            <section className="flex flex-col p-4">
                <h2 className="text-center text-2xl p-10">Recomendados de esta semana</h2>
                <div className="grid grid-cols-1 gap-2 width-full md:grid-cols-2 md:max-w-lg m-auto">
                    {products && products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </section>
            <section className='p-4'>
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
                    <div className='flex flex-col py-4'>
                        <h3 className="text-2xl">Más categorías</h3>
                        <ul className='list-none'>
                            <li>Automovilismo</li>
                            <li>Paseos</li>
                            <li>Cursos y Talleres</li>
                            <li>Imperdibles</li>
                        </ul>
                    </div>
                </div>
            </section>
        </section>
    )
};

export default Home;