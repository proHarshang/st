import React from 'react'
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import { useTranslation } from 'react-i18next'

const GetStarted = () => {
    const { t } = useTranslation();

    const navigate = useNavigate()

    return (
        <>
            <div className='login_block flex flex-col mx-auto w-11/12 max-w-[600px] items-center gap-6 my-20 max-sm:gap-10 max-sm:mt-40'>

                <div className="flex  gap-4 w-full flex-col">
                    <Button varient='outline' onClick={() => navigate('/login')} className='w-full'>{t('getstarted.LOG IN')}</Button>
                    <Button varient='outline' onClick={() => navigate('/register')} className='w-full'>{t('getstarted.REGISTER YOUR ACCOUNT')}</Button>
                </div>
                <div className='divider flex justify-center w-full relative my-5'>
                            <hr className="absolute top-1/2 -z-10 border border-gray-300 w-full" />
                            <span className='px-3 bg-white'>{t('getstarted.OR')}</span>
                        </div>
                <div className="flex  gap-4 w-full flex-row max-sm:flex-col">
                    <Button varient='outline' onClick={() => navigate('/payment-information')} className='w-full'>{t('getstarted.SKIP')}</Button>
                </div>
            </div>
        </>
    )
}

export default GetStarted