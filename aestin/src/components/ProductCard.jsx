import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Wishlist from './Wishlist';
import { WishlistContext } from '../context/WishlistContext';
import { CurrencyContext } from '../context/currencyContext';
import { useTranslation } from 'react-i18next'


const ProductCard = ({ stock = 0, productId, title, price, primaryImg, secondaryImg, productLink, className, size = null }) => {

    const { t } = useTranslation();

    const { currency, currencySymbol } = useContext(CurrencyContext);

    const [isWishlisted, setIsWishlisted] = useState(false)
    const { wishlist } = useContext(WishlistContext);

    useEffect(() => {
        setIsWishlisted(wishlist.includes(productId));
    }, [wishlist, productId]);

    const handleMouseEnterImg = (elem) => {
        elem.target.classList.add('opacity-1');
        elem.target.classList.remove('opacity-0');
    };

    const handleMouseLeaveImg = (elem) => {
        elem.target.classList.add('opacity-0');
        elem.target.classList.remove('opacity-1');
    };

    let width;

    if (size === '22') {
        width = "w-[22%]"
    }

    return (
        <div className={`flex flex-col items-center gap-5 relative select-none max-w-[330px] ${size !== null && size !== undefined ? `${width}` : ' sm:w-[280px] xl:w-[330px]'} ${className}`}>
            <Wishlist productId={productId} action={isWishlisted ? 'remove' : 'add'} />
            <Link to={productLink} draggable={false} className='overflow-hidden w-full h-full' >
                <div className='relative w-full overflow-hidden' style={{ aspectRatio: 0.890741 / 1 }}>
                    <img src={secondaryImg} alt={title} className='absolute top-0 opacity-0 w-full h-full object-cover transition-all duration-300' onMouseEnter={handleMouseEnterImg} onTouchStart={handleMouseEnterImg} onTouchEnd={handleMouseLeaveImg} onMouseLeave={handleMouseLeaveImg} draggable={false} />
                    <img src={primaryImg} alt={title} className='opacity-1 w-full h-full object-cover' draggable="false" />
                    {stock === 0 && (
                        <>
                            <div className='h-full w-full backdrop-blur-[3px] absolute top-0 left-0'></div>
                            <span className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black text-[3vmin] sm:text-[20px] font-bold'>{t('productcard.SOLD OUT')}</span>
                        </>
                    )}
                </div>
                <div className='text-center mt-3 w-full max-sm:text-[13px]'>
                    <h6 className='truncate'>{title}</h6>
                    <span className='block'>{currencySymbol} {price}</span>
                </div>
            </Link>
        </div>
    );
};

export default ProductCard;
