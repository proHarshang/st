import React, { useState } from 'react';
import { IoChevronDown, IoChevronForward } from "react-icons/io5";

const CareerAccordion = ({ title, children }) => {
    const [isAccordionOpen, setIsAccordionOpen] = useState(false);

    const toggleAccordion = () => {
        setIsAccordionOpen(!isAccordionOpen);
    };

    return (
        <div className="w-[95%] mx-auto my-4 cursor-pointer">
            <div className="flex justify-start gap-5 items-center w-full bg-black text-white px-5 py-4" onClick={toggleAccordion}>
                <span>{isAccordionOpen ? <IoChevronDown /> : <IoChevronForward />}</span>
                <h3>{title}</h3>
            </div>
            {isAccordionOpen && (
                <div className="py-8">
                    {children}
                </div>
            )}
        </div>
    );
};

export default CareerAccordion;