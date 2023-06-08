import { Text, Title } from '@/components'

import styles from './IntroInfo.module.css'

console.log(styles.test)

const IntroInfo = () => {
  return (
    <section className="intro-container">
      <Title className="intro-title" type={1} label="AI훈민정음"></Title>
      <Text variant="subtitle">
        세상에서 인공지능을 가장 잘 활용하는 대한민국
      </Text>
    </section>
  )
}

export default IntroInfo
