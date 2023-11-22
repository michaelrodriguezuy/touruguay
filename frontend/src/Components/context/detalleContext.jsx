// ver context ejercicio dentistas
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const DetalleContext = createContext();

export const DataProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://ec2-3-93-192-148.compute-1.amazonaws.com:8080/producto/ID',
          {
            headers: {
              'Content-Type': 'application/json',
            }
          }
        );
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <DetalleContext.Provider value={{ products }}>
      {children}
    </DetalleContext.Provider>
  );
};

export const useData = () => useContext(DetalleContext);

//http://ec2-3-93-192-148.compute-1.amazonaws.com:8080/producto/img/ID