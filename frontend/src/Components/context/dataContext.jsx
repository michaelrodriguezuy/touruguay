import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import {useAuth} from './AuthContext';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const {token} = useAuth();
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }

  useEffect(() => {
    const fetchData = async () => {
      try {       

        const productsAleatorios = await axios.get('http://ec2-3-93-192-148.compute-1.amazonaws.com:8080/producto/aleatorios?cantidad=10', { headers });
        setProducts(productsAleatorios.data);

        const getUsers = await axios.get('http://ec2-3-93-192-148.compute-1.amazonaws.com:8080/usuario', { headers });
        setUsers(getUsers.data);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); //}, [token]);

  const registerUser = async (user) => {
    try {      
      const response = await axios.post('http://ec2-3-93-192-148.compute-1.amazonaws.com:8080/usuario', user, { headers });
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  let data = { users, products, registerUser };

  return (
    <DataContext.Provider value={{ data }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
