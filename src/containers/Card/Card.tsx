import styles from './Card.module.css'
import { Text, Badge } from '@/components'

const Card = () => {
  return (
    <div className={styles.card}>
      <div className={styles['card-top']}>
        <Badge>전북대학교</Badge>
        <Text variant="subtitle" className={styles['card-title']}>
          안녕
        </Text>
      </div>
      <div className={styles['card-bottom']}>
        <Text variant="paragraph">안녕 만나서 반가워</Text>
      </div>
    </div>
  )
}

export default Card
