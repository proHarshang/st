import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import FormHeading from '../components/FormHeading'
import { useTranslation } from 'react-i18next'



function Notyfy() {
    const { t } = useTranslation();

    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: { value: '', isValid: true },
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        const isValid = validateInput(name, value);

        setFormData(prevData => ({
            ...prevData,
            [name]: { value: value, isValid }
        }));
    };

    const validateInput = (name, value) => {
        switch (name) {
            case 'email':
                return true;
            default:
                return true;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <>
            <div className='login_block flex flex-col mx-auto w-11/12 max-w-[600px] items-center gap-2 my-20 max-sm:mt-40'>
                <FormHeading className='max-md:hidden' primaryHeading={t('notify.Notify for new launching')} secondaryHeading={t('notify.No worries, we will notify you for our new launching')} />
                <FormHeading className='md:hidden' secondaryHeading={t('notify.Notify for new launching')} />

                <form className='flex flex-col w-full gap-10' onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-2'>
                        <div className={`form__group field ${!formData.email.isValid ? 'bg-red' : ''}`}>
                            <input type="email" className="form__field" placeholder={t('notify.Email')} name="email" id='user_email' value={formData.email.value} onChange={handleInputChange} />
                            <label htmlFor="email" className="form__label">{t('notify.Email')}</label>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <Button onClick={() => navigate('/')} varient='outline' className='w-full'>{t('notify.Notify me')}</Button>
                        <div className="additional_links flex  font-light">
                        </div>
                    </div>
                </form>
            </div>
        </>)
}

export default Notyfy