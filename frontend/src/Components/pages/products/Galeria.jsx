import React from 'react'
import { Link} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Galeria = () => {

    const [products, setProducts] = useState([]);
    const { productId } = useParams();
    const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBob3RtYWlsLmNvbSIsImlhdCI6MTcwMDI1Mzk0OCwiZXhwIjoxNzA4MDI5OTQ4fQ.UN5LrttadKVTDf5HG9PDjlI3NwqKc2rTPBY3bNRUDCI";

    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };
    
    useEffect(() => {
        const fetchProductById = async () => {
            try {
                const response = await axios.get(
                    `http://ec2-3-93-192-148.compute-1.amazonaws.com:8080/producto/img/${productId}` ,
                    { headers }
                );
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };
    
        fetchProductById();
    }, [productId])
    
  return (
    <section className='pb-10'>
        <div className='flex justify-end pr-8 pt-4 pb-4 '>
            <Link to={`/detalle/${productId}`}>
                <FontAwesomeIcon className="hover:bg-[#017999] cursor-pointer" icon="fa-solid fa-arrow-left" size="2xl"/>
            </Link>
        </div>
        <div className="grid gap-2 gap-y-8 sm:grid-cols-2 grid-rows-3 justify-items-center grid-cols-1">
            <img className='sm:w-1/2 h-full shadow-md' src={products.urlImagen} alt="Imagen 1" />
            <img className= "sm:w-1/2 h-full shadow-md" src={products.urlImagen} alt="Imagen 2" />
            <img className= "sm:w-1/2 h-full shadow-md" src={products.urlImagen} alt="Imagen 3" />
            <img className= "sm:w-1/2 h-full shadow-md" src={products.urlImagen} alt="Imagen 4" />
            <img className= "sm:w-1/2 shadow-md h-full" src={products.urlImagen} alt="Imagen 5" />
            <img className= "sm:w-1/2 shadow-md h-full" src={products.urlImagen} alt="Imagen 6" />
        </div> 
    </section>
    )
}

export default Galeria;

/*
<div className="grid gap-2 gap-y-8 grid-cols-2 grid-rows-3 justify-items-center">
        {products.urlImagen.map((image, index) => (
            <img 
                key={index} 
                className='w-1/2 h-full shadow-md' 
                src={products.urlImagen} 
                alt={`Imagen ${index + 1}`} />
            ))}
        </div> 

*/