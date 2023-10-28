import ProductCard from '@/components/product-card';
import type { Product } from '@/types/types';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

type FeaturedProductsProps = {
  products: Product[];
};

const FeaturedProducts = ({ products }: FeaturedProductsProps) => {
  return (
    <div>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        initialSlide={3}
        coverflowEffect={{
          rotate: 20,
          stretch: 80,
          depth: 30,
          modifier: 1,
          slideShadows: false,
        }}
        pagination={true}
        modules={[EffectCoverflow]}
        className="mySwiper mb-28">
        {products?.map((product) => (
          <SwiperSlide
            key={product._id}
            className="max-w-[16rem] md:max-w-[22rem]">
            <ProductCard {...product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FeaturedProducts;
