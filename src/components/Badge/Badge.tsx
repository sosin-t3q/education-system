import styles from './Badge.module.css'

interface BadgeProps {
  width: string
  content: React.ReactNode
}

const Badge = ({ width, content }: BadgeProps) => {
  return (
    <button className={styles['badge-university']} style={{ width: width }}>
      {content}
    </button>
  )
}

export default Badge
