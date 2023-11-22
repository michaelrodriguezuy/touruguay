import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AdminDataContext = createContext();

export const AdminDataProvider = ({ children }) => {
    const [products, setProducts] = useState([]);

    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBob3RtYWlsLmNvbSIsImlhdCI6MTcwMDI1Mzk0OCwiZXhwIjoxNzA4MDI5OTQ4fQ.UN5LrttadKVTDf5HG9PDjlI3NwqKc2rTPBY3bNRUDCI';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://ec2-3-93-192-148.compute-1.amazonaws.com:8080/producto/todos',
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
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
        <AdminDataContext.Provider value={{ products }}>
            {children}
        </AdminDataContext.Provider>
    );
};

export const useAdminData = () => useContext(AdminDataContext);
