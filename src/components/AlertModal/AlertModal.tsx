import { useSetRecoilState } from 'recoil'
import styles from './AlertModal.module.css'
import { alertAtom } from '@/atoms'

interface AlertProps {
  option: number
}

const AlertModal = ({ option }: AlertProps) => {
  const setAlert = useSetRecoilState(alertAtom)
  const closeModal = () => {
    setAlert({ visible: false, option: 0 })
  }

  const getMessage = (option: number) => {
    switch (option) {
      case 1:
        return <p>서버에서 데이터를 불러올 수 없습니다!</p>
      case 2:
        return <p>2번 에러메세지</p>
      case 3:
        return <p>3번 에러메세지</p>
      default:
        return <p>오류가 발생했습니다.</p>
    }
  }

  return (
    <div className={styles.shadow}>
      <div className={styles.alertModal}>
        <div className={styles.textBox}>{getMessage(option)}</div>
        <button type="button" className={styles.button} onClick={closeModal}>
          확인
        </button>
      </div>
    </div>
  )
}

export default AlertModal
