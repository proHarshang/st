import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../common/Navbar';
import ProductCard from '../components/ProductCard';

import { useTranslation } from 'react-i18next'
import i18next from "i18next"

const Home2 = () => {
    const { t } = useTranslation();

    const [solidNav, setSolidNav] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const showcaseCategories = document.querySelector('.showcase_categories');
            if (showcaseCategories) {
                const rect = showcaseCategories.getBoundingClientRect();
                const isTouchingTop = rect.top <= 0;
                setSolidNav(isTouchingTop);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className='container'>
            <Navbar styleClass={`${solidNav ? "bg-white text-black shadow-md" : "bg-transparent text-white backdrop-blur-[6px]"} fixed`} forPage='Home' SolidNav={solidNav} />

            {/* hero section  */}
            <div className='md:hidden'>
                <div className="hero_section h-[100vh] w-full text-white flex justify-around items-end md:flex-col-reverse md:items-center">
                    <img src="/assets/images/hero_img_2.png" alt="Aestin" className='absolute left-1/2 -translate-x-1/2 h-4/5' />
                    <div className='h-full flex items-center justify-center w-screen gap-5 text-center'>
                        <div className='flex flex-col items-center gap-4'>
                            <h1 className='text-[44px] relative z-10'>New summer<br />
                                Collection 2024</h1>
                            <Link to="" className='text-[17px] md:text-[28px]'>{t('discover')}</Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className='max-md:hidden'>
                <div className="hero_section h-[100vh] w-full text-white flex justify-around items-end md:flex-col-reverse md:items-center lg:flex-row lg:items-end">
                    <img src="/assets/images/hero_img.png" alt="Aestin" className='max-lg:max-h-[37rem] max-lg:h-[676px] max-xl:max-h-[40rem] xl:w-[50vmin] xl:h-auto' />
                    <div className='h-full flex items-center'>
                        <div className='flex flex-col items-center gap-4 xl:gap-8'>
                            <h1 className='text-[75px] xl:text-[10vmin] '>New summer<br />
                                Collection 2024</h1>
                            <Link to="" className='text-[16px] md:text-[28px] lg:text-[18px] xl:text-[2.5vmin]'>{t('discover')}</Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* showcase_categories */}
            <div className='showcase_categories'>
                <div className='p-20 relative '>
                    <div style={{ background: 'url(/assets/images/bg1.png) center/cover no-repeat ', opacity: '0.15', backgroundSize: 'cover' }} className='absolute h-full top-0 left-0 w-full '></div>
                    <div className='w-[53%] h-[330px] mt-[170px] bg-black relative flex items-end justify-end' style={{ background: 'radial-gradient(91.54% 209.53% at 8.46% 21.34%, #000000 48.26%, #666666 100%)' }}>
                        <img src='/assets/images/god3.png' className='h-[530px] absolute m-auto mt-[-203px] left-1/2 -translate-x-[90%]' />
                        <button className='text-white border border-white text-[25px] mb-[30px] mr-11 py-[5px] px-[11px]'>Women</button>
                    </div>


                    <div className='mt-[-88px] flex justify-end'>
                        <div className='w-[53%] h-[330px] mt-[140px] bg-black relative flex items-end' style={{ background: 'radial-gradient(75.87% 173.75% at 73.39% 35.44%, #000000 39.12%, #666666 100%)' }}>
                            <img src='/assets/images/god2.png' className='h-[530px] absolute m-auto mt-[-203px] left-1/2 -translate-x-[-20%]' />
                            <button className='text-white border border-white text-[25px] mb-[30px] ml-11 py-[5px] px-[11px]'>Men</button>
                        </div>
                    </div>


                    <div className='mt-[-81px]' >
                        <div className='w-[53%] h-[330px] mt-[140px] bg-black relative flex items-end justify-end' style={{ background: 'radial-gradient(77.85% 132.31% at 24.26% 33.75%, #000000 34.4%, #666666 100%)' }}>
                            <img src='/assets/images/god4.png' className='h-[530px] absolute m-auto mt-[-203px] left-1/2 -translate-x-[80%]' />
                            <button className='text-white border border-white text-[25px] mb-[30px] mr-11 py-[5px] px-[11px]'>Accessories</button>
                        </div>
                    </div>

                </div>
                <img src='/assets/images/home4.png ' className='absolute w-[450px] mt-[80px] ml-20' />
                <div className='bg-black w-full h-[295px] mt-0 '>
                </div>
                <div className='flex mr-20 justify-end'><img src='/assets/images/home5.png' className='w-[450px] mt-[186px] ml-20 ' /> </div>

                <div className=''>
                    <img src='/assets/images/caplast.png' />
                </div>
                <div className='mt-[-110px]'>
                    <img src='/assets/images/last.png' />
                </div>
            </div>


        </div>
    );
};

export default Home2;
