import styles from './Badge.module.css'

interface BadgeProps {
  children: string;
}

const Badge = ({ children }: BadgeProps) => {
  return (
    <div className={styles['badge-university']} >
      {children}
    </div>
  )
}

export default Badge