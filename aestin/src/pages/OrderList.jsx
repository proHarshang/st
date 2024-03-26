import React, { useContext } from 'react'
import { FaChevronRight } from "react-icons/fa";
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom';
import { CurrencyContext } from '../context/currencyContext';
import { PRODUCT_IMG_PATH } from '../common/constants';

const OrderList = () => {
    const { t } = useTranslation();

    const { currency, currencySymbol } = useContext(CurrencyContext);

    return (
        <div>

            {/* desktop  */}
            <div className='container hidden md:block'>
                <div>
                    <h1 className='text-[32px] my-6'>{t('order.All Orders')}</h1>
                </div>
                <div >
                    <div className='flex flex-col '>
                        <Link to={`/orders/${'USCART393521073'}`} className='flex justify-between items-center p-4 ' style={{ backgroundColor: '#F1F1F1' }}>
                            <div className='flex items-center gap-7'>
                                <div className='bg-black rounded-full aspect-square size-16 flex items-center justify-center'>
                                    <img src='/assets/icons/box.svg' />
                                </div>
                                <div className='flex flex-col'>
                                    <h3 className='font-bold text-2xl'>{t('order.Confirmed')}</h3>
                                    <p><span className='font-bold text-lg'>{t('order.Order No :')}</span> <span className='font-semibold'>USCART393521073</span> (Arriving at Sat, 22 Apr)</p>

                                </div>
                            </div>
                            <div>
                                <FaChevronRight />
                            </div>
                        </Link>
                        <div className='p-[2rem]' style={{ backgroundColor: '#F9F9F9' }}>
                            <div className='flex items-center gap-11   bg-white'>
                                <div className='w-52 py-8 ml-8'>
                                    <img src='assets/images/products/p-2.1.png' className='h-full w-full object-cover' />
                                </div>
                                <div className='flex flex-col gap-3 mb-[52px] w-[335px]' >
                                    <div className='flex justify-between gap-5'>
                                        <h2 className='font-semibold text-lg overflow-hidden whitespace-nowrap'>Pique polo shirt</h2>
                                        <h2>$125.00</h2>
                                    </div>
                                    <h1>{t('cart.Size')}: S</h1>
                                    <h1>{t('cart.Color')}: Blue</h1>
                                    <h1>{t('Qty')}: 2</h1>
                                </div>
                            </div>
                            <hr />
                            <div className='flex items-center gap-11   bg-white'>
                                <div className='w-52 py-8 ml-8'>
                                    <img src='assets/images/products/p-2.1.png' className='h-full w-full object-cover' />
                                </div>
                                <div className='flex flex-col gap-3 mb-[52px] w-[335px]' >
                                    <div className='flex justify-between gap-5'>
                                        <h2 className='font-semibold text-lg overflow-hidden whitespace-nowrap'>Pique polo shirt</h2>
                                        <h2>$125.00</h2>
                                    </div>
                                    <h1>{t('cart.Size')}: S</h1>
                                    <h1>{t('cart.Color')}: Blue</h1>
                                    <h1>{t('Qty')}: 2</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Link to={`/orders/${'USCART393521073'}`} className='flex justify-between items-center p-4 ' style={{ backgroundColor: '#F1F1F1' }}>
                            <div className='flex items-center gap-7'>
                                <div className='bg-black rounded-full aspect-square size-16 flex items-center justify-center'>
                                    <img src='/assets/icons/box2.svg' />
                                </div>
                                <div className='flex flex-col'>
                                    <h3 className='font-bold text-2xl'>{t('order.Delivered')} </h3>
                                    <p><span className='font-bold text-lg'>{t('order.Order No.')}</span> <span className='font-semibold'>USCART393521073</span> (Arriving at Sat, 22 Apr)</p>

                                </div>
                            </div>
                            <div>
                                <FaChevronRight />
                            </div>
                        </Link>
                        <div className='p-[2rem]' style={{ backgroundColor: '#F9F9F9' }}>
                            <div className='flex items-center gap-11   bg-white'>
                                <div className='w-52 py-8 ml-8'>
                                    <img src='assets/images/products/p-2.1.png' className='h-full w-full object-cover' />
                                </div>
                                <div className='flex flex-col gap-3 mb-[52px] w-[335px]' >
                                    <div className='flex justify-between gap-5'>
                                        <h2 className='font-semibold text-lg overflow-hidden whitespace-nowrap'>Pique polo  shirt</h2>
                                        <h2>$125.00</h2>
                                    </div>
                                    <h1>{t('cart.Size')}: S</h1>
                                    <h1>{t('cart.Color')}: Blue</h1>
                                    <h1>{t('Qty')}: 2</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* mobile  */}
            <div className='md:hidden p-4 pb-12'>
                <h1 className='font-semibold text-2xl pb-4'>{t('order.All Orders')}</h1>
                <div className='pb-7'>
                    <Link to={`/orders/${'USCART393521073'}`} className='flex items-center justify-between border border-b-0 border-black'>
                        <div className='p-5'>
                            <h1 className='font-bold text-[15px]'>{t('update.Order Placed on')}: 22th Apr, 2024</h1> 
                            <h1 className='text-sm'>{t('order.Order No.')} USCART393521073</h1>
                        </div>
                        <div className='pr-4'>
                            <FaChevronRight />
                        </div>
                    </Link>
                    <div className='border border-black'>
                        <div className='flex p-4 '>
                            <div className='w-[180px] min-w-[45px] h-[140px]'>
                                <img src={`${PRODUCT_IMG_PATH}p-2.1.png`} className='h-full w-full object-cover' />
                            </div>
                            <div className='w-full text-sm ml-5'>
                                <div className='flex justify-between mt-1 flex-col gap-1 mb-3'>
                                    <h1 className='font-bold text-sm'>Pique Polo Shirt</h1>
                                    <h1>{currencySymbol} 125.00</h1>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <h1>{t('cart.Size')}: S</h1>
                                    <h1>{t('cart.Color')}: Blue</h1>
                                    <h1>{t('Qty')}: 2</h1>
                                </div>
                            </div>
                        </div>
                        <div className='flex p-4'>
                            <div className='w-[180px] min-w-[45px] h-[140px]'>
                                <img src={`${PRODUCT_IMG_PATH}p-2.1.png`} className='h-full w-full object-cover' />
                            </div>
                            <div className='w-full ml-5 text-sm'>
                                <div className='flex   justify-between mt-1 flex-col gap-1 mb-3'>
                                    <h1 className='font-bold text-sm '>Pique Polo Shirt</h1>
                                    <h1>{currencySymbol} 125.00</h1>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <h1>{t('cart.Size')}: S</h1>
                                    <h1>{t('cart.Color')}: Blue</h1>
                                    <h1>{t('Qty')}: 2</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <Link to={`/orders/${'USCART393521073'}`} className='flex items-center justify-between border border-b-0 border-black'>
                        <div className='p-5'>
                            <h1 className='font-bold text-[15px]'>{t('update.Order Placed on')}: 22th Apr, 2024</h1>
                            <h1 className='text-sm'>{t('order.Order No.')} USCART393521073</h1>
                        </div>
                        <div className='pr-4'>
                            <FaChevronRight />
                        </div>
                    </Link>
                    <div className='border border-black'>

                        <div className='text-start text-sm pl-4 pt-3'>
                            <h1 className='text-green-600 font-semibold'>Delivered on 29th Apr, 2024</h1>
                        </div>
                        <div className='flex p-4'>
                            <div className='w-[180px] min-w-[45px] h-[140px]'>
                                <img src={`${PRODUCT_IMG_PATH}p-2.1.png`} className='h-full w-full object-cover' />
                            </div>
                            <div className='w-full ml-5 text-sm '>
                                <div className='flex justify-between mt-1 flex-col gap-1 mb-3'>
                                    <h1 className='font-bold '>Pique Polo Shirt</h1>
                                    <h1>{currencySymbol} 125.00</h1>
                                </div>
                                <div className='flex flex-col gap-2'>
                                <h1>{t('cart.Size')}: S</h1>
                                    <h1>{t('cart.Color')}: Blue</h1>
                                    <h1>{t('Qty')}: 2</h1>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default OrderList