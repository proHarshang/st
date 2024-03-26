import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'
import Button from '../common/Button';

const AppliedSuccessfully = () => {
    const { t } = useTranslation();

    const navigate = useNavigate()

    return (
        <div className='max-sm:h-[55vh] flex justify-center'>
            <div className=' flex flex-col w-full items-center gap-8 justify-center max-sm:h-[48vh] h-full my-8 min-h-65vh max-sm:relative'>

                <img src='/assets/icons/success.svg' alt='Success Icon' />
                <div className='gap-2 text-center '>
                    <h3 className='text-[5vmin]'>{t('conform.You have Applied Successfully')} </h3>
                </div>
                <Button onClick={() => navigate('/')}>{t('conform.Go to Home Page')}</Button>
            </div>
        </div>
    )
}

export default AppliedSuccessfully;
