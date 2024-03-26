import React, { useState } from 'react';
import Button from '../common/Button';
import { useNavigate } from 'react-router-dom';
import FormHeading from '../components/FormHeading';
import { useTranslation } from 'react-i18next'


const NewPassword = () => {
    const { t } = useTranslation();

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validate form fields before submission
        let errors = {};
        if (!formData.password) {
            errors.password = 'Password cannot be blank';
        } else if (formData.password.length < 8) {
            errors.password = 'Password must be at least 8 characters long';
        }
        if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }
        setErrors(errors);

        // If there are no errors, submit the form
        if (Object.keys(errors).length === 0) {
            // Handle form submission, navigate to password reset success page
            navigate('/password-reset-success');
        }
    };

    return (
        <>
            <div className='login_block flex flex-col mx-auto w-11/12 max-w-[600px] items-center gap-6 my-20 max-sm:mt-40'>
                <FormHeading className='max-md:hidden' primaryHeading={t('resetpass.Set New Password')} secondaryHeading={t('resetpass.Must be at least 8 characters')} />
                <FormHeading className='md:hidden' secondaryHeading={t('resetpass.Set New Password')} />

                <form className='flex flex-col w-full gap-10' onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-2'>
                        <div className={`form__group field ${errors.password ? 'bg-red' : ''}`}>
                            <input type="password" className="form__field" placeholder={t("resetpass.Password")} name="password" id='password' value={formData.password} onChange={handleChange} />
                            <label htmlFor="password" className="form__label">{t("resetpass.Password")}</label>
                            {errors.password && <span className="error">{errors.password}</span>}
                        </div>
                        <div className={`form__group field ${errors.confirmPassword ? 'bg-red' : ''}`}>
                            <input type="password" className="form__field" placeholder={t("resetpass.Confirm password")} name="confirmPassword" id='confirm_password' value={formData.confirmPassword} onChange={handleChange} />
                            <label htmlFor="confirm_password" className="form__label">{t("resetpass.Confirm password")}</label>
                            {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <Button varient='outline' className='w-full'>{t('resetpass.Reset Password')}</Button>
                        <div className="additional_links flex font-light">
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default NewPassword;
