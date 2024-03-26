import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import Navbar from '../common/Navbar';
import { useTranslation } from 'react-i18next'
import { useLogin } from "../hooks/useLogin"

const Home2 = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const { login, error, isLoading } = useLogin()

    const [muted, setMuted] = useState(true);

    const [solidNav, setSolidNav] = useState(false)
    const [isMenHovered, setIsMenHovered] = useState(false)
    const [isWomenHovered, setIsWomenHovered] = useState(false)
    const [isAccessoriesHovered, setIsAccessoriesHovered] = useState(false)

    const [menCardHovered, setMenCardHovered] = useState(false)
    const [womenCardHovered, setWomenCardHovered] = useState(false)
    const [accessoryCardHovered, setAccessoryCardHovered] = useState(false)

    const toggleMute = () => {
        setMuted(!muted);
    };

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

    useEffect(() => {
        const fetchData = async () => {
            const searchParams = new URLSearchParams(location.search);
            const email = searchParams.get('email');
            const id = searchParams.get('id');

            // Check if both email and id parameters exist
            if (email && id) {
                await login(email, id, false);
                window.location.href = '/';
            }
        };

        fetchData();
    }, [location]);

    return (
        <div >
            <Navbar styleClass={`${solidNav ? "bg-white text-black" : "bg-transparent text-white"} fixed`} forPage='Home' SolidNav={solidNav} />

            {/* hero section  */}
            <div className='md:hidden'>
                <div className="hero_section relative h-[100vh] w-full text-white flex justify-around items-end md:flex-col-reverse md:items-center overflow-hidden">
                    <video autoPlay loop className='h-screen w-screen object-cover' muted={muted} onClick={toggleMute}>
                        <source src="/assets/images/herosection_vedio.mp4" type="video/mp4" />
                    </video>
                    {/* <img src="/assets/images/hero_img_2.png" alt="Aestin" className='absolute left-1/2 -translate-x-1/2 h-4/5' /> */}
                    {/* <div className='h-full flex items-center justify-center w-screen gap-5 text-center'>
                        <div className='flex flex-col items-center gap-4'>
                            <h1 className='text-[44px] relative z-10'>New summer<br />
                                Collection 2024</h1>
                            <Link to="" className='text-[17px] md:text-[28px]'>{t('discover')}</Link>
                        </div>
                    </div> */}
                </div>
            </div>

            <div className='max-md:hidden'>
                <div className="hero_section h-[100vh] w-full text-white flex justify-around items-end md:flex-col-reverse md:items-center lg:flex-row relative overflow-hidden">
                    <video autoPlay loop className='h-screen w-screen object-cover' muted={muted} onClick={toggleMute}>
                        <source src="/assets/images/herosection_vedio.mp4" type="video/mp4" />
                    </video>
                    {/* <div className='h-full flex items-center'>
                        <div className='flex flex-col items-center gap-4 xl:gap-8'>
                            <h1 className='text-[75px] xl:text-[10vmin] '>New summer<br />
                                Collection 2024</h1>
                            <Link to="" className='text-[16px] md:text-[28px] lg:text-[18px] xl:text-[2.5vmin]'>{t('discover')}</Link>
                        </div>
                    </div> */}
                </div>
            </div>

            {/* showcase_categories */}
            <div className='showcase_categories mb-20 max-md:hidden'>
                <div className=' px-16 py-[150px] pt-[250px] relative '>
                    <div style={{ background: 'url(/assets/images/bg1.png) center/cover no-repeat ', opacity: '0.15', backgroundSize: 'cover' }} className='absolute  h-full top-0 left-0 w-full p-0 '></div>

                    <div className={`w-[53%] h-[330px] mt-[137px] bg-black relative flex items-end justify-end`} style={{ background: 'radial-gradient(91.54% 209.53% at 8.46% 21.34%, #000000 48.26%, #666666 100%)' }}>
                        <img src='/assets/images/god2.png' className='h-[530px] absolute m-auto mt-[-203px] left-1/2 -translate-x-[90%]' />
                        <Link to="/products/Men">
                            <button className='text-white relative z-10 border border-white text-[25px] mb-[30px] mr-11 py-[5px] px-[11px]' onMouseEnter={() => setMenCardHovered(true)} onMouseLeave={() => setMenCardHovered(false)}>{t('Men')}</button>
                        </Link>
                    </div>

                    <div className='mt-[-88px] flex justify-end'>
                        <div className='w-[53%] h-[330px] mt-[200px] bg-black relative flex items-end' style={{ background: 'radial-gradient(75.87% 173.75% at 73.39% 35.44%, #000000 39.12%, #666666 100%)' }}>
                            <img src='/assets/images/god3.png' className='h-[530px] absolute m-auto mt-[-203px] left-1/2 -translate-x-[22%]' />
                            <Link to="/products/Women">
                                <button className='text-white border border-white text-[25px] mb-[30px] ml-11 py-[5px] px-[11px]' onMouseEnter={() => setWomenCardHovered(true)} onMouseLeave={() => setWomenCardHovered(false)}>{t('Women')}</button>
                            </Link>
                        </div>
                    </div>

                    <div className='mt-[-81px]' >
                        <div className='w-[53%] h-[330px] mt-[200px] bg-black relative flex items-end justify-end' style={{ background: 'radial-gradient(77.85% 132.31% at 24.26% 33.75%, #000000 34.4%, #666666 100%)' }}>
                            <img src='/assets/images/god4.png' className='h-[530px] absolute m-auto mt-[-203px] left-1/2 -translate-x-[80%]' />
                            <Link to="/accessories">
                                <button className='text-white border border-white text-[25px] mb-[30px] mr-11 py-[5px] px-[11px]' onMouseEnter={() => setAccessoryCardHovered(true)} onMouseLeave={() => setAccessoryCardHovered(false)}>{t('Accessories')}</button>
                            </Link>
                        </div>
                    </div>

                </div>

                <div className='bg-black w-screen h-[295px] mt-0' style={{ background: 'linear-gradient(94.1deg, #000000 10.48%, #1E1E1E 66.1%, #666666 98.04%)' }}>
                    <div className='flex justify-between items-end h-full w-[90%] max-w-[1440px] mx-auto'>
                        <img src='/assets/images/home4.png' className='w-[333px] lg:w-[485px] mt-[80px] translate-y-1/2' />
                        <div className='flex flex-col justify-start text-white w-min mb-10'>
                            <h3 className='text-5xl font-light mb-3 font-gotham_light uppercase whitespace-nowrap'>
                                SPRING<br /> SUMMER 2024
                            </h3>
                            <p className='text-sm'>{t('WOMENS ADV CAMPAIGN BY Saint Rosario')}</p>
                            <Link to="" className='underline uppercase text-[10px] font-semibold mt-5'>{t('Discover More')}</Link>
                        </div>
                    </div>
                </div>

                <div className='w-[90%] max-w-[1440px] mx-auto'>
                    <div className='flex items-end justify-between'>
                        <div className='flex flex-col justify-start mb-7 w-min'>
                            <h3 className='text-5xl font-light mb-3 font-gotham_light uppercase whitespace-nowrap'>
                                FALL WINTER<br /> 2024 FASHION <br /> SHOW
                            </h3>
                            <p className='text-sm'>Presenting the Fall Winter 2024 women's collection by Saint rosario.</p>
                            <Link to="" className='underline uppercase text-[10px] font-semibold mt-5'>{t('Discover More')}</Link>
                        </div>
                        <img src='/assets/images/home5.png' className='w-[333px] lg:w-[485px] mt-[210px]' />
                    </div>
                </div>
            </div>

            {/* mobile */}
            <div className='md:hidden px-4'>
                <div className='pb-[69px] pt-[100px]  relative'>
                    <div style={{ background: 'url(/assets/images/bg1.png) center/cover no-repeat ', opacity: '0.15', backgroundSize: 'cover' }} className='absolute  h-full top-0 left-0 w-full p-0 '></div>
                    <div className='w-full h-[330px] mt-[137px]  bg-black relative flex items-end justify-end' style={{ background: 'radial-gradient(91.54% 209.53% at 8.46% 21.34%, #000000 48.26%, #666666 100%)' }}>
                        <img src='/assets/images/god2.png' className='h-[530px] absolute m-auto  left-56 -translate-x-[90%]' />
                        <div className='z-10'></div> <Link to="/products/Women">
                            <button className='text-white border border-white z-20 text-[25px] mb-[30px] mr-11 py-[5px] px-[11px]'>{t('Women')}</button>
                        </Link>
                    </div>


                    <div className='mt-[100px] flex justify-end'>
                        <div className='w-full h-[330px] mt-[140px] bg-black relative flex items-end' style={{ background: 'radial-gradient(75.87% 173.75% at 73.39% 35.44%, #000000 39.12%, #666666 100%)' }}>
                            <img src='/assets/images/god3.png' className='h-[530px] absolute m-auto  right-28 -translate-x-[-20%]' />
                            <div className='z-10'><Link to="/products/Men">
                                <button className='text-white border border-white z-20 text-[25px] mb-[30px] ml-11 py-[5px] px-[11px]'>{t('Men')}</button>
                            </Link>
                            </div>
                        </div>
                    </div>


                    <div className='mt-[240px]' >
                        <div className='w-full h-[330px] mt-[140px] bg-black relative flex items-end justify-end' style={{ background: 'radial-gradient(77.85% 132.31% at 24.26% 33.75%, #000000 34.4%, #666666 100%)' }}>
                            <img src='/assets/images/god4.png' className='h-[530px] absolute m-auto  left-60 -translate-x-[80%]' />
                            <div className='z-10'><Link to="/accessories">
                                <button className='text-white border border-white z-20 text-[25px] mb-[30px] mr-11 py-[5px] px-[11px]'>{t('Accessories')}</button>
                            </Link></div>
                        </div>
                    </div>

                </div>


            </div>


        </div>
    );
};

export default Home2;
