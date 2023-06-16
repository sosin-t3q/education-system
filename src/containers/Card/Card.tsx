import styles from './Card.module.css'
import { Text, Badge } from '@/components'

const Card = () => {
  return (
    <div className={styles.card}>
      <div className={styles['card-top']}>
        <Badge className={styles['card-badge']}>한국대학교 1기</Badge>
        <Text className={styles['card-title']}>이건 제목입니다.</Text>
      </div>
      <div className={styles['card-bottom']}>
        <Text className={styles['card-text']}>여기서부터는 내용입니다.</Text>
      </div>
    </div>
  )
}

export default Card
