import React from 'react'
import { useTranslation } from 'react-i18next'


const ReturnPolicy = () => {
    const { t } = useTranslation();

    const list_disc = 'aspect-square size-2 rounded-full bg-black mt-2';
    const list_item = 'flex gap-3 pl-5';
    return (
        <div className='container'>
            <div className="container mx-auto w-11/12">
                <h1 className='text-[42px] my-10'>{t('returnpolicy.Return Policy')}</h1>
                <div className="info-container space-y-10 mt-6 flex flex-col gap-2">
                    <div>
                        <h2 className='text-2xl mb-3'>Shipping and delivery information :</h2>
                        <p className='mt-2'>Standard processing time for orders is 5-7 business days to be processed and shipped. orders placed after 10:00 am (pst) may be
                            processed the following business day. processing and shipping times may increase during specific collection launches, holidays, and
                            other peak seasons. we cannot change the shipping address or the shipping method selected after checkout.</p>

                    </div>
                    <div>
                        <h2 className='text-2xl mb-3'>Amending a shipping address :</h2>
                        <p className='mt-2'>We cannot change the shipping address or the shipping method selected after checkout.<br />
                            once an order has been shipped, an email will be sent to the email address provided on the order with your shipment's tracking information.<br />
                            customers are responsible for monitoring the delivery of their shipment once an order has left our warehouse.
                            Candidate’s statements</p>

                    </div>
                    <div>
                        <h2 className='text-2xl mb-3'>U.S. shipping options and costs :</h2>
                        <p className='mt-2'>We cannot change the shipping address or the shipping method selected after checkout.<br />
                            once an order has been shipped, an email will be sent to the email address provided on the order with your shipment's tracking information.<br />
                            customers are responsible for monitoring the delivery of their shipment once an order has left our warehouse.
                            Candidate’s statements</p>

                    </div>


                </div>
            </div>
        </div>
    )
}

export default ReturnPolicy