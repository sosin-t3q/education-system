import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
import { Title, DropdownMenu } from '@/components'
import styles from './DetailCarousel.module.css'
import '@/detailSwiper.css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/swiper.min.css'

interface DetailCarouselProps {
  className: string
}

const DetailCarousel = ({ className }: DetailCarouselProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.detailInfo}>
        <Title
          className={styles['detail-title']}
          type={2}
          label="영화 리뷰 텍스트 감정 분석"
        ></Title>
        <DropdownMenu className={styles.detailFilter}></DropdownMenu>
      </div>

      <Swiper
        className={`${className} ${styles['my-swiper']}`}
        navigation={true}
        centeredSlides={true}
        modules={[Navigation]}
      >
        <SwiperSlide>
          <img src="./src/assets/spring.png" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="./src/assets/summer.png" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="./src/assets/fall.png" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="./src/assets/winter.png" />
        </SwiperSlide>
      </Swiper>
    </div>
  )
}

export default DetailCarousel
