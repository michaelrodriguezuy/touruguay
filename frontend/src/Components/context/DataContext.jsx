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

  const token = user && user.token ? user.token : tokenDevelop;

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
      console.error("Error fetching users:", error);
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
      console.error("Error fetching products:", error);
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
      console.error("Error fetching products:", error);
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
      console.error("Error fetching product:", error);
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
      console.error("Error fetching product:", error);
    }
  };

  useEffect(() => {
    //fetchUsers();
    fetchProductsRandom();
    fetchProducts();
  }, [token]); //}, [token]);

  const registerUser = async (user) => {
    try {
      const response = await axios.post(
        "http://ec2-3-93-192-148.compute-1.amazonaws.com:8080/auth/register",
        user
      );

      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
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
    product,
    imgProduct,
    registerUser,
    loginUser,
  };

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

export default DataContextComponent;
