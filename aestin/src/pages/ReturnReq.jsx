import React from 'react'
import Button from '../common/Button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'



const Return_req = () => {
    const { t } = useTranslation();

    const navigate = useNavigate()

    return (
        <div className='max-sm:h-[55vh] flex justify-center'>
            <div className=' flex flex-col h-[80vmin] w-full items-center gap-8 justify-center my-8 min-h-65vh max-sm:relative max-sm:h-[48vh]'>
                <img src='/assets/icons/success.svg' alt='Success Icon' />
                <div className='gap-2 text-center '>
                    <h3 className='text-[5vmin]'>{t('Your request for a return has')} <br /> {t('been placed successfully.')} </h3>
                </div>
                <Button onClick={() => navigate('/')}>{t('Go to Home Page')}</Button>
            </div>
        </div>
    )
}

export default Return_req;
