import { useSetRecoilState } from 'recoil'
import styles from './AlertModal.module.css'
import { ReactNode } from 'react'
import { alertAtom } from '@/atoms'

interface AlertProps {
  children?: ReactNode
}

const AlertModal = ({ children }: AlertProps) => {
  const setAlert = useSetRecoilState(alertAtom)
  const closeModal = () => {
    setAlert(false)
  }

  return (
    <div className={styles.shadow}>
      <div className={styles.alertModal}>
        <div className={styles.textBox}>
          <p>{children}</p>
        </div>
        <button type="button" className={styles.button} onClick={closeModal}>
          확인
        </button>
      </div>
    </div>
  )
}

export default AlertModal
