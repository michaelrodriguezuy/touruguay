import Cards from '../layout/cards/Cards'
import 'bootstrap/dist/css/bootstrap.min.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Home = () => {
    return (
        <>

            <section className="buscador">
                <input
                    type="search"
                    placeholder="Salto en paracaídas, tour por la ciudad..."
                ></input>
                <FontAwesomeIcon
                    className="searchIcon"
                    icon="fas fa-search"
                ></FontAwesomeIcon>
            </section>
            <section className="displayHome">
                <h2> Recomendados de esta semana</h2>
                <div className='tarjetas'>
                    <Cards />
                </div>
            </section>
            <section className="cat">
                <h2>Busca por categorías</h2>
                <div>
                    <ul>
                        <li> Gastronomía</li>
                        <li>Bienestar</li>
                        <li>Aventura</li>
                        <li>Cursos y talleres</li>
                    </ul>
                    <ul>
                        <li> Imperdibles</li>
                        <li>Extremos</li>
                        <li>Paseos</li>
                        <li>Místico</li>
                    </ul>
                </div>
            </section>


        </>
    );
};

export default Home;
