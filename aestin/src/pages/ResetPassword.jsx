import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FormHeading from '../components/FormHeading';
import { HiArrowLongLeft } from "react-icons/hi2";
import Button from '../common/Button';
import { useTranslation } from 'react-i18next'


const ResetPassword = () => {
    const { t } = useTranslation();
    
    const navigate = useNavigate()

    return (
        <>
            <div className='login_block flex flex-col mx-auto w-11/12 max-w-[600px] items-center gap-6 my-20 max-sm:mt-40'>
                <FormHeading className='max-md:hidden' primaryHeading={t('resetpass.Password Reset')} secondaryHeading={t('resetpass.Your password has been successfully reset.')} />
                <FormHeading className='md:hidden' secondaryHeading={t('resetpass.Password Reset')} />

                <div className="flex flex-col gap-4 w-full">
                    <Button varient='outline' onClick={() => navigate('/login')} className='w-full'>{t('resetpass.Continue')}</Button>
                    <div className="additional_links flex font-light">
                    </div>
                </div>
            </div>
        </>
    );
}

export default ResetPassword;
