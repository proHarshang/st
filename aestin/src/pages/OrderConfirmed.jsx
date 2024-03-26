import React from 'react'
import Button from '../common/Button';
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom';

const OrderConfirmed = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <div className='max-sm:h-[55vh] flex justify-center'>
            <div className=' flex flex-col h-[100vmin] w-full items-center gap-8 justify-center  my-8 min-h-65vh max-sm:relative max-sm:h-[48vh]'>
                <img src='./assets/icons/success.svg' alt='Success Icon' />
                <div className='gap-2  text-center'>
                    <h3 className='font-thin'>{t('conform.Thank you')}</h3>
                    <h3 className='text-[5vmin]'>{t('conform.YOUR ORDER IS CONFIRMED')}</h3>
                </div>
                <Button varient='solid' onClick={() => navigate('/')} >{t('conform.CONTINUE SHOPPING')}</Button>
            </div>
        </div>
    )
}

export default OrderConfirmed;
