import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next'
import Button from '../common/Button';
import { CiSquarePlus } from "react-icons/ci";
import { CiSquareMinus } from "react-icons/ci";
import { API_URL, PRODUCT_IMG_PATH, SHIPPING_CHARGES, SHIPPING_TAX } from '../common/constants';
import { CartContext } from '../context/CartContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { CurrencyContext } from '../context/currencyContext';
import AvailableStock from '../helpers/AvailableStock';


const Cart = () => {
    const { t } = useTranslation();

    const { currency, currencySymbol } = useContext(CurrencyContext);

    const { cart, setCartState, removeFromCart, incrementCartProduct, decrementCartProduct } = useContext(CartContext);

    const navigate = useNavigate();
    const { user } = useAuthContext()

    const [cartData, setCartData] = useState([])
    const [totalPrice, setTotalPrice] = useState()
    const [CartError, setCartError] = useState(null)
    const [isCartLoading, setIsCartLoading] = useState(false)

    useEffect(() => {
        const storedCartString = localStorage.getItem(`STcart`);
        const storedCart = storedCartString ? JSON.parse(storedCartString) : [];
        setCartState(storedCart);
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            setIsCartLoading(true);
            const updatedCartData = await Promise.all(cart.map(async (item) => {
                const response = await AvailableStock(item.productId, item.color, item.size);
                const data = response.success ? response.data : 0;
                const availStock = data;
                if (availStock >= 1) {
                    return {
                        "productId": item.productId,
                        "productTitle": item.productTitle,
                        "primaryImage": item.primaryImage,
                        "secondaryImage": item.secondaryImage,
                        "color": item.color,
                        "size": item.size,
                        "price": item.price,
                        "amount": parseInt(item.amount),
                        "stock": availStock
                    }
                } else {
                    return null
                }
            }));
            const filteredCartData = updatedCartData.filter(item => item !== null);

            setCartData(filteredCartData);
            setIsCartLoading(false);
        };

        fetchData();

    }, [cart]);

    // Function to calculate total price
    useEffect(() => {
        function calculateTotalPrice(products) {
            let totalPrice = 0;
            for (const product of products) {
                totalPrice += product.price * product.amount;
            }
            return totalPrice;
        }

        setTotalPrice(calculateTotalPrice(cartData));
    }, [cartData])

    // Qty Increment counter
    const incrementQuantity = (productId, color, size, stock, amount) => {
        if (amount < (stock - 1)) {
            incrementCartProduct(productId, color, size)
        }
    };

    // Qty Decrement counter
    const decrementQuantity = (productId, color, size, stock, amount) => {
        if (amount > 1) {
            decrementCartProduct(productId, color, size)
        }
    };

    const handleRemove = (productId, color, size) => {
        removeFromCart(productId, color, size)
    }

    const handleCheckout = async () => {
        setIsCartLoading(true);
        setCartError(null);

        try {
            for (const product of cartData) {
                const { productId, color, size, amount } = product;
                const response = await fetch(`${API_URL}/products/updateStock`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ productId, color, size, amount, "action": "decrease" })
                });

                if (!response.ok) {
                    setIsCartLoading(false);
                    const json = await response.json();
                    setCartError(json.error);
                    return; // Exit the function if there's an error
                }
            }

            // If all products were successfully added to the cart
            setIsCartLoading(false);
            navigate('/payment-information', { state: { fromCart: true } });
        } catch (error) {
            setIsCartLoading(false);
            setCartError('An error occurred while processing your request.');
        }
    };

    return (
        <div className="  bg-gray-200 max-sm:bg-white pt-8">
            <div className='container'>
                <div className='max-sm:hidden mx-7'>
                    <Link className="font-bold text-lg">{t('cart.Cart')} </Link> <span>/ </span>
                    <Link className="font-thin text-lg">{t('cart.Information')} </Link><span>/ </span>
                    <Link className="font-thin text-lg">{t('cart.Payment')}</Link>
                </div>
                <div className="flex items-stretch gap-10 sm:gap-5 lg:gap-8  flex-col md:flex-row py-10 max-sm:py-0 sm:py-5 lg:py-10 px-0">
                    <div className='bg-white p-8 sm:p-5 lg:p-8 w-full max-sm:w-full'>
                        <h1 className='text-[40px] max-sm:text-[18px] sm:text-[18px] font-thin mb-4 '>{t('cart.Your selection')} ({cartData.length})</h1>

                        <hr className="border border-gray-300 h-[1px] w-full max-sm:hidden" />

                        <div className='scrollbar_hidden flex flex-col gap-8 mt-7 overflow-y-scroll max-sm:overflow-y-auto max-sm:h-auto max-sm:items-center divide-y-2'>

                            {
                                cartData.length <= 0 ?
                                    <div>
                                        <h2 className='text-center mt-20 text-gray-500'>{t('cart.Cart is Empty')}</h2>
                                        <Button className='m-auto mt-10' onClick={() => navigate('/')} varient='solid'>{t('conform.CONTINUE SHOPPING')}</Button>
                                    </div> :
                                    cartData.map((product, index) =>
                                    (
                                        <div key={product.productId + product.color + product.size} className='flex gap-8 sm:gap-6 max-sm:flex-col max-sm:items-center pt-10 pb-5 w-full'>
                                            <img src={`${PRODUCT_IMG_PATH}${product.primaryImage}`} className='w-[180px] h-[240px] object-cover' />
                                            <div className='flex flex-col justify-between w-full max-sm:items-center'>
                                                <div className='flex flex-col gap-3 max-sm:items-center'>
                                                    <div className='flex justify-between items-center'>
                                                        <h1 className='text-[24px] sm:pr-4 font-bold m-0 sm:text-[16px]'>{product.productTitle}</h1>
                                                        <h1 className="font-thin max-sm:hidden sm:text-[16px]">{currencySymbol} {product.price * product.amount}</h1>
                                                    </div>
                                                    <div className='max-sm:flex max-sm:flex-col max-sm:items-center mb-4 text-xl'>
                                                        <div className="font-thin mb-2 md:mb-1 sm:text-[14px]">{t('cart.Size')} : {product.size}</div>
                                                        <div className="font-thin mb-2 md:mb-1 sm:text-[14px]">{t('cart.Color')} : {product.color}</div>
                                                        <div className="font-thin mb-2 md:mb-1 sm:text-[14px] flex gap-4 items-center">{t('cart.Qty')} :
                                                            <div className="flex items-center justify-center gap-1">
                                                                <button className='font-medium text-2xl active:scale-[0.9]' onClick={() => incrementQuantity(product.productId, product.color, product.size, product.stock, product.amount)}><CiSquarePlus /></button>
                                                                <input
                                                                    type="text"
                                                                    name='qtn'
                                                                    value={product.amount}
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
                                                                <button className='font-medium text-2xl active:scale-[0.9]' onClick={() => decrementQuantity(product.productId, product.color, product.size, product.stock, product.amount)}><CiSquareMinus /></button>
                                                            </div>
                                                        </div>
                                                        {/* <h1 className="my-2 font-semibold text-lg">$125.00</h1> */}
                                                    </div>
                                                </div>
                                                <div className='flex gap-9'>
                                                    <Link className='font-bold hover:underline underline-offset-4 sm:text-[14px] max-sm:underline' to={`../product/${product.productId}`}>{t('cart.Edit')}</Link>
                                                    <button onClick={() => handleRemove(product.productId, product.color, product.size)} className='font-bold hover:underline underline-offset-4 sm:text-[14px] max-sm:underline'>{t('cart.Remove')}</button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                    )}
                        </div>
                    </div>

                    <div className='bg-white p-12 md:sticky md:top-[12%] sm:p-6 h-fit w-full md:w-[30%] lg:max-w-[400px] max-sm:p-5 max-sm:mb-14'>
                        <h1 className='text-2xl font-thin sm:text-[18px] mb-8'>{t('cart.Order summary')}</h1>
                        <div className="flex justify-between mb-3">
                            <h3 className="font-thin text-[14px]">{t('cart.Subtotal')}</h3>
                            <h3 className="font-thin text-[14px]">{currencySymbol} {totalPrice}.00</h3>
                        </div>
                        <div className="flex justify-between mb-3">
                            <h3 className="font-thin text-[14px]">{t('cart.Shipping')}</h3>
                            <h3 className="font-thin text-[14px]">{currencySymbol} {SHIPPING_CHARGES}.00</h3>
                        </div>
                        <div className="flex justify-between mb-3">
                            <h3 className="font-thin text-[14px]">{t('cart.Tax')}</h3>
                            <h3 className="font-thin text-[14px]">{currencySymbol} {SHIPPING_TAX}.00</h3>
                        </div>
                        <hr className="bg-black w-full my-[1.25rem]" />
                        <div className="flex justify-between">
                            <h3 className='font-bold'>{t('cart.Total')}</h3>
                            <h3 className='font-bold'>{currencySymbol} {totalPrice + SHIPPING_CHARGES + SHIPPING_TAX}.00</h3>
                        </div>
                        <div className='mt-9'>
                            {isCartLoading || CartError ?
                                <Button className='w-full' isLoading={true}></Button> :
                                (user && user != null ?
                                    <Button className='w-full' onClick={() => handleCheckout()}>{t('cart.CHECKOUT')}</Button> :
                                    <Button className='w-full' onClick={() => navigate('/login')}>{t('cart.CHECKOUT')}</Button>
                                )
                            }
                            <h3 className="flex justify-center font-thin p-2 text-sm">{t('cart.OR')}</h3>

                            <Button className='w-full'>{t('cart.PAY WITH PAYPAL')}</Button>
                        </div>
                        <div className='underline flex flex-col gap-4 mt-6 text-sm'>
                            <Link to="/contact-us">{t('cart.Need help? Contact us')}</Link>
                            <Link to="/contact-us">{t('cart.Shipping and returns')}</Link>
                            <Link to="/contact-us">{t('cart.Secure payments')}</Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Cart;