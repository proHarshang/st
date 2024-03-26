import React from 'react'

const Button = ({ varient = 'solid', children, onClick, className, type, isLoading = false }) => {

    let style;

    if (varient === 'solid') {
        style = 'bg-black text-white border-[1px] border-black';
    } else if (varient === 'outline') {
        style = `bg-white text-black border-[1px] border-black ${!isLoading && 'hover:text-white hover:bg-black hoverAnimation'}`;
    } else if (varient === 'secondary') {
        style = 'bg-white text-black font-light border-slate-500 border-[1px] border-black';
    } else if (varient === 'ghost') {
        style = 'bg-transparent text-black font-light';
    } else {
        style = 'bg-black text-white border-[1px] border-black';
    }

    return (
        <button type={type} className={`flex items-center justify-center gap-2 uppercase py-3 px-10 whitespace-nowrap active:scale-[0.98] h-[45px] leading-[normal] ${style} ${className}`} onClick={onClick}>
            {isLoading ? (<img src="/assets/icons/light-loading.svg" className={`h-full w-full animate-spin ${varient !== 'solid' && 'invert'}`} alt="loading" />) : children}
        </button>
    )
}

export default Button