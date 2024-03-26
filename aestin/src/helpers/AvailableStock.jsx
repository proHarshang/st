import axios from "axios";
import { API_URL } from "../common/constants";

const AvailableStock = async (ProductId, color, size) => {

    try {
        const response = await axios.post(`${API_URL}/products/isAvailable`, {
            "productId": ProductId,
            "color": color,
            "size": size
        });
        return response.data
    } catch (error) {
        throw new Error("Failed to fetch available stock: " + error.message);
    }
};

export default AvailableStock;