import React, { useContext, useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { useTranslation } from 'react-i18next'
import { ProductsContext } from '../context/ProductsContext';
import { API_URL, PRODUCT_IMG_PATH } from '../common/constants'
import Spinner from '../common/Spinner';

const NewProducts = () => {
    const { t } = useTranslation();
    const { allProducts, isLoading, error } = useContext(ProductsContext);

    if (isLoading) {
        return (
            <Spinner />
        );
    }

    if (error) {
        return <div>No products Found</div>;
    }

    const allNewProducts = allProducts.filter(product => product.isNewProduct === true)

    return (
        <div className='container'>
            <h1 className='text-[32px] font-thin mb-4 pl-16 my-9'>{t('newin.New In')}</h1>
            <div className="flex flex-col items-center flex-wrap">
                <div className="flex flex-wrap justify-center gap-6 gap-y-11 w-[100%] max-w-screen-xl">
                    {allNewProducts.map(product => {
                        return (
                            <ProductCard
                                key={product.productId}
                                productId={product.productId}
                                productLink={`../../../product/${product.productId}`}
                                title={product.title}
                                secondaryImg={`${PRODUCT_IMG_PATH}${product.images.secondary}`}
                                primaryImg={`${PRODUCT_IMG_PATH}${product.images.primary}`}
                                stock={product.stock}
                                price={product.price}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default NewProducts;