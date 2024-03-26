import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import FormHeading from '../components/FormHeading';
import Button from '../common/Button';
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import { useTranslation } from 'react-i18next'



const LogOut = () => {
    const { t } = useTranslation();

    const navigate = useNavigate()
    const { logout } = useLogout()

    const handleClick = () => {
        logout()
    }

    return (
        <>
            <div className='login_block flex flex-col mx-auto w-11/12 max-w-[600px] items-center gap-6 my-20 max-sm:gap-10 max-sm:mt-40'>
                <FormHeading className='max-md:hidden' primaryHeading={t('logout.Sign Out')} secondaryHeading={t('logout.Are you sure you wont to log out ?')} />
                <FormHeading className='md:hidden' secondaryHeading={t('logout.Sign Out')} />

                <div className="flex  gap-4 w-full flex-row max-sm:flex-col">
                    <Button varient='outline' onClick={handleClick} className='w-full'>{t('logout.Yes i’m sure')}</Button>
                    <Button varient='outline' onClick={() => navigate('/')} className='w-full'>{t('logout.hold on')}</Button>
                </div>
            </div>
        </>
    );
}

export default LogOut;
