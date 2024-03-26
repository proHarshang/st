import React, { useContext } from 'react';
import ProductInfo from '../components/productInfo';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next'
import Spinner from '../common/Spinner';
import { API_URL } from '../common/constants';
import { ProductsContext } from '../context/ProductsContext';
import ProductListSwiper from '../components/ProductListSwiper';

const Products = () => {
    const { t } = useTranslation();

    let { productID } = useParams();
    const { exchangeRate, exchangeRateLoading } = useContext(ProductsContext);

    const { isPending, data, error } = useQuery({
        queryKey: ['product detail'],
        queryFn: () =>
            fetch(`${API_URL}/products/`).then((res) =>
                res.json(),
            ),
    });

    if (isPending) return <Spinner />;

    if (error) return 'An error has occurred: ' + error.message;

    if (!data || !data.data) return <div>{t('ProductDetail.No data available')}</div>;

    // Filter product by ID
    const product = data.data.find(product => product.productId === productID);

    const filteredProducts = data.data.filter(product => product.category === 'Women');

    if (!product) return 'Product not found';

    return (
        <>
            <div className='flex '>
                <div className='w-[33%] flex flex-col max-md:hidden max-lg:hidden  justify-center p-[33px] pb-[300px] gap-[20px]'>
                    <h1 className='product_title text-xl font-bold'>{t('ProductDetail.Product Details')}</h1>
                    <h1 className='text-sm'> The Embroidered 8 Milano Tee is made in Italy
                        from a stretch jersey that combines comfort
                        with formal polish. A heavily textured embroid- ered "8"
                        on the front signifies Saint Rosario
                        collection number. The fit is relaxed with a
                        stylish drape. A Fear of God leather label is stitched at the back collar.</h1>
                </div>
                {!exchangeRateLoading ?
                    <ProductInfo className="w-1/2 max-lg:w-full"
                        productId={product.productId}
                        title={product.title}
                        price={Math.round(product.price * exchangeRate)}
                        color={product.color[0].name}
                        size={product.size}
                        stock={product.stock}
                        images={product.images.general}
                        primaryImage={product.images.primary}
                        secondaryImage={product.images.secondary}
                    /> : <Spinner />}
            </div>

            <div className='flex gap-x-10 gap-5 overflow-y-scroll scrollbar_hidden py-24 px-1 similarProductsScroller'>
                <ProductListSwiper productCards={filteredProducts} />
            </div>
        </>
    );
}

export default Products;
