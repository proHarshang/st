import React, { useContext } from 'react';
import ProductCard from '../components/ProductCard';
import { useQuery } from '@tanstack/react-query';
import { WishlistContext } from '../context/WishlistContext';
import { API_URL, PRODUCT_IMG_PATH } from '../common/constants';
import { useTranslation } from 'react-i18next'
import { ProductsContext } from '../context/ProductsContext';
import Spinner from '../common/Spinner';

const Wishlist = () => {
    const { t } = useTranslation();

    const { wishlist } = useContext(WishlistContext);
    const { allProducts, isLoading, error } = useContext(ProductsContext);

    if (isLoading) {
        return (
            <Spinner />
        );
    }

    if (error) {
        return <div>No products Found</div>;
    }


    const WishlistedProducts = allProducts.filter(product => wishlist.includes(product.productId));

    // const { isPending, error, data } = useQuery({
    //     queryKey: ['wishlist'],
    //     queryFn: () =>
    //         fetch(`${API_URL}/products/fetchProducts`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ productIds: wishlist }),
    //         }).then((res) =>
    //             res.json(),
    //         ),
    // });

    return (
        <>
            <h1 className='text-[32px] font-thin mb-16 pl-16 my-5'>{t('wishlist.Wish List')}</h1>

            <div className="flex flex-col items-center w-full">
                <div className="flex flex-wrap justify-center gap-x-10 gap-y-20 w-[100%]">
                    {/* todo : if (products === 0 ) display shopping button */}
                    {WishlistedProducts.map(product => (
                        <ProductCard
                            key={product.productId}
                            productId={product.productId}
                            productLink={`../../../product/${product.category}/${product.productId}`}
                            title={product.title}
                            price={product.price}
                            stock={product.stock}
                            primaryImg={`${PRODUCT_IMG_PATH}${product.images.primary}`}
                            secondaryImg={`${PRODUCT_IMG_PATH}${product.images.secondary}`}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

export default Wishlist;
