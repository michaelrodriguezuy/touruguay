import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://ec2-3-93-192-148.compute-1.amazonaws.com:8080/producto/aleatorios?cantidad=4',
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
    <DataContext.Provider value={{ products }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
