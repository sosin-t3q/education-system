import styles from './Badge.module.css'

interface BadgeProps {
  className?: string
  children: string
}

const Badge = ({ className, children }: BadgeProps) => {
  return <div className={`${styles.badge} ${className}`}>{children}</div>
}

export default Badge
