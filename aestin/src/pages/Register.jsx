import React, { useEffect, useState } from 'react';
import Button from '../common/Button';
import { Link, useNavigate } from 'react-router-dom';
import { FaApple } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import FormHeading from '../components/FormHeading';
import { API_URL, HTTPS_API_URL } from '../common/constants';
import { useSignup } from "../hooks/useSignup"
import { useLogin } from "../hooks/useLogin"
import axios from 'axios';
import { useTranslation } from 'react-i18next'



const Register = () => {
    const { t } = useTranslation();

    const navigate = useNavigate();
    // const location = useLocation();
    const { signup, error, isLoading } = useSignup()
    const { login } = useLogin()

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        privacyPolicyAccepted: true
    });

    const [errors, setErrors] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        privacyPolicyAccepted: ''
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setFormData({
            ...formData,
            [name]: newValue
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
        } else if (formData.password.length < 8) {
            errors.password = 'Password must be at least 8 characters long';
        }
        if (!formData.firstName) {
            errors.firstName = 'First name is required';
        }
        if (!formData.lastName) {
            errors.lastName = 'Last name is required';
        }
        if (!formData.privacyPolicyAccepted) {
            errors.privacyPolicyAccepted = 'Please accept the privacy & cookie policy';
        }
        setErrors(errors);

        if (Object.keys(errors).length === 0 && formData.privacyPolicyAccepted) {
            await signup(formData.email, formData.firstName, formData.lastName, formData.password);
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
            <div className='login_block flex flex-col mx-auto w-11/12 max-w-[600px] items-center gap-6 my-20'>
                <FormHeading primaryHeading={t('Connect With SAINT ROSARIO')} secondaryHeading={t('Account Register')} />
                <form className='flex flex-col w-full gap-10' onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-2'>
                        <div className={`form__group field ${errors.email ? 'bg-red' : ''}`}>
                            <input type="email" className="form__field" placeholder={t('Email')} name="email" id='user_email' value={formData.email} onChange={handleChange} />
                            <label htmlFor="email" className="form__label">{t('Email')}</label>
                            {errors.email && <span className="error">{errors.email}</span>}
                        </div>
                        <div className={`form__group field ${errors.password ? 'bg-red' : ''}`}>
                            <input type="password" className="form__field" placeholder={t("Password")} name="password" id='user_password' value={formData.password} onChange={handleChange} />
                            <label htmlFor="password" className="form__label">{t("Password")}</label>
                            {errors.password && <span className="error">{errors.password}</span>}
                        </div>
                        <div className={`form__group field ${errors.firstName ? 'bg-red' : ''}`}>
                            <input type="text" className="form__field" placeholder={t("First Name")} name="firstName" id='user_first_name' value={formData.firstName} onChange={handleChange} />
                            <label htmlFor="first name" className="form__label">{t("First Name")}</label>
                            {errors.firstName && <span className="error">{errors.firstName}</span>}
                        </div>
                        <div className={`form__group field ${errors.lastName ? 'bg-red' : ''}`}>
                            <input type="text" className="form__field" placeholder="Last Name" name="lastName" id='user_last_name' value={formData.lastName} onChange={handleChange} />
                            <label htmlFor="last name" className="form__label">Last Name</label>
                            {errors.lastName && <span className="error">{errors.lastName}</span>}
                        </div>
                        <div className="agreementCheckField my-5">
                            <label className={`checkbox bounce flex gap-3 flex-wrap ${errors.privacyPolicyAccepted ? 'bg-red' : ''}`}>
                                <input type="checkbox" name="privacyPolicyAccepted" checked={formData.privacyPolicyAccepted} onChange={handleChange} />
                                <svg viewBox="0 0 21 21">
                                    <polyline points="5 10.75 8.5 14.25 16 6"></polyline>
                                </svg> I accept the privacy & cookie Policy
                            </label>
                            {errors.privacyPolicyAccepted && <span className="error">{errors.privacyPolicyAccepted}</span>}
                        </div>
                    </div>
                    <div className="flex gap-3 flex-col">
                        <div className='flex gap-4'>
                            <Button varient='outline' type="submit" className='w-full'>REGISTER YOUR ACCOUNT</Button>
                            <button className="w-fit underline" onClick={() => navigate('/payment-information')}>Skip</button>
                        </div>
                        <div className="additional_links flex justify-between font-light max-sm:flex-col max-sm:items-center ">
                            <Link to="/login">Already have an account?</Link>
                        </div>
                        <div className='divider flex justify-center relative my-5'>
                            <hr className="absolute top-1/2 -z-10 border border-gray-300 w-full" />
                            <span className='px-3 bg-white'>OR</span>
                        </div>
                        <div className='flex justify-center gap-x-5'>

                            <div className='flex justify-center gap-x-[60px] max-sm:gap-x-16'>
                                <button type='button' onClick={handleGoogleLogin}><FaGoogle size={30} /></button>
                                <button type='button' onClick={handleFBLogin}><FaFacebookF size={30} /></button>
                                <button type='button'><FaApple size={30} /></button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Register;
