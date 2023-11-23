import React from 'react'
import MyCalendar from '../layout/MyCalendar'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link} from "react-router-dom";
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Detalle = () => {

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
                    `http://ec2-3-93-192-148.compute-1.amazonaws.com:8080/producto/${productId}`,
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
<section className='w-screen'>
    <div className='flex justify-end pr-8 pt-4 '>
        <Link to="/">
    <FontAwesomeIcon className="hover:bg-[#017999] cursor-pointer" icon="fa-solid fa-arrow-left" size="2xl"/>
        </Link>
    </div>
    <section className="flex flex-wrap w-screen justify-center ">
        <section>
            <h1 className='text-3xl sm:pl-8 text-center sm:text-left'> {products.product_name} </h1>
            <div className="">
            <img className='p-8 max-w-2xl' src={products.urlImagen} />
            </div>
            <h2 className='sm:pl-8 pb-4 text-xl text-center sm:text-left'>SUBTÍTULO</h2>
            <p className='sm:pl-8 pb-4 text-center sm:text-left'> {products.description}</p>
            <h2 className='sm:pl-8 pb-4 text-xl text-center sm:text-left'> Desde PRECIO </h2>
        </section>
        <section className='pt-16' >
            <div className="grid gap-2 grid-cols-2 grid-rows-2 mx-12">
                <img className= "w-72 h-full shadow-md" src="https://s3-alpha-sig.figma.com/img/b491/1f88/ed0fab1d663275e869b0365f6d57f93a?Expires=1701043200&Signature=fhzH3borOQVJjylLco5~NiaH00zlC4Txqrfr5oMbU5O8E3h09lSc23tRvr5WRHUTECRKQtM6GNfrc92dde0hbal6RRXPKN92rmO8T3cD72KuGX4kYJ7bDH10qzixw-CK4TghxhnfynPigAK0fxCqnd1wWv69~4eXGKBVk6GCrLbJwLR5U1a-zsXQFE13ALLe5xWOIAM~onc~JK-GDi01D0bLLwSXFXX66jtaysV14MuO-zyzLvE2W4ae1nNRAdZzRnoCquuv~fUrx2NjuRoxTqOMGSDuMFsX0nw3~2wKZcC0TLXBDJm~XVNwSTOluj5Y-VBrC0sWIFGm0tJjQdDAIg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" alt="La Cava ubicación" />
                <img className= "w-72 h-full shadow-md" src="https://s3-alpha-sig.figma.com/img/3082/a41b/b4548734efe527feee5913223b3290e3?Expires=1701043200&Signature=YOKvK6FQ4tukkQZr00oEphHrWrwbDBiHSteP7YtUob4b1Iurd0Xad8lE8Wxi5IqI9LZm42SXhplUcmCNmXs1rELnqB0nWdcctaULRmKSWx1Mg6ZH~dv6B5GY8VzHBM0yXoxNftooSIzXI4SPGw4nPIrDf8M-sZ~CL6FpuFpAr6cnFJUD9vVeNNRDejLm4YuKRugHz8S1-w26bSXvKFf33gw4wAhjHkP8Mo2WC0YO5obtkacC4AYod78wZFPFm9W4d9g3UePbStkvneSlTUrhi-yK9YWiCH9-kDtEJcT0RDalwJPaN8lVyI7uw8fQ6lfXc8HF9jQe2dy5VwCHMBZv3A__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" alt="Francesco" />
                <img className= "w-72 h-full shadow-md" src="https://s3-alpha-sig.figma.com/img/9733/5626/396dc7e9ef9bfb2e27cfd2b442aac405?Expires=1701043200&Signature=BA0DMQWKMXXW7qh0R6hSFTGpVXdJmyoSpkH0H7WVnsGH6TMRNlxxN7v968e0rcwfB2W-iSaLWfMY57SqbRlKqkuPhp1FLMrM-wGM64Cl1acLOQtiTcqGR~wgbBmfD7OMZf96Vu799yodnrcP~KNjz37uSWpg-cccFkKr1fz4pX7tsnxY6ftUJG0x-psucjTcviTj-aZ0RxzaJ0ylPeVV1mH~eLtSXJY~N6gsq6xfcMQu39EDLhmRScmBw-j40uyngAb73SQfCCBEjJIe1QmV3fMzwZt-FYJgjBWAz7LJbFdG8fM06kM1YvysyedR2~LIrN5FmTk83DvtRV3jBgN5Hg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" alt="plato" />
                <img className= "w-72 shadow-md h-full" src="https://s3-alpha-sig.figma.com/img/2f79/810c/fd89500b6c191f3b0ab51a06d00eb8a1?Expires=1701043200&Signature=BdbLw1zrZU8Xd7EEiMgYFt2d3o8TDFiWmyo4CDzBC1DqRFaMxWoPY56fBzp3toYbKxPqD7n8IuBRJdmnRm33vUJqUeYKVjrgFkKP1ZZbQV-PV-Tkv9B8fEGoBMsT4GxWIBLrlrtRgzTj8hfmHBRvfcDlWf-9TQOQh-3e3fAA-2lfuSyk2PTjY9Qw~~mlv1TylX1LZq~fiAImPdCu4Ky9eCnTi7p7SlxXunSV1qHyBZXUW9dZf07MTyoFdGPijNe27CcNnDRk~Q16HrhgjdwTzl7zO~wFTyoU7N6C7YCqrRl1l3rgxNuW16VJfFBf9BN70qvKW2bw~nPsU3CywaP8tw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" alt="postre" />
            </div>    
                <p className='flex justify-end hover:text-gray-600 cursor-pointer pt-2 mr-12'> <Link to= {`/galeria/${productId}`} >Ver más...</Link> </p>
                <MyCalendar></MyCalendar> 
                <div className='flex justify-end pb-4'>
                    <button className='rounded-xl bg-[#017999] text-white h-10 w-36 pt-2 mr-12'> Lo quiero! </button>
                </div>
        </section>
    </section>
</section>
    )
}

export default Detalle;


//Experiencia gastronómica
//"https://s3-alpha-sig.figma.com/img/e04f/ecbc/9098d19c98cc6f21f67e558682929444?Expires=1701043200&Signature=admEQBbE2n1tv96tS7MOlg4HM1aoI~g3pt04ya6mFphh-9--nznCPTxMAEOUmKelo2NYdYUqVSgtbP~lKyNd0xzCYRMZbcL~pSMNine1dklzSX5EeNDy3JaXIsDFZMJHKn1bAK1H76gEBvQMT5ubTbHj0kpFmXDOKm4FL9ppndgGZIKfvZheyZVnnAP1~g5mDJ029-SPzO~eSAtT77lpnoWAzGirSUcjTWjNQZrlbAPNcfwVsXglRfEE43VVKla1fUqSY3TRMyPx9HZPflo0l5zx-6KMT9Cg9AjUEkjP1CMjOtuj-ei2LIyv0AKgzLX10NSxqM5lcKchsFNkgrPYjw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" alt="English Breakfast"
//Disfruta un almuerzo-cena en el Restaurante ‘La cava’ en Punta del Este.
//<br />
//Luego, podrás degustar el postre en Francesco.
//<br />
//El paquete incluye Menú de 4 pasos y traslado hasta ambos lugares.