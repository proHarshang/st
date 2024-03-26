import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../common/constants';
import { CartContext } from '../context/CartContext';

const Cancel = () => {
    const navigate = useNavigate();
    const { cart } = useContext(CartContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cancelOrder = async () => {
            try {
                for (const product of cart) {
                    const { productId, color, size, amount } = product;
                    await fetch(`${API_URL}/products/updateStock`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ productId, color, size, amount, "action": "increase" })
                    });
                }
            } catch (error) {
                console.error('An error occurred while processing your request.');
            } finally {
                setLoading(false);
            }
        };

        cancelOrder();
    }, [cart]);

    useEffect(() => {
        if (!loading) {
            navigate('/cart');
        }
    }, [loading, navigate]);

    return (
        <div className='h-screen w-screen bg-white overflow-hidden fixed flex justify-center items-center'>
            <h2>Cancelling</h2>
        </div>
    );
};

export default Cancel;
