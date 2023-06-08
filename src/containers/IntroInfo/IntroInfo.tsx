import { Title } from '@/components'

import styles from './IntroInfo.module.css'

console.log(styles.test)

const IntroInfo = () => {
  return (
    <section className="introContainer">
      <Title className="123" type={1} label="AI훈민정음"></Title>
      <p>세상에서 인공지능을 가장 잘 활용하는 대한민국</p>
    </section>
  )
}

export default IntroInfo
