import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../common/Button';
import FormHeading from '../components/FormHeading';
import { API_URL } from '../common/constants';
import { useTranslation } from 'react-i18next'


const Otp = () => {
    const { t } = useTranslation();


    const navigate = useNavigate();
    const location = useLocation();

    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isVarifying, setIsVarifying] = useState(false);
    const [passwordForm, setPasswordForm] = useState(false)

    const toggleNewPassword = () => {
        setPasswordForm(true)
    }

    const [formData, setFormData] = useState({
        otp: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({
        otp: '',
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

    useEffect(() => {
        const fetchData = async () => {
            const searchParams = new URLSearchParams(location.search);
            const email = searchParams.get('email');
            setEmail(email)
        };

        fetchData();
    }, [location]);

    const validateOTP = async (e) => {
        e.preventDefault();
        // Validate form fields before submission
        let errors = {};
        if (formData.otp == '') {
            errors.otp = 'OTP is required';
        }
        setErrors(errors)
        if (Object.keys(errors).length === 0) {
            setIsVarifying(true);
            try {
                const response = await fetch(`${API_URL}/customer/verify-otp`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email,
                        otp: formData.otp
                    })
                });

                if (!response.ok) {
                    throw new Error('Failed to verify OTP');
                }

                const responseData = await response.json(); // Extract response data

                let errors = {};
                if (responseData.success) {
                    toggleNewPassword();
                } else {
                    errors.otp = 'Invalid OTP'
                }
                setErrors(errors)


            } catch (error) {
                console.error('Error:', error.message);
            } finally {
                setIsVarifying(false); // Set Varifying state to false after API call completes
            }
        }
    }

    const handleSubmit = async (e) => {
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
            setIsLoading(true);
            try {
                const response = await fetch(`${API_URL}/customer/updatePassword`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email,
                        newPassword: formData.password
                    })
                });

                if (!response.ok) {
                    throw new Error('Failed to send forgot password email');
                }

                const responseData = await response.json();

                if (responseData.success) {
                    navigate('/password-reset-success');
                }

            } catch (error) {
                console.error('Error:', error.message);
            } finally {
                setIsLoading(false); // Set loading state to false after API call completes
            }
        }
    };

    return (
        <main className='relative'>
            {/* otp form  */}
            <div className='bg-white h-screen w-screen'>
                <div className='login_block flex flex-col mx-auto w-11/12 max-w-[600px] items-center gap-2 my-20 max-sm:mt-40'>
                    <FormHeading className='max-md:hidden' primaryHeading={t('logout.Enter Your Code')} secondaryHeading={t('logout.Check your email and enter your four digit code')} />
                    <FormHeading className='md:hidden' secondaryHeading={t('logout.Enter Your Code')} />

                    <form className='flex flex-col w-full gap-10' onSubmit={validateOTP}>
                        <div className='flex flex-col gap-2'>
                            <div className={`form__group field`}>
                                <input type="number" className="form__field" placeholder='OTP' name="otp" value={formData.otp} onChange={handleChange} />
                                <label htmlFor="OTP" className="form__label">OTP</label>
                                {errors.otp && <span className="error">{errors.otp}</span>}
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            {isVarifying ? (<Button varient='outline' className='w-full' isLoading={true}></Button>) : (<Button varient='outline' type='submit' className='w-full'>{t('Submit')}</Button>)}
                            <div className="additional_links flex  font-light">
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            {/* new password form  */}
            {passwordForm ? <div className='absolute bg-white h-screen w-screen top-0 left-0 z-10'>
                <div className='login_block flex flex-col mx-auto w-11/12 max-w-[600px] items-center gap-6 my-20 max-sm:mt-40'>
                    <FormHeading className='max-md:hidden' primaryHeading={t('logout.Set New Password')} secondaryHeading={t('logout.Must be at least 8 characters')} />
                    <FormHeading className='md:hidden' secondaryHeading={t('logout.Set New Password')} />

                    <form className='flex flex-col w-full gap-10' onSubmit={handleSubmit}>
                        <div className='flex flex-col gap-2'>
                            <div className={`form__group field`}>
                                <input type="password" className="form__field" placeholder={t('logout.Password')} name="password" id='password' value={formData.password} onChange={handleChange} />
                                <label htmlFor="password" className="form__label">{t('logout.Password')}</label>
                                {errors.password && <span className="error">{errors.password}</span>}
                            </div>
                            <div className={`form__group field ${errors.confirmPassword ? 'bg-red' : ''}`}>
                                <input type="password" className="form__field" placeholder={t("Confirm password")} name="confirmPassword" id='confirm_password' value={formData.confirmPassword} onChange={handleChange} />
                                <label htmlFor="confirm_password" className="form__label">{t("Confirm password")}</label>
                                {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            {isLoading ? (<Button varient='outline' className='w-full' isLoading={true}></Button>) : (<Button varient='outline' type='submit' className='w-full'>{t('Reset Password')}</Button>)}
                            <div className="additional_links flex font-light">
                            </div>
                        </div>
                    </form>
                </div>
            </div> : null
            }
        </main>
    );
};

export default Otp;
