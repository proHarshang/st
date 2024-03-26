import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { PRODUCT_IMG_PATH } from '../common/constants'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/zoom';
import 'swiper/css/pagination';

// import required modules
import { Zoom, Mousewheel, Pagination } from 'swiper/modules';

export default function ProductSwiper({ images, productName, direction }) {

    return (
        <>
            <Swiper
                direction={direction}
                slidesPerView={1}
                spaceBetween={5}
                zoom={true}
                mousewheel={direction === 'vertical'}
                pagination={{
                    clickable: true,
                }}
                modules={[Zoom, Mousewheel, Pagination]}
                className={`ProductSwiper`}
            >
                {images.map((imageUrl, index) => (
                    <SwiperSlide key={index}>
                        <div className="swiper-zoom-container h-full">
                            <img src={`${PRODUCT_IMG_PATH}${imageUrl}`} alt={productName} />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
}
