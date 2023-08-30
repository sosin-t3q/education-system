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
import { useRecoilState } from 'recoil'
import { cartAtom } from '@/atoms/index'
import useBook from '@/hooks/useBook'
import Cookies from 'js-cookie'

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
  const pageTitle = target?.title

  const swiperRef = useRef<SwiperRef>(null)
  const userAuth = Cookies.get('user_auth')

  /* 이미지 호출 에러 발생시 기본 이미지로 설정 */
  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    e.currentTarget.src = '/src/assets/default.jpg'
  }

  /* 찜을 확인하는 기능 */
  const { checkBook } = useBook()

  /* cart에는 찜 기능을 위한 페이지 id와 title이 저장된다 */
  const [cart, setCart] = useRecoilState(cartAtom)

  /* 컴포넌트가 렌더링된 다음 cart의 값으로 id, title 키를 가진 객체가 저장된다 */
  useEffect(() => {
    setCart({ id: Number(pageId), title: pageTitle })
  }, [pageId, pageTitle])

  /* 해당 상세 페이지가 찜이 되어 있는지 확인 */
  /* cart Atom을 추적하고 있어, cart Atom이 업데이트된 다음에 실행된다 */
  useEffect(() => {
    if (userAuth) {
      checkBook()
    }
  }, [cart, Cookies.get('user_auth')])

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
