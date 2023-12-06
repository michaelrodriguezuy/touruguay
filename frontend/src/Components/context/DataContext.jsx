import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const DataContext = createContext();

const DataContextComponent = ({ children }) => {
  const { user, tokenDevelop } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);

  const [favourites, setFavourites] = useState([]);

  const [productsRandom, setProductsRandom] = useState([]);

  const [products, setProducts] = useState([]); //home y favoritos
  const [productsPanel, setProductsPanel] = useState([]); // panel

  const [product, setProduct] = useState();
  const [imgProduct, setImgProduct] = useState();

  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);

  const [bookings, setBookings] = useState([]);

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

  const fetchEditUser = async (user) => {
    try {
      const response = await axios.put(
        "http://ec2-3-93-192-148.compute-1.amazonaws.com:8080/usuario",
        user,
        { headers }
      );
      console.log(response);
      fetchUsers();
      return { success: true, data: response.data };
    } catch (error) {
      console.error("Error editando el usuario:", error);
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
        "http://ec2-3-93-192-148.compute-1.amazonaws.com:8080/rol/todosSinDTO",
        { headers }
      );
      setRoles(getRoles.data);
    } catch (error) {
      console.error("Error obteniendo roles:", error);
    }
  };

  //inicio sesion
  const fetchFavourites = async () => {
    try {
      const user1 = JSON.parse(localStorage.getItem("user"));
  
      const response = await axios.get(
        `http://ec2-3-93-192-148.compute-1.amazonaws.com:8080/favorito/${user1.id}`,
        { headers }
      );
  
      const newFavourites = response.data;
  
      setFavourites(newFavourites);
      localStorage.setItem("favourites", JSON.stringify(newFavourites));
    } catch (error) {
      console.error("Error obteniendo favoritos:", error);
    }
  };
  

  //le paso una lista de favoritos, lista temporal
  //cierro sesion
  const fetchAddFavourite = async () => {
    //lo tengo en localStorage
    const storedFav = JSON.parse(localStorage.getItem("favourites"));

    try {
      const formattedFav = mapToFavouriteStructure(storedFav);

      const response = await axios.post(
        "http://ec2-3-93-192-148.compute-1.amazonaws.com:8080/favorito",
        formattedFav,
        { headers }
      );
      //setFavourites([]);
    } catch (error) {
      console.error("Error agregando favorito:", error);
    }
  };

  const mapToFavouriteStructure = (favourites) => {
    if (favourites.length > 0) {
      return favourites.map((fav) => ({
        user: { user_id: user.id },
        product: { product_id: fav.product },
      }));
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
        "http://ec2-3-93-192-148.compute-1.amazonaws.com:8080/producto/todos",
        { headers }
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error obteniendo productos:", error);
    }
  };

  const fetchProductsPanel = async () => {
    try {
      const response = await axios.get(
        "http://ec2-3-93-192-148.compute-1.amazonaws.com:8080/producto/todosSinDTO",
        { headers }
      );
      setProductsPanel(response.data);
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

      console.log("respuesta back img: ", responseImg);

      const response = await axios.post(
        "http://ec2-3-93-192-148.compute-1.amazonaws.com:8080/producto",
        product,
        { headers }
      );

      console.log("respuesta back prod: ", response);

      if (response.status === 409) {
        console.log("El producto ya existe");
      } else {
        fetchProducts();
      }
      return { success: true, data: response.data };
    } catch (error) {
      if (error.response && error.response.status === 409) {
        return {
          success: false,
          error: { status: 409, message: "El producto ya existe" },
        };
      } else {
        return {
          success: false,
          error: {
            status: error.response.status,
            message: "Error desconocido",
          },
        };
      }
    }
  };

  const fetchEditProduct = async (product, imagen) => {
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
          return {
            success: false,
            error: { status: 409, message: "El producto ya existe" },
          };
        } else {
          return {
            success: false,
            error: {
              status: error.response.status,
              message: "Error desconocido",
            },
          };
        }
      } else {
        return {
          success: false,
          error: { status: 500, message: "Error de red" },
        };
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

  const fetchReservas = async (userId) => {
    try {
      const response = await axios.get(
        `http://ec2-3-93-192-148.compute-1.amazonaws.com:8080/reserva/usuario/${userId}`,
        { headers }
      );

      setBookings(response.data);
    } catch (error) {
      console.error("Error obteniendo reservas:", error);
    }
  };

  useEffect(() => {
    //  fetchUsers();
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
      console.error("Error registrando el usuario:", error);
    }
  };

  const fetchSendEmail = async () => {
    try {
      const response = await axios.get(
        "http://ec2-3-93-192-148.compute-1.amazonaws.com:8080/auth/email"
      );
      return response.data;
    } catch (error) {
      console.error("Error enviando el email:", error);
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



  //MANEJO DE FAVORITOS
  useEffect(() => {
    const storedFavourites = JSON.parse(localStorage.getItem('favourites')) || [];
    setFavourites(storedFavourites);
  }, []);
  const handleLike = (selectedProduct) => {
    const isLiked = favourites.some(
      (favorite) => favorite.product === selectedProduct.product_id
    );

    let updatedFavourites;

    if (isLiked) {
      updatedFavourites = favourites.filter(
        (favorite) => favorite.product !== selectedProduct.product_id
      );
    } else {
      updatedFavourites = [
        ...favourites,
        { product: selectedProduct.product_id },
      ];
    }

    setFavourites(updatedFavourites);
    localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
  };


  let data = {
    users,
    productsRandom,
    products,
    productsPanel,
    product,
    imgProduct,
    categories,
    cities,
    roles,
    bookings,
    
    fetchProductById,
    fetchImgProductById,
    fetchAddProduct,
    fetchAddCategory,
    fetchEditProduct,
    fetchDeleteProduct,
    fetchProducts,
    fetchProductsPanel,
    
    registerUser,
    loginUser,
    fetchUsers,
    fetchRoles,
    fetchDeleteUser,
    fetchEditUser,
    fetchReservas,
    fetchSendEmail,
    fetchFavourites,
    fetchAddFavourite, //pasar lista temporal de favoritos
    
    
    favourites,
    setFavourites,
    handleLike, //lo consumo desde Favoritos.jsx y Home.jsx
    
    fetchCategories,
    fetchCities,
  };

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

const fetchAddCategory = async (categories, imagen) => {
  const formData = new FormData();

  console.log("Categoria a agregar:", categories);

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

    console.log("respuesta back img: ", responseImg);

    const response = await axios.post(
      "http://ec2-3-93-192-148.compute-1.amazonaws.com:8080/categoria/todas",
      categories,
      { headers }
    );

    console.log("respuesta back catg: ", response);

    if (response.status === 409) {
      console.log("Categoria ya existente");
    } else {
      fetchCategories();
    }
    return { success: true, data: response.data };
  } catch (error) {
    if (error.response && error.response.status === 409) {
      return {
        success: false,
        error: { status: 409, message: "Categoria ya existente" },
      };
    } else {
      return {
        success: false,
        error: {
          status: error.response.status,
          message: "Error desconocido",
        },
      };
    }
  }
};

export default DataContextComponent;
