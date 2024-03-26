import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IoChevronDown, IoChevronForward, IoClose } from "react-icons/io5"
import { useParams } from 'react-router-dom'
import Button from '../common/Button'
import { API_URL, PRODUCT_IMG_PATH } from '../common/constants'
import Pagging from '../components/Pagging'
import ProductCard from '../components/ProductCard'
import { ProductsContext } from '../context/ProductsContext';
import Spinner from '../common/Spinner'

const Products = () => {
    const { t } = useTranslation();

    const { categoryId, productType, searchQuery } = useParams()
    const { exchangeRate, exchangeRateLoading } = useContext(ProductsContext);

    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 16; // Number of products per page

    const [filterQueryString, setFilterQueryString] = useState('')

    const [toggleFilter, setToggleFilter] = useState(false);
    const [toggleCatagory, setToggleCatagory] = useState(false);
    const [toggleProductType, setToggleProductType] = useState(false);
    const [toggleColor, setToggleColor] = useState(false);
    const [toggleMaterial, setToggleMaterial] = useState(false);
    const [toggleSize, setToggleSize] = useState(false);
    const [togglePrice, setTogglePrice] = useState(false);

    const [categoryFilters, setCategoryFilters] = useState([]);
    const [productTypeFilters, setProductTypeFilters] = useState([]);
    const [colorFilters, setColorFilters] = useState([]);
    const [materialFilters, setMaterialFilters] = useState([]);
    const [sizeFilters, setSizeFilters] = useState([]);
    const [priceFilters, setPriceFilters] = useState([]);

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
        setTogglePrice(false)
    }
    const handleToggleColor = () => {
        setToggleCatagory(false);
        setToggleProductType(false);
        setToggleColor(!toggleColor);
        setToggleMaterial(false);
        setToggleSize(false);
        setTogglePrice(false)
    }
    const handleToggleMaterial = () => {
        setToggleCatagory(false);
        setToggleProductType(false);
        setToggleColor(false);
        setToggleMaterial(!toggleMaterial);
        setToggleSize(false);
        setTogglePrice(false)
    }
    const handleToggleSize = () => {
        setToggleCatagory(false);
        setToggleProductType(false);
        setToggleColor(false);
        setToggleMaterial(false);
        setToggleSize(!toggleSize);
        setTogglePrice(false)
    }
    const handleTogglePrice = () => {
        setToggleCatagory(false);
        setToggleProductType(false);
        setToggleColor(false);
        setToggleMaterial(false);
        setToggleSize(false);
        setTogglePrice(!toggleSize)
    }

    useEffect(() => {
        setCategoryFilters([categoryId]);
        setProductTypeFilters([productType])
    }, [categoryId, productType])


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
        if (priceFilters.length > 0) {
            queryParts.push(`price=${priceFilters.join(',')}`);
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
            case 'price':
                if (checked) {
                    // Only one price filter should be selected at a time
                    setPriceFilters([name]);
                } else {
                    setPriceFilters([]);
                }
                break;
            default:
                break;
        }
    };

    const handleApplyFilter = () => {
        const queryString = generateQueryString();
        setFilterQueryString(queryString)
    }

    const handleClearFilter = () => {
        setFilterQueryString('')
    }

    useEffect(() => {
        let query = `${API_URL}/products?page=${currentPage}&pageSize=${pageSize}&${filterQueryString}`;

        const fetchData = async () => {
            try {
                const response = await fetch(query);
                const data = await response.json();
                if (data.success) {
                    setProducts(data.data);
                } else {
                    setProducts([]);
                }
                setTotalPages(data.totalPages);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchData();
    }, [currentPage, filterQueryString]);

    useEffect(() => {
        let query = `${API_URL}/products/search?page=${currentPage}&pageSize=${pageSize}&searchQuery=${searchQuery}`;

        const fetchData = async () => {
            try {
                const response = await fetch(query, {
                    method: 'POST',
                });
                const data = await response.json();

                if (data.success) {
                    setProducts(data.data);
                } else {
                    setProducts([]);
                }
                setTotalPages(data.totalPages);
            } catch (error) {
                console.error('Error searching products:', error);
            }
        };

        fetchData();
    }, [currentPage, searchQuery])

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        setCurrentPage(pageNumber);
    };


    // useEffect(() => {
    //     for (let i = 0; i < products.length; i++) {
    //         products[i].price = Math.round(products[i].price * exchangeRate);
    //     }
    // }, [])

    return (
        <>
            {/* filter  */}
            <div className='w-[90%] items-center m-auto mt-10 '>
                <div className='flex justify-between items-center md:items-start'>
                    <h3 className='text-2xl md:text-3xl'></h3>
                    <button className='text-sm md:text-lg animated_undeline' onClick={() => setToggleFilter(true)}>{t('Filter.Filters')}</button>
                </div>

                {toggleFilter && (<div className='overflow-hidden shadow-md w-max z-[90] right-0 absolute bg-white -translate-x-[10%] md:-translate-x-1/3'>
                    <div className='flex justify-between items-center w-full px-6'>
                        <h3 className='text-xl my-4 '>{t('Filter.Filters')}</h3>
                        <button className='text-[20px]' onClick={() => setToggleFilter(false)} ><IoClose /></button>
                    </div>
                    <hr />
                    <div className='my-4 px-6'>
                        <ol className='flex flex-col gap-2'>
                            <li className='flex flex-col gap-2' >
                                <div className='flex items-center gap-2 cursor-pointer ' onClick={() => handleToggleCategory()}>
                                    <span className='text-sm'>{t('Filter.Catagory')}</span>
                                    {toggleCatagory ? (<IoChevronDown className='text-[0.75rem]' />) : (<IoChevronForward className='text-[0.75rem]' />)}
                                </div>
                                <div className={`text-gray-500 space-y-1 ${!toggleCatagory ? 'invisible h-0' : 'visible h-auto'}`}>
                                    <label className='checkbox bounce text-sm inline-flex gap-3 items-center '>
                                        <input className='filter_input mr-2 '
                                            type="checkbox"
                                            name="Men"
                                            onChange={(e) => handleCheckboxChange(e, 'category')}
                                        />
                                        <svg viewBox="0 0 21 21" className='filter_checkbox'>
                                            <polyline points="5 10.75 8.5 14.25 16 6"></polyline>
                                        </svg>
                                        {t('Filter.Men')}
                                    </label>

                                    <br />
                                    <label className='checkbox bounce text-sm inline-flex gap-3 items-center '>
                                        <input className='mr-2 filter_input'
                                            type="checkbox"
                                            name="Women"
                                            onChange={(e) => handleCheckboxChange(e, 'category')}
                                        />
                                        <svg viewBox="0 0 21 21" className='filter_checkbox'>
                                            <polyline points="5 10.75 8.5 14.25 16 6"></polyline>
                                        </svg>
                                        {t('Filter.Women')}
                                    </label>
                                </div>
                            </li>
                            <li className='flex flex-col gap-2' >
                                <div className='flex items-center gap-2 w-[200%] cursor-pointer' onClick={() => handleToggleProducttype()}>
                                    <span className='text-sm '>{t('Filter.Product Type')}</span>
                                    {toggleProductType ? (<IoChevronDown className='text-[0.75rem]' />) : (<IoChevronForward className='text-[0.75rem]' />)}
                                </div>
                                <div className={`text-gray-500 space-y-1 ${!toggleProductType ? 'invisible h-0' : 'visible h-auto'}`}>
                                    <label className='checkbox bounce text-sm inline-flex gap-3 items-center '>
                                        <input className='mr-2 filter_input'
                                            type="checkbox"
                                            name="Tshirt"
                                            onChange={(e) => handleCheckboxChange(e, 'productType')}
                                        />
                                        <svg viewBox="0 0 21 21" className='filter_checkbox'>
                                            <polyline points="5 10.75 8.5 14.25 16 6"></polyline>
                                        </svg>
                                        {t('Filter.T-shirt')}
                                    </label>
                                    <br />
                                    <label className='checkbox bounce text-sm inline-flex gap-3 items-center '>
                                        <input className='mr-2 filter_input'
                                            type="checkbox"
                                            name="Sweatshirt"
                                            onChange={(e) => handleCheckboxChange(e, 'productType')}
                                        />
                                        <svg viewBox="0 0 21 21" className='filter_checkbox'>
                                            <polyline points="5 10.75 8.5 14.25 16 6"></polyline>
                                        </svg>
                                        {t('Filter.Sweatshirt')}
                                    </label>
                                    <br />
                                    <label className='checkbox bounce text-sm inline-flex gap-3 items-center '>
                                        <input className='mr-2 filter_input'
                                            type="checkbox"
                                            name="Hoodie"
                                            onChange={(e) => handleCheckboxChange(e, 'productType')}
                                        />
                                        <svg viewBox="0 0 21 21" className='filter_checkbox'>
                                            <polyline points="5 10.75 8.5 14.25 16 6"></polyline>
                                        </svg>
                                        {t('Filter.Hoodie')}
                                    </label>
                                    <br />
                                    <label className='checkbox bounce text-sm inline-flex gap-3 items-center '>
                                        <input className='mr-2 filter_input'
                                            type="checkbox"
                                            name="Jacket"
                                            onChange={(e) => handleCheckboxChange(e, 'productType')}
                                        />
                                        <svg viewBox="0 0 21 21" className='filter_checkbox'>
                                            <polyline points="5 10.75 8.5 14.25 16 6"></polyline>
                                        </svg>
                                        {t('Filter.Jacket')}
                                    </label>
                                    <br />
                                    <label className='checkbox bounce text-sm inline-flex gap-3 items-center '>
                                        <input className='mr-2 filter_input'
                                            type="checkbox"
                                            name="CoordSet"
                                            onChange={(e) => handleCheckboxChange(e, 'productType')}
                                        />
                                        <svg viewBox="0 0 21 21" className='filter_checkbox'>
                                            <polyline points="5 10.75 8.5 14.25 16 6"></polyline>
                                        </svg>
                                        {t('Filter.Co-ord set')}
                                    </label>
                                </div>
                            </li>
                            <li className='flex flex-col gap-2' >
                                <div className='flex items-center gap-2 cursor-pointer' onClick={() => handleToggleColor()}>
                                    <span className='text-sm' >{t('Filter.Color')}</span>
                                    {toggleColor ? (<IoChevronDown className='text-[0.75rem]' />) : (<IoChevronForward className='text-[0.75rem]' />)}
                                </div>
                                <div className={`text-gray-500 space-y-1 ${!toggleColor ? 'invisible h-0' : 'visible h-auto'}`}>
                                    <label className='checkbox bounce text-sm inline-flex gap-3 items-center '>
                                        <input className='mr-2 filter_input'
                                            type="checkbox"
                                            name="Black"
                                            onChange={(e) => handleCheckboxChange(e, 'color')}
                                        />
                                        <svg viewBox="0 0 21 21" className='filter_checkbox'>
                                            <polyline points="5 10.75 8.5 14.25 16 6"></polyline>
                                        </svg>
                                        {t('Filter.Black')}
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
                                        {('Gray')}
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
                                        {t('Filter.Blue')}
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
                                        {t('Filter.White')}
                                    </label>
                                </div>
                            </li>
                            <li className='flex flex-col gap-2' >

                                <div className='flex items-center gap-2 cursor-pointer' onClick={() => handleToggleMaterial()}>
                                    <span className='text-sm' >{t('Filter.Material')}</span>
                                    {toggleMaterial ? (<IoChevronDown className='text-[0.75rem]' />) : (<IoChevronForward className='text-[0.75rem]' />)}
                                </div>
                                <div className={`text-gray-500 space-y-1 ${!toggleMaterial ? 'invisible h-0' : 'visible h-auto'}`}>
                                    <label className='checkbox bounce text-sm inline-flex gap-3 items-center '>
                                        <input className='mr-2 filter_input'
                                            type="checkbox"
                                            name="Cotton"
                                            onChange={(e) => handleCheckboxChange(e, 'material')}
                                        />
                                        <svg viewBox="0 0 21 21" className='filter_checkbox'>
                                            <polyline points="5 10.75 8.5 14.25 16 6"></polyline>
                                        </svg>
                                        {t('Filter.Cotton')}
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
                                        {t('Filter.Wool')}
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
                                        {t('Filter.Leather')}
                                    </label>
                                </div>
                            </li>
                            <li className='flex flex-col gap-2' >
                                <div className='flex items-center gap-2 cursor-pointer' onClick={() => handleToggleSize()}>
                                    <span className='text-sm' >{t('Filter.Size')}</span>
                                    {toggleSize ? (<IoChevronDown className='text-[0.75rem]' />) : (<IoChevronForward className='text-[0.75rem]' />)}
                                </div>
                                <div className={`text-gray-500 space-y-1 ${!toggleSize ? 'invisible h-0' : 'visible h-auto'}`}>
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
                                    <label className='checkbox bounce text-sm inline-flex gap-3 items-center'>
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
                                        XL
                                    </label>
                                </div>
                            </li>
                            <li className='flex flex-col gap-2'>
                                <div className='flex items-center gap-2 cursor-pointer' onClick={() => handleTogglePrice()}>
                                    <span className='text-sm' >{t('Filter.Price')}</span>
                                    {toggleSize ? (<IoChevronDown className='text-[0.75rem]' />) : (<IoChevronForward className='text-[0.75rem]' />)}
                                </div>
                                <div className={`text-gray-500 space-y-1 ${!togglePrice ? 'invisible h-0' : 'visible h-auto'}`}>
                                    <label className='checkbox bounce text-sm inline-flex gap-3 items-center '>
                                        <input className='mr-2 filter_input'
                                            type="checkbox"
                                            name="High to Low"
                                            onChange={(e) => handleCheckboxChange(e, 'price')}
                                        />
                                        <svg viewBox="0 0 21 21" className='filter_checkbox'>
                                            <polyline points="5 10.75 8.5 14.25 16 6"></polyline>
                                        </svg>
                                        {t('Filter.High to Low')}
                                    </label>
                                    <br />
                                    <label className='checkbox bounce text-sm inline-flex gap-3 items-center '>
                                        <input className='mr-2 filter_input'
                                            type="checkbox"
                                            name="Low to High"
                                            onChange={(e) => handleCheckboxChange(e, 'price')}
                                        />
                                        <svg viewBox="0 0 21 21" className='filter_checkbox'>
                                            <polyline points="5 10.75 8.5 14.25 16 6"></polyline>
                                        </svg>
                                        {t('Filter.Low to High')}
                                    </label>
                                </div>
                            </li>
                        </ol>
                    </div>
                    <div className="w-full flex items-center">
                        <Button varient='solid' onClick={() => handleApplyFilter()}>{t("Filter.Apply")}</Button>
                        <Button varient='outline' onClick={() => handleClearFilter()}>{t('Filter.Clear')}</Button>
                    </div>
                </div>)}
            </div>
            {/* filter over  */}

            {(searchQuery && products.length <= 0) && (<h3 className='text-center text-xl my-14'> '{searchQuery}' {t('Filter.Not Found')}</h3>)}

            {/* Product List  */}
            <div className="text-center flex flex-wrap gap-7 content-center py-14 px-4 justify-center gap-y-[30px]">
                {products.map(product => (
                    !exchangeRateLoading ?
                        <ProductCard
                            key={product.productId}
                            productId={product.productId}
                            productLink={`../../../product/${product.productId}`}
                            title={product.title}
                            secondaryImg={`${PRODUCT_IMG_PATH}${product.images.secondary}`}
                            primaryImg={`${PRODUCT_IMG_PATH}${product.images.primary}`}
                            stock={product.stock}
                            price={Math.round(product.price * exchangeRate)}
                        /> : <Spinner />
                ))}
            </div>
            {/* Product List over */}

            {/* pagination  */}
            {products.length <= 0 ? null : (<Pagging
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />)}
            {/* pagination over */}

        </>
    )
}

export default Products
