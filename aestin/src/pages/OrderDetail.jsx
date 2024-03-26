import React, { useContext, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import Button from '../common/Button';
import { BsSquare, BsFillCheckSquareFill } from "react-icons/bs";
import { FaChevronRight } from "react-icons/fa";
import { useTranslation } from 'react-i18next'
import { CurrencyContext } from '../context/currencyContext';
import { IoCheckboxSharp, IoSquareOutline } from "react-icons/io5";
import { PRODUCT_IMG_PATH, SHIPPING_CHARGES, SHIPPING_TAX } from '../common/constants';

const OrderDetail = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const { currency, currencySymbol } = useContext(CurrencyContext);

    const [selectedItem, setSelectedItem] = useState('')
    const [cancelItem, setCancelItem] = useState('')

    const { orderId } = useParams()

    if (!orderId) {
        navigate('/orders')
    }

    const handleSelectItem = (value) => {
        setSelectedItem(value)
    }

    let orderStage = 'Out for Delivery';
    let orderState = '';
    let activeStageIndex = ['Order Placed', 'Order Picked Up', 'In Transit', 'Out for Delivery', 'Delivered'].indexOf(orderStage)
    console.log(activeStageIndex)

    return (
        <div>
            {/* desktop */}
            <div className='myOrder_container container mx-auto hidden md:block'>
                <div>
                    <h1 className='text-[32px] my-5 font-semibold'> {orderId}</h1>
                </div>
                <div>
                    <div className='flex flex-col'>
                        <div className='flex justify-between items-center py-4 px-9 ' style={{ backgroundColor: '#F1F1F1' }}>
                            <div className='flex items-center gap-7'>
                                <div className='flex flex-col'>
                                    <h3 className='font-bold text-2xl'>Arrives by Thu, Jan 2024</h3>
                                    <p><span className='font-bold text-lg'>{t('order.To:')}</span> 4140 Parker Rd. Allentown, New Mexico 31134</p>
                                </div>
                            </div>

                            <div className='flex gap-5 cursor-pointer underline'>
                                <div className='underline'>
                                    {(selectedItem !== '' && orderState !== 'Delivered') &&
                                        <button className='underline' onClick={() => setCancelItem(selectedItem)}>{t('order.Cancel order')}</button>
                                    }
                                    {(selectedItem !== '' && orderState === 'Delivered') &&
                                        <button className='underline' onClick={() => navigate(`/orders/return-request`, { state: { orderId: orderId } })}>{t('order.Exchange & Return')}</button>
                                    }
                                    {/* <-- Harshang : change links on delivered orders and time limit for cancellation*/}
                                </div>
                                <div className='underline'>
                                    <Link to="../../contact-us">{t('order.Need help?')}</Link>
                                </div>
                            </div>

                        </div>
                        <div className='p-[2rem]' style={{ backgroundColor: '#F9F9F9' }}>
                            <div className='flex  justify-between  bg-white  '>
                                <div className='flex flex-col p-5 lg:p-7 py-10 gap-12'>

                                    <div className='flex flex-col justify-start gap-6'>
                                        <div className='flex items-center'>
                                            <button>{selectedItem === "ST1231231" ? <BsFillCheckSquareFill className='h-full' onClick={() => { setSelectedItem(''); setCancelItem('') }} /> : <BsSquare className='h-full' onClick={() => handleSelectItem('ST1231231')} />} </button>
                                            <div className='flex items-start  gap-9 md:gap-5'>
                                                <div className='w-[122px] lg:w-[155px] h-[164px] lg:h-[205px] py-8 ml-5 md:py-0 '>
                                                    <img src={`${PRODUCT_IMG_PATH}p-2.1.png`} className='h-full w-full object-cover' />
                                                </div>
                                                <div>
                                                    <div className='flex flex-col gap-3 w-[255px] md:w-[180px] ' >
                                                        <div className='flex flex-col gap-1'>
                                                            <h2 className='text-lg text-ellipsis overflow-hidden whitespace-nowrap font-gotham_medium'>Pique Polo Shirt</h2>
                                                            <h2 className='font-semibold text-base'>{currencySymbol} 300.00</h2>
                                                        </div>
                                                        <div className='pt-[13px] lg:pt-[18px] flex flex-col gap-[7px] lg:gap-[9px]'>
                                                            <h1>{t('cart.Size')}: S</h1>
                                                            <h1>{t('cart.Color')}: Blue</h1>
                                                            <h1>{t('cart.Qty')}: 2</h1>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {cancelItem === "ST1231231" ? <CommentForm /> : null}
                                    </div>

                                    <div className='flex flex-col justify-start gap-6'>
                                        <div className='flex items-center'>
                                            <button>{selectedItem === "ST1651231" ? <BsFillCheckSquareFill className='h-full' onClick={() => { setSelectedItem(''); setCancelItem('') }} /> : <BsSquare className='h-full' onClick={() => handleSelectItem('ST1651231')} />} </button>
                                            <div className='flex items-start gap-9 '>
                                                <div className='w-[122px] lg:w-[155px] h-[164px] lg:h-[205px] py-8 ml-5 md:py-0'>
                                                    <img src={`${PRODUCT_IMG_PATH}p-2.1.png`} className='h-full w-full object-cover' />
                                                </div>
                                                <div>
                                                    <div className='flex flex-col gap-3 w-[255px] md:w-[180px] ' >
                                                        <div className='flex flex-col gap-1'>
                                                            <h2 className='text-lg text-ellipsis overflow-hidden whitespace-nowrap font-gotham_medium'>Pique Polo Shirt</h2>
                                                            <h2 className='font-semibold text-base'>{currencySymbol} 300.00</h2>
                                                        </div>
                                                        <div className='pt-[13px] lg:pt-[18px] flex flex-col gap-[7px] lg:gap-[9px]'>
                                                            <h1>{t('cart.Size')}: S</h1>
                                                            <h1>{t('cart.Color')}: Blue</h1>
                                                            <h1>{t('cart.Qty')}: 2</h1>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {cancelItem === "ST1651231" ? <CommentForm /> : null}
                                    </div>

                                </div>

                                <div className='px-12   md:pl-5  my-[29px] flex flex-col gap-[35px] border-l-2 py-6'>
                                    <div className='flex flex-col mt-33px max-md:w-52 md:w-[197px] lg:w-[250px]'>
                                        <h1 className='font-semibold text-lg'>{t('order.Order Summary')}</h1>
                                        <h2 className='font-thin text-sm'>USCART393521073</h2>
                                    </div>
                                    <div className='flex flex-col gap-3'>
                                        <div className='flex justify-between   '>
                                            <h2>{t('order.Subtotal')}</h2>
                                            <h2 className='whitespace-nowrap'>{currencySymbol} 300.00</h2>
                                        </div>
                                        <div className='flex justify-between  '>
                                            <h2>{t('order.Shipping')}</h2>
                                            <h2 className='whitespace-nowrap'>{currencySymbol} {SHIPPING_CHARGES}.00</h2>
                                        </div>
                                        <div className='flex justify-between  '>
                                            <h2>{t('order.Tax')}</h2>
                                            <h2 className='whitespace-nowrap'>{currencySymbol} {SHIPPING_TAX}.00</h2>
                                        </div>
                                        <hr />
                                        <div className='flex font-semibold justify-between '>
                                            <h2>{t('order.Total')}</h2>
                                            <h2 className='whitespace-nowrap'>{currencySymbol} 355.00</h2>
                                        </div>
                                        {cancelItem !== '' &&
                                            <>
                                                <hr />
                                                <div className='flex font-semibold justify-between'>
                                                    <h2>{t('order.Refundable amount')}</h2>
                                                    <h2 className='whitespace-nowrap'>{currencySymbol} 135.00</h2>
                                                </div>
                                            </>
                                        }
                                    </div>
                                    {cancelItem !== '' && <div className='font-medium text-base '>
                                        <p>Return policy valid till 29 April 2024 </p>
                                        <button className='underline' onClick={() => { navigate(`/return-policy`) }}>{t('order.Know more')}</button>
                                        <div className='pb-10 mt-10  px-0 '>
                                            <Button className='mx-auto w-full' onClick={() => navigate('/orders/cancellation-request-success')}>{t('order.Cancel order')}</Button>
                                        </div>
                                    </div>}
                                </div>
                            </div>

                            <div className='bg-white my-5 p-5'>
                                <h4 className='font-gotham_medium text-2xl italic mb-6'>{t('update.Tracking History')}</h4>

                                <div className='flex py-5 relative z-20 '>

                                    <div className={`flex flex-col items-center w-1/4 py-4 gap-5 ${activeStageIndex >= 0 ? 'text-black' : 'text-zinc-400'}`}>
                                        <span className='font-light text-sm whitespace-nowrap'>{t('update.Ordered Placed')}</span>
                                        <div className='text-xl bg-white'>
                                            {activeStageIndex >= 0 ? <IoCheckboxSharp /> : <IoSquareOutline />}
                                        </div>
                                        <div>
                                            {activeStageIndex >= 0 ? <span className='font-light text-[12px] flex items-center flex-col'><span>13/01/2024</span> <span>8:30 AM</span></span> : ''}
                                        </div>
                                    </div>

                                    <div className={`flex flex-col items-center w-1/4 py-4 gap-5 ${activeStageIndex >= 1 ? 'text-black' : 'text-zinc-400'}`}>
                                        <span className='font-light text-sm whitespace-nowrap'>{t('update.Order Picked Up')}</span>
                                        <div className='text-xl bg-white'>
                                            {activeStageIndex >= 1 ? <IoCheckboxSharp /> : <IoSquareOutline />}
                                        </div>
                                        <div>
                                            {activeStageIndex >= 1 ? <span className='font-light text-[12px] flex items-center flex-col'><span>13/01/2024</span> <span>8:30 AM</span></span> : ''}
                                        </div>
                                    </div>

                                    <div className={`flex flex-col items-center w-1/4 py-4 gap-5 ${activeStageIndex >= 2 ? 'text-black' : 'text-zinc-400'}`}>
                                        <span className='font-light text-sm whitespace-nowrap'>{t('update.In Transit')}</span>
                                        <div className='text-xl bg-white'>
                                            {activeStageIndex >= 2 ? <IoCheckboxSharp /> : <IoSquareOutline />}
                                        </div>
                                        <div>
                                            {activeStageIndex >= 2 ? <span className='font-light text-[12px] flex items-center flex-col'><span>13/01/2024</span> <span>8:30 AM</span></span> : ''}
                                        </div>
                                    </div>

                                    <div className={`flex flex-col items-center w-1/4 py-4 gap-5 ${activeStageIndex >= 3 ? 'text-black' : 'text-zinc-400'}`}>
                                        <span className='font-light text-sm whitespace-nowrap'>{t('update.Out for Delivery')}</span>
                                        <div className='text-xl bg-white'>
                                            {activeStageIndex >= 3 ? <IoCheckboxSharp /> : <IoSquareOutline />}
                                        </div>
                                        <div>
                                            {activeStageIndex >= 3 ? <span className='font-light text-[12px] flex items-center flex-col'><span>13/01/2024</span> <span>8:30 AM</span></span> : ''}
                                        </div>
                                    </div>

                                    <div className={`flex flex-col items-center w-1/4 py-4 gap-5 ${activeStageIndex >= 4 ? 'text-black' : 'text-zinc-400'}`}>
                                        <span className='font-light text-sm whitespace-nowrap'>{t('update.Delivered')}</span>
                                        <div className='text-xl bg-white'>
                                            {activeStageIndex >= 4 ? <IoCheckboxSharp /> : <IoSquareOutline />}
                                        </div>
                                        <div>
                                            {activeStageIndex >= 4 ? <span className='font-light text-[12px] flex items-center flex-col'><span>13/01/2024</span> <span>8:30 AM</span></span> : ''}
                                        </div>
                                    </div>

                                    <div className="w-full absolute -z-10 h-1 top-[46%] flex justify-center">
                                        <div className={`w-1/5 h-full border-t-[2px] border-dashed ${activeStageIndex >= 1 ? 'border-black' : 'border-zinc-400'}`}></div>
                                        <div className={`w-1/5 h-full border-t-[2px] border-dashed ${activeStageIndex >= 2 ? 'border-black' : 'border-zinc-400'}`}></div>
                                        <div className={`w-1/5 h-full border-t-[2px] border-dashed ${activeStageIndex >= 3 ? 'border-black' : 'border-zinc-400'}`}></div>
                                        <div className={`w-1/5 h-full border-t-[2px] border-dashed ${activeStageIndex >= 4 ? 'border-black' : 'border-zinc-400'}`}></div>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* mobile  */}
            <div className='md:hidden p-4 pb-12'>
                <h1 className='font-semibold text-2xl pb-4'>{t('update.Order')} : {orderId}</h1>
                <div className='pb-7'>
                    <div className='flex items-center justify-between border border-b-0 border-black'>
                        <div className='p-5'>
                            <h1 className='font-bold text-lg'>Arrives by Thu, Jan 2024</h1>
                            <h1 className='text-sm'>To: 4140 Parker Rd. Allentown, New Mexico....</h1>
                        </div>
                    </div>
                    <div className='border border-black'>
                        <div className='flex p-4 pl-3'>
                            <button className='mr-[5px] text-sm'>{selectedItem === "ST1231231" ? <BsFillCheckSquareFill className='h-full' onClick={() => { setSelectedItem(''); setCancelItem('') }} /> : <BsSquare className='h-full' onClick={() => handleSelectItem('ST1231231')} />} </button>
                            <div className='min-w-[89px] h-[117px] '>
                                <img src={`${PRODUCT_IMG_PATH}p-2.1.png`} className='h-full w-full object-cover' />
                            </div>
                            <div className='w-full ml-5'>
                                <div className='flex  flex-col w-full justify-between mt-1 mb-3'>
                                    <h1 className='font-bold text-base'>Pique Polo Shirt</h1>
                                    <h1>{currencySymbol} 125.00</h1>
                                </div>
                                <div className='flex flex-col text-sm gap-1'>
                                    <h1>{t('cart.Size')}: S</h1>
                                    <h1>{t('cart.Color')}: Blue</h1>
                                    <h1>{t('cart.Qty')}: 2</h1>
                                </div>
                            </div>
                        </div>
                        <div className='flex p-4 pl-3 '>
                            <button className='mr-[5px] text-sm'>{selectedItem === "ST1651231" ? <BsFillCheckSquareFill className='h-full' onClick={() => { setSelectedItem(''); setCancelItem('') }} /> : <BsSquare className='h-full' onClick={() => handleSelectItem('ST1651231')} />} </button>
                            <div className='min-w-[89px] h-[117px] '>
                                <img src={`${PRODUCT_IMG_PATH}p-2.1.png`} className='h-full w-full object-cover' />
                            </div>
                            <div className='w-full ml-5'>
                                <div className='flex flex-col w-full justify-between mt-1 mb-3'>
                                    <h1 className='font-bold text-base '>Pique Polo shirt</h1>
                                    <h1>{currencySymbol} 125.00</h1>
                                </div>
                                <div className='flex flex-col text-sm gap-1'>
                                    <h1>{t('cart.Size')}: S</h1>
                                    <h1>{t('cart.Color')}: Blue</h1>
                                    <h1>{t('cart.Qty')}: 2</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='flex items-center justify-between border border-b-0 border-black'>
                        <div className='p-5'>
                            <h1 className='font-bold text-lg'>{t('order.Order Summary')}</h1>
                            <h1 className='text-sm'>{orderId}</h1>
                        </div>
                    </div>
                    <div className='border p-5 border-black flex flex-col gap-4'>
                        <div className='flex justify-between'>
                            <h1 className='text-base'>{t('order.Subtotal')}</h1>
                            <h1 className='whitespace-nowrap'>{currencySymbol} 300.00</h1>
                        </div>
                        <div className='flex justify-between'>
                            <h1>{t('order.Shipping')}</h1>
                            <h1 className='whitespace-nowrap'>{currencySymbol} {SHIPPING_CHARGES}.00</h1>
                        </div>
                        <div className='flex justify-between'>
                            <h1>{t('order.Tax')}</h1>
                            <h1 className='whitespace-nowrap'>{currencySymbol} {SHIPPING_TAX}.00</h1>
                        </div>
                    </div>
                    <div className='p-5 font-gotham_medium flex justify-between border border-t-0 border-black'>
                        <h1>{t('order.Total')}</h1>
                        <h1 className='whitespace-nowrap'>{currencySymbol} 335.00</h1>
                    </div>
                </div>

                <div className='border border-black mt-7 p-6'>
                    <h3>{t('update.Tracking History')}</h3>
                    <span>Order Id : {orderId}</span>

                    <div className='flex flex-col gap-[40px] py-9 relative'>
                        <div className={`flex flex-row items-center z-10 gap-x-9 ${activeStageIndex >= 0 ? 'text-black' : 'text-zinc-400'}`}>
                            <div>{activeStageIndex >= 0 ? <IoCheckboxSharp className='size-6 bg-white' /> : <IoSquareOutline className='size-6 bg-white' />}</div>
                            <div>
                                <h1 className='text-[18px] font-semibold'>{t('update.Ordered Placed')}</h1>
                                {activeStageIndex >= 0 ? <span className='font-light text-sm'>13/01/2024 - 8:30 AM</span> : ''}
                            </div>
                        </div>
                        <div className={`flex flex-row items-center z-10 gap-x-9 ${activeStageIndex >= 1 ? 'text-black' : 'text-zinc-400'}`}>
                            <div>{activeStageIndex >= 1 ? <IoCheckboxSharp className='size-6 bg-white' /> : <IoSquareOutline className='size-6 bg-white' />}</div>
                            <div>
                                <h1 className='text-[18px] font-semibold'>{t('update.Order Picked Up')}</h1>
                                {activeStageIndex >= 1 ? <span className='font-light text-sm'>13/01/2024 - 8:30 AM</span> : ''}
                            </div>
                        </div>
                        <div className={`flex flex-row items-center z-10 gap-x-9 ${activeStageIndex >= 2 ? 'text-black' : 'text-zinc-400'}`}>
                            <div>{activeStageIndex >= 2 ? <IoCheckboxSharp className='size-6 bg-white' /> : <IoSquareOutline className='size-6 bg-white' />}</div>
                            <div>
                                <h1 className='text-[18px] font-semibold'>{t('update.In Transit')}</h1>
                                {activeStageIndex >= 2 ? <span className='font-light text-sm'>13/01/2024 - 8:30 AM</span> : ''}
                            </div>
                        </div>
                        <div className={`flex flex-row items-center z-10 gap-x-9 ${activeStageIndex >= 3 ? 'text-black' : 'text-zinc-400'}`}>
                            <div>{activeStageIndex >= 3 ? <IoCheckboxSharp className='size-6 bg-white' /> : <IoSquareOutline className='size-6 bg-white' />}</div>
                            <div>
                                <h1 className='text-[18px] font-semibold'>{t('update.Out for Delivery')}</h1>
                                {activeStageIndex >= 3 ? <span className='font-light text-sm'>13/01/2024 - 8:30 AM</span> : ''}
                            </div>
                        </div>
                        <div className={`flex flex-row items-center z-10 gap-x-9 ${activeStageIndex >= 4 ? 'text-black' : 'text-zinc-400'}`}>
                            <div>{activeStageIndex >= 4 ? <IoCheckboxSharp className='size-6 bg-white' /> : <IoSquareOutline className='size-6 bg-white' />}</div>
                            <div>
                                <h1 className='text-[18px] font-semibold'>{t('Delivered')}</h1>
                                {activeStageIndex >= 4 ? <span className='font-light text-sm'>13/01/2024 - 8:30 AM</span> : ''}
                            </div>
                        </div>
                        <div className="w-[1px] absolute h-[77%] top-[50%] flex flex-col justify-center translate-x-[10px] -translate-y-1/2">
                            <div className={`h-1/3 w-full border-l-[2px] border-dashed ${activeStageIndex >= 1 ? 'border-black' : 'border-zinc-400'}`}></div>
                            <div className={`h-1/3 w-full border-l-[2px] border-dashed ${activeStageIndex >= 2 ? 'border-black' : 'border-zinc-400'}`}></div>
                            <div className={`h-1/3 w-full border-l-[2px] border-dashed ${activeStageIndex >= 3 ? 'border-black' : 'border-zinc-400'}`}></div>
                            <div className={`h-1/3 w-full border-l-[2px] border-dashed ${activeStageIndex >= 4 ? 'border-black' : 'border-zinc-400'}`}></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex flex-col px-5 text-base pb-7 md:hidden font-gotham_medium gap-2 underline'>
                <Link to="">{t('order.Download Invoice')}</Link>
                <Link to="../../contact-us">{t('order.Need help?')}</Link>
                {(selectedItem !== '' && orderState !== 'Delivered') &&
                    <button className='w-fit' onClick={() => navigate('/orders/cancel-order', { state: { orderId: orderId } })} >{t('order.Cancel order')}</button>
                }
                {(selectedItem !== '' && orderState === 'Delivered') &&
                    <button className='w-fit' onClick={() => navigate(`/orders/return-request`, { state: { orderId: orderId } })}>{t('order.Exchange & Return')}</button>
                }
                <Link to="/orders/order-return">{t('order.Return')}</Link>     {/* add return and exchange link after deliverd */}
            </div>

        </div>
    )
}
const CommentForm = () => {
    const { t } = useTranslation();
    return (

        <div className='flex flex-col gap-7 items-end'>
            <div className='flex flex-col justify-start gap-3 w-[90%]'>
                <label className='text-xl' htmlFor="Select a return reason">{t('order.Select a return reason')}</label>
                <select className='border-[1px] border-black py-3 px-5 rounded-none'>
                    <option value="" selected disabled>{t('returnreq.Select a return reason')}</option>
                    <option value="Item Doesn’t Fit">{t('returnreq.Item Doesn’t Fit')}</option>
                    <option value="Wrong color">{t('returnreq.Wrong color')}</option>
                    <option value="Item Arrived Damaged">{t('returnreq.Item Arrived Damaged')}</option>
                    <option value="Quality">{t("returnreq.i don't like Quality")}</option>
                    <option value="Wrong item">{t('returnreq.Wrong item')}</option>
                    <option value=" Item is Different Than Described"> {t('returnreq.Item is Different Than Described')}</option>
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
    );
};


export default OrderDetail