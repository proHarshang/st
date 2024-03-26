import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Button from '../common/Button';
import CareerAccordion from '../components/CareerAccordion';
import { IoIosAddCircleOutline, IoIosCheckmarkCircle } from "react-icons/io";
import { BsTrash3 } from "react-icons/bs";
import { FiPlusCircle } from "react-icons/fi";
import { API_URL } from '../common/constants';
import { useTranslation } from 'react-i18next'


const CareerApply = () => {
    const { t } = useTranslation();

    const navigate = useNavigate();
    let { jobId, jobTitle } = useParams();

    const { register, handleSubmit, errors } = useForm();

    const [previousEmploymentForms, setPreviousEmploymentForms] = useState([<EmploymentForm key={0} />]);
    const [formalEducationForms, setFormalEducationForms] = useState([<EducationForm key={0} />]);
    const [certificationsForms, setCertificationsForms] = useState([<CertificationsForm key={0} />]);

    const [resumeFile, setResumeFile] = useState(null);
    const [coverLetterFile, setCoverLetterFile] = useState(null);
    const [otherDocumentFile, setOtherDocumentFile] = useState(null);

    // EmploymentForm
    const addEmploymentForm = () => {
        const newForms = [...previousEmploymentForms, <EmploymentForm key={previousEmploymentForms.length} />];
        setPreviousEmploymentForms(newForms);
    };

    const removeEmploymentForm = (index) => {
        if (index !== 0) {
            const newForms = previousEmploymentForms.filter((_, i) => i !== index);
            setPreviousEmploymentForms(newForms);
        }
    };


    // EducationForm
    const addEducationForm = () => {
        const newForms = [...formalEducationForms, <EducationForm key={formalEducationForms.length} />];
        setFormalEducationForms(newForms);
    };

    const removeEducationForm = (index) => {
        if (index !== 0) {
            const newForms = formalEducationForms.filter((_, i) => i !== index);
            setFormalEducationForms(newForms);
        }
    };

    // CertificationsForm
    const addCertificationsForm = () => {
        const newForms = [...certificationsForms, <CertificationsForm key={certificationsForms.length} />];
        setCertificationsForms(newForms);
    };

    const removeCertificationsForm = (index) => {
        if (index !== 0) {
            const newForms = certificationsForms.filter((_, i) => i !== index);
            setCertificationsForms(newForms);
        }
    };

    const handleResumeChange = (event) => {
        const file = event.target.files[0];
        if (file && (file.type === 'application/pdf' || file.type === 'image/jpeg' || file.type === 'image/jpg')) {
            setResumeFile(file);
        } else {
            // Handle invalid file type error
            alert('Invalid file type. Please upload PDF or JPG file.');
        }
    };

    const handleCoverLetterChange = (event) => {
        const file = event.target.files[0];
        if (file && (file.type === 'application/pdf' || file.type === 'image/jpeg' || file.type === 'image/jpg')) {
            setCoverLetterFile(file);
        } else {
            // Handle invalid file type error
            alert('Invalid file type. Please upload PDF or JPG file.');
        }
    };

    const handleOtherDocumentChange = (event) => {
        const file = event.target.files[0];
        if (file && (file.type === 'application/pdf' || file.type === 'image/jpeg' || file.type === 'image/jpg')) {
            setOtherDocumentFile(file);
        } else {
            // Handle invalid file type error
            alert('Invalid file type. Please upload PDF or JPG file.');
        }
    };

    // handleApply
    const onSubmit = (Data) => {
        console.log({ jobId: jobId, ...Data, resumeFile, coverLetterFile, otherDocumentFile })
        // navigate(`/career/applied-successfully`);
    }

    return (
        <div className=' bg-[#F4F4F4]  max-md:bg-white'>
            <div className='py-24  max-md:py-4 px-9 max-md:px-4'>
                <form className='object-cover  m-auto  bg-white  px-11 max-md:px-[0px] max-md:text-lg max-md:font-[50]  py-4 max-w-[1200px]' onSubmit={handleSubmit(onSubmit)}>
                    <div className="info p-12 max-md:px-7 pt-3">
                        <h1 className='flex flex-col font-extrabold text-2xl py-7'>{jobTitle}</h1>
                        <div className='flex flex-col gap-4 pt-4' >
                            <h2 className='text-xl font-bold '>{t('career.Dear candidate')},</h2>
                            <p className='text-lg flex flex-col gap-4'>
                                {t('career.Thank you for your interest in our company')}.
                                <span className='flex'> {t('career.In this section you can fill out and update your interests and professional experience to share with our Talent Acquisition team')}.</span>
                                <span className='flex'>{t('career.If you’ve already applied for the perfect position, great! If not, you can still fill in and save your candidate profile. This makes your information available to our Talent Acquisition team, who may contact you if they believe you’re a good fit for a current or upcoming role')}.</span>
                                <span className='flex'>{t('career.By filling in your Candidate Profile below you hereby agree that your data is available to Tapestry Talent Acquisition worldwide')}.</span>
                            </p>
                        </div>
                    </div>
                    <div>
                        <CareerAccordion title={t("career.My Document")}>
                            <div>
                                <p className='text-[16px] font-light'>{t('career.Accepted file types: DOCX, PDF, Image and Text (MSG, PPT and XLS file types are not accepted for resume or cover letters')}</p>
                                <h6 className='font-bold my-5'>Resume/CV: </h6>
                                <div className="flex gap-4 items-center flex-wrap">
                                    <label className='border aspect-square relative size-32 flex items-center cursor-pointer'>
                                        <span className='text-sm text-center w-full mb-5 mx-4'>Upload a Resume</span>
                                        <input type="file" style={{ display: 'none' }} accept=".pdf,.jpg,.jpeg" onChange={handleResumeChange} />
                                        <div className={`${resumeFile ? 'bg-green-600' : 'bg-gray-300'} h-5 text-center absolute bottom-0 w-full flex justify-center items-center`}>
                                            {resumeFile ? <IoIosCheckmarkCircle className='text-white' /> : <IoIosAddCircleOutline />}
                                        </div>
                                    </label>
                                    <label className='border aspect-square relative size-32 flex items-center cursor-pointer'>
                                        <span className='text-sm text-center w-full mb-5 mx-4'>Attach a Cover Letter</span>
                                        <input type="file" style={{ display: 'none' }} accept=".pdf,.jpg,.jpeg" onChange={handleCoverLetterChange} />
                                        <div className={`${coverLetterFile ? 'bg-green-600' : 'bg-gray-300'} h-5 text-center absolute bottom-0 w-full flex justify-center items-center`}>
                                            {coverLetterFile ? <IoIosCheckmarkCircle className='text-white' /> : <IoIosAddCircleOutline />}
                                        </div>
                                    </label>
                                    <label className='border aspect-square relative size-32 flex items-center cursor-pointer'>
                                        <span className='text-sm text-center w-full mb-5 mx-4'>Add an Other Document</span>
                                        <input type="file" style={{ display: 'none' }} accept=".pdf,.jpg,.jpeg" onChange={handleOtherDocumentChange} />
                                        <div className={`${otherDocumentFile ? 'bg-green-600' : 'bg-gray-300'} h-5 text-center absolute bottom-0 w-full flex justify-center items-center`}>
                                            {otherDocumentFile ? <IoIosCheckmarkCircle className='text-white' /> : <IoIosAddCircleOutline />}
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </CareerAccordion>
                        <CareerAccordion title={t("career.Profile Information")}>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                <div className='form__group field'>
                                    <div className='form__group field'>
                                        <input type="text" className="form__field" placeholder={t('career.First Name')} {...register("profileInformation__firstName")} />
                                        <label htmlFor="First Name" className="form__label">{t('career.First Name')}</label>
                                    </div>
                                </div>
                                <div className='form__group field'>
                                    <div className='form__group field'>
                                        <input type="text" className="form__field" placeholder={t('career.Middle Name')} {...register("profileInformation__middleName")} />
                                        <label htmlFor="Middle Name" className="form__label">{t('career.Middle Name')}</label>
                                    </div>
                                </div>
                                <div className='form__group field'>
                                    <div className='form__group field'>
                                        <input type="text" className="form__field" placeholder={t('career.Last Name')} {...register("profileInformation__lastName")} />
                                        <label htmlFor="Last Name" className="form__label">{t('career.Last Name')}</label>
                                    </div>
                                </div>
                                <div className='form__group field'>
                                    <div className='form__group field'>
                                        <input type="email" className="form__field" placeholder={t('career.Email')} {...register("profileInformation__email")} />
                                        <label htmlFor="Email" className="form__label">{t('career.Email')}</label>
                                    </div>
                                </div>
                                <div className='form__group field'>
                                    <div className='form__group field'>
                                        <input type="number" className="form__field" placeholder={t('career.Phone Number')} {...register("profileInformation__phoneNumber")} />
                                        <label htmlFor="Phone Number" className="form__label">{t('career.Phone Number')}</label>
                                    </div>
                                </div>
                                <div className='form__group field'>
                                    <div className='form__group field'>
                                        <input type="number" className="form__field" placeholder={t("career.Alternative Phone Number")} {...register("profileInformation__alternativePhoneNumber")} />
                                        <label htmlFor="Alternative Phone Number" className="form__label">{t("career.Alternative Phone Number")}</label>
                                    </div>
                                </div>
                                <div className='form__group field'>
                                    <div className='form__group field'>
                                        <input type="text" className="form__field" placeholder={t("career.Address")} {...register("profileInformation__address")} />
                                        <label htmlFor="Address" className="form__label">{t('career.Address')}</label>
                                    </div>
                                </div>
                                <div className='form__group field'>
                                    <select id="user_country" className="form__field md:absolute bottom-0" {...register("profileInformation__country")}>
                                        <option value="" selected disabled>{t('career.Country')}</option>
                                        <option value="India">India</option>
                                        <option value="Germany">Germany</option>
                                        <option value="USA">USA</option>
                                    </select>
                                </div>
                                <div className='form__group field'>
                                    <select id="user_State" className="form__field md:absolute bottom-0 " {...register("profileInformation__state")}>
                                        <option value="" selected disabled>{t('career.State')}</option>
                                        <option value="Gujrat">Gujarat</option>
                                        <option value="UP">UP</option>
                                        <option value="MP">MP</option>
                                    </select>
                                </div>
                                <div className='form__group field'>
                                    <div className='form__group field'>
                                        <input type="text" className="form__field" placeholder={t('career.City')} {...register("profileInformation__city")} />
                                        <label htmlFor="City" className="form__label">{t('career.City')}</label>
                                    </div>
                                </div>
                                <div className='form__group field'>
                                    <div className='form__group field'>
                                        <input type="number" className="form__field" placeholder={t("career.Zip Code")} {...register("profileInformation__zipCode")} />
                                        <label htmlFor="Zip Code" className="form__label">{t("career.Zip Code")}</label>
                                    </div>
                                </div>
                            </div>
                        </CareerAccordion>

                        <CareerAccordion title={t("career.Previous Employment")}>
                            {previousEmploymentForms.map((form, index) => (
                                <div key={index} className='border-b-[3px] border-black pb-4'>
                                    <EmploymentForm register={register} formNumber={index} />
                                    <div className='flex justify-end items-center pr-7'>
                                        {index > 0 ?
                                            (<button
                                                className='form__group field flex content-end items-center gap-3'
                                                onClick={() => removeEmploymentForm(index)}
                                            >
                                                <BsTrash3 />
                                                <span>{t('career.Remove')}</span>
                                            </button>) : null
                                        }
                                    </div>
                                </div>
                            ))}
                            <div className='flex '>
                                <button className='form__group w-full field flex items-center gap-2 pt-[10px]' onClick={addEmploymentForm}>
                                    <FiPlusCircle />
                                    <span>{t('career.Add')}</span>
                                </button>
                            </div>
                        </CareerAccordion>
                        <CareerAccordion title="Formal Education">
                            {formalEducationForms.map((form, index) => (
                                <div key={index} className='border-b-[3px] border-black pb-4'>
                                    <EducationForm register={register} formNumber={index} />
                                    <div className='flex justify-end items-center pr-7'>
                                        {index > 0 ?
                                            (<button
                                                className='form__group field flex content-end items-center gap-3 '
                                                onClick={() => removeEducationForm(index)}
                                            >
                                                <BsTrash3 />
                                                <span>{t('career.Remove')}</span>
                                            </button>) : null
                                        }
                                    </div>
                                </div>
                            ))}
                            <div className='flex '>
                                <button className='form__group w-full field flex items-center gap-2 pt-[10px]' onClick={addEducationForm}>
                                    <FiPlusCircle />
                                    <span>{t('career.Add')}</span>
                                </button>
                            </div>
                        </CareerAccordion>
                        <CareerAccordion title="Certifications">
                            {certificationsForms.map((form, index) => (
                                <div key={index} className='border-b-[3px] border-black pb-4'>
                                    <CertificationsForm register={register} formNumber={index} />
                                    <div className='flex justify-end items-center pr-7'>
                                        {index > 0 ?
                                            (<button
                                                className='form__group field flex content-end items-center gap-3 '
                                                onClick={() => removeCertificationsForm(index)}
                                            >
                                                <BsTrash3 />
                                                <span>{t('career.Remove')}</span>
                                            </button>) : null
                                        }
                                    </div>
                                </div>
                            ))}
                            <div className='flex '>
                                <button className='form__group w-full field flex items-center gap-2 pt-[10px]' onClick={addCertificationsForm}>
                                    <FiPlusCircle />
                                    <span>{t('career.Add')}</span>
                                </button>
                            </div>
                        </CareerAccordion>
                    </div>
                    <div className="flex w-full gap-5 justify-center my-8 m-auto ">
                        <Button type="submit">{t('career.Save')}</Button>
                        <Button type="submit">{t('career.Apply')}</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

const EmploymentForm = ({ register, formNumber }) => {
    const { t } = useTranslation();
    return (
        <div className="flex items-end flex-col gap-3 pb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
                <div className='form__group w-full field'>
                    <div className='form__group field'>
                        <input type="text" className="form__field" placeholder={t("career.Company Name")} {...register(`previousEmployment_companyName_${formNumber}`)} />
                        <label htmlFor="Company Name" className="form__label">{t("career.Company Name")}</label>
                    </div>
                </div>
                <div className='form__group w-full field'>
                    <div className='form__group field'>
                        <input type="text" className="form__field" placeholder={t("career.Job Title")} {...register(`previousEmployment_jobTitle_${formNumber}`)} />
                        <label htmlFor="Job Title" className="form__label">{t("career.Job Title")}</label>
                    </div>
                </div>
                <div className='form__group w-full field'>
                    <div className='form__group field'>
                        <input type="date" className="form__field" placeholder={t('career.From Date')} {...register(`previousEmployment_fromDate_${formNumber}`)} />
                        <label htmlFor="From Date" className="form__label">{t('career.From Date')}</label>
                    </div>
                </div>
                <div className='form__group w-full field'>
                    <div className='form__group field '>
                        <input type="date" className="form__field " placeholder={t("career.End Date")} {...register(`previousEmployment_endDate_${formNumber}`)} />
                        <label htmlFor="End Date" className="form__label ">{t("career.End Date")}</label>
                    </div>
                </div>
            </div>
        </div>

    );
};

const EducationForm = ({ register, formNumber }) => {
    const { t } = useTranslation();

    return (
        <div className="flex items-end flex-col gap-3 pb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 w-full">
                <div className='form__group w-full field'>
                    <div className='form__group field'>
                        <input type="text" className="form__field" placeholder="Collage/University" {...register(`education_Collage/University_${formNumber}`)} />
                        <label htmlFor="Collage/University" className="form__label">Collage/University</label>
                    </div>
                </div>
                <div className='form__group w-full field'>
                    <div className='form__group field'>
                        <input type="text" className="form__field" placeholder={t('career.Location')} {...register(`education_Location_${formNumber}`)} />
                        <label htmlFor="Location" className="form__label">{t('career.Location')}</label>
                    </div>
                </div>
                <div className='form__group w-full field'>
                    <select id="user_country" className="form__field md:absolute bottom-0" {...register(`education_country_${formNumber}`)} >
                        <option value="" selected disabled>{t('career.Country')}</option>
                        <option value="India">India</option>
                        <option value="Germany">Germany</option>
                        <option value="USA">USA</option>
                    </select>
                </div>
                <div className='form__group w-full field'>
                    <div className='form__group field'>
                        <input type="text" className="form__field" placeholder="Degree" {...register(`education_Degree_${formNumber}`)} />
                        <label htmlFor="Degree" className="form__label">Degree</label>
                    </div>
                </div>
                <div className='form__group w-full field'>
                    <select id="user_Major/Subject" className="form__field md:absolute bottom-0" {...register(`education_Major/Subject_${formNumber}`)} >
                        <option value="" selected disabled>Major/Subject</option>
                        <option value="India">India</option>
                        <option value="Germany">Germany</option>
                        <option value="USA">USA</option>
                    </select>
                </div>
                <div className='form__group w-full field'>
                    <div className='form__group field'>
                        <input type="date" className="form__field" placeholder={t('career.From Date')} {...register(`education_FromDate_${formNumber}`)} />
                        <label htmlFor="From Date" className="form__label"> {t('career.From Date')}</label>
                    </div>
                </div>
                <div className='form__group w-full field'>
                    <div className='form__group field'>
                        <input type="date" className="form__field" placeholder={t("career.End Date")} {...register(`education_EndDate_${formNumber}`)} />
                        <label label htmlFor="End Date" className="form__label">{t("career.End Date")}</label>
                    </div>
                </div>
            </div>
        </div>

    )
}

const CertificationsForm = ({ register, formNumber }) => {
    const { t } = useTranslation();

    return (
        <div className="flex items-end flex-col gap-3 pb-6 ">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
                <div className='form__group w-full field'>
                    <div className='form__group field'>
                        <input type="text" className="form__field" placeholder={t('career.Certification')} {...register(`certificationsForm_Certification_${formNumber}`)} />
                        <label htmlFor="Certification" className="form__label">{t('career.Certification')}</label>
                    </div>
                </div>
                <div className='form__group w-full field'>
                    <div className='form__group field'>
                        <input type="text" className="form__field" placeholder={t("career.Description")} {...register(`certificationsForm_Description_${formNumber}`)} />
                        <label htmlFor="Description" className="form__label">{t("career.Description")}</label>
                    </div>
                </div>
                <div className='form__group w-full field'>
                    <div className='form__group field'>
                        <input type="text" className="form__field" placeholder={t("career.Institution")} {...register(`certificationsForm_Institution_${formNumber}`)} />
                        <label htmlFor="Institution" className="form__label">{t("career.Institution")}</label>
                    </div>
                </div>
                <div className='form__group w-full field'>
                    <div className='form__group field'>
                        <input type="date" className="form__field" placeholder={t("career.Effective Date")} {...register(`certificationsForm_EffectiveDate_${formNumber}`)} />
                        <label htmlFor="Effective Date" className="form__label"> {t("career.Effective Date")}</label>
                    </div>
                </div>
                <div className='form__group w-full field'>
                    <div className='form__group field'>
                        <input type="date" className="form__field" placeholder={t("career.Expiration Date")} {...register(`certificationsForm_ExpirationDate_${formNumber}`)} />
                        <label htmlFor="Expiration Date" className="form__label">{t("career.Expiration Date")}</label>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default CareerApply;
