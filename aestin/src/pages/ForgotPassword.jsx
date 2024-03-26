import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import FormHeading from '../components/FormHeading';
import { API_URL } from '../common/constants';
import { useTranslation } from 'react-i18next'


const ForgotPassword = () => {
    const { t } = useTranslation();

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: ''
    });

    const [errors, setErrors] = useState({
        email: ''
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validate form fields before submission
        let errors = {};
        if (!formData.email) {
            errors.email = 'Email is required';
        }
        setErrors(errors);

        // If there are no errors, submit the form
        if (Object.keys(errors).length === 0) {
            setIsLoading(true);
            try {
                const response = await fetch(`${API_URL}/customer/forgotPassword`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                if (!response.ok) {
                    throw new Error('Failed to send forgot password email');
                }

                const responseData = await response.json();

                let error = {}
                if (responseData.success) {
                    navigate('/otp-confirmation?email=' + formData.email);
                } else {
                    error.email = 'User Does Not Exist'
                }
                setErrors(error);

            } catch (error) {
                console.error('Error:', error.message);
            } finally {
                setIsLoading(false); // Set loading state to false after API call completes
            }
        }
    };

    return (
        <>
            <div className='login_block flex flex-col mx-auto w-11/12 max-w-[600px] items-center gap-2 my-20 max-sm:mt-40'>
                <FormHeading className='max-md:hidden' primaryHeading={t('logout.Forgot password?')} secondaryHeading={t('logout.No worries, we will help you.')} />
                <FormHeading className='md:hidden' secondaryHeading={t('logout.Forgot password?')} />

                <form className='flex flex-col w-full gap-10' onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-2'>
                        <div className={`form__group field ${errors.email ? 'bg-red' : ''}`}>
                            <input type="email" className="form__field" placeholder={t('logout.Email')} name="email" id='user_email' value={formData.email} onChange={handleChange} />
                            <label htmlFor="email" className="form__label">{t('logout.Email')}</label>
                            {errors.email && <span className="error">{errors.email}</span>}
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        {/* <Button varient='outline' type='submit' className='w-full'>{isLoading ? 'Loading' : t('Submit')}</Button> */}
                        {isLoading ? (<Button varient='outline' className='w-full' isLoading={true}></Button>) : (<Button varient='outline' type='submit' className='w-full'>{t('Submit')}</Button>)}
                        <div className="additional_links flex  font-light">
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default ForgotPassword;
