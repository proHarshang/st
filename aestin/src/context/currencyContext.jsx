import React, { createContext, useState } from 'react';
import { API_URL, CURRENCY_LIST } from '../common/constants';
import { useEffect } from 'react';

export const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
    const [currency, setCurrency] = useState('USD');
    const [currencySymbol, setCurrencySymbol] = useState('$');
    const [region, setRegion] = useState('US');

    const setCurrencyState = (value) => {
        setCurrency(value)
    }

    const setCurrencySymbolState = (value) => {
        setCurrencySymbol(value)
    }

    const setRegionState = (value) => {
        setRegion(value)
    }

    const fetchCurrentRegion = async () => {
        try {
            const response = await fetch(`${API_URL}/customer/region`);
            const data = await response.json();

            if (data.success) {
                const currentRegion = CURRENCY_LIST.find(item => item.value === data.data.country_code);

                setCurrencyState(currentRegion.name)
                setRegionState(currentRegion.value)
                setCurrencySymbolState(currentRegion.symbol)
            } else {
                setCurrencyState('USD')
                setRegionState('US')
                setCurrencySymbolState('$')
            }
        } catch (error) {
            setCurrencyState('USD');
            setRegionState('US');
            setCurrencySymbolState('$');
            console.error("Error fetching the Region")
        }
    }

    useEffect(() => {
        fetchCurrentRegion()
    }, [])

    return (
        <CurrencyContext.Provider value={{ currency, setCurrencyState, currencySymbol, setCurrencySymbolState, region, setRegionState }}>
            {children}
        </CurrencyContext.Provider>
    );
};
