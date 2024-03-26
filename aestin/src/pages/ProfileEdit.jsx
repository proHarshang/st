import React, { useState } from 'react';
import Button from '../common/Button';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext'
import { API_URL } from '../common/constants';
import { useTranslation } from 'react-i18next'



const ProfileEdit = () => {
    const { t } = useTranslation();

    const navigate = useNavigate()
    const { user } = useAuthContext()

    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        title: user.data.title || '',
        firstName: user.data.firstName || '',
        lastName: user.data.lastName || '',
        email: user.data.email || '',
        dob: user.data.dob || '',
    });

    const [errors, setErrors] = useState({
        title: '',
        firstName: '',
        lastName: '',
        email: '',
        dob: '',
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
        if (!formData.firstName) {
            errors.firstName = 'First name is required';
        }
        if (!formData.lastName) {
            errors.lastName = 'Last name is required';
        }
        setErrors(errors);

        if (Object.keys(errors).length === 0) {
            setLoading(true)
            let queryString = `${API_URL}/customer/update/${user.data.id}`;
            try {
                const response = await fetch(queryString, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();

                if (data.success) {
                    navigate('/profile')
                }

            } catch (error) {
                console.error('Error:', error.message);
            } finally {
                setLoading(false)
            }
        }
    };


    return (
        <form className='container mb-4 mx-auto w-4/6 max-md:w-[85%]' onSubmit={handleSubmit}>
            <h1 className='text-[32px] font-thin mt-16 md:mb-5 '>{t('profileedit.My Profile')}</h1>
            <div className="flex items-end flex-col gap-3 -mt-10" >

                <div className="flex flex-col md:flex-row items-end  gap-3 w-full max-md:pt-16">
                    <div className='form__group md:w-1/2 w-full field'>
                        <select name="title" id="user_Title" className="form__field" value={formData.title} onChange={handleChange}>
                            <option value="Title" disabled selected >{t('profileedit.Title')}</option>
                            <option value="Mr">{t('profileedit.Mr')}.</option>
                            <option value="Ms">{t('profileedit.Ms')}.</option>
                            <option value="Mrs">{t('profileedit.Mrs')}.</option>
                            <option value="Mx">{t('profileedit.Mx')}.</option>
                            <option value="none">{t("I'd rather not say")}.</option>
                        </select>
                    </div>
                    <div className='form__group md:w-1/2 field w-full'>
                        <div className='form__group w-full field'>
                            <input type="text" className="form__field" placeholder={t("First Name")} name="firstName" value={formData.firstName} onChange={handleChange} />
                            <label htmlFor="First Name" className="form__label">{t("First Name")}</label>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row items-end gap-3 w-full">
                    <div className='form__group md:w-1/2 field w-full'>
                        <div className='form__group w-full field'>
                            <input type="text" className="form__field" placeholder={t("Last Name")} name="lastName" value={formData.lastName} onChange={handleChange} />
                            <label htmlFor="Last Name" className="form__label">{t("Last Name")}</label>
                        </div>
                    </div>
                    <div className='form__group md:w-1/2 field w-full'>
                        <div className='form__group w-full field'>
                            <input type="date" className="form__field" placeholder={t("Date Of Birth")} name="dob" value={formData.dob} onChange={handleChange} />
                            <label htmlFor="Date Of Birth" className="form__label">{t("Date Of Birth")}</label>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <h1 className='text-[32px] font-thin -mb-10 md:mb-2  mt-16'>{t('profileedit.My Credentialsx')}</h1>

                <form className="flex items-end flex-col gap-3 m-0">
                    <div className="flex items-end gap-3 w-full  mt-4 max-md:pt-16 ">
                        <div className='form__group w-full md:w-1/2 field'>
                            <input type="email" className="form__field" placeholder={t("logout.Email")} name="email" value={formData.email} onChange={handleChange} />
                            <label htmlFor="Email" className="form__label">{t("logout.Email")}</label>
                        </div>
                    </div>
                </form>
            </div>

            <div>
                <h1 className='text-[32px] font-thin mt-16 '>{t('PrivacyPolicy.Privacy Policy')}</h1>

                <p className='mt-5'>Lorem ipsum dolor sit amet consectetur. Maecenas potenti arcu ultrices eu quis eget.
                    Blandit nunc viverra cursus a netus posuere massa ultricies. Pretium ipsum adipiscing am-
                    et bibendum cras. Aliquam purus mi mi sollicitudin non vulputate leo mauris. Molestie tell-
                    us arcu elementum sed fermentum quis. Pulvinar odio diam mauris sit ut purus augue
                    elementum vestibulum. Libero nulla cum commodo porttitor at ac sapien nunc. At senec-
                    tus nisl amet nunc duis habitant arcu orci tortor. Sit mattis orci sed commodo sollicitudin
                    non blandit ac nulla.</p>
            </div>


            <div className='flex items-center justify-between mt-24'>
                <button onClick={() => navigate('/profile/deactivate-account')} className=' underline mt-2 text-gray-500 text-sm font-thin'>{t('profileedit.Deactivate Account')} </button>
                <Button varient='solid' type="submit">{t('career.Save')}</Button>
            </div>
        </form>
    );
}

export default ProfileEdit;
