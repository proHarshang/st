import React from 'react'
import { IoMdEyeOff } from "react-icons/io";
import { IoMdEye } from "react-icons/io";
import Button from '../common/Button';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext'
import { useTranslation } from 'react-i18next'

const Profile = () => {
    
    const navigate = useNavigate()
    const { user } = useAuthContext()
    const { t } = useTranslation();
    return (
        <div className=' pl-16 max-sm:p-5 w-[30rem] max-sm:w-screen'>
            <h1 className='text-[32px] font-thin mb-10 my-3'>{t('profileedit.My Profile')}</h1>
            <div>
                <h3 className='text-[24px] font-thin mb-4  my-3'>{t('profileedit.Personal Information')}</h3>
                <div className=' space-y-3 p-5 text-base bg-[#F4F4F4]'>
                    <h1>{user.data?.firstName} {user.data?.lastName}</h1>
                    <h1>{user.data?.dob}</h1>
                    <h1>{user.data?.mobile}</h1>
                    <h1>{user.data?.email}</h1>
                </div>
            </div>
            {/* <div>
                <h3 className='text-[24px] font-thin mb-4 my-5'>Password</h3>
                <div className=' space-y-3 p-5 bg-[#F4F4F4] leading-[0px] flex'>
                    <h1>**********</h1> */}
            {/* <IoMdEye />
                    <IoMdEyeOff /> */}
            {/* </div>
            </div> */}
            <div className=' pt-12'>
                <Button varient='solid' onClick={() => navigate('/profile/edit')} className='w-full '>{t('profileedit.EDIT')}</Button>
                <button onClick={() => navigate('deactivate-account')} className='w-full underline mt-5 text-gray-500 text-sm font-thin'>{t('profileedit.Deactivate Account')} </button>

            </div>
        </div>
    )
}

export default Profile