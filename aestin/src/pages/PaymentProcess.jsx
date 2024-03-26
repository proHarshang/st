import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';
import { useNavigate } from 'react-router-dom';
import { CiSquarePlus } from "react-icons/ci";
import { CiSquareMinus } from "react-icons/ci";
import { FaCreditCard } from "react-icons/fa6";
import { useTranslation } from 'react-i18next'



const Cart = () => {
    const { t } = useTranslation();

    const navigate = useNavigate()

    const [quantities, setQuantities] = useState([1, 1, 1, 1]);

    const incrementQuantity = (index) => {
        if (quantities[index] < 10) {
            setQuantities(prevQuantities => {
                const newQuantities = [...prevQuantities];
                newQuantities[index] += 1;
                return newQuantities;
            });
        }
    };

    const decrementQuantity = (index) => {
        if (quantities[index] > 1) {
            setQuantities(prevQuantities => {
                const newQuantities = [...prevQuantities];
                newQuantities[index] -= 1;
                return newQuantities;
            });
        }
    };

    return (
        <div className=" container  bg-gray-200 max-sm:bg-white pt-8">
            <div className='hidden max-sm:block mx-7'>
                <Link to="/" className="font-thin text-lg">{t('cart.Cart')} </Link> <span>/ </span>
                <Link to="/" className="font-thin text-lg">{t('cart.Information')} </Link><span>/ </span>
                <Link to="/" className="font-bold text-lg">{t('cart.Payment')}</Link>
            </div>
            <div className="flex gap-10 sm:gap-5 lg:gap-8 items-start flex-col md:flex-row p-10 max-sm:p-0 sm:p-5 lg:p-10">

                <div className='bg-white p-8 sm:p-5 lg:p-8 w-[85%] max-sm:w-full'>
                    <h1 className='text-xl font-thin mb-4'>{t('payment.Select a payment method')}</h1>
                    <div className='flex justify-between items-center  mb-4'>
                        <div className="flex items-center mt-4">
                            <input type="radio" id="Credit or Debit card" name="paymentMethod" className="form-radio h-5 w-5 text-gray-600"></input>
                            <label htmlFor="Credit or Debit card" className="ml-2 text-lg">{t('payment.Credit or Debit card')}</label>
                        </div>                        <div className='flex gap-5 '>
                            <img src='/assets\images\visa.png' className='w-8 h-4'></img>
                            <img src='/assets\images\visa2.png' className='w-8 h-4'></img>
                            <img src='/assets\images\master.png' className='w-8 h-4'></img>
                            <img src='/assets\images\visa3.png' className='w-8 h-4'></img>
                        </div>
                    </div>
                    <div className='flex flex-col gap-7 w-4/5'>
                        <form>
                            <div className='form__group w-full field'>
                                <label for="Card number" className="form__label text-lg">Card Number</label>
                                <input type="number" placeholder="OOOO OOOO OOOO OOOO" name="middleName" className="border border-black w-full"></input>

                            </div>
                            <div className='flex items-center w-full '>
                                <div className='form__group w-[35%] field'>
                                    <label for="Name on card" className="form__label text-sm w-full">Name on card</label>
                                    <input type="text" placeholder="ABCD" name="Name on card" className="border border-black "></input>
                                </div>
                                <div className='form__group w-[30%] field'>
                                    <label for="EXP date" className="form__label text-sm w-full">EXP date</label>
                                    <input type="date" placeholder="MM/YY" name="middleName" className="border border-black"></input>
                                </div>
                                <div className='form__group  field w-[30%]'>
                                    <label for="CVV" className="form__label text-sm w-full">CVV</label>
                                    <input type="number" placeholder="..." name="middleName" className="border border-black"></input>
                                </div>
                            </div>
                        </form>

                        <Button varient='outline' className='w-100%'>{t('payment.PAY')}</Button>
                    </div>
                    <div className="flex items-center mt-4">
                        <input type="radio" id="paypal" name="paymentMethod" className="form-radio h-5 w-5 text-gray-600"></input>
                        <label htmlFor="paypal" className="ml-2 text-lg">PayPal</label>
                    </div>
                    <p className='ml-2 text-xs'>{t('payment.You will be redirected to PayPal website to complete your purchase.')}</p>
                    <div className="flex items-center mt-4">
                        <input type="radio" id="americanExpress" name="paymentMethod" className="form-radio h-5 w-5 text-gray-600"></input>
                        <label htmlFor="americanExpress" className="ml-2 text-lg">American Express</label>
                    </div>
                </div>

                <div className='bg-white p-12 md:sticky md:top-[8%] sm:p-6 w-full md:w-[55%] lg:max-w-[400px] max-sm:p-5 max-sm:mb-14'>
                    <h1 className='text-2xl font-thin sm:text-[18px] mb-0'>{t('payment.Order summary')}</h1>
                    <h4 className="font-thin mb-8 sm:text-[12px]">{t('payment.USCART393521073')}</h4>
                    <div className="flex justify-between mb-3">
                        <h3 className="font-thin text-[14px]">{t('payment.Subtotal')}</h3>
                        <h3 className="font-thin text-[14px]">$300.00</h3>
                    </div>
                    <div className="flex justify-between mb-3">
                        <h3 className="font-thin text-[14px]">{t('payment.Shipping')}</h3>
                        <h3 className="font-thin text-[14px]">$10.00</h3>
                    </div>
                    <div className="flex justify-between mb-3">
                        <h3 className="font-thin text-[14px]">{t('payment.Tax')}</h3>
                        <h3 className="font-thin text-[14px]">$5.00</h3>
                    </div>
                    <hr className="bg-black w-full my-[1.25rem]" />
                    <div className="flex justify-between">
                        <h3 className='font-bold'>{t('payment.Total')}</h3>
                        <h3 className='font-bold'>$315.00</h3>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <div className='flex justify-between items-center pt-9'>
                            <h1 className='text-2xl font-thin sm:text-[18px] mb-0'>{t('payment.Delivery address')}</h1>
                            <button onClick={() => navigate('/payment-information')} className='underline text text-xs' >{t('payment.Change')}</button>
                        </div>
                        <div className='flex'>
                            <p className='text-[15px] w-full'>4140 Parker Rd. Allentown,<br /> New Mexico 31134</p>
                        </div>

                    </div>

                </div>
            </div>
        </div>

    );
};

export default Cart;