import React, { createContext, useState, useEffect, useContext } from 'react';
import { API_URL } from '../common/constants';
import { CurrencyContext } from '../context/currencyContext';
import Spinner from '../common/Spinner';

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {

    const { currency, currencySymbol, region } = useContext(CurrencyContext);

    const [allProducts, setAllProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [exchangeRateLoading, setExchangeRateLoading] = useState(true);
    const [error, setError] = useState(null);
    const [exchangeRate, setExchangeRate] = useState(1)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${API_URL}/products`);
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const productsData = await response.json();
                console.log(productsData)
                setAllProducts(productsData.data);
                setIsLoading(false);
            } catch (error) {
                setError(error);
                setIsLoading(false);
            }
        };

        fetchProducts();

    }, []);

    useEffect(() => {

        const fetchExchangeRate = async () => {
            try {
                const response = await fetch(`${API_URL}/products/exchange-rate?currency=${currency}`);

                if (!response.ok) {
                    console.error('Failed to convert the rates');
                }

                const data = await response.json();

                if (data.success) {
                    setExchangeRate(data.data.conversion_rate)
                    setExchangeRateLoading(false)
                }

            } catch (error) {
                console.error('Error fetching exchange rate:', error);
            }
        };

        fetchExchangeRate();
    }, [currency])


    useEffect(() => {
        for (let i = 0; i < allProducts.length; i++) {
            allProducts[i].price = Math.round(allProducts[i].price * exchangeRate);
        }
        setAllProducts([...allProducts]);
    }, [exchangeRate])

    if (isLoading) {
        return <Spinner />;
    }

    if (error) {
        return <div className='text-center my-10'>Internal Server Error</div>;
    }

    return (
        <ProductsContext.Provider value={{ allProducts, isLoading, error, exchangeRate, exchangeRateLoading }}>
            {children}
        </ProductsContext.Provider>
    );
};
