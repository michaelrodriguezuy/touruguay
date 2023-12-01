import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const DataContext = createContext();

const DataContextComponent = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [productsRandom, setProductsRandom] = useState([]);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState();
  const [imgProduct, setImgProduct] = useState();

  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);

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
    }
  };
  
  const fetchDeleteUser = async (userId) => {
    try {
      const deleteUser = await axios.delete(
        `http://ec2-3-93-192-148.compute-1.amazonaws.com:8080/usuario/${userId}`,
        { headers }
      );
      console.log(deleteUser);
      fetchUsers();
    } catch (error) {
      console.error("Error eliminando el usuario:", error);
    }
  };
  
  const fetchRoles = async () => {
    try {
      const getRoles = await axios.get(
        "http://ec2-3-93-192-148.compute-1.amazonaws.com:8080/roles",
        { headers }
      );
      setRoles(getRoles.data);
    } catch (error) {
      console.error("Error obteniendo roles:", error);
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
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://ec2-3-93-192-148.compute-1.amazonaws.com:8080/producto/todosSinDTO",
        { headers }
      );
      setProducts(response.data);    
            
    } catch (error) {
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
  
  const fetchEditProduct = async (product, imagen) => {

    console.log("producto pa actualizar:",product);
    console.log("imagen pa actualizar:",imagen);
    
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

      const response = await axios.put(
        "http://ec2-3-93-192-148.compute-1.amazonaws.com:8080/producto",
        product,
        { headers }
      );
    console.log(response);

      fetchProducts();
      return { success: true, data: response.data };

    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          return { success: false, error: { status: 409, message: "El producto ya existe" } };
        } else {
          return { success: false, error: { status: error.response.status, message: "Error desconocido" } };
        }
      } else {        
        return { success: false, error: { status: 500, message: "Error de red" } };
      }
    }
    
  };



  const fetchDeleteProduct = async (productId) => {
    try {
      
      const deleteProduct = await axios.delete(
        `http://ec2-3-93-192-148.compute-1.amazonaws.com:8080/producto/${productId}?eliminarImagenes=true`,         
        { headers }
      );
      
      fetchProducts();
    } catch (error) {
      console.error("Error eliminando el producto:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://ec2-3-93-192-148.compute-1.amazonaws.com:8080/categoria/todas",
        { headers }
      );
      setCategories(response.data);
      
      // return response.data;
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
      setCities(response.data); 
      
      // return response.data;
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
    product,
    imgProduct,
    categories,
    cities,
    roles,

    fetchProductById,
    fetchImgProductById,
    fetchProducts,
    fetchAddProduct,
    fetchEditProduct,
    fetchDeleteProduct,

    registerUser,
    loginUser,
    fetchUsers,
    fetchDeleteUser,
      
    fetchCategories,
    fetchCities,
  };

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

export default DataContextComponent;
