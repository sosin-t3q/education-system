import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
import { Title, DropdownMenu } from '@/components'
import { useRef } from 'react'
import styles from './DetailCarousel.module.css'
import '@/detailSwiper.css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/swiper.min.css'
import json from '@/data/PPT_DATA.json'

interface DetailCarouselProps {
  className: string
}

const DetailCarousel = ({ className }: DetailCarouselProps) => {
  const pptTitle = '영화 리뷰 텍스트 감정 분석'
  const target = json.find(item => item.title === pptTitle)
  const fileList = target?.category.map(item => item.name) || []
  const folderName = target?.folderName
  const swiperRef = useRef<SwiperRef>(null)

  const imagePaths = Array.from(
    { length: fileList.length },
    (_, index) => `src/assets/pptImage/${folderName}/slide${index + 1}.jpeg`,
  )

  const gotoSlide = (selectedIndex: number) => {
    swiperRef.current?.swiper?.slideTo(selectedIndex)
  }

  return (
    <div className={styles.container}>
      <div className={styles.detailInfo}>
        <Title
          className={styles['detail-title']}
          type={2}
          label={target?.title || 'default'}
        />
        <DropdownMenu
          options={fileList}
          targetIndex={index => gotoSlide(index)}
          className={styles.detailFilter}
        />
      </div>
      <Swiper
        ref={swiperRef}
        className={`${className} ${styles['my-swiper']}`}
        navigation={true}
        centeredSlides={true}
        modules={[Navigation]}
      >
        {imagePaths.map((path, index) => (
          <SwiperSlide key={index}>
            <img src={path} alt={`Slide ${index + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default DetailCarousel
