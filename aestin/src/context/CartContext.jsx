import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem(`STcart`)) ?? []);

    const setCartState = (value) => {
        setCart(value)
    }

    useEffect(() => {
        // Retrieve wishlist from local storage on component mount
        const storedCartString = localStorage.getItem('STcart');
        const storedCart = storedCartString ? JSON.parse(storedCartString) : [];
        setCart(storedCart);
    }, []);

    // Function to add a product to the Cart
    const addToCart = (productId, color, size, amount, price, productTitle, primaryImage, secondaryImage) => {
        // Check if the product already exists in the cart
        const existingProductIndex = cart.findIndex(item => item.uid === productId + '_' + color + '_ ' + size);
        if (existingProductIndex !== -1) {
            // Product already exists in the cart, update the amount
            const updatedCart = cart.map((item, index) => {
                if (index === existingProductIndex) {
                    // Update the amount of the existing product
                    return {
                        ...item,
                        amount: parseInt(item.amount) + parseInt(amount)
                    };
                }
                return item;
            });
            setCart(updatedCart);
            localStorage.setItem(`STcart`, JSON.stringify(updatedCart));
        } else {
            const updatedCart = [...cart, { [productId + '_' + color + '_ ' + size]: productId, "uid": productId + '_' + color + '_ ' + size, productId, color, size, amount, price, productId, productTitle, primaryImage, secondaryImage }];
            setCart(updatedCart);
            localStorage.setItem(`STcart`, JSON.stringify(updatedCart));
        }
    };

    // Function to remove a product from the Cart
    const removeFromCart = (productId, color, size) => {
        const CartString = localStorage.getItem(`STcart`);

        if (!CartString) return;

        let cart = JSON.parse(CartString);

        // Find the index of the item to remove based on uid
        const itemIndex = cart.findIndex(item => item.uid === productId + '_' + color + '_ ' + size);
        if (itemIndex === -1) return; // If item not found, return

        // Remove the item from the cart array
        cart.splice(itemIndex, 1);

        // Update the state and local storage with the modified cart
        setCart(cart);
        localStorage.setItem(`STcart`, JSON.stringify(cart));
    };

    // Function to increment
    const incrementCartProduct = (productId, color, size) => {
        // Retrieve cart from local storage
        const storedCartString = localStorage.getItem(`STcart`);
        if (!storedCartString) return; // If cart is empty, return

        // Parse the cart from local storage
        let cart = JSON.parse(storedCartString);

        // Find the index of the item to increment amount based on uid
        const itemIndex = cart.findIndex(item => item.uid === productId + '_' + color + '_ ' + size);
        if (itemIndex === -1) return; // If item not found, return

        // Increment the amount of the item
        cart[itemIndex].amount += 1;

        // Update the state and local storage with the modified cart
        setCart(cart);
        localStorage.setItem(`STcart`, JSON.stringify(cart));
    };

    // Function to decrement
    const decrementCartProduct = (productId, color, size) => {
        // Retrieve cart from local storage
        const storedCartString = localStorage.getItem(`STcart`);
        if (!storedCartString) return; // If cart is empty, return

        // Parse the cart from local storage
        let cart = JSON.parse(storedCartString);

        // Find the index of the item to decrement amount based on uid
        const itemIndex = cart.findIndex(item => item.uid === productId + '_' + color + '_ ' + size);
        if (itemIndex === -1) return; // If item not found, return

        // Decrement the amount of the item, ensuring it doesn't go below 0
        cart[itemIndex].amount = Math.max(0, cart[itemIndex].amount - 1);

        // Update the state and local storage with the modified cart
        setCart(cart);
        localStorage.setItem(`STcart`, JSON.stringify(cart));
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, incrementCartProduct, decrementCartProduct, setCartState }}>
            {children}
        </CartContext.Provider>
    );
};
