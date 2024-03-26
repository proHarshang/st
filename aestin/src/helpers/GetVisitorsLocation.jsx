import { API_URL } from "../common/constants";
import { CurrencyContext } from '../context/currencyContext';

const getVisitorsLocation = async () => {
    try {
        const response = await fetch(`${API_URL}/customer/region`);
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        throw new Error("Failed to get the region : " + error.message);
    }
};

export default getVisitorsLocation;