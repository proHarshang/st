import React, { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../common/Button';
import { useTranslation } from 'react-i18next'


const Accessories = () => {
    const { t } = useTranslation();

    return (
        <div className=''>
            <div className='hidden md:block'>
                <div className=' flex  flex-col gap-14'>
                    <div className='  flex '>
                        <div className='bg-gray-100 w-1/2 relative'>
                            <img src='/assets/images/cap.png' className='mt-20 m-auto' />
                            
                        </div>

                        <div className="w-1/2 ">
                            <div className=' w-[80%] my-[50px] mx-auto max-md:mt-8  max-md:w-11/12 max-md:my-5 flex flex-col gap-9 m-auto'>
                                <div className="flex justify-between items-center">
                                    <h1 className='product_title text-2xl pr-4'>Classic baseball cap</h1>
                                    <span className='product_price text-gray-500 text-xl'>$ 112</span>
                                </div>
                                <div>
                                    <p className='mt-3'>Elevate your casual style with our timeless baseball cap crafted from soft cotton twill, offering comfort and versatility,  </p>
                                </div>
                                <div className='product_color flex items-center gap-3'>
                                    <h6 className='lable text-[22px]'>{t('accessories.Color')} :</h6>
                                    <span className='text-base'>{t('accessories.Black')}</span>
                                </div>
                                <div className='product_qty flex gap-3 items-center'>
                                    <h6 className='lable text-[22px]'>{t('accessories.QTY')} :</h6>
                                    <select name="qty" id="qty_field" className='px-2 text-base'>
                                        <option value="QTY">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                    </select>
                                </div>
                                <div className="button_group flex flex-col w-full gap-3">
                                    <Button className='w-full' varient='outline'>{t('accessories.Add To Cart')}</Button>
                                    <Button className='w-full' varient='solid'>{t('accessories.CHECKOUT')}</Button>
                                </div>
                                <div className='links flex flex-col gap-1 font-medium text-base'>
                                    <Link to="">{t('accessories.Product Details')}</Link>
                                    <Link to="">{t('accessories.Return & Exchange')}</Link>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className='  flex '>
                        <div className='bg-gray-100 w-1/2 '>
                            <img src='/assets/images/watch.png' className='mt-20 m-auto ' />
                        </div>
                        <div className="w-1/2 ">
                            <div className=' w-[80%] my-[50px] mx-auto max-md:mt-8  max-md:w-11/12 max-md:my-5 flex flex-col gap-9 m-auto'>
                                <div className="flex justify-between items-center">
                                    <h1 className='product_title text-2xl pr-4'>Stylist golden watch</h1>
                                    <span className='product_price text-gray-500 text-xl'>$ 222</span>

                                </div>
                                <div className='product_color flex items-center gap-3'>
                                    <h6 className='lable text-[22px]'>{t('accessories.Color')} :</h6>
                                    <span className='text-base'>Golden</span>
                                </div>
                                <div className='product_qty flex gap-3 items-center'>
                                    <h6 className='lable text-[22px]'>{t('accessories.QTY')} :</h6>
                                    <select name="qty" id="qty_field" className='px-2 text-base'>
                                        <option value="QTY">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                    </select>
                                </div>
                                <div className="button_group flex flex-col w-full gap-3">
                                    <Button className='w-full' varient='outline'>{t('accessories.Add To Cart')}</Button>
                                    <Button className='w-full' varient='solid'>{t('accessories.CHECKOUT')}</Button>
                                </div>
                                <div className='links flex flex-col gap-1 font-medium text-base'>
                                    <Link to="">{t('accessories.Product Details')}</Link>
                                    <Link to="">{t('accessories.Return & Exchange')}</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='  flex '>
                        <div className='bg-gray-100 w-1/2 '>
                            <img src='/assets/images/belt.png' className='mt-20 m-auto' />
                        </div>
                        <div className="w-1/2 ">
                            <div className=' w-[80%] my-[50px] mx-auto max-md:mt-8  max-md:w-11/12 max-md:my-5 flex flex-col gap-9 m-auto'>
                                <div className="flex justify-between items-center">
                                    <h1 className='product_title text-2xl pr-4'>Black belt for men </h1>
                                    <span className='product_price text-gray-500 text-xl'>$ 112</span>

                                </div>
                                <div className='product_color flex items-center gap-3'>
                                    <h6 className='lable text-[22px]'>{t('accessories.Color')} :</h6>
                                    <span className='text-base'>Black</span>
                                </div>
                                <div className='product_qty flex gap-3 items-center'>
                                    <h6 className='lable text-[22px]'>{t('accessories.QTY')} :</h6>
                                    <select name="qty" id="qty_field" className='px-2 text-base'>
                                        <option value="QTY">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                    </select>
                                </div>
                                <div className="button_group flex flex-col w-full gap-3">
                                    <Button className='w-full' varient='outline'> {t('accessories.Add To Cart')}</Button>
                                    <Button className='w-full' varient='solid'>{t('accessories.CHECKOUT')}</Button>
                                </div>
                                <div className='links flex flex-col gap-1 font-medium text-base'>
                                    <Link to="">{t('accessories.Product Details')}</Link>
                                    <Link to="">{t('accessories.Return & Exchange')}</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='  flex '>
                        <div className='bg-gray-100 w-1/2 '>
                            <img src='/assets/images/purs.png' className='mt-20 m-auto' />
                        </div>
                        <div className="w-1/2 ">
                            <div className=' w-[80%] my-[50px] mx-auto max-md:mt-8  max-md:w-11/12 max-md:my-5 flex flex-col gap-9 m-auto'>
                                <div className="flex justify-between items-center">
                                    <h1 className='product_title text-2xl pr-4'>Brown bucket bag  </h1>
                                    <span className='product_price text-gray-500 text-xl'>$ 112</span>

                                </div>
                                <div className='product_color flex items-center gap-3'>
                                    <h6 className='lable text-[22px]'>Color :</h6>
                                    <span className='text-base'>Black</span>
                                </div>
                                <div className='product_qty flex gap-3 items-center'>
                                    <h6 className='lable text-[22px]'>QTY :</h6>
                                    <select name="qty" id="qty_field" className='px-2 text-base'>
                                        <option value="QTY">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                    </select>
                                </div>
                                <div className="button_group flex flex-col w-full gap-3">
                                    <Button className='w-full' varient='outline'>Add To Cart</Button>
                                    <Button className='w-full' varient='solid'>CHECKOUT</Button>
                                </div>
                                <div className='links flex flex-col gap-1 font-medium text-base'>
                                    <Link to="">Product Details</Link>
                                    <Link to="">Return & Exchange</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='md:hidden'>

                <div>
                    <div className='bg-gray-100 h-[500px] ' >
                        <img src='/assets/images/cap.png' className='m-auto mt-1/2' />
                    </div>
                    <div className="p-5 ">
                        <div className='  max-md:mt-8  max-md:w-11/12 max-md:my-5 flex flex-col gap-9 m-auto'>
                            <div className="flex justify-between items-center">
                                <h1 className='product_title text-2xl pr-4'>Brown bucket bag  </h1>
                                <span className='product_price text-gray-500 text-xl'>$ 112</span>

                            </div>
                            <div className='product_color flex items-center gap-3'>
                                <h6 className='lable text-[22px]'>Color :</h6>
                                <span className='text-base'>Black</span>
                            </div>
                            <div className='product_qty flex gap-3 items-center'>
                                <h6 className='lable text-[22px]'>QTY :</h6>
                                <select name="qty" id="qty_field" className='px-2 text-base'>
                                    <option value="QTY">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                </select>
                            </div>
                            <div className="button_group flex flex-col w-full gap-3">
                                <Button className='w-full' varient='outline'>Add To Cart</Button>
                                <Button className='w-full' varient='solid'>CHECKOUT</Button>
                            </div>
                            <div className='links flex flex-col gap-1 font-medium text-base'>
                                <Link to="">Product Details</Link>
                                <Link to="">Return & Exchange</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='bg-gray-100 h-[500px] ' >
                        <img src='/assets/images/watch.png' className='m-auto mt-1/2' />
                    </div>
                    <div className="p-5 ">
                        <div className='  max-md:mt-8  max-md:w-11/12 max-md:my-5 flex flex-col gap-9 m-auto'>
                            <div className="flex justify-between items-center">
                                <h1 className='product_title text-2xl pr-4'>Brown bucket bag  </h1>
                                <span className='product_price text-gray-500 text-xl'>$ 112</span>

                            </div>
                            <div className='product_color flex items-center gap-3'>
                                <h6 className='lable text-[22px]'>Color :</h6>
                                <span className='text-base'>Black</span>
                            </div>
                            <div className='product_qty flex gap-3 items-center'>
                                <h6 className='lable text-[22px]'>QTY :</h6>
                                <select name="qty" id="qty_field" className='px-2 text-base'>
                                    <option value="QTY">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                </select>
                            </div>
                            <div className="button_group flex flex-col w-full gap-3">
                                <Button className='w-full' varient='outline'>Add To Cart</Button>
                                <Button className='w-full' varient='solid'>CHECKOUT</Button>
                            </div>
                            <div className='links flex flex-col gap-1 font-medium text-base'>
                                <Link to="">Product Details</Link>
                                <Link to="">Return & Exchange</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='bg-gray-100 h-[500px] ' >
                        <img src='/assets/images/belt.png' className='m-auto mt-1/2' />
                    </div>
                    <div className="p-5 ">
                        <div className='  max-md:mt-8  max-md:w-11/12 max-md:my-5 flex flex-col gap-9 m-auto'>
                            <div className="flex justify-between items-center">
                                <h1 className='product_title text-2xl pr-4'> Classic baseball cap</h1>
                                <span className='product_price text-gray-500 text-xl'>$ 112</span>

                            </div>
                            <div className='product_color flex items-center gap-3'>
                                <h6 className='lable text-[22px]'>Color :</h6>
                                <span className='text-base'>Black</span>
                            </div>
                            <div className='product_qty flex gap-3 items-center'>
                                <h6 className='lable text-[22px]'>QTY :</h6>
                                <select name="qty" id="qty_field" className='px-2 text-base'>
                                    <option value="QTY">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                </select>
                            </div>
                            <div className="button_group flex flex-col w-full gap-3">
                                <Button className='w-full' varient='outline'>Add To Cart</Button>
                                <Button className='w-full' varient='solid'>CHECKOUT</Button>
                            </div>
                            <div className='links flex flex-col gap-1 font-medium text-base'>
                                <Link to="">Product Details</Link>
                                <Link to="">Return & Exchange</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='bg-gray-100 h-[500px] ' >
                        <img src='/assets/images/purs.png' className='m-auto mt-1/2' />
                    </div>
                    <div className="p-5 ">
                        <div className='  max-md:mt-8  max-md:w-11/12 max-md:my-5 flex flex-col gap-9 m-auto'>
                            <div className="flex justify-between items-center">
                                <h1 className='product_title text-2xl pr-4'>Classic baseball cap  </h1>
                                <span className='product_price text-gray-500 text-xl'>$ 112</span>

                            </div>
                            <div className='product_color flex items-center gap-3'>
                                <h6 className='lable text-[22px]'>Color :</h6>
                                <span className='text-base'>Black</span>
                            </div>
                            <div className='product_qty flex gap-3 items-center'>
                                <h6 className='lable text-[22px]'>QTY :</h6>
                                <select name="qty" id="qty_field" className='px-2 text-base'>
                                    <option value="QTY">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                </select>
                            </div>
                            <div className="button_group flex flex-col w-full gap-3">
                                <Button className='w-full' varient='outline'>Add To Cart</Button>
                                <Button className='w-full' varient='solid'>CHECKOUT</Button>
                            </div>
                            <div className='links flex flex-col gap-1 font-medium text-base'>
                                <Link to="">Product Details</Link>
                                <Link to="">Return & Exchange</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Accessories