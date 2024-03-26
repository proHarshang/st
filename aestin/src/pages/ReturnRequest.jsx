import React, { useContext } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Button from '../common/Button';
import { ProductsContext } from '../context/ProductsContext';
import { CurrencyContext } from '../context/currencyContext';
import { FaChevronRight } from "react-icons/fa";
import { useTranslation } from 'react-i18next'
import { SHIPPING_TAX, SHIPPING_CHARGES, API_URL } from '../common/constants';
import ProductListSwiper from '../components/ProductListSwiper';


const Return_req = () => {

    const { t } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate()
    const { currency, currencySymbol } = useContext(CurrencyContext);
    const { allProducts } = useContext(ProductsContext);

    const orderId = location.state?.orderId || false;

    if (!orderId) {
        navigate('/orders')
    }

    const list_disc = 'aspect-square size-2 rounded-full bg-black mt-2';
    const list_item = 'flex gap-3 pl-5';
    return (
        <div>
            <div>
                <div className='container myOrder_container hidden md:block'>
                    <div>
                        <h1 className='text-[32px] my-5 font-semibold'>{t('footer.Return & Exchange')}</h1>
                    </div>
                    <div>
                        <div className='flex flex-col '>
                            <div className='flex justify-between items-center py-4 px-9 ' style={{ backgroundColor: '#F1F1F1' }}>
                                <div className='flex items-center gap-7'>
                                    <div className='flex flex-col'>
                                        <h3 className='font-bold text-2xl'>{t('update.Order')}: {orderId}</h3>
                                        <p><span className='font-bold text-lg'>{t('returnreq.To')}:</span> 4140 Parker Rd. Allentown, New Mexico 31134</p>
                                    </div>
                                </div>
                                <div className='underline'>
                                    <Link to="../../contact-us">{t('order.Need help?')}</Link>
                                </div>
                            </div>
                            <div className='p-[2rem]' style={{ backgroundColor: '#F9F9F9' }}>
                                <div className='flex   justify-between gap-[20px] lg:gap-[30px] '>
                                    <div className='flex flex-col w-[60%]  bg-white '>

                                        {/* product  */}
                                        <div className='flex gap-9 items-start mt-[34px] mb-[45px]'>
                                            <div className='min-w-32 w-32 h-[187px] ml-7'>
                                                <img src='/assets/images/products/p-2.1.png' className='h-full w-full object-cover' />
                                            </div>
                                            <div>
                                                <div className='flex flex-col gap-5 w-full' >
                                                    <div className='flex flex-col gap-2'>
                                                        <h2 className='font-semibold text-lg'>Pique Polo Shirt</h2>
                                                        <h2 className='font-semibold text-base'>{currencySymbol} 300.00</h2>
                                                    </div>
                                                    <div className='lg:pt-[18px] flex flex-col gap-[9px]'>
                                                        <h1>{t('cart.Size')}: S</h1>
                                                        <h1>{t('cart.Color')}: Blue</h1>
                                                        <h1>{t('Qty')}: 2</h1>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* form */}
                                        <hr />
                                        <div className='flex flex-col gap-7 items-center my-16'>
                                            <div className='flex flex-col justify-start gap-3 w-[90%]'>
                                                <label className='text-xl' htmlFor="Select a return reason">{t('returnreq.Reason for Return & exchange')}</label>
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
                                            <div className='flex flex-col justify-start gap-3 w-[90%]'>
                                                <label className='text-xl' htmlFor="Comment">{t('order.Comment')}</label>
                                                <textarea type="text" rows='5' className="border-[1px] border-black py-3 px-5 rounded-none resize-none" ></textarea>
                                            </div>
                                            <div className='flex flex-col justify-start gap-3 w-[90%]'>
                                                <label className='text-xl' htmlFor="File Attachment">{t('order.File Attachment')}</label>
                                                <input type="file" className="border-[1px] border-black py-3 px-5 rounded-none" />
                                            </div>

                                        </div>

                                    </div>

                                    <div className='w-[40%] flex flex-col gap-[35px] bg-white py-6'>
                                        <div className='mt-33px px-[15px] lg:px-[29px]'>
                                            <h1 className='font-semibold text-lg'>{t('returnreq.Summary')}</h1>
                                        </div>
                                        <div className='flex flex-col px-[15px] lg:px-[29px]   gap-4 '>
                                            <ul>
                                                <li className={list_item}><div className={list_disc}></div>Dhruvit Patel</li>
                                                <h1 className='ml-[40px] mb-3'>+91 99999 99999</h1>
                                                <li className={list_item}><div className={list_disc}></div>Order Number:</li>
                                                <h1 className='ml-[40px] mb-3'>{orderId}</h1>
                                                <li className={list_item}><div className={list_disc}></div> Product Name</li>
                                                <h1 className='ml-[40px] mb-3'>Pique polo shirt</h1>
                                            </ul>
                                        </div>
                                        <hr className='p-0' />
                                        <div className='px-[15px] lg:px-[29px]'>
                                            <h1 className='text-xl pb-4'>{t('order.Refundable amount')}</h1>
                                            <div className='flex flex-col gap-4 p-4'>
                                                <div className='flex justify-between font-gotham_medium'>
                                                    <h1> Product</h1>
                                                    <h1>{currencySymbol} 150.00</h1>
                                                </div>
                                                <div className='flex justify-between font-gotham_medium'>
                                                    <h1>{t('returnreq.Tax')}</h1>
                                                    <h1>{currencySymbol} 5.00</h1>
                                                </div>
                                                <div className='flex justify-between font-gotham_medium'>
                                                    <h1>{t('returnreq.Shipping')}</h1>
                                                    <h1>{currencySymbol} 5.00</h1>
                                                </div>
                                                <div className='flex justify-between font-gotham_medium'>
                                                    <h1>{t('returnreq.Refund total')}</h1>
                                                    <h1>{currencySymbol} 140.00</h1>
                                                </div>
                                            </div>
                                        </div>
                                        <hr className='p-0' />
                                        <div className='px-[15px] lg:px-[29px] text-sm'>
                                            <div className='mb-7'>
                                                <h1>{t('returnreq.Refund Amount')}</h1>
                                                <p>American Expressspan <span>(.... .... .... 9898)</span></p>
                                            </div>
                                            <div className='mb-11'>
                                                <h1>{currencySymbol} 140 available amount for refund</h1>
                                            </div>
                                            <div className='mb-11'>
                                                <p className='font-light'><span className='font-semibold'>{t('returnreq.Note')}:</span> "Please ensure the product is unworn and in
                                                    its original packaging for a hassle-free return process.
                                                    Our team is dedicated to ensuring your satisfaction."
                                                    <br />  {t('returnreq.read')}  <Link className='underline' to='../privacy-policy'>{t('returnreq.return policy')}</Link> </p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className='mt-7'>
                                    <Button className='w-[250px]' onClick={() => navigate("/orders/exchange-item", { state: { orderId: orderId } })}>{t('returnreq.Continue')}</Button>
                                </div>
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
                            <li className={list_item}><div className={list_disc} ></div>{t('update.Returning 1 Item')}</li>
                            <h1 className='ml-[40px]'>Reason: I Don't like color</h1>
                            <li className={list_item}><div className={list_disc}></div>{t('update.Order Number')}:</li>
                            <h1 className='ml-[40px]'>{orderId}</h1>
                            <li className={list_item}><div className={list_disc}></div> {t('update.Product Name')}</li>
                            <h1 className='ml-[40px]'>Pique polo shirt</h1>
                        </ul>
                    </div>
                    <div className='border border-t-0 border-black p-6 '>
                        <h1 className='text-xl pb-4'>{t('update.Refundable amount')}</h1>
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
                    <h1 className='font-bold'>Note:<span className='font-normal'> "Please ensure the product is unworn and in it’s
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
                        <label className='text-sm' htmlFor="File Attachment">{t('order.File Attachment')}</label>
                        <input type="file" className="border-[1px] border-black py-3 px-5 rounded-none" />
                    </div>

                </div>
                <div>
                    <Button className='w-full' onClick={() => navigate("/orders/exchange-item", { state: { orderId: orderId } })}>{t('returnreq.Continue')}</Button>
                </div>
            </div>
        </div>
    )
}

export default Return_req 