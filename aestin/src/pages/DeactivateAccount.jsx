import React from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import FormHeading from '../components/FormHeading';
import Button from '../common/Button';
import { useAuthContext } from '../hooks/useAuthContext'
import { API_URL } from '../common/constants';
import { useTranslation } from 'react-i18next'


const DeactivateAccount = () => {
  const { t } = useTranslation();

  const navigate = useNavigate()
  const { user } = useAuthContext()

  const deactivateAccount = () => {
    let queryString = `${API_URL}/customer/delete/${user.data.id}`;
    console.log(queryString)
    try {
      const response = fetch(queryString, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      navigate('/login')
    } catch (error) {
      console.error('Error:', error.message);
    }
  }


  return (
    <div className='login_block flex flex-col mx-auto w-11/12 max-w-[600px] items-center gap-6 my-20 max-sm:gap-10 max-sm:mt-40'>
      <FormHeading className='max-md:hidden' primaryHeading={t('conform.Deactivate Account')} secondaryHeading={t('conform.Are you sure you want to delete your account ?')}  />
      <FormHeading className='md:hidden' secondaryHeading={t('conform.Deactivate Account')} />

      <div className="flex  gap-4 w-full flex-row max-sm:flex-col">
        <Button varient='outline' onClick={() => deactivateAccount()} className='w-full'>{t("conform.Yes i’m sure")}</Button>
        <Button varient='outline' onClick={() => navigate('/profile')} className='w-full'>{t('conform.hold on')}</Button>
      </div>
    </div>
  )
}

export default DeactivateAccount