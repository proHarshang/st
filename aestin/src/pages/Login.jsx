import React, { useState, useEffect } from 'react';
import Button from '../common/Button';
import { Link } from 'react-router-dom';
import { FaApple } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import FormHeading from '../components/FormHeading';
import { API_URL } from '../common/constants';
import { useLogin } from "../hooks/useLogin"
import { useTranslation } from 'react-i18next'


const Login = () => {
    const { t } = useTranslation();

    const { login, error, isLoading } = useLogin()

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });

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
        if (!formData.password) {
            errors.password = 'Password is required';
        }
        setErrors(errors);

        // If there are no errors, submit the form
        if (Object.keys(errors).length === 0) {
            try {
                const response = await fetch(`${API_URL}/customer/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                if (data.data.success) {
                    await login(formData.email, formData.password);
                }

            } catch (error) {
                console.error('Error:', error);
            }

        }
    };

    // Google auth
    const handleGoogleLogin = async () => {
        window.open(`${API_URL}/customer/auth/google/callback`, "_self")
    }

    // FB auth
    const handleFBLogin = async () => {
        window.open(`${API_URL}/customer/auth/facebook/callback`, "_self")
    }

    return (
        <>
            <div className='login_block flex flex-col mx-auto w-11/12 max-w-[600px] items-center gap-6 my-20 max-sm:mt-40'>
                <FormHeading primaryHeading={t('login.Connect With SAINT ROSARIO')} secondaryHeading={t('login.Account Login')} />

                <form className='flex flex-col w-full gap-10' onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-2'>
                        <div className={`form__group field`}>
                            <input type="email" className="form__field" placeholder={t('login.Email')} name="email" id='user_email' value={formData.email} onChange={handleChange} />
                            <label htmlFor="email" className="form__label">{t('login.Email')}</label>
                            {errors.email && <span className="error">{errors.email}</span>}
                        </div>
                        <div className={`form__group field ${errors.password ? 'bg-red' : ''}`}>
                            <input type="password" className="form__field" placeholder={t('login.Password')} name="password" id='user_password' value={formData.password} onChange={handleChange} />
                            <label htmlFor="password" className="form__label">{t('login.Password')}</label>
                            {errors.password && <span className="error">{errors.password}</span>}
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <Button varient='outline' className='w-full'>{t('login.Log in')}</Button>
                        <div className="additional_links flex justify-between  font-light max-sm:flex-col-reverse max-sm:items-center max-sm:gap-2 ">
                            <Link to="/forgot-password">{t('login.Have you forgotten your password')}?</Link>
                            <Link to="/register">{t('login.Need an account')}?</Link>
                        </div>

                        <div className='divider flex justify-center relative my-5'>
                            <hr className="absolute top-1/2 -z-10 border border-gray-300 w-full" />
                            <span className='px-3 bg-white'>{t('login.OR')}</span>
                        </div>

                        <div className='flex justify-center gap-x-[60px] max-sm:gap-x-16'>
                            <button type='button' onClick={handleGoogleLogin}><FaGoogle size={30} /></button>
                            <button type='button' onClick={handleFBLogin}><FaFacebookF size={30} /></button>
                            <button type='button'><FaApple size={30} /></button>
                        </div>

                    </div>
                </form>
            </div>
        </>
    )
}

export default Login;
