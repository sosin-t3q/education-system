import { Carousel } from '@/components'
import styles from './IntroInfo.module.css'
import 'swiper/swiper.min.css'

const IntroInfo = () => {
  return (
    <section className={styles['intro-container']}>
      <Carousel className={styles['intro-swiper']}></Carousel>
    </section>
  )
}

export default IntroInfo
