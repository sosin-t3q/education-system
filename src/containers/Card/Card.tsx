import styles from './Card.module.css'
import { Text, Badge } from '@/components'

interface CardProps {
  badge: string
  jockey: string
  title: string
  content: string
  cardColor: string
  onClickCard?: () => void
}

const Card = ({
  badge,
  jockey,
  title,
  content,
  cardColor,
  onClickCard,
}: CardProps) => {
  const cardStyle = {
    backgroundColor: cardColor,
  }

  return (
    <div className={styles.card} onClick={onClickCard}>
      <div
        className={`${styles['card-top']} ${styles[cardColor]}`}
        style={cardStyle}
      >
        <Badge
          className={styles['card-badge']}
          name={badge}
          jockey={jockey}
        ></Badge>
        <Text className={styles['card-title']}>{title}</Text>
      </div>
      <div className={styles['card-bottom']}>
        <Text className={styles['card-text']}>{content}</Text>
      </div>
    </div>
  )
}

export default Card
