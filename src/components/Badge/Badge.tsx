import styles from './Badge.module.css'

interface BadgeProps {
  className?: string
  name: string
  jockey: string
}

const Badge = ({ className, name, jockey }: BadgeProps) => {
  return (
    <div className={`${styles.badge} ${className}`}>
      {name} <span className={styles.bold}>{jockey}</span>
    </div>
  )
}

export default Badge
