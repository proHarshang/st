import React from 'react'
import Button from '../common/Button';
import { useTranslation } from 'react-i18next'
import { Link, useNavigate, useLocation } from 'react-router-dom';


const CancellationReq = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();

    const OrderId = location.state?.OrderId || false;

    if (!OrderId) {
        navigate('/')
    }

    return (
        <div className='max-sm:h-[55vh] flex justify-center'>
            <div className='flex flex-col h-[100vmin] lg:h-[80vmin] w-full items-center gap-8 justify-center max-sm:h-[48vh] my-8 min-h-65vh max-sm:relative'>
                <img src='/assets/icons/success.svg' alt='Success Icon' />
                <div className='gap-2 text-center'>
                    <h3 className='text-[5vmin]'>{t('conform.Your order cancellation has')} <br />{t('conform.been successfully processed')}</h3>
                </div>
                <Button varient='solid' onClick={() => navigate('/')} >{t('conform.CONTINUE SHOPPING')}</Button>
            </div>
        </div>
    )
}

export default CancellationReq;
