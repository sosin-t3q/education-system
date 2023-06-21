import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
import { Title, DropdownMenu } from '@/components'
import styles from './DetailCarousel.module.css'
import '@/detailSwiper.css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/swiper.min.css'

import json from '@/data/PPT_DATA.json' // PPT 데이터를 담은 JSON 파일을 가져옴

interface DetailCarouselProps {
  className: string
}

const DetailCarousel = ({ className }: DetailCarouselProps) => {
  const pptTitle = '영화 리뷰 텍스트 감정 분석' // 모달창에서 넘겨온 PPT 제목
  const target = json.find(item => item.title === pptTitle) // JSON에서 해당 제목과 일치하는 값을 target에 저장
  const fileList = target?.category.map(item => item.name) || [] // 카테고리 리스트를 fileList에 저장
  const folderName = target?.folderName //폴더 이름 가져옴

  // console.log(fileList)
  // console.log(folderName)

  const onChange = (selectedIndex: number) => {
    console.log(selectedIndex)
  }

  const imagePaths = Array.from(
    { length: fileList.length },
    (_, index) => `src/assets/pptImage/${folderName}/slide${index + 1}.jpeg`,
  )

  return (
    <div className={styles.container}>
      <div className={styles.detailInfo}>
        <Title
          className={styles['detail-title']}
          type={2}
          label={target?.title || 'default'}
        />
        <DropdownMenu
          options={fileList} // 드롭다운 메뉴의 옵션 값으로 파일 리스트를 전달
          targetIndex={index => onChange(index + 1)} // index를 전달
          className={styles.detailFilter}
        />
      </div>
      <Swiper
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
