import React from 'react'

const Spinner = () => {
    return (
        <div className='w-screen flex justify-center items-center bg-white min-h-[60vh]'>
            <img src="/assets/icons/light-loading.svg" className={`animate-spin w-11 aspect-square invert`} alt="loading" />
        </div>
    )
}

export default Spinner