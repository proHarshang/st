import React from 'react'
import { HiArrowLongLeft } from "react-icons/hi2";
import { HiArrowLongRight } from "react-icons/hi2";



const Pagging = ({ currentPage, totalPages, onPageChange }) => {
  const handleClick = (page) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <div className='flex items-center gap-5 justify-center '>

      {/* Previous Button */}
      <button onClick={() => handleClick(currentPage - 1)} disabled={currentPage === 1} className={currentPage === 1 ? 'opacity-50' : 'opacity-100'}>
        <HiArrowLongLeft />
      </button>

      {/* Page Buttons */}
      {Array.from({ length: totalPages }, (_, i) => (
        <button key={i} onClick={() => handleClick(i + 1)} className={currentPage === i + 1 ? 'font-bold' : ''}>
          {i + 1}
        </button>
      ))}

      {/* Next Button */}
      <button onClick={() => handleClick(currentPage + 1)} disabled={currentPage === totalPages} className={currentPage === totalPages ? 'opacity-50' : 'opacity-100'}>
        <HiArrowLongRight />
      </button>

    </div>
  )
}

export default Pagging