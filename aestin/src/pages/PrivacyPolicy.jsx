import React from 'react'
import { useTranslation } from 'react-i18next'

const PrivacyPolicy = () => {
    const { t } = useTranslation();

    const list_disc = 'aspect-square size-2 rounded-full bg-black mt-2';
    const list_item = 'flex gap-3 pl-5';
    return (
        <div className='container'>
            <div className="container mx-auto w-11/12">
                <h1 className='text-[42px] my-10'>{t('PrivacyPolicy.Privacy Policy')}</h1>
                <div className="info-container space-y-10">
                    <div>
                        <h2 className='font-medium text-3xl mb-3'>Categories of personal data being processed.</h2>
                        <p className='my-2 text-lg'>The Companies will proceed with the collection and processing of the following categories of personal data as typically relating to personnel search and selection procedures:</p>
                        <ul>
                            <li className={list_item}><div className={list_disc}></div><p className='font-thin'> Personal and contact details of the candidate</p></li>
                            <li className={list_item}><div className={list_disc}></div> <p className='font-thin'>Data contained in the curriculum vitae</p></li>
                            <li className={list_item}><div className={list_disc}></div> <p className='font-thin'>Other data provided by the candidate when submitting an online application or during selective interviews to which he has been called</p></li>
                            <li className={list_item}><div className={list_disc}></div> <p className='font-thin'>Possible processing of data of a particular nature if required by law (eg: quotas reserved for protected categories);</p></li>
                            <li className={list_item}><div className={list_disc}></div> <p className='font-thin'>Photo of the CV if inserted.</p></li>
                        </ul>
                    </div>
                    <div>
                        <h2 className='font-medium text-3xl mb-3'>Communication and dissemination of personal data</h2>
                        <p className='my-2 text-lg'>The candidate’s personal data will be disclosed:</p>
                        <ul >
                            <li className={list_item} ><div className={list_disc}></div><p className='font-thin'>To the parent company and Holding of the LVMH Group with registered office in 24-32 rue Jean Goujon, 75008 Paris France, which receives
                                the data from the companies for centralized storage on the electronic platform called LVMHCareers and on other infrastructures or apps
                                dedicated to this as Inmind By Djigg and Talent Link. The Companies have appointed LVMH as the external data processor pursuant to Article
                                28 of the Regulation (through the DPA – Data Controller to Data Processor contract), prescribing all the appropriate technical and organiz
                                ational measures for the storage and management of the data subject to communication;</p></li>
                            <li className={list_item}><div className={list_disc}></div>LVMH has in turn appointed as authorized sub-processors – bound by the same compliance with the identical technical and organizational
                                measures on the data covered by the DPA data Controller to Data Processor contract – the Lumesse sub-suppliers…. and MH SAS, which have
                                been bound to use infrastructures located exclusively in the territory of the European Union.</li>
                        </ul>
                    </div>
                    <div>
                        <h2 className='font-medium text-3xl mb-3'>Candidate’s statements</h2>
                        <p className='my-2 text-lg'>By submitting your curriculum vitae, you implicitly certify:</p>
                        <ul>
                            <li className={list_item}><div className={list_disc}></div><p className='font-thin'>That all the information indicated is true;</p></li>
                            <li className={list_item}><div className={list_disc}></div><p className='font-thin'>That you have communicated all relevant information that could relate to your candidacy for the requested position;</p></li>
                            <li className={list_item}><div className={list_disc}></div><p className='font-thin'>To be aware that if you have communicated false or misleading information that led to the establishment of an employment relationship, the latter could be terminated for this reason;</p></li>
                            <li className={list_item}><div className={list_disc}></div><p className='font-thin'>To have provided the information exclusively for the purposes of evaluations aimed at a possible use;</p></li>
                            <li className={list_item}><div className={list_disc}></div><p className='font-thin'>To be aware that by offering the application, obtaining employment will be subject to the satisfaction of the requirements and results required by the employer relating to any checks that may be required regarding the training previously acquired.</p></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PrivacyPolicy