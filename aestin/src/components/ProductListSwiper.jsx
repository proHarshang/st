import React, { useContext } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import ProductCard from './ProductCard';
import { ProductsContext } from '../context/ProductsContext';
import { PRODUCT_IMG_PATH } from '../common/constants';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { FreeMode, Mousewheel, Pagination, Scrollbar } from 'swiper/modules';

const ProductListSwiper = ({ productCards }) => {
    const { exchangeRate } = useContext(ProductsContext);

    return (
        <Swiper
            slidesPerView='auto'
            direction='horizontal'
            mousewheel={true}
            spaceBetween={10}
            freeMode={true}
            // pagination={{
            //     clickable: true,
            // }}
            // scrollbar={{
            //     hide: true,
            //     dragSize: 'auto'
            // }}
            modules={[FreeMode, Mousewheel, Pagination, Scrollbar]}
            className="productListSwiper"
        >
            {productCards.map((product) => (
                <SwiperSlide key={product.productId}>
                    <ProductCard
                        productLink={`../product/${product.productId}`}
                        productId={product.productId}
                        title={product.title}
                        price={Math.round(product.price * exchangeRate)}
                        stock={product.stock}
                        primaryImg={`${PRODUCT_IMG_PATH}${product.images.primary}`}
                        secondaryImg={`${PRODUCT_IMG_PATH}${product.images.secondary}`}
                    />
                </SwiperSlide>
            ))
            }
        </Swiper>
    )
}

export default ProductListSwiper