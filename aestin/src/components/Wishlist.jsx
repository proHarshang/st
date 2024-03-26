import React, { useContext } from 'react';
import { WishlistContext } from '../context/WishlistContext';

const Wishlist = ({ productId, action, forWhat }) => {
    const { addToWishlist, removeFromWishlist } = useContext(WishlistContext);

    // Function to handle adding or removing a product from the wishlist
    const handleWishlistAction = () => {
        if (action === 'add') {
            addToWishlist(productId);
        } else if (action === 'remove') {
            removeFromWishlist(productId);
        }
    };



    // Render the component (you can customize the rendering logic)
    return (
        <button onClick={handleWishlistAction} className={`pointer-events-auto z-50 ${forWhat != 'detail' ? 'absolute top-0 right-0 m-4 max-sm:m-2' : null}`}>
            {action === 'remove' ? (<img src="/assets/icons/heart-fill.svg" className='h-[20px] w-[20px] max-sm:h-[17px] max-sm:w-[17px]' alt="Wishlist" title='Remove from Wishlist' />) : (<img src="/assets/icons/heart.svg" className='h-[20px] w-[20px] max-sm:h-[17px] max-sm:w-[17px]' alt="Wishlist" title='Add to Wishlist' />)}
        </button>
    );
};

export default Wishlist;
