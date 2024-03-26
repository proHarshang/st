import React from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query'
import Button from '../common/Button';
import { API_URL } from '../common/constants';
import { useTranslation } from 'react-i18next'


const CareerDetails = () => {
    const { t } = useTranslation();

    const list_disc = 'aspect-square size-2 rounded-full bg-black mt-2';
    const list_item = 'flex gap-3 pl-5';
    const navigate = useNavigate();
    let { jobId } = useParams();

    const { isPending, error, data } = useQuery({
        queryKey: ['careerDetails'],
        queryFn: async () => {
            const response = await axios.get(`${API_URL}/career/${jobId}`);

            return response.data.data;
        },
    })

    if (isPending) return <div>{t('career.Loading')}...</div>

    // if (error) return 'An error has occurred: ' + error.message

    if (error) return <div className='text-center text-xl w-full my-5'>{t('career.Some Thing went wrong!')}</div>

    if (!data) return null;

    return (
        <div className=' bg-[#F4F4F4]  max-md:bg-white'>

            <div className='p-20 max-md:p-4'>
                <div className='bg-white px-10 max-md:px-7 max-md:py-4  py-4'>
                    <h1 className='flex flex-col font-extrabold text-2xl py-7'>{data.title}</h1>
                    <div className='flex-col flex gap-5'>
                        <p className='flex flex-col'><span className='font-medium text-2xl'>{t('career.Category')}:</span><span className='text-lg'>{data.category}</span></p>
                        <p className='flex flex-col'><span className='font-medium text-2xl'>{t('career.Job title')}:</span><span className='text-lg'> {data.jobTitle}</span></p>
                        {/* <p className='flex flex-col'><span className='font-medium text-2xl'>Contract type:</span><span className='text-lg'> {data.contractType}</span></p> */}
                        <p className='flex flex-col'><span className='font-medium text-2xl'>{t('career.Contractual hours')}:</span> <span className='text-lg'>{data.contractHours}</span></p>
                        <p className='flex flex-col'><span className='font-medium text-2xl'>{t('career.Job location')}:</span><span className='text-lg'> {data.location} </span></p>
                        <p className='flex flex-col'><span className='font-medium text-2xl'>{t('career.Minimum level of experience required')}:</span> <span className='text-lg'>{data.minExp}</span></p>
                        <p className='flex flex-col'><span className='font-medium text-2xl'>{t('career.Languages')}:</span> <span className='text-lg'>{data.languages?.join(', ')}</span></p>
                        <h3 className='flex flex-col'><span className='font-medium text-2xl'>{t('career.Job description')}:</span><span className='font-medium text-2xl'> <p>{data.jobDiscription}</p>
                        </span></h3>
                        <p className='font-medium text-2xl '>{t('career.Your assignment will be the following:')}</p>
                        <ul>
                            {data.assignment?.map((item) => {
                                return (<li className={list_item}><div className={list_disc}></div>{item}</li>)
                            })}
                        </ul>
                        <h3 className='font-medium text-2xl pt-6'>{t('career.Profile')}</h3>
                        <div className='text-lg'>
                            <p>{data.profile}</p>
                        </div>
                    </div>

                    <div className='pb-10 mt-10'>
                        <Button className='mx-auto' onClick={() => { navigate(`/career/apply/${jobId}/${data.title}`) }}>{t('career.Apply')}</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CareerDetails;   
