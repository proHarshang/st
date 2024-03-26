import { API_URL } from "../common/constants";

const StripeAPI = async (bbody) => {
    try {
        const response = await fetch(`${API_URL}/create-checkout-session`, {
            method: 'POST',
            body: JSON.stringify(bbody),
            headers: { 'Content-Type': 'application/json' }
        });
    
        return response.json()
    } catch (error) {
        throw new Error("Failed to connect with payment gateway: " + error.message);
    }
};

export default StripeAPI;