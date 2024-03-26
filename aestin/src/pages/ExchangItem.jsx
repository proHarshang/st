import React, { useContext, useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Button from '../common/Button';
import { FaEdit } from "react-icons/fa";
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { FaChevronRight } from "react-icons/fa";
import { CurrencyContext } from '../context/currencyContext';
import { SHIPPING_TAX, SHIPPING_CHARGES } from '../common/constants';
import { BsSquare, BsFillCheckSquareFill } from "react-icons/bs";
import { ProductsContext } from '../context/ProductsContext';
import ProductListSwiper from '../components/ProductListSwiper';

const ExchangItem = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();
    const { currency, currencySymbol } = useContext(CurrencyContext);
    const { allProducts } = useContext(ProductsContext);

    const orderId = location.state?.orderId || false;

    if (!orderId) {
        navigate('/orders')
    }

    const [policyAgreed, setPolicyAgreed] = useState(true)
    const [showChangeAddress, setShowChangeAddress] = useState(false)

    const list_disc = 'aspect-square size-2 rounded-full bg-black mt-2';
    const list_item = 'flex gap-3 pl-5';

    return (
        <div>
            <div>
                <div className='myOrder_container container mx-auto hidden md:block'>
                    <div>
                        <h1 className='text-[32px] my-5 font-semibold'>{t('footer.Return & Exchange')}</h1>
                    </div>

                    <div>
                        <div className='flex flex-col mt-[40px]'>
                            <div className='flex justify-between items-center py-4 px-9 ' style={{ backgroundColor: '#F1F1F1' }}>
                                <div className='flex items-center gap-7'>
                                    <div className='flex flex-col'>
                                        <h3 className='font-bold text-2xl'>Arrives by Thu, Jan 2024</h3>
                                        <p><span className='font-bold text-lg'>{t('order.To:')}</span> 4140 Parker Rd. Allentown, New Mexico 31134</p>

                                    </div>
                                </div>
                                <div className='underline'>
                                    <Link to="../../contact-us">{t('order.Need help?')}</Link>
                                </div>
                            </div>
                            <div className='p-[2rem]' style={{ backgroundColor: '#F9F9F9' }}>

                                <div className='flex   justify-between  bg-white'>

                                    <div className='flex flex-col w-full'>
                                        <div className='flex items-start gap-5 lg:gap-9 my-10'>
                                            <div className='w-[141px] h-[166px] lg:w-[156px] lg:h-[192px] ml-10 lg:ml-12'>
                                                <img src='/assets/images/products/p-2.1.png' className='h-full w-full object-cover' />
                                            </div>
                                            <div>
                                                <div className='flex flex-col gap-3 w-full' >
                                                    <div className='flex flex-col'>
                                                        <h2 className='font-semibold text-lg'>Pique Polo Shirt</h2>
                                                        <h2 className='font-semibold text-base'>{currencySymbol} 300.00</h2>
                                                    </div>
                                                    <div className='lg:pt-[18px] flex flex-col lg:gap-[9px]'>
                                                        <h3>Size : S</h3>
                                                        <h3>Color : Navy</h3>
                                                        <h3>Qty : 1</h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='px-12 min-w-[320px] max-w-[600px] w-[50%] mb-[29px] mt-[18px] flex flex-col gap-[35px]  py-6'>
                                        <div className='flex flex-col mt-33px'>
                                            <h1 className='font-semibold text-lg'>{t('order.Order Summary')}</h1>
                                            <h2 className='font-thin text-sm'>{orderId}</h2>
                                        </div>
                                        <div className='flex flex-col gap-3'>
                                            <div className='flex justify-between'>
                                                <h2>{t('order.Subtotal')}</h2>
                                                <h2 className='whitespace-nowrap'>{currencySymbol} 300.00</h2>
                                            </div>
                                            <div className='flex justify-between'>
                                                <h2>{t('order.Shipping')}</h2>
                                                <h2 className='whitespace-nowrap'>- {currencySymbol} {SHIPPING_CHARGES}.00</h2>
                                            </div>
                                            <div className='flex justify-between'>
                                                <h2>{t('order.Tax')}</h2>
                                                <h2 className='whitespace-nowrap'>- {currencySymbol} {SHIPPING_TAX}.00</h2>
                                            </div>
                                            <hr />
                                            <div className='flex font-semibold justify-between gap-3'>
                                                <h2>{t('order.Total estimated Refund')}</h2>
                                                <h2 className='whitespace-nowrap'>{currencySymbol} 135.00</h2>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                {/* Radio button  */}
                                <div className="flex flex-col bg-white gap-4 ">
                                    <div className="flex items-center bg-[#F9F9F9] mx-11 px-3 h-[35px] ">
                                        <input
                                            type="radio"
                                            id="exchange"
                                            name="option"
                                            value="exchange"
                                            className="mr-2"
                                            onClick={() => setShowChangeAddress(false)}
                                        />
                                        <label htmlFor="exchange" onClick={() => setShowChangeAddress(false)}>{t('order.Exchange for an item of your choice')}</label>
                                    </div>
                                    <div className="flex items-center bg-[#F9F9F9] mx-11 h-[35px] px-3">
                                        <input
                                            type="radio"
                                            id="replace"
                                            name="option"
                                            value="replace"
                                            className="mr-2"
                                            onClick={() => setShowChangeAddress(true)}
                                        />
                                        <label htmlFor="replace" onClick={() => setShowChangeAddress(true)}>{t('order.Replace with the exact same item')}</label>
                                    </div>

                                    <div className="flex items-center bg-[#F9F9F9]  h-[35px] mx-11 px-3 mb-[30px]">
                                        <input
                                            type="radio"
                                            id="refund"
                                            name="option"
                                            value="refund"
                                            className="mr-2"
                                            onClick={() => setShowChangeAddress(false)}
                                        />
                                        <label htmlFor="refund" onClick={() => setShowChangeAddress(false)}>{t('order.Refund to in your account')}</label>
                                    </div>
                                </div>

                                {showChangeAddress &&
                                    (<div className='bg-white mt-5 py-3 px-6'>
                                        <div className='flex items-center gap-7'>
                                            <h1 className='font-bold'>{t('order.Pickup Address ')}:</h1>
                                            <FaEdit />
                                        </div>
                                        <p className='text-lg font-gotham_light'>4140 Parker Rd. Allentown, New Mexico 31134</p>
                                    </div>)
                                }

                                <div className='bg-white mt-5 py-3 px-6 mb-12'>
                                    <div className="flex items-center gap-4">
                                        <button onClick={() => setPolicyAgreed(!policyAgreed)}>{policyAgreed ? <BsFillCheckSquareFill /> : <BsSquare />}</button>
                                        <span className="text-sm text-gray-700">
                                            {t('order.I agree to return all items in their original condition, with MRP tags attached.')}
                                        </span>
                                    </div>
                                </div>


                                <Button className='w-[250px]' onClick={() => navigate('/orders/return-request-success')}>{t('order.Submit')} </Button>

                            </div>
                        </div>
                    </div>

                </div>
                <div className='py-24 px-1'>
                    <ProductListSwiper productCards={allProducts} />
                </div>
            </div>


            {/* mobile  */}
            <div className='md:hidden p-4 w-full pb-12'>
                <h1 className='font-semibold text-2xl pb-4'>{t('footer.Return & Exchange')}</h1>
                <div className='pb-7'>
                    <div className='flex items-center justify-between border border-b-0 border-black'>
                        <div className='p-5'>
                            <h1 className='font-bold text-lg'>Arrives by Thu, Jan 2024</h1>
                            <h1 className='text-sm'>To: 4140 Parker Rd. Allentown, New Mexico</h1>
                        </div>
                    </div>
                    <div className='border border-black'>
                        <div className='flex p-4 '>
                            <div className='w-[180px] min-w-[45px] h-[140px]'>
                                <img src='/assets/images/products/p-2.1.png' className='h-full w-full object-cover' />
                            </div>
                            <div className='w-full ml-5'>
                                <div className='flex   justify-between mt-1 flex-col sm:flex-row  mb-3'>
                                    <h1 className='font-bold text-base '>Pique Polo Shirt</h1>
                                    <h1>$125.00</h1>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <h1>Size: S</h1>
                                    <h1>Color: Blue</h1>
                                    <h1>Qty: 2</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=''>
                    <div className='border border-black p-6 '>
                        <h1 className='font-semibold text-2xl pb-4'>{t('returnreq.Summary')}</h1>
                        <ul>
                            <li className={list_item}><div className={list_disc} ></div>Returning 1 Item</li>
                            <h1 className='ml-[40px]'>Reason: I Don't like color</h1>
                            <li className={list_item}><div className={list_disc}></div>Order Number:</li>
                            <h1 className='ml-[40px]'>#4421760-655970</h1>
                            <li className={list_item}><div className={list_disc}></div> Product Name</li>
                            <h1 className='ml-[40px]'>Pique polo shirt</h1>
                        </ul>
                    </div>
                    <div className='border border-t-0 border-black p-6 '>
                        <h1 className='text-xl pb-4'>Refundable amount</h1>
                        <div className='flex flex-col gap-4 p-4'>
                            <div className='flex justify-between font-gotham_medium'>
                                <h1>Product</h1>
                                <h1>{currencySymbol} 150.00</h1>
                            </div>
                            <div className='flex justify-between font-gotham_medium'>
                                <h1>{t('returnreq.Tax')}</h1>
                                <h1>{currencySymbol} {SHIPPING_TAX}</h1>
                            </div>
                            <div className='flex justify-between font-gotham_medium'>
                                <h1>{t('returnreq.Shipping')}</h1>
                                <h1>{currencySymbol} {SHIPPING_CHARGES}</h1>
                            </div>
                            <div className='flex justify-between font-gotham_medium'>
                                <h1>{t('returnreq.Refund total')}</h1>
                                <h1>{currencySymbol} 140.00</h1>
                            </div>
                        </div>
                    </div>
                    <div className='border border-t-0 border-black p-6 '>
                        <h1 className='text-xl pb-4'>{t('returnreq.Refund Amount')}</h1>
                        <div className='p-4'>
                            <div>
                                <h1>American Express<span>(.... .... ... 0529)</span></h1>
                                <h1 className='font-gotham_medium'>{currencySymbol} 140 available amount for refund</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col bg-white gap-5 ">
                    <div className="flex items-center bg-[#F5F5F5] w-full mt-6 px-3 h-[35px] ">
                        <input
                            type="radio"
                            id="exchange"
                            name="option"
                            value="exchange"
                            className="mr-2"
                            onClick={() => setShowChangeAddress(false)}
                        />
                        <label htmlFor="exchange" onClick={() => setShowChangeAddress(false)}>{t('order.Exchange for an item of your choice')}</label>
                    </div>
                    <div className="flex items-center bg-[#F5F5F5] w-full h-[35px] px-3">
                        <input
                            type="radio"
                            id="replace"
                            name="option"
                            value="replace"
                            className="mr-2"
                            onClick={() => setShowChangeAddress(true)}
                        />
                        <label htmlFor="replace" onClick={() => setShowChangeAddress(true)}>{t('order.Replace with the exact same item')}</label>
                    </div>
                    <div className="flex items-center bg-[#F5F5F5] w-full  h-[35px]  px-3 mb-[30px]">
                        <input
                            type="radio"
                            id="refund"
                            name="option"
                            value="refund"
                            className="mr-2"
                            onClick={() => setShowChangeAddress(false)}
                        />
                        <label htmlFor="refund" onClick={() => setShowChangeAddress(false)}>{t('order.Refund to in your account')}</label>
                    </div>
                </div>
                {showChangeAddress &&
                    (<div className='bg-white pb-3 pt-1 px-3'>
                        <div className='flex items-center gap-7'>
                            <h1 className='font-bold'>{t('order.Pickup Address ')}:</h1>
                            <FaEdit />
                        </div>
                        <p className='text-lg font-gotham_light'>4140 Parker Rd. Allentown, New Mexico 31134</p>
                    </div>)
                }

                <div className='mt-9'>
                    <Button className='w-full'>{t('returnreq.Continue')}</Button>
                </div>
            </div>

        </div>

    )
}

export default ExchangItem