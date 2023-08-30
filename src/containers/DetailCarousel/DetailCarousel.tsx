import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
import { Title, DropdownMenu } from '@/components'
import { useEffect, useRef } from 'react'
import styles from './DetailCarousel.module.css'
import '@/detailSwiper.css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/swiper.min.css'
import json from '@/data/PPT_DATA.json'

interface DetailCarouselProps {
  className: string
  pageId: string | undefined
}

const DetailCarousel = ({ className, pageId }: DetailCarouselProps) => {
  const target = json.find(item => String(item.id) === pageId)
  const fileList = target?.category || []
  const folderName = target?.folderName
  const swiperRef = useRef<SwiperRef>(null)

  // 이미지 로드 실패시 기본 이미지를 로드하는 함수
  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    e.currentTarget.src = '/src/assets/default.jpg' // 임의의 이미지 경로
  }

  // pageId가 로컬스토리지에 저장된다
  useEffect(() => {
    localStorage.setItem('cartId', String(pageId))

    return () => {
      localStorage.removeItem('cartId');
    }
  }, [pageId])

  const imagePaths = Array.from(
    { length: fileList.length },
    (_, index) => `/src/assets/pptImage/${folderName}/slide${index + 1}.jpeg`,
  )

  const gotoSlide = (selectedIndex: number) => {
    swiperRef.current?.swiper?.slideTo(selectedIndex)
  }

  useEffect(() => {
    // imagePaths 또는 target 변경시 swiper를 첫 번째 슬라이드로 초기화
    swiperRef.current?.swiper?.slideTo(0)
  }, [target])

  return (
    <section className={styles.container}>
      <Title
        className={styles['detail-title']}
        type={2}
        label={target?.title || 'default'}
      />
      <div className={styles.detailInfo}>
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
            <img
              src={path}
              alt={`Slide ${index + 1}`}
              onError={handleImageError} // 이미지 로드 실패시 기본 이미지 호출
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default DetailCarousel
