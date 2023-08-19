import { IntroCarousel } from '@/components'
import styles from './IntroInfo.module.css'
import 'swiper/swiper.min.css'

const IntroInfo = () => {
  return (
    <section className={styles['intro-container']}>
      <IntroCarousel className={styles['intro-swiper']}></IntroCarousel>
    </section>
  )
}

export default IntroInfo
