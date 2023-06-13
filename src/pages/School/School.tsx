import styles from './School.module.css'
import { Title, Text, DropdownMenu } from '@/components'
import { Header, Card } from '@/containers'

const School = () => {
  return (
    <>
      {/* 헤더 */}
      <Header />
      <div className={styles.school}>
        {/* 인트로 */}
        <Title type={1} label="AI훈민정음 서당" className={styles.title} />
        <Text variant="paragraph" className={styles.text}>
          T3Q.ai를 이용한 각 대학별 프로젝트 결과물
        </Text>
        {/* 메뉴 */}
        <DropdownMenu></DropdownMenu>
        <Title type={2} label="경북대학교" className={styles.subtitle}></Title>
        <div className={styles['card-container']}>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
        </div>
      </div>
    </>
  )
}

export default School
