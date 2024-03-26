import React, { useState } from 'react';
import { useTranslation } from 'react-i18next'


const FaQ = () => {
  const { t } = useTranslation();

  const accordionData = [
    {
      title: 'What\'s your favorite quality about yourself',
      content: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis sapiente
          laborum cupiditate possimus labore, hic temporibus velit dicta earum
          suscipit commodi eum enim atque at? Et perspiciatis dolore iure
          voluptatem.`
    },
    {
      title: 'Section 1',
      content: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis sapiente
          laborum cupiditate possimus labore, hic temporibus velit dicta earum
          suscipit commodi eum enim atque at? Et perspiciatis dolore iure
          voluptatem.`
    },
    {
      title: 'Section 1',
      content: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis sapiente
          laborum cupiditate possimus labore, hic temporibus velit dicta earum
          suscipit commodi eum enim atque at? Et perspiciatis dolore iure
          voluptatemLorem ipsum dolor, sit amet consectetur adipisicing elit. Quis sapiente
          laborum cupiditate possimus labore, hic temporibus velit dicta earum
          suscipit commodi eum enim atque at? Et perspiciatis dolore iure
          voluptatem.`
    },
    {
      title: 'Section 1',
      content: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis sapiente
          laborum cupiditate possimus labore, hic temporibus velit dicta earum
          suscipit commodi eum enim atque at? Et perspiciatis dolore iure
          voluptatem.`
    },
    {
      title: 'Section 1',
      content: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis sapiente
          laborum cupiditate possimus labore, hic temporibus velit dicta earum
          suscipit commodi eum enim atque at? Et perspiciatis dolore iure
          voluptatem.`
    },
    {
      title: 'Section 1',
      content: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis sapiente
          laborum cupiditate possimus labore, hic temporibus velit dicta earum
          suscipit commodi eum enim atque at? Et perspiciatis dolore iure
          voluptatem.`
    },
    {
      title: 'Section 1',
      content: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis sapiente
          laborum cupiditate possimus labore, hic temporibus velit dicta earum
          suscipit commodi eum enim atque at? Et perspiciatis dolore iure
          voluptatem.`
    },
    {
      title: 'Section 1',
      content: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis sapiente
          laborum cupiditate possimus labore, hic temporibus velit dicta earum
          suscipit commodi eum enim atque at? Et perspiciatis dolore iure
          voluptatem.`
    },
    // Add more accordion items...
  ];

  return (
    <React.Fragment>
      <h1 className='text-center font-medium text-4xl mt-16 mb-16'>{t('faq.Frequency Asked Question')}</h1>
      <div className='content-center flex flex-col flex-wrap items-start w-full'>

        <div className="text-gray-500 accordion cursor-pointer w-5/6 md:w-3/4 lg:w-full max-w-4xl mt-11">
          {accordionData.map((item, index) => (
            <AccordionItem key={index} item={item} />
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

const AccordionItem = ({ item }) => {
  const { title, content } = item;
  const [isActive, setIsActive] = useState(false);

  return (
    <>
    <div className="container accordion-item  mb-8 hidden md:block">
      <div
        className={`accordion-title flex items-baseline justify-between py-4 pl-4 ${isActive ? '' : 'border-b-2 border-black'}`}
        onClick={() => setIsActive(!isActive)}
      >
        <div>{title}</div>
        <div className='text-xl'>{isActive ? '-' : '+'}</div>
      </div>
      {isActive && <div className="accordion-content mt-2 border-b-2 border-black pb-4">{content}</div>}
    </div>
    
    <div className="container accordion-item md:hidden mb-8">
      <div
        className={`accordion-title flex items-baseline justify-between py-4 pl-4 ${isActive ? '' : 'border-b-2  border-black'}`}
        onClick={() => setIsActive(!isActive)}
      >
        <div>{title}</div>
        <div className='text-xl'>{isActive ? '-' : '+'}</div>
      </div>
      {isActive && <div className="accordion-content mt-2 border-b-2 border-black pb-4">{content}</div>}
    </div>
    </>
  );
};

export default FaQ;