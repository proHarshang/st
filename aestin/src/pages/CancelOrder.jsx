// Mobile only 
import { useParams } from 'react-router-dom'
import { FaChevronRight } from "react-icons/fa";
import { useTranslation } from 'react-i18next'
import React, { useContext } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Button from '../common/Button';
import { CurrencyContext } from '../context/currencyContext';
import { SHIPPING_TAX, SHIPPING_CHARGES } from '../common/constants';

const CancelOrder = () => {
    const { t } = useTranslation();

    const location = useLocation();
    const navigate = useNavigate();
    const { currency, currencySymbol } = useContext(CurrencyContext);

    const OrderId = location.state?.OrderId || false;

    if (!OrderId) {
        navigate('/orders')
    }


    const list_disc = 'aspect-square size-2 rounded-full bg-black mt-2';
    const list_item = 'flex gap-3 pl-5';
    return (
        <div>
            <div>
                <div className='md:hidden p-4 w-full pb-12'>
                    <h1 className='font-semibold text-2xl pb-4'>{t('order.Cancel order')}</h1>
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
                                        <h1>{t('cart.Size')}: S</h1>
                                        <h1>{t('cart.Color')}: Blue</h1>
                                        <h1>{t('cart.Qty')}: 2</h1>
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
                            <h1 className='text-xl pb-4'>{t('order.Refundable amount')}</h1>
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
                    <div className='p-6'>
                        <h1 className='font-bold'>{t('returnreq.Note')}:<span className='font-normal'> "Please ensure the product is unworn and in it’s
                            original packaging for a hassle-free return process. Our
                            team is dedicated to ensuring your satisfaction." <br />
                            <span>{t('returnreq.read')} </span>
                            {t('returnreq.return policy')}
                        </span></h1>
                    </div>
                    <div className='flex flex-col gap-7 items-center mb-16 mt-8 border py-8 border-black '>
                        <div className='flex flex-col justify-start gap-3 w-[89%]'>
                            <label className='text-sm font-semibold' htmlFor="Select a return reason">{t('returnreq.Select a return reason')}</label>
                            <select className='border-[1px] border-black py-3 px-5 rounded-none'>
                                <option value="" selected disabled>{t('returnreq.Select a return reason')}</option>
                                <option value="Item Doesn’t Fit">{t('returnreq.Item Doesn’t Fit')}</option>
                                <option value="Wrong color">{t('returnreq.Wrong color')}</option>
                                <option value="Item Arrived Damaged">{t('returnreq.Item Arrived Damaged')}</option>
                                <option value="Quality">{t("returnreq.i don't like Quality")}</option>
                                <option value="Wrong item">{t('returnreq.Wrong item')}</option>
                                <option value=" Item is Different Than Described"> {t('returnreq.Item is Different Than Describeds')}</option>
                                <option value=" Item arrive late">{t('returnreq.Item arrive late')}</option>
                            </select>
                        </div>
                        <div className='flex flex-col justify-start gap-3 w-[89%]'>
                            <label className='text-sm font-semibold' htmlFor="Comment">{t('order.Comment')}</label>
                            <textarea type="text" rows='5' className="border-[1px] border-black py-3 px-5 rounded-none resize-none" ></textarea>
                        </div>
                        <div className='flex flex-col justify-start gap-3 w-[89%]'>
                            <label className='text-sm ' htmlFor="File Attachment">{t('order.File Attachment')}</label>
                            <input type="file" className="border-[1px] border-black py-3 px-5 rounded-none" />
                        </div>

                    </div>
                    <div>
                        <Button className='w-full' onClick={() => navigate('/orders/cancellation-request-success', { state: { OrderId: true } })}>{t('order.Cancel order')}</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CancelOrder