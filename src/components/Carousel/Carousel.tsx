// import styles from './Carousel.module.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

interface CarouselProps {
  className: string
}

const Carousel = ({ className }: CarouselProps) => {
  return (
    <>
      <Swiper
        className={className}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={true}
        modules={[Autoplay, Pagination]}
      >
        <SwiperSlide>
          <img src="./src/assets/intro_first.png" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="./src/assets/intro_second.png" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="./src/assets/intro_third.png" />
        </SwiperSlide>
      </Swiper>
    </>
  )
}

export default Carousel
