// import styles from './Carousel.module.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

interface CarouselProps {
  className: string
  pagination: boolean
  navigation: boolean
}

const Carousel = (props: CarouselProps) => {
  return (
    <>
      <Swiper
        className={props.className}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={props.pagination}
        navigation={props.navigation}
        modules={[Autoplay, Pagination, Navigation]}
      >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
      </Swiper>
    </>
  )
}

export default Carousel
