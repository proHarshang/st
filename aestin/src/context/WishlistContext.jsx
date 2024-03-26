import React, { createContext, useState, useEffect } from 'react';
export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        // Retrieve wishlist from local storage on component mount
        const storedWishlist = JSON.parse(localStorage.getItem(`STwishlist`)) || [];
        setWishlist(storedWishlist);
    }, []);

    // Function to add a product to the wishlist
    const addToWishlist = (productId) => {
        const updatedWishlist = [...wishlist, productId];
        setWishlist(updatedWishlist);
        localStorage.setItem(`STwishlist`, JSON.stringify(updatedWishlist));
    };

    // Function to remove a product from the wishlist
    const removeFromWishlist = (productId) => {
        const updatedWishlist = wishlist.filter((id) => id !== productId);
        setWishlist(updatedWishlist);
        localStorage.setItem(`STwishlist`, JSON.stringify(updatedWishlist));
    };

    return (
        <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};
