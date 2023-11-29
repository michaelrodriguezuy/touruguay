import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const DataContext = createContext();

const DataContextComponent = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [productsRandom, setProductsRandom] = useState([]);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState();
  const [imgProduct, setImgProduct] = useState();

  const { user, tokenDevelop } = useContext(AuthContext);

  let token;
  if (user && user.token) {
    token = user.token;
  } else {
    token = tokenDevelop;
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const fetchUsers = async () => {
    try {
      const getUsers = await axios.get(
        "http://ec2-3-93-192-148.compute-1.amazonaws.com:8080/usuario/todos",
        { headers }
      );
      setUsers(getUsers.data);
    } catch (error) {
      console.error("Error obteniendo usuarios:", error);
      console.error("Error obteniendo usuarios:", error);
    }
  };

  const fetchProductsRandom = async () => {
    try {
      const productsRandom = await axios.get(
        "http://ec2-3-93-192-148.compute-1.amazonaws.com:8080/producto/aleatorios?cantidad=10",
        { headers }
      );
      setProductsRandom(productsRandom.data);
    } catch (error) {
      console.error("Error obteniendo productos random:", error);
      console.error("Error obteniendo productos random:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://ec2-3-93-192-148.compute-1.amazonaws.com:8080/producto/todos",
        { headers }
      );
      
      setProducts(response.data);
    } catch (error) {
      console.error("Error obteniendo productos:", error);
      console.error("Error obteniendo productos:", error);
    }
  };

  const fetchProductById = async (productId) => {
    try {
      const response = await axios.get(
        `http://ec2-3-93-192-148.compute-1.amazonaws.com:8080/producto/${productId}`,
        { headers }
      );
      setProduct(response.data);
    } catch (error) {
      console.error("Error obteniendo el producto:", error);
      console.error("Error obteniendo el producto:", error);
    }
  };

  const fetchImgProductById = async (productId) => {
    try {
      const response = await axios.get(
        `http://ec2-3-93-192-148.compute-1.amazonaws.com:8080/producto/img/${productId}`,
        { headers }
      );
      setImgProduct(response.data);
    } catch (error) {
      console.error("Error obteniendo las imagenes del producto:", error);
    }
  };

  const fetchAddProduct = async (product, imagen) => {
    const formData = new FormData();

    imagen.forEach((image) => {
      formData.append("imagen", image.data, image.filename);
    });

    try {
      const responseImg = await axios.post(
        "http://ec2-3-93-192-148.compute-1.amazonaws.com:8080/imagen",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const response = await axios.post(
        "http://ec2-3-93-192-148.compute-1.amazonaws.com:8080/producto",
        product,
        { headers }
      );
      
      if (response.status === 409) {
        console.log("El producto ya existe");      
      } else {      
        fetchProducts();
      }
      return { success: true, data: response.data };

    } catch (error) {
      if (error.response && error.response.status === 409) {
        return { success: false, error: { status: 409, message: "El producto ya existe" } };
      } else {
        return { success: false, error: { status: error.response.status, message: "Error desconocido" } };
      }
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://ec2-3-93-192-148.compute-1.amazonaws.com:8080/categoria/todas",
        { headers }
      );
      return response.data;
    } catch (error) {
      console.error("Error obteniendo categorias:", error);
    }
  };

  const fetchCities = async () => {
    try {
      const response = await axios.get(
        "http://ec2-3-93-192-148.compute-1.amazonaws.com:8080/ciudad/todas",
        { headers }
      );
      return response.data;
    } catch (error) {
      console.error("Error obteniendo ciudades:", error);
    }
  };

  useEffect(() => {
  //  fetchUsers();
    fetchProductsRandom();
//    fetchProducts();
  }, [token]); //}, [token]);

  const registerUser = async (user) => {
    try {
      const response = await axios.post(
        "http://ec2-3-93-192-148.compute-1.amazonaws.com:8080/auth/register",
        user
      );
      return response.data;
    } catch (error) {
      console.error("Error registrando el usuario:", error);
    }
  };

  const loginUser = async (user) => {
    try {
      const response = await axios.post(
        "http://ec2-3-93-192-148.compute-1.amazonaws.com:8080/auth/login",
        user
      );

      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    } finally {
      console.log("Fin de la solicitud");
    }
  };

  let data = {
    users,
    productsRandom,
    products,
    fetchProductById,
    fetchImgProductById,
    fetchUsers,
    fetchProducts,
    product,
    imgProduct,
    fetchAddProduct,

    fetchCategories,
    fetchCities,

    registerUser,
    loginUser,
  };

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

export default DataContextComponent;
