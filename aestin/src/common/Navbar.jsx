import React, { useEffect, useRef, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoClose, IoChevronDown, IoChevronForward } from "react-icons/io5";
import { CartContext } from '../context/CartContext';
import { useAuthContext } from '../hooks/useAuthContext'
import { useTranslation } from 'react-i18next'


const Navbar = ({ styleClass = null, forPage = "general", SolidNav = true }) => {
    const { t } = useTranslation();

    const navigate = useNavigate();

    const { user } = useAuthContext()
    const { cart, setCartState } = useContext(CartContext);

    const searchBarRef = useRef(null)
    const headerRef = useRef(null)

    const [searchQuery, setSearchQuery] = useState('');

    const [SolidNavbar, setSolidNavbar] = useState(SolidNav)

    const [isSearchHovered, setIsSearchHovered] = useState(false)
    const [userMenuModal, setUserMenuModal] = useState(false)
    const [MenuModal, setMenuModal] = useState(false)

    const [isMan_in_menuModal, setIsMan_in_menuModal] = useState(false)
    const [isWoman_in_menuModal, setIsWoman_in_menuModal] = useState(false)
    const [isAccessory_in_menuModal, setIsAccessory_in_menuModal] = useState(false)

    const [menuBg, setMenuBg] = useState('menu_1.png')


    let userId;

    // Retrieving user ID from authentication context or using a default value

    if (!user || user.success == false) {
        userId = 'guest'
    } else {
        userId = user.data.id
    }

    useEffect(() => {
        const storedCartString = localStorage.getItem(`STcart`);
        const storedCart = storedCartString ? JSON.parse(storedCartString) : [];
        setCartState(storedCart);
    }, [])

    useEffect(() => {
        setSolidNavbar(SolidNav)
    }, [SolidNav])

    const handleMouseOver_search = (value) => {
        if (value === true) {
            setIsSearchHovered(true)
            if (forPage !== 'general' && !SolidNavbar && !SolidNav) {
                setSolidNavbar(true)
            }
        } else {
            setIsSearchHovered(false)
            if (forPage !== 'general' && SolidNavbar && !SolidNav) {
                setSolidNavbar(false)
            }
        }
        setUserMenuModal(false)
        setMenuModal(false)
    }

    useEffect(() => {
        searchBarRef.current.focus()
    }, [isSearchHovered])


    const handleClick_userMenuModal = (value) => {
        if (value) {
            setUserMenuModal(true)
            if (forPage !== 'general' && !SolidNavbar && !SolidNav) {
                setSolidNavbar(true)
            }
        } else {
            setUserMenuModal(false)
            if (forPage !== 'general' && SolidNavbar && !SolidNav) {
                setSolidNavbar(false)
            }
        }
        setMenuModal(false)
        setIsSearchHovered(false)
    }

    const handleClick_menuModal = (value) => {
        if (value) {
            setMenuModal(true)
            if (forPage !== 'general' && !SolidNavbar && !SolidNav) {
                setSolidNavbar(true)
            }
        } else {
            setMenuModal(false)
            if (forPage !== 'general' && SolidNavbar && !SolidNav) {
                setSolidNavbar(false)
            }
        }
        setUserMenuModal(false)
        setIsSearchHovered(false)
    }

    const handleClick_submenu_men = () => {
        setIsMan_in_menuModal(!isMan_in_menuModal)
        setIsWoman_in_menuModal(false)
        setIsAccessory_in_menuModal(false)
    }

    const handleClick_submenu_women = () => {
        setIsWoman_in_menuModal(!isWoman_in_menuModal)
        setIsMan_in_menuModal(false)
        setIsAccessory_in_menuModal(false)
    }

    const handleClick_submenu_accessory = () => {
        setIsAccessory_in_menuModal(!isAccessory_in_menuModal)
        setIsMan_in_menuModal(false)
        setIsWoman_in_menuModal(false)
    }

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/products/${searchQuery}`)
    };

    useEffect(() => {
        setUserMenuModal(false);
        setMenuModal(false)
        setIsSearchHovered(false)
    }, [SolidNav])

    const handleMenuBg = (option) => {
        let menuBg = '';

        switch (option) {
            case 'New In':
                menuBg = 'menu_2.jpg';
                break;
            case 'Men':
                menuBg = 'menu_1.png';
                break;
            case 'Women':
                menuBg = 'menu_3.jpg';
                break;
            case 'Accessories':
                menuBg = 'menu_1.png';
                break;
            case 'About Us':
                menuBg = 'menu_2.jpg';
                break;
            case 'Log In':
                menuBg = 'menu_1.png';
                break;
            case 'Contact Us':
                menuBg = 'menu_3.jpg';
                break;
            default:
                menuBg = 'menu_1.png';
                break;
        }

        setMenuBg(menuBg);
    }

    return (
        <>
            {/* large Device  */}
            <header ref={headerRef} className={`${forPage !== "general" ? `${styleClass} ANIMATE_nav_show_letter` : `sticky bg-white text-black`} ${isSearchHovered || userMenuModal || MenuModal ? 'bg-white' : ''}`}>
                {/* <div className="fixed top-0 z-40 w-screen h-10 bg-gray-600 sm:bg-teal-500 md:bg-emerald-700 lg:bg-red-600 xl:bg-yellow-700 block text-center text-4xl">default</div>
                <div className="fixed top-0 z-40 w-screen h-10 bg-gray-600 sm:bg-teal-500 md:bg-emerald-700 lg:bg-red-600 xl:bg-yellow-700 hidden sm:block text-center text-4xl">sm</div>
                <div className="fixed top-0 z-40 w-screen h-10 bg-gray-600 sm:bg-teal-500 md:bg-emerald-700 lg:bg-red-600 xl:bg-yellow-700 hidden md:block text-center text-4xl">md</div>
                <div className="fixed top-0 z-40 w-screen h-10 bg-gray-600 sm:bg-teal-500 md:bg-emerald-700 lg:bg-red-600 xl:bg-yellow-700 hidden lg:block text-center text-4xl">lg</div>
                <div className="fixed top-0 z-40 w-screen h-10 bg-gray-600 sm:bg-teal-500 md:bg-emerald-700 lg:bg-red-600 xl:bg-yellow-700 hidden xl:block text-center text-4xl">xl</div> */}
                <div className='header-interior py-2'>
                    <div className='header-bar'>

                        <nav className='hidden md:block'></nav>

                        <Link to="/" id='Brand' draggable="false" className={`sm:text-[37px] lg:text-[40px] ${SolidNavbar ? 'text-black' : 'text-white'}`}>
                            Saint Rosario
                        </Link>

                        <nav className='max-sm:min-w-max'>
                            <ul className='gap-10 max-sm:gap-7'>
                                <li className='navItem flex'>
                                    <Link to="#" draggable="false" title='Search' className={`${MenuModal || userMenuModal ? 'blured_link' : ''}`} onClick={() => handleMouseOver_search(!isSearchHovered)}>
                                        <img src="/assets/icons/search2.png" alt="Search" className={`w-[18px] md:w-[22px] ${!SolidNavbar ? 'invert-0' : 'invert'}`} />
                                    </Link>
                                    <div id="searchNav" className={`top-[30px] md:top-[50px] items-end shadow-md ${isSearchHovered ? 'show' : ''}`} >
                                        <form action="" className='w-80 max-sm:w-full' onSubmit={handleSearch}>
                                            <input ref={searchBarRef} className='searchBar' type="text" placeholder="Search" autoComplete='off' value={searchQuery} onChange={handleSearchChange} />
                                            <button type='submit'>
                                                <img src="/assets/icons/newsletter_submit_btn.svg" alt="search" />
                                            </button>
                                        </form>
                                    </div>
                                </li>
                                <li className='navItem flex max-sm:hidden'>
                                    <Link draggable="false" title='User' className={`${MenuModal || isSearchHovered ? 'blured_link' : ''}`} onClick={() => handleClick_userMenuModal(!userMenuModal)}>
                                        <img src="/assets/icons/user2.png" alt="User" className={`w-[18px] md:w-[22px] ${!SolidNavbar ? 'invert-0' : 'invert'}`} />
                                    </Link>
                                    <div id="userMenuModal" className={`w-max px-12 py-10 top-[100%] justify-center shadow-md right-0 ${userMenuModal ? 'show' : ''}`}>
                                        <ul type="none" className='flex flex-col bg-white text-black gap-3'>
                                            <li onClick={() => handleClick_userMenuModal(false)}><Link to="/profile">{t('Navbar.My Profile')}</Link></li>
                                            <li onClick={() => handleClick_userMenuModal(false)}><Link to="/orders">{t('Navbar.My Order')}</Link></li>
                                            <li onClick={() => handleClick_userMenuModal(false)}><Link to="/wishlist">{t('Navbar.Wish List')}</Link></li>
                                            <li onClick={() => handleClick_userMenuModal(false)}><Link to="/logout">{t('Navbar.Sign Out')}</Link></li>
                                        </ul>
                                    </div>
                                </li>
                                <li className='navItem flex'>
                                    <Link to="/cart" draggable="false" title='Cart' className={`${MenuModal || userMenuModal || isSearchHovered ? 'blured_link' : ''}`}>
                                        <img src="/assets/icons/cart2.png" alt="Cart" className={`w-[18px] md:w-[22px] ${!SolidNavbar ? 'invert-0' : 'invert'}`} draggable="false" />
                                        <span className={`absolute inset-0 top-1/2 -translate-y-[23%] font-gotham_light flex items-center justify-center transition-none text-[8px] md:text-[10px] ${!SolidNavbar ? 'text-white' : 'text-black'}`}>
                                            {cart.length}
                                        </span>
                                    </Link>
                                </li>
                                <li className='navItem flex '>
                                    <Link draggable="false" title='Menu' className={`${userMenuModal || isSearchHovered ? 'blured_link' : ''}`} onClick={() => handleClick_menuModal(!MenuModal)}>
                                        <img src="/assets/icons/menu2.png" alt="Menu" className={`w-[18px] md:w-[22px] ${!SolidNavbar ? 'invert-0' : 'invert'}`} />
                                    </Link>
                                    <div id="menuModal"
                                        className={`h-screen top-[63px] left-0 max-lg:top-0 w-screen justify-center bg-transparent max-md:justify-start max-md:py-5 max-md:top-0 max-md:w-screen max-md:h-screen ${MenuModal ? 'show' : ''}`}
                                        style={{ backgroundImage: `url(/assets/images/${menuBg})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                                        <div className='absolute w-full lg:w-[400px] shadow-md right-0 max-sm:top-[-4px] h-full py-6 bg-white'>
                                            <div className='flex items-center justify-between w-[100%] pb-6 px-[20px]'>
                                                <Link to="/" draggable="false" className={`text-[25px] ${SolidNavbar ? 'text-black' : 'text-white'}`}>
                                                    Saint Rosario
                                                </Link>
                                                <button onClick={() => handleClick_menuModal(!MenuModal)}><IoClose className='text-2xl text-gray-600' /></button>
                                            </div>
                                            <hr className='bg-black w-full' />
                                            <ul type="none" className='flex flex-col bg-white text-black gap-3 py-5 px-10 overflow-x-auto md:h-max scrollbar_hidden'>
                                                <li onMouseOver={() => handleMenuBg('New In')}>
                                                    <Link to="/new-products" className='hoverable' onClick={() => setMenuModal(false)}>{t('Navbar.New In')}</Link>
                                                </li>
                                                <li onMouseOver={() => handleMenuBg('Men')}>
                                                    <button className='flex items-center gap-2' onClick={() => handleClick_submenu_men()}>{t('Navbar.Men')} {(MenuModal && isMan_in_menuModal) ? <IoChevronDown className='text-[12px]' /> : <IoChevronForward className='text-[12px]' />}</button>
                                                    {(MenuModal && isMan_in_menuModal) && (<ul className='font-light opacity-50 text-[12px] space-y-1 my-2'>
                                                        <li><Link to='products/Men/T-shirt' onClick={() => setMenuModal(false)} className='hoverable'>{t('Navbar.T-shirt')}</Link></li>
                                                        <li><Link to='products/Men/Sweat-shirt' onClick={() => setMenuModal(false)} className='hoverable'>{t('Navbar.Sweat shirt')}</Link></li>
                                                        <li><Link to='products/Men/Jacket' onClick={() => setMenuModal(false)} className='hoverable'>{t('Navbar.Jacket')}</Link></li>
                                                    </ul>)}
                                                </li>
                                                <li onMouseOver={() => handleMenuBg('Women')}>
                                                    <button className='flex items-center gap-2' onClick={() => handleClick_submenu_women()}>{t('Navbar.Women')} {isWoman_in_menuModal ? <IoChevronDown className='text-[12px]' /> : <IoChevronForward className='text-[12px]' />}</button>
                                                    {isWoman_in_menuModal && (<ul className='font-light opacity-50 text-[12px] space-y-1 my-2'>
                                                        <li><Link to='products/Women/T-shirt' onClick={() => setMenuModal(false)} className='hoverable'>{t('Navbar.T-shirt')}</Link></li>
                                                        <li><Link to='products/Women/Sweat-shirt' onClick={() => setMenuModal(false)} className='hoverable'>{t('Navbar.Sweat shirt')}</Link></li>
                                                        <li><Link to='products/Women/Jacket' onClick={() => setMenuModal(false)} className='hoverable'>{t('Navbar.Jacket')}</Link></li>
                                                    </ul>)}
                                                </li>
                                                <li onMouseOver={() => handleMenuBg('Accessories')}>
                                                    <Link to="/accessories" className='hoverable' onClick={() => setMenuModal(false)}>Accessories</Link>
                                                    {/* <button className='flex items-center gap-2' onClick={() => handleClick_submenu_accessory()}>{t('Navbar.Accessories')} {isAccessory_in_menuModal ? <IoChevronDown className='text-[12px]' /> : <IoChevronForward className='text-[12px]' />}</button> */}
                                                    {/* {isAccessory_in_menuModal && (<ul className='font-light opacity-50 text-[12px] space-y-1 my-2'>
                                                        <li><Link to='accessories' onClick={() => setMenuModal(false)} className='hoverable'>{t('Navbar.T-shirt')}</Link></li>
                                                        <li><Link to='accessories' onClick={() => setMenuModal(false)} className='hoverable'>{t('Navbar.Sweat shirt')}</Link></li>
                                                        <li><Link to='accessories' onClick={() => setMenuModal(false)} className='hoverable'>{t('Navbar.Jacket')}</Link></li>
                                                    </ul>)} */}
                                                </li>
                                                <li onMouseOver={() => handleMenuBg('My Profile')} className='md:hidden'><Link className='hoverable' to="/profile" onClick={() => setMenuModal(false)}>{t('Navbar.My Profile')}</Link></li>
                                                <li onMouseOver={() => handleMenuBg('My Order')} className='md:hidden'><Link className='hoverable' to="/orders" onClick={() => setMenuModal(false)}>{t('Navbar.My Order')}</Link></li>
                                                <li onMouseOver={() => handleMenuBg('Wish List')} className='md:hidden'><Link className='hoverable' to="/wishlist" onClick={() => setMenuModal(false)}>{t('Navbar.Wish List')}</Link></li>
                                                <li onMouseOver={() => handleMenuBg('Account Setting')} className='md:hidden'><Link className='hoverable' to="/account-setting" onClick={() => setMenuModal(false)}>{t('Navbar.Account Setting')}</Link></li>
                                                <li onMouseOver={() => handleMenuBg('About Us')}><Link className='hoverable' to="/about-us" onClick={() => setMenuModal(false)}>{t('Navbar.About Us')}</Link></li>
                                                <li onMouseOver={() => handleMenuBg('Log In')}><Link className='hoverable' to="/login" onClick={() => setMenuModal(false)}>{t('Navbar.Log In')}</Link></li>
                                                <li onMouseOver={() => handleMenuBg('Sign Out')} className='md:hidden'><Link className='hoverable' to="/logout" onClick={() => setMenuModal(false)}>{t('Navbar.Sign Out')}</Link></li>
                                                <li onMouseOver={() => handleMenuBg('Contact Us')} className='flex flex-col'>
                                                    <Link to="/contact-us" onClick={() => setMenuModal(false)}>{t('Navbar.Contact Us')}</Link>
                                                    <span className="text-[12px] text-gray-500">+91 98912398127</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Navbar
