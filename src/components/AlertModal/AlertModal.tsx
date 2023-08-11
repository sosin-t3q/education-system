import { useSetRecoilState } from 'recoil'
import styles from './AlertModal.module.css'
import { alertAtom } from '@/atoms'

interface AlertProps {
  option: string
}

const AlertModal = ({ option }: AlertProps) => {
  const setAlert = useSetRecoilState(alertAtom)

  const closeModal = () => {
    setAlert({ visible: false, option: 'default' })
  }

  const getMessage = (option: string) => {
    switch (option) {
      case 'axiosError':
        return <p>서버에서 데이터를 불러올 수 없습니다!</p>
      case 'nullError':
        return <p>데이터를 입력해주세요.</p>
      case 'videoError':
        return <p>비디오 변환을 실패했습니다.</p>
      case 'recordError':
        return <p>음성 데이터를 변환할 수 없습니다.</p>
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
