import styles from './AlertModal.module.css'
import { ReactNode } from 'react'

interface AlertProps {
  onClick?: () => void
  children: ReactNode
  className?: string
  buttonName: string
}

const AlertModal = ({ children, buttonName }: AlertProps) => {
  return (
    <div className={styles.alertModal}>
      <div className={styles.textBox}>
        <p>{children}</p>
      </div>
      <button type="button" className={styles.button}>
        {buttonName}
      </button>
    </div>
  )
}

export default AlertModal
