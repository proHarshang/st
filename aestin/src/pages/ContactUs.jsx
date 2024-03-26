import React, { useState } from 'react';
import Button from '../common/Button';
import { useNavigate } from 'react-router-dom';
import FormHeading from '../components/FormHeading';
import { useTranslation } from 'react-i18next'
import axios from 'axios';
import { API_URL } from "../common/constants";

const ContactUs = () => {
    const { t } = useTranslation();

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        name: '',
        message_type: 'general_Inquiry',
        message: ''
    });

    const [errors, setErrors] = useState({
        email: '',
        name: '',
        message_type: '',
        message: ''
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
        if (!formData.email) {
            errors.email = 'Email is required';
        }
        if (!formData.name) {
            errors.name = 'Name is required';
        }
        if (!formData.message) {
            errors.message = 'Message is required';
        }
        setErrors(errors);

        // If there are no errors, submit the form
        if (Object.keys(errors).length === 0) {
            try {
                const response = axios.post(`${API_URL}/customer/contact`, {
                    "email": formData.email,
                    "name": formData.name,
                    "inquiryType": formData.message_type,
                    "message": formData.message
                });
                if (response.ok) {
                    navigate('/');
                }
            } catch (error) {
                throw new Error("Failed to send message: " + error.message);
            }
        }
    };

    return (
        <>
            <div className='login_block flex flex-col mx-auto w-11/12 max-w-[600px] items-center gap-6 mt-14 max-sm:mt-40'>
                <FormHeading className='max-md:hidden' primaryHeading={t('contact.Contact Us')} />
                <FormHeading className='md:hidden' secondaryHeading={t('contact.Contact Us')} />

                <form className='flex flex-col w-full gap-10 ' onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-2 mt-[-25px]'>
                        <div className={`form__group field ${errors.email ? 'bg-red' : ''}`}>
                            <input type="email" className="form__field" placeholder={t('contact.Email')} name="email" value={formData.email} onChange={handleChange} />
                            <label htmlFor="email" className="form__label">{t('contact.Email')}</label>
                            {errors.email && <span className="error">{errors.email}</span>}
                        </div>
                        <div className={`form__group field ${errors.name ? 'bg-red' : ''}`}>
                            <input type="text" className="form__field" placeholder={t('contact.Name')} name="name" value={formData.name} onChange={handleChange} />
                            <label htmlFor="name" className="form__label">{t('contact.Name')}</label>
                            {errors.name && <span className="error">{errors.name}</span>}
                        </div>
                        <div className={`form__group field ${errors.name ? 'bg-red' : ''}`}>
                            <select className="form__field" name="message_type" value={formData.message_type} onChange={handleChange} >
                                <option value="general_Inquiry">{t('contact.General Inquiry')}</option>
                                <option value="order_status">{t('contact.Order Status')}</option>
                                <option value="return_&_Exchange">{t('contact.Return & Exchange')}</option>
                                <option value="international_Returns">{t('contact.International Returns')}</option>
                                <option value="damages">{t('contact.Damages')}</option>
                                <option value="my_Account">{t('contact.My Account')}</option>
                                <option value="cancelation_Request">{t('contact.Cancelation Request')}</option>
                                <option value="other">{t('contact.Other')}</option>
                            </select>
                            {errors.name && <span className="error">{errors.message_type}</span>}
                        </div>
                        <div className={`form__group field ${errors.message ? 'bg-red' : ''}`}>
                            <input type="text" className="form__field " placeholder={t('contact.Message')} name="message" value={formData.message} onChange={handleChange} />
                            <label htmlFor="message" className="form__label mb-7">{t('contact.Message')}</label>
                            {errors.message && <span className="error">{errors.message}</span>}
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <Button varient='outline' type="submit" className='w-full'>{t('contact.Submit')}</Button>
                        <div className="additional_links flex font-light">
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default ContactUs;
