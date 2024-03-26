import React from 'react';

const FormHeading = ({ primaryHeading, secondaryHeading, className }) => {
    return (
        <div className='flex text-center flex-col gap-4'>
            <h1 className={`text-[8vmin]  whitespace-nowrap max-md:hidden ${className}`}>{primaryHeading}</h1>
            <h4 className={`text-[1.7vmin] md:text-xl font-light max-md:text-[1.35rem] ${className}`}>{secondaryHeading}</h4>
        </div>
    );
};

export default FormHeading;
