import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Button from '../common/Button';
import ProductSwiper from './productSwiper';
import { CiSquarePlus } from "react-icons/ci";
import { CiSquareMinus } from "react-icons/ci";
import { CartContext } from "../context/CartContext";
import { useAuthContext } from '../hooks/useAuthContext'
import { CurrencyContext } from '../context/currencyContext';
import Wishlist from './Wishlist';
import { WishlistContext } from '../context/WishlistContext';
import { API_URL } from '../common/constants';
import { useTranslation } from 'react-i18next'


const ProductInfo = ({ productId, title, price, color, size, stock, images, secondaryImage, primaryImage }) => {
    const { t } = useTranslation();

    const { currency, currencySymbol } = useContext(CurrencyContext);
    const { user } = useAuthContext()
    const { wishlist } = useContext(WishlistContext);
    const { addToCart, setCartState } = useContext(CartContext);


    const { productID } = useParams()

    const navigate = useNavigate();

    useEffect(() => {
        const storedCartString = localStorage.getItem(`STcart`);
        const storedCart = storedCartString ? JSON.parse(storedCartString) : [];
        setCartState(storedCart);
    }, [])

    const [availableStock, setAvailableStock] = useState();
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [selectedSize, setSelectedSize] = useState(size.find((size) => size.stock > 0).sizeName);
    const [qty, setQty] = useState(1);

    useEffect(() => {
        setIsWishlisted(wishlist.includes(productID));
    }, [wishlist, productID]);

    const handleClick_checkout = () => {
        navigate(`/payment-information?product=${title}&id=${productId}&size=${selectedSize}&color=${color}&qty=${qty}`);
    }

    const handleSizeChange = (newSize) => {
        setSelectedSize(newSize);
    };


    useEffect(() => {
        const selectedSizeObj = size.find(item => item.sizeName === selectedSize);

        if (selectedSizeObj) {
            let availableStock = Math.min(selectedSizeObj.stock, stock);
            setAvailableStock(availableStock);
            if (qty > availableStock) {
                setQty(availableStock)
            }
        } else {
            setAvailableStock(0)
        }
    }, [selectedSize])

    const decrementQuantity = () => {
        if (qty > 1) {
            setQty(prevQty => prevQty - 1)
        }
    }

    const incrementQuantity = () => {
        if (qty < availableStock) {
            setQty(prevQty => prevQty + 1)
        }
    }

    return (
        <>
            <div className="productWrapper md:w-full lg:w-[66vw]">
                <div className="productContent max-md:flex-col xl:justify-center">

                    <div className='relative w-[50vw] max-md:w-[100vw] h-[100vh] max-md:h-[96vw] xl:h-[100vh] md:h-[600px] lg:h-[600px] md:w-[50%]'>

                        <div className='w-full h-full md:block max-md:hidden overflow-y-hidden'>
                            <ProductSwiper images={images} productName={title} direction={'vertical'} />
                        </div>

                        <div className='w-full h-full max-md:block md:hidden overflow-y-hidden'>
                            <ProductSwiper images={images} productName={title} direction={'horizontal'} />
                        </div>

                        <div className="productGallaryOverlays md:hidden max-md:absolute max-md:top-0 max-md:w-full max-md:z-10 pointer-events-none ">
                            <div className="btnGroup flex justify-end gap-5 m-6">
                                <button className='pointer-events-auto'>
                                    <img src="/assets/icons/share.svg" className='h-[20px] w-[20px]' alt="share" title='Share' />
                                </button>
                                <Wishlist productId={productID} forWhat='detail' action={isWishlisted ? 'remove' : 'add'} />
                            </div>
                        </div>

                    </div>

                    <div className="productDetails sticky h-full w-1/2 max-w-[800px] top-[90px] max-md:relative max-md:w-screen max-md:top-0">

                        <div className='productGallaryOverlays max-md:hidden absolute -left-full top-0 w-full h-full pointer-events-none'>
                            <div className="btnGroup flex justify-end gap-5 m-6">
                                <button className='pointer-events-auto'>
                                    <img src="/assets/icons/share.svg" className='h-[20px] w-[20px]' alt="share" title='Share' />
                                </button>
                                <Wishlist productId={productID} forWhat='detail' action={isWishlisted ? 'remove' : 'add'} />
                            </div>
                        </div>

                        <div className="productMain w-[80%] my-[50px] mx-auto max-md:mt-8  max-md:w-11/12 max-md:my-5">
                            <div className="flex justify-between items-center overflow-hidden gap-[10px]">
                                <h1 className='product_title text-xl font-gotham_light pr-4 whitespace-nowrap'>{title}</h1>
                                <span className='product_price text-gray-500 text-xl whitespace-nowrap'>{currencySymbol} {price}</span>
                            </div>
                            <div className="flex justify-between items-end">
                                <div className='product_size flex flex-col gap-[3px] justify-start'>
                                    <h6 className='lable'>{t('ProductDetail.Size')}</h6>
                                    <div className="flex gap-5 text-base">
                                        {size.map(({ stock, sizeName }) => {
                                            return (
                                                <div
                                                    key={sizeName}
                                                    className={`inline-block cursor-pointer ${selectedSize === sizeName ? 'underline' : ''} ${stock <= 0 ? 'opacity-15 line-through pointer-events-none' : ''}`}
                                                    onClick={() => !stock <= 0 && handleSizeChange(sizeName)}
                                                >
                                                    {sizeName}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                                <Link to='' className="underline active:scale-90">{t('ProductDetail.Size Guide')}</Link>
                            </div>
                            <div className='product_color flex items-center gap-3'>
                                <h6 className='lable'>{t('ProductDetail.Color')} :</h6>
                                <span className='text-base'>{color}</span>
                                {/* <span className='text-base'>{
                                    color.map(({ stock, Name }) => {
                                        return (
                                            <div
                                                key={Name}
                                                className={`inline-block cursor-pointer} ${stock <= 0 ? 'opacity-15 line-through' : ''}`}
                                                onClick={() => !stock <= 0 && handleSizeChange(sizeName)}
                                            >
                                                {sizeName}
                                            </div>
                                        )
                                    })}
                                </span> */}
                            </div>
                            <div className='product_qty flex gap-3 items-center'>
                                <h6 className='lable'>{t('ProductDetail.QTY ')}:</h6>
                                <div className="flex items-center justify-center gap-1">
                                    <button className='font-medium text-2xl active:scale-[0.9]' onClick={() => incrementQuantity()}><CiSquarePlus /></button>
                                    <input
                                        type="text"
                                        name='qtn'
                                        value={qty}
                                        pattern="[1-9]|[1-9][0-9]"
                                        className='w-[50px] text-center px-3 focus-visible:border-none focus-visible:outline-none'
                                        readOnly
                                    // onChange={(e) => {
                                    //     const inputValue = e.target.value;
                                    //     if (/^[1-9]$|^[1-9][0-9]$/.test(inputValue) || inputValue === "1") {
                                    //         e.target.value++
                                    //     }
                                    // }}
                                    />
                                    <button className='font-medium text-2xl active:scale-[0.9]' onClick={() => decrementQuantity()}><CiSquareMinus /></button>
                                </div>
                                {/* <select name="qty" id="qty_field" className='px-2 text-base' value={qty} onChange={(e) => setQty(e.target.value)}>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>5</option>
                                    <option value={4}>6</option>
                                    <option value={4}>7</option>
                                    <option value={4}>8</option>
                                    <option value={4}>9</option>
                                    <option value={4}>10</option>
                                </select> */}
                            </div>

                            <div className="button_group flex flex-col w-full gap-3">
                                <Button onClick={() => addToCart(productId, color, selectedSize, qty, price, title, primaryImage, primaryImage)} className='w-full' varient='outline'>Add To Cart</Button>
                                <Button onClick={handleClick_checkout} className='w-full' varient='solid'>{t('ProductDetail.CHECKOUT')}</Button>
                            </div>
                            <div className='links flex flex-col gap-1 font-medium text-base md:hidden'>
                                <Link to="">{t('ProductDetail.Product Details')}</Link>
                                <Link to="">{t('ProductDetail.Return & Exchange')}</Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default ProductInfo