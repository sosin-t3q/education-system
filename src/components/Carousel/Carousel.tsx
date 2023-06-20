import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper'
import { Title, Text, Button } from '@/components'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/swiper.min.css'
import styles from './Carousel.module.css'
import '@/introSwiper.css'

import { useNavigate } from 'react-router-dom'

interface CarouselProps {
  className: string
}

const Carousel = ({ className }: CarouselProps) => {
  const navigate = useNavigate()

  const goHome = () => {
    navigate('/home')
  }

  const goDetail = () => {
    navigate('/detail')
  }

  const goSchool = () => {
    navigate('/school')
  }

  return (
    <>
      <Swiper
        className={className}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
      >
        <SwiperSlide className="first-slide">
          <section>
            <div className={styles['text-contents']}>
              <Title
                className={styles['contents-title']}
                type={1}
                label="AI훈민정음"
              ></Title>
              <Text className={styles['contents-subtitle']}>
                세상에서 인공지능을 가장 잘 활용하는 대한민국
              </Text>
              <Text className={styles['contents-paragraph']}>
                세종대왕께서 글이 없어 자기 뜻을 제대로 표현하지 못하는 백성들을
                위하여 <br />
                28글자를 만들어 세상의 모든 소리와 뜻을 전할 수 있게 한 것처럼,
              </Text>
              <Text className={styles['contents-paragraph']}>
                인공지능에서 다루는 데이터 7종, 인공지능이 하는 태스크 4가지를
                조합한
                <br /> 28가지 우수케이스를 통합 플랫폼에 탑재한 사례집입니다.
              </Text>
              <Button
                className={`${styles['contents-button']} ${styles['button-first']}`}
                option={1}
                onClick={goHome}
                label="바로가기"
              ></Button>
            </div>
          </section>
        </SwiperSlide>
        <SwiperSlide className="second-slide">
          <section>
            <div className={styles['text-contents']}>
              <Title
                className={styles['contents-title']}
                type={1}
                label="AI훈민정음 서당"
              ></Title>
              <Text className={styles['contents-subtitle']}>
                누구나 쉽게 배워 자기 아이디어를 인공지능으로 구현하자!
              </Text>
              <Text className={styles['contents-paragraph']}>
                AI훈민정음 플랫폼은 학교, 군대, 정부, 기업, 의료 등 다양한
                목적으로 활용이
                <br />
                가능합니다.
              </Text>
              <Button
                className={`${styles['contents-button']} ${styles['button-second']}`}
                option={1}
                onClick={goSchool}
                label="바로가기"
              ></Button>
            </div>
          </section>
        </SwiperSlide>
        <SwiperSlide className="third-slide">
          <section>
            <div className={styles['text-contents']}>
              <Title
                className={styles['contents-title']}
                type={1}
                label="플랫폼 체험해보기"
              ></Title>
              <Text className={styles['contents-subtitle']}>
                인공지능이 엑셀처럼 쉬워집니다
              </Text>
              <Text className={styles['contents-paragraph']}>
                서비스형 인공지능(AIaaS, AI as a Service) 플랫폼은
                음식(AI서비스)과 재료(데이터)
                <br />만 있으면 요리사(개발자 또는 운영자)가 원하는 요리를
                만들수 있는 '공유주방'과 같은 <br />
                개념입니다.
              </Text>
              <Button
                className={`${styles['contents-button']} ${styles['button-third']}`}
                option={1}
                onClick={goDetail}
                label="바로가기"
              ></Button>
            </div>
          </section>
        </SwiperSlide>
      </Swiper>
    </>
  )
}

export default Carousel
