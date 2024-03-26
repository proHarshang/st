import React, { useState } from 'react';
import Button from '../common/Button'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query'
import { IoSearch } from "react-icons/io5";
import { API_URL } from '../common/constants';
import { MdAccessTimeFilled } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { LuMoveLeft, LuMoveRight } from "react-icons/lu";
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'



const Career = () => {
    const { t } = useTranslation();


    const { register, handleSubmit, errors } = useForm();
    const [responseData, setResponseData] = useState({
        jobTitle: '',
        contractHours: '',
        location: ''
    })

    const { isPending: isCareerPending, error: careerError, data: careerData } = useQuery({
        queryKey: ['careerDetails'],
        queryFn: async () => {
            const response = await axios.get(`${API_URL}/career/`);
            return response.data.data;
        },
    })

    if (isCareerPending) return <div></div>

    if (careerError) return <div>{t('career.Something went wrong!')}</div>

    if (!careerData) return null;

    const filteredJobs = careerData.filter(careerJob => {
        return (
            (!responseData.jobTitle || careerJob.jobTitle === responseData.jobTitle) &&
            (!responseData.contractHours || careerJob.contractHours === responseData.contractHours) &&
            (!responseData.location || careerJob.location === responseData.location)
        );
    });

    const uniqueJobTitles = [...new Set(careerData.map(item => item.jobTitle))];
    const uniqueContractHours = [...new Set(careerData.map(item => item.contractHours))];
    const uniqueLocations = [...new Set(careerData.map(item => item.location))];

    const onSubmit = async (Data) => {
        setResponseData(Data);
    }

    return (
        <>
            <div className=' bg-[#F4F4F4] max-md:bg-white'>
                <div className='w-full bg-white'>

                    <div className='mx-auto my-10 px-2 md:px-10 w-full md:w-[90%]'>
                        <h1 className='text-[42px] mb-4 text-xl max-md:font-bold'>{t('career.Join Our Team')}</h1>
                        <form className='grid grid-cols-7 gap-0 w-full max-md:w-full max-md:text-[13px] h-9 md:h-11' onSubmit={handleSubmit(onSubmit)}>
                            <select className='border border-black col-span-2 col-start-1 px-1 md:px-[7px]' {...register("jobTitle")}>
                                <option value='' selected disabled>{t('career.Job Title')}</option>
                                {uniqueJobTitles.map((item) => {
                                    return (
                                        <option value={item} key={item}>{item}</option>
                                    )
                                })}
                            </select>
                            <select className='border border-black col-span-2 col-start-3 px-1 md:px-[7px]' {...register("contractHours")}>
                                <option value='' selected disabled>{t('career.Job Type')}</option>
                                {uniqueContractHours.map((item) => {
                                    return (
                                        <option value={item} key={item}>{item}</option>
                                    )
                                })}
                            </select>
                            <select className='border border-black col-span-2 col-start-5 px-1 md:px-[7px]' {...register("location")}>
                                <option value='' selected disabled>{t('career.Location')}</option>
                                {uniqueLocations.map((item) => {
                                    return (
                                        <option value={item} key={item}>{item}</option>
                                    )
                                })}
                            </select>
                            <button className='bg-black text-white flex items-center justify-center'><IoSearch /></button>
                        </form>
                    </div>

                    <div className="  w-full md:py-16 bg-white md:bg-[#F4F4F4]">
                        <div className='bg-white mx-auto w-full md:w-[80%]'>
                            <div className='bg-white mx-auto w-full px-0 md:px-8'>
                                <div className='divide-y divide-gray-700'>
                                    <div className='p-7 max-md:text-xl max-md:font-bold'>
                                        5 {t('career.Jobs Found')}
                                    </div>
                                    {filteredJobs.map(({ jobId, title, location, postedOn }) => {
                                        return (<div className='flex flex-col gap-4 p-6 md:p-7' key={jobId}>
                                            <Link to={`/career/${jobId}/${title}`} className='text-xl md:text-2xl'>{title}</Link>
                                            <div className='flex flex-col gap-1'>
                                                <div className="flex items-center gap-2"><FaLocationDot /> <span>{location}</span></div>
                                                <div className="flex items-center gap-2"><MdAccessTimeFilled /> <span>{postedOn}</span></div>
                                            </div>
                                            <span>{jobId}</span>
                                        </div>)
                                    })}

                                </div>

                                <div className="pagination mx-auto flex gap-5 items-center justify-center py-10">
                                    <button><LuMoveLeft /></button>
                                    <button>1</button>
                                    <button>2</button>
                                    <button>3</button>
                                    <button>4</button>
                                    <button>5</button>
                                    <button><LuMoveRight /></button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Career