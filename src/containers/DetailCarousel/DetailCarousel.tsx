/* Swiper */
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'

/* CSS & Styles */
import styles from './DetailCarousel.module.css'
import 'swiper/swiper.min.css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import '@/detailSwiper.css'
import 'swiper/css'

import { Title, DropdownMenu } from '@/components'
import json from '@/data/PPT_DATA.json'
import { useEffect, useRef } from 'react'

interface DetailCarouselProps {
  className: string
  pageId: string | undefined
}

const DetailCarousel = ({ className, pageId }: DetailCarouselProps) => {
  /* 현재 페이지의 정보를 JSON에서 찾기 */
  const target = json.find(item => String(item.id) === pageId)

  // 필요한 정보들을 JSON에서 추출
  const fileList = target?.category || []
  const folderName = target?.folderName
  const swiperRef = useRef<SwiperRef>(null)

  /* 이미지 호출 에러 발생시 기본 이미지로 설정 */
  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    e.currentTarget.src = '/src/assets/default.jpg'
  }

  // pageId가 로컬스토리지에 저장된다
  useEffect(() => {
    localStorage.setItem('cartId', String(pageId))

    return () => {
      localStorage.removeItem('cartId')
    }
  }, [pageId])

  /* 슬라이드 이미지는 받아온 folderName을 경로에 넣고, fileList 개수만큼 불러온다 */
  const imagePaths = Array.from(
    { length: fileList.length },
    (_, index) => `/src/assets/pptImage/${folderName}/slide${index + 1}.jpeg`,
  )

  /* 목차를 클릭했을 때 해당 슬라이드로 이동하는 기능, index가 동일하기 때문에 가능 */
  const gotoSlide = (selectedIndex: number) => {
    swiperRef.current?.swiper?.slideTo(selectedIndex)
  }

  /* 다른 페이지로 이동시 슬라이드가 첫 이미지로 돌아가도록 동작, id를 추적한다 */
  useEffect(() => {
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
              onError={handleImageError}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default DetailCarousel
