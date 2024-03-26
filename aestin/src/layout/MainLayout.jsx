import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import FooterSM from '../common/FooterSM';
import { IoMdClose } from "react-icons/io";
import { useTranslation } from 'react-i18next'
import Button from '../common/Button';



const MainLayout = ({ children }) => {

    const { t } = useTranslation();

    const { pathname } = useLocation();

    const shouldDisplayNavbar = !['/'].includes(pathname);
    const shouldDisplayFooter = !['/login', '/register', '/forgot-password', '/deactivate-account', '/otp-confirmation', '/new-password', '/logout', '/contact-us'].includes(pathname);
    const shouldDisplayFooterSM = !['/login', '/register', '/forgot-password', '/deactivate-account', '/otp-confirmation', '/new-password', '/logout', '/contact-us'].includes(pathname);

    // State to manage popup visibility
    const [showPopup, setShowPopup] = useState(false);

    const handleInterestClick = () => {
        setShowPopup(false)
    }

    useEffect(() => {
        // Show the popup after 10 seconds
        const timer = setTimeout(() => {
            setShowPopup(false);
        }, 10000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {shouldDisplayNavbar && <Navbar />}
            {children}
            {shouldDisplayFooter && <Footer />}
            {shouldDisplayFooterSM && <FooterSM />}
            {showPopup && (
                <div className='w-screen h-screen overflow-x-hidden fixed top-0 left-0 items-center pt-12 bg-[#000000d9] z-[500] flex justify-center '>
                    <div className="bg-white absolute  w-[90%] max-w-4xl max-md:max-w-2xl  my-44 ">
                        <div className='flex justify-end pb-4 max-md:pb-0 mt-6 pr-11  '>
                            <button onClick={handleInterestClick} >
                                <IoMdClose style={{ fontSize: "33px" }} />
                            </button>
                        </div>
                        <div className='p-20 max-md:p-8 max-md:pt-3 pb-16 pt-0'>
                            <div className='bg-[#F4F4F4] px-9 h-32 w-full flex flex-col justify-center items-center' >
                                <h1 className='text-[42px] max-md:text-[20px]'>Sign up for our newsletter</h1>
                                <h2 className='max-md:text-[13px]'>Don’t miss out on the latest news, <br />privet sales and exclusive offers.</h2>
                            </div>
                            <form>
                                <div className='form__group field'>
                                    <div className='form__group field'>
                                        <input type="email" className="form__field" placeholder={t('career.Email')} />
                                        <label htmlFor="Email" className="form__label">{t('career.Email')}</label>
                                    </div>
                                </div>
                                <div className='flex md:gap-5 flex-col md:flex-row max-md:w-full'>
                                    <div className='form__group field w-1/2 max-md:w-full'>
                                        <div className='form__group field'>
                                            <input type="text" className="form__field" placeholder={t('career.First Name')} />
                                            <label htmlFor="First Name" className="form__label">{t('career.First Name')}</label>
                                        </div>
                                    </div>
                                    <div className='form__group field w-1/2 max-md:w-full'>
                                        <div className='form__group field'>
                                            <input type="text" className="form__field" placeholder={t('career.Last Name')} />
                                            <label htmlFor="Last Name" className="form__label">{t('career.Last Name')}</label>
                                        </div>
                                    </div>
                                </div>
                                <div className='form__group max-md:w-full w-1/2 field'>
                                    <div className='form__group field'>
                                        <input type="date" className="form__field" placeholder={t('career.From Date')} />
                                        <label htmlFor="From Date" className="form__label">{t('career.From Date')}</label>
                                    </div>
                                </div>
                                <div className='my-10 flex flex-col gap-2'>
                                    <div className="flex items-center font-bold">
                                        <span className="mr-2" style={{ fontSize: "18px" }}>Gender:</span>
                                    </div>
                                    <div className='max-md:text-xs flex items-center mt-2'>
                                        <input
                                            type="radio"
                                            id="male"
                                            name="gender"
                                            value="male"
                                            className="mr-1"
                                        />
                                        <label htmlFor="male" style={{ fontSize: "18px" }} className="mr-4">Male</label>
                                        <input
                                            type="radio"
                                            id="female"
                                            name="gender"
                                            value="female"
                                            className="mr-1"
                                        />
                                        <label style={{ fontSize: "18px" }} htmlFor="female">Female</label>
                                    </div>
                                </div>
                                <div className='my-9 flex flex-col gap-2'>
                                    <div className='flex font-bold'>
                                        <label style={{ fontSize: "18px" }}>Are you Interested in:</label>
                                    </div>
                                    <div className='flex gap-5 flex-wrap mt-2'>
                                        <div className='max-md:text-xs flex items-center ' >
                                            <input
                                                type="checkbox"
                                                id="menswear"
                                                name="menswear"
                                                value="menswear"
                                                className='mr-2 '
                                            />
                                            <label style={{ fontSize: "18px", fontWeight: "lighter" }} htmlFor="menswear">Menswear</label>
                                        </div>
                                        <div className='max-md:text-xs flex items-center'>
                                            <input
                                                type="checkbox"
                                                id="womenswear"
                                                name="womenswear"
                                                value="womenswear"
                                                className='mr-2'
                                            />
                                            <label style={{ fontSize: "18px", fontWeight: "lighter" }} htmlFor="womenswear">Womenswear</label>
                                        </div>

                                        <div className='max-md:text-xs flex items-center'>
                                            <input
                                                type="checkbox"
                                                id="accessories"
                                                name="accessories"
                                                value="accessories"
                                                className='mr-2'
                                            />
                                            <label style={{ fontSize: "18px", fontWeight: "lighter" }} htmlFor="accessories" >Accessories</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="agreeCheckbox"
                                        name="agreeCheckbox"
                                        className="form-checkbox h-5 w-5 text-blue-600"
                                    />
                                    <label
                                        htmlFor="agreeCheckbox"
                                        className="ml-2 block text-gray-700 max-md:text-xs"
                                    >
                                        I agree to receive emails from your company and accept your terms and conditions.
                                    </label>
                                </div>
                            </form>
                            <Button className='w-3/5 mt-7'>
                                SIGN UP
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default MainLayout;
