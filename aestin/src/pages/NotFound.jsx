import React from 'react'
import Button from '../common/Button'
import { useNavigate} from 'react-router-dom';
import { useTranslation } from 'react-i18next'

const NotFound = () => {
    const { t } = useTranslation();

    const navigate = useNavigate()

    return (
        <>
            <div className='h-[80vh] w-[100vw] flex flex-col gap-12 justify-center items-center'>
                <h1 className='font-bold text-4xl max-sm:text-[6.8vmin]'>{t('conform.404 - Page Not Found')}</h1>
                <Button varient="solid" onClick={() => navigate('/')}>{t('conform.GO To Home')}</Button>
            </div>
        </>
    )
}

export default NotFound