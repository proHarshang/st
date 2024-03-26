// NOT IN USE 

import React, { useState, useEffect } from 'react'
import { IoClose, IoChevronDown, IoChevronForward } from "react-icons/io5";

const Filter = () => {
    const [toggleFilter, setToggleFilter] = useState(false);
    const [toggleCatagory, setToggleCatagory] = useState(false);
    const [toggleProductType, setToggleProductType] = useState(false);
    const [toggleColor, setToggleColor] = useState(false);
    const [toggleMaterial, setToggleMaterial] = useState(false);
    const [toggleSize, setToggleSize] = useState(false);

    const [categoryFilters, setCategoryFilters] = useState([]);
    const [productTypeFilters, setProductTypeFilters] = useState([]);
    const [colorFilters, setColorFilters] = useState([]);
    const [materialFilters, setMaterialFilters] = useState([]);
    const [sizeFilters, setSizeFilters] = useState([]);

    const [filterQueryString, setFilterQueryString] = useState()

    const handleToggleCategory = () => {
        setToggleCatagory(!toggleCatagory);
        setToggleProductType(false);
        setToggleColor(false);
        setToggleMaterial(false);
        setToggleSize(false);
    }
    const handleToggleProducttype = () => {
        setToggleCatagory(false);
        setToggleProductType(!toggleProductType);
        setToggleColor(false);
        setToggleMaterial(false);
        setToggleSize(false);
    }
    const handleToggleColor = () => {
        setToggleCatagory(false);
        setToggleProductType(false);
        setToggleColor(!toggleColor);
        setToggleMaterial(false);
        setToggleSize(false);
    }
    const handleToggleMaterial = () => {
        setToggleCatagory(false);
        setToggleProductType(false);
        setToggleColor(false);
        setToggleMaterial(!toggleMaterial);
        setToggleSize(false);
    }
    const handleToggleSize = () => {
        setToggleCatagory(false);
        setToggleProductType(false);
        setToggleColor(false);
        setToggleMaterial(false);
        setToggleSize(!toggleSize);
    }

    const generateQueryString = () => {
        const queryParts = [];

        if (categoryFilters.length > 0) {
            queryParts.push(`category=${categoryFilters.join(',')}`);
        }
        if (productTypeFilters.length > 0) {
            queryParts.push(`productType=${productTypeFilters.join(',')}`);
        }
        if (colorFilters.length > 0) {
            queryParts.push(`color=${colorFilters.join(',')}`);
        }
        if (materialFilters.length > 0) {
            queryParts.push(`material=${materialFilters.join(',')}`);
        }
        if (sizeFilters.length > 0) {
            queryParts.push(`size=${sizeFilters.join(',')}`);
        }

        return queryParts.join('&');
    };


    const handleCheckboxChange = (e, filterType) => {
        const { name, checked } = e.target;
        switch (filterType) {
            case 'category':
                if (checked) {
                    setCategoryFilters([...categoryFilters, name]);
                } else {
                    setCategoryFilters(categoryFilters.filter(filter => filter !== name));
                }
                break;
            case 'productType':
                if (checked) {
                    setProductTypeFilters([...productTypeFilters, name]);
                } else {
                    setProductTypeFilters(productTypeFilters.filter(filter => filter !== name));
                }
                break;
            case 'color':
                if (checked) {
                    setColorFilters([...colorFilters, name]);
                } else {
                    setColorFilters(colorFilters.filter(filter => filter !== name));
                }
                break;
            case 'material':
                if (checked) {
                    setMaterialFilters([...materialFilters, name]);
                } else {
                    setMaterialFilters(materialFilters.filter(filter => filter !== name));
                }
                break;
            case 'size':
                if (checked) {
                    setSizeFilters([...sizeFilters, name]);
                } else {
                    setSizeFilters(sizeFilters.filter(filter => filter !== name));
                }
                break;
            default:
                break;
        }
        const queryString = generateQueryString();
        setFilterQueryString(queryString)
    };

    useEffect(() => {
        const queryString = generateQueryString();
        setFilterQueryString(queryString)
    }, [sizeFilters, materialFilters, colorFilters, productTypeFilters, categoryFilters])

    return (
        <>
            <div className='w-[90%] items-center m-auto mt-10 '>
                <div className='flex justify-between items-center md:items-start'>
                    <h3 className='text-2xl md:text-3xl'>40 products</h3>
                    <button className='text-sm md:text-xl ' onClick={() => setToggleFilter(true)}>Filter</button>
                </div>

                {toggleFilter && (<div className='overflow-hidden shadow-md w-56 z-[90] right-0 absolute bg-white -translate-x-[10%] md:-translate-x-1/3'>
                    <div className='flex justify-between items-center w-full  px-4 '>
                        <h3 className='text-lg my-4'>Clear Filters</h3>
                        <button className='text-[20px]' onClick={() => { setToggleFilter(false); }} ><IoClose /></button>
                    </div>
                    <div className=' px-4 my-4'>

                        <ol className='flex flex-col gap-2'>
                            <li className='flex flex-col gap-1' >
                                <div className='flex items-center gap-2 cursor-pointer ' onClick={() => handleToggleCategory()}>
                                    <span className='text-sm'  >Catagory</span>
                                    {toggleCatagory ? (<IoChevronDown className='text-[0.75rem]' />) : (<IoChevronForward className='text-[0.75rem]' />)}
                                </div>
                                {toggleCatagory && (<div className='text-gray-500'>
                                    <label className='checkbox bounce text-sm inline-flex gap-3 items-center '>
                                        <input className='filter_input mr-2 '
                                            type="checkbox"
                                            name="Male"
                                            onChange={(e) => handleCheckboxChange(e, 'category')}
                                        />
                                        <svg viewBox="0 0 21 21" className='filter_checkbox'>
                                            <polyline points="5 10.75 8.5 14.25 16 6"></polyline>
                                        </svg>
                                        Male
                                    </label>

                                    <br />
                                    <label className='checkbox bounce text-sm inline-flex gap-3 items-center '>
                                        <input className='mr-2 filter_input'
                                            type="checkbox"
                                            name="Female"
                                            onChange={(e) => handleCheckboxChange(e, 'category')}
                                        />
                                        <svg viewBox="0 0 21 21" className='filter_checkbox'>
                                            <polyline points="5 10.75 8.5 14.25 16 6"></polyline>
                                        </svg>
                                        Female
                                    </label>
                                </div>)}
                            </li>
                            <li className='flex flex-col gap-2' >
                                <div className='flex items-center gap-2 w-[200%] cursor-pointer' onClick={() => handleToggleProducttype()}>
                                    <span className='text-sm '>Product Type</span>
                                    {toggleProductType ? (<IoChevronDown className='text-[0.75rem]' />) : (<IoChevronForward className='text-[0.75rem]' />)}
                                </div>
                                {toggleProductType && <div className='text-gray-500'>
                                    <label className='checkbox bounce text-sm inline-flex gap-3 items-center '>
                                        <input className='mr-2 filter_input'
                                            type="checkbox"
                                            name="tshirt"
                                            onChange={(e) => handleCheckboxChange(e, 'productType')}
                                        />
                                        <svg viewBox="0 0 21 21" className='filter_checkbox'>
                                            <polyline points="5 10.75 8.5 14.25 16 6"></polyline>
                                        </svg>
                                        T-shirt
                                    </label>
                                    <br />
                                    <label className='checkbox bounce text-sm inline-flex gap-3 items-center '>
                                        <input className='mr-2 filter_input'
                                            type="checkbox"
                                            name="sweatshirt"
                                            onChange={(e) => handleCheckboxChange(e, 'productType')}
                                        />
                                        <svg viewBox="0 0 21 21" className='filter_checkbox'>
                                            <polyline points="5 10.75 8.5 14.25 16 6"></polyline>
                                        </svg>
                                        Sweatshirt
                                    </label>
                                    <br />
                                    <label className='checkbox bounce text-sm inline-flex gap-3 items-center '>
                                        <input className='mr-2 filter_input'
                                            type="checkbox"
                                            name="hoodie"
                                            onChange={(e) => handleCheckboxChange(e, 'productType')}
                                        />
                                        <svg viewBox="0 0 21 21" className='filter_checkbox'>
                                            <polyline points="5 10.75 8.5 14.25 16 6"></polyline>
                                        </svg>
                                        Hoodie
                                    </label>
                                    <br />
                                    <label className='checkbox bounce text-sm inline-flex gap-3 items-center '>
                                        <input className='mr-2 filter_input'
                                            type="checkbox"
                                            name="jacket"
                                            onChange={(e) => handleCheckboxChange(e, 'productType')}
                                        />
                                        <svg viewBox="0 0 21 21" className='filter_checkbox'>
                                            <polyline points="5 10.75 8.5 14.25 16 6"></polyline>
                                        </svg>
                                        Jacket
                                    </label>
                                    <br />
                                    <label className='checkbox bounce text-sm inline-flex gap-3 items-center '>
                                        <input className='mr-2 filter_input'
                                            type="checkbox"
                                            name="coordSet"
                                            onChange={(e) => handleCheckboxChange(e, 'productType')}
                                        />
                                        <svg viewBox="0 0 21 21" className='filter_checkbox'>
                                            <polyline points="5 10.75 8.5 14.25 16 6"></polyline>
                                        </svg>
                                        Co-ord set
                                    </label>
                                </div>}
                            </li>
                            <li className='flex flex-col gap-2' >
                                <div className='flex items-center gap-2 cursor-pointer' onClick={() => handleToggleColor()}>
                                    <span className='text-sm' >Color</span>
                                    {toggleColor ? (<IoChevronDown className='text-[0.75rem]' />) : (<IoChevronForward className='text-[0.75rem]' />)}
                                </div>
                                {toggleColor && <div className='text-gray-500'>
                                    <label className='checkbox bounce text-sm inline-flex gap-3 items-center '>
                                        <input className='mr-2 filter_input'
                                            type="checkbox"
                                            name="Black"
                                            onChange={(e) => handleCheckboxChange(e, 'color')}
                                        />
                                        <svg viewBox="0 0 21 21" className='filter_checkbox'>
                                            <polyline points="5 10.75 8.5 14.25 16 6"></polyline>
                                        </svg>
                                        Black
                                    </label>
                                    <br />
                                    <label className='checkbox bounce text-sm inline-flex gap-3 items-center '>
                                        <input className='mr-2 filter_input'
                                            type="checkbox"
                                            name="Gray"
                                            onChange={(e) => handleCheckboxChange(e, 'color')}
                                        />
                                        <svg viewBox="0 0 21 21" className='filter_checkbox'>
                                            <polyline points="5 10.75 8.5 14.25 16 6"></polyline>
                                        </svg>
                                        Gray
                                    </label>
                                    <br />
                                    <label className='checkbox bounce text-sm inline-flex gap-3 items-center '>
                                        <input className='mr-2 filter_input'
                                            type="checkbox"
                                            name="Blue"
                                            onChange={(e) => handleCheckboxChange(e, 'color')}
                                        />
                                        <svg viewBox="0 0 21 21" className='filter_checkbox'>
                                            <polyline points="5 10.75 8.5 14.25 16 6"></polyline>
                                        </svg>
                                        Blue
                                    </label>
                                    <br />
                                    <label className='checkbox bounce text-sm inline-flex gap-3 items-center '>
                                        <input className='mr-2 filter_input'
                                            type="checkbox"
                                            name="White"
                                            onChange={(e) => handleCheckboxChange(e, 'color')}
                                        />
                                        <svg viewBox="0 0 21 21" className='filter_checkbox'>
                                            <polyline points="5 10.75 8.5 14.25 16 6"></polyline>
                                        </svg>
                                        White
                                    </label>
                                </div>}
                            </li>
                            <li className='flex flex-col gap-2' >

                                <div className='flex items-center gap-2 cursor-pointer' onClick={() => handleToggleMaterial()}>
                                    <span className='text-sm' >Material</span>
                                    {toggleMaterial ? (<IoChevronDown className='text-[0.75rem]' />) : (<IoChevronForward className='text-[0.75rem]' />)}
                                </div>
                                {toggleMaterial && <div className='text-gray-500'>
                                    <label className='checkbox bounce text-sm inline-flex gap-3 items-center '>
                                        <input className='mr-2 filter_input'
                                            type="checkbox"
                                            name="Cotton"
                                            onChange={(e) => handleCheckboxChange(e, 'material')}
                                        />
                                        <svg viewBox="0 0 21 21" className='filter_checkbox'>
                                            <polyline points="5 10.75 8.5 14.25 16 6"></polyline>
                                        </svg>
                                        Cotton
                                    </label>
                                    <br />
                                    <label className='checkbox bounce text-sm inline-flex gap-3 items-center '>
                                        <input className='mr-2 filter_input'
                                            type="checkbox"
                                            name="Wool"
                                            onChange={(e) => handleCheckboxChange(e, 'material')}
                                        />
                                        <svg viewBox="0 0 21 21" className='filter_checkbox'>
                                            <polyline points="5 10.75 8.5 14.25 16 6"></polyline>
                                        </svg>
                                        Wool
                                    </label>
                                    <br />
                                    <label className='checkbox bounce text-sm inline-flex gap-3 items-center '>
                                        <input className='mr-2 filter_input'
                                            type="checkbox"
                                            name="Leather"
                                            onChange={(e) => handleCheckboxChange(e, 'material')}
                                        />
                                        <svg viewBox="0 0 21 21" className='filter_checkbox'>
                                            <polyline points="5 10.75 8.5 14.25 16 6"></polyline>
                                        </svg>
                                        Leather
                                    </label>
                                </div>}
                            </li>
                            <li className='flex flex-col gap-2' >

                                <div className='flex items-center gap-2 cursor-pointer' onClick={() => handleToggleSize()}>
                                    <span className='text-sm' >Size</span>
                                    {toggleSize ? (<IoChevronDown className='text-[0.75rem]' />) : (<IoChevronForward className='text-[0.75rem]' />)}
                                </div>
                                {toggleSize && <div className='text-gray-500'>
                                    <label className='checkbox bounce text-sm inline-flex gap-3 items-center '>
                                        <input className='mr-2 filter_input'
                                            type="checkbox"
                                            name="S"
                                            onChange={(e) => handleCheckboxChange(e, 'size')}
                                        />
                                        <svg viewBox="0 0 21 21" className='filter_checkbox'>
                                            <polyline points="5 10.75 8.5 14.25 16 6"></polyline>
                                        </svg>
                                        S
                                    </label>
                                    <br />
                                    <label className='checkbox bounce text-sm inline-flex gap-3 items-center '>
                                        <input className='mr-2 filter_input'
                                            type="checkbox"
                                            name="M"
                                            onChange={(e) => handleCheckboxChange(e, 'size')}
                                        />
                                        <svg viewBox="0 0 21 21" className='filter_checkbox'>
                                            <polyline points="5 10.75 8.5 14.25 16 6"></polyline>
                                        </svg>
                                        M
                                    </label>
                                    <br />
                                    <label className='checkbox bounce text-sm inline-flex gap-3 items-center mb-5'>
                                        <input className='mr-2 filter_input '
                                            type="checkbox"
                                            name="L"
                                            onChange={(e) => handleCheckboxChange(e, 'size')}
                                        />
                                        <svg viewBox="0 0 21 21" className='filter_checkbox '>
                                            <polyline points="5 10.75 8.5 14.25 16 6"></polyline>
                                        </svg>
                                        L
                                    </label>
                                    <br />
                                    <label className='checkbox bounce text-sm inline-flex gap-3 items-center mb-5'>
                                        <input className='mr-2 filter_input '
                                            type="checkbox"
                                            name="XL"
                                            onChange={(e) => handleCheckboxChange(e, 'size')}
                                        />
                                        <svg viewBox="0 0 21 21" className='filter_checkbox '>
                                            <polyline points="5 10.75 8.5 14.25 16 6"></polyline>
                                        </svg>
                                        L
                                    </label>

                                </div>}
                            </li>

                        </ol>
                    </div>
                </div>)}
            </div>

        </>
    )
}

export default Filter