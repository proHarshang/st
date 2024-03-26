import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IoMdInformationCircleOutline } from "react-icons/io";
import Button from '../common/Button';
import { useTranslation } from 'react-i18next'


const CookieSettings = () => {
    const { t } = useTranslation();

    const navigate = useNavigate();

    const [tooltip_cookieType_necessary, set_tooltip_cookieType_necessary] = useState(false)
    const [tooltip_cookieType_functional, set_tooltip_cookieType_functional] = useState(false)
    const [tooltip_cookieType_sessionReplay, set_tooltip_cookieType_sessionReplay] = useState(false)
    const [tooltip_cookieType_Advertising, set_tooltip_cookieType_Advertising] = useState(false)

    const handle_tooltip_cookieType_necessary = (value) => {
        set_tooltip_cookieType_necessary(value)
        set_tooltip_cookieType_functional(false)
        set_tooltip_cookieType_sessionReplay(false)
        set_tooltip_cookieType_Advertising(false)
    }
    const handle_tooltip_cookieType_functional = (value) => {
        set_tooltip_cookieType_necessary(false)
        set_tooltip_cookieType_functional(value)
        set_tooltip_cookieType_sessionReplay(false)
        set_tooltip_cookieType_Advertising(false)
    }
    const handle_tooltip_cookieType_sessionReplay = (value) => {
        set_tooltip_cookieType_necessary(false)
        set_tooltip_cookieType_functional(false)
        set_tooltip_cookieType_sessionReplay(value)
        set_tooltip_cookieType_Advertising(false)
    }
    const handle_tooltip_cookieType_Advertising = (value) => {
        set_tooltip_cookieType_necessary(false)
        set_tooltip_cookieType_functional(false)
        set_tooltip_cookieType_sessionReplay(false)
        set_tooltip_cookieType_Advertising(value)
    }

    return (
        <div className="container mx-auto w-11/12">
            <h1 className='text-[42px] mt-6'>{t('CookieSettings.Cookie Settings')}</h1>
            <div className="info-container space-y-8">
                <p className='text-base'>To give you the best experience, we tailor our site to show the most relevant content and helpful
                    offers. You’re always in control of your data and we respect your right to privacy. You can manage
                    your circle preference below and update them at any time on the “Account Setting “section of our
                    website.
                    <br />
                    <br />
                    <Link to="" className='underline'>{t('CookieSettings.Our Cookie Policy')}</Link>
                </p>

                <div className='flex flex-col'>
                    <div className="flex flex-col gap-5">

                        <div className='flex items-center justify-between'>
                            <div>
                                <h6 className='flex items-center font-medium gap-3 relative'>{t('CookieSettings.Necessary')}
                                    <div className='cursor-pointer relative flex' onClick={() => handle_tooltip_cookieType_necessary(!tooltip_cookieType_necessary)}>
                                        <IoMdInformationCircleOutline />
                                        <div className={`${tooltip_cookieType_necessary ? 'visible scale-y-100' : 'invisible scale-y-0'} cookie_tooltip transition-all absolute bg-white px-7 py-6 w-[497px] text-xs shadow-md border border-1 top-1/2 -translate-y-1/2 translate-x-[8%]`}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe quos eius consequatur. Eius, earum. Repellat, quia error eveniet id accusamus quaerat, earum excepturi voluptates molestiae amet vero iusto, illum doloribus?</div>
                                    </div>
                                </h6>
                                <p className='text-gray-600 text-sm'>Required for our website to work. This setting cannot be changed.</p>
                            </div>
                            <div className="my-5">
                                <label className="checkbox bounce flex gap-3 flex-wrap">
                                    <input type="checkbox" className='input_checkbox' name="Necessary" />
                                    <svg viewBox="0 0 21 21">
                                        <polyline points="5 10.75 8.5 14.25 16 6"></polyline>
                                    </svg>
                                </label>
                            </div>
                        </div>

                        <div className='flex items-center justify-between'>
                            <div>
                                <h6 className='flex items-center font-medium gap-3'>{t('CookieSettings.Functional')}
                                    <div className='cursor-pointer relative flex' onClick={() => handle_tooltip_cookieType_functional(!tooltip_cookieType_functional)}>
                                        <IoMdInformationCircleOutline />
                                        <div className={`${tooltip_cookieType_functional ? 'visible scale-y-100' : 'invisible scale-y-0'} cookie_tooltip transition-all absolute bg-white px-7 py-6 w-[497px] text-xs shadow-md border border-1 top-1/2 -translate-y-1/2 translate-x-[8%]`}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe quos eius consequatur. Eius, earum. Repellat, quia error eveniet id accusamus quaerat, earum excepturi voluptates molestiae amet vero iusto, illum doloribus?</div>
                                    </div>
                                </h6>
                                <p className='text-gray-600 text-sm'>Required for our website to work. This setting cannot be changed.</p>
                            </div>
                            <div className="my-5">
                                <label className="checkbox bounce flex gap-3 flex-wrap">
                                    <input type="checkbox" className='input_checkbox' name="Necessary" />
                                    <svg viewBox="0 0 21 21">
                                        <polyline points="5 10.75 8.5 14.25 16 6"></polyline>
                                    </svg>
                                </label>
                            </div>
                        </div>

                        <div className='flex items-center justify-between'>
                            <div>
                                <h6 className='flex items-center font-medium gap-3'>{t('CookieSettings.Session Replay')}
                                    <div className='cursor-pointer relative flex' onClick={() => handle_tooltip_cookieType_sessionReplay(!tooltip_cookieType_sessionReplay)}>
                                        <IoMdInformationCircleOutline />
                                        <div className={`${tooltip_cookieType_sessionReplay ? 'visible scale-y-100' : 'invisible scale-y-0'} cookie_tooltip transition-all absolute bg-white px-7 py-6 w-[497px] text-xs shadow-md border border-1 top-1/2 -translate-y-1/2 translate-x-[8%]`}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe quos eius consequatur. Eius, earum. Repellat, quia error eveniet id accusamus quaerat, earum excepturi voluptates molestiae amet vero iusto, illum doloribus?</div>
                                    </div>
                                </h6>
                                <p className='text-gray-600 text-sm'>Required for our website to work. This setting cannot be changed.</p>
                            </div>
                            <div className="my-5">
                                <label className="checkbox bounce flex gap-3 flex-wrap">
                                    <input type="checkbox" className='input_checkbox' name="Necessary" />
                                    <svg viewBox="0 0 21 21">
                                        <polyline points="5 10.75 8.5 14.25 16 6"></polyline>
                                    </svg>
                                </label>
                            </div>
                        </div>

                        <div className='flex items-center justify-between'>
                            <div>
                                <h6 className='flex items-center font-medium gap-3'>{t('CookieSettings.Advertising')}
                                    <div className='cursor-pointer relative flex' onClick={() => handle_tooltip_cookieType_Advertising(!tooltip_cookieType_Advertising)}>
                                        <IoMdInformationCircleOutline />
                                        <div className={`${tooltip_cookieType_Advertising ? 'visible scale-y-100' : 'invisible scale-y-0'} cookie_tooltip transition-all absolute bg-white px-7 py-6 w-[497px] text-xs shadow-md border border-1 top-1/2 -translate-y-1/2 translate-x-[8%]`}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe quos eius consequatur. Eius, earum. Repellat, quia error eveniet id accusamus quaerat, earum excepturi voluptates molestiae amet vero iusto, illum doloribus?</div>
                                    </div>
                                </h6>
                                <p className='text-gray-600 text-sm'>Required for our website to work. This setting cannot be changed.</p>
                            </div>
                            <div className="my-5">
                                <label className="checkbox bounce flex gap-3 flex-wrap">
                                    <input type="checkbox" className='input_checkbox' name="Necessary" />
                                    <svg viewBox="0 0 21 21">
                                        <polyline points="5 10.75 8.5 14.25 16 6"></polyline>
                                    </svg>
                                </label>
                            </div>
                        </div>

                    </div>
                    <div className='flex items-center justify-center mx-auto mt-16 gap-5'>
                        <Button varient="solid" onClick={() => { navigate(`/`) }}>{t('CookieSettings.Accept All Cookies')}</Button>
                        <Button varient="solid" onClick={() => { navigate(`/`) }}>{t('CookieSettings.Confirm My selection')}</Button>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default CookieSettings