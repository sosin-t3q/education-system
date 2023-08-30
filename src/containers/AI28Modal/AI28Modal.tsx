import { useSetRecoilState } from 'recoil'
import styles from './AI28Modal.module.css'
import { AI28Table } from '@/components'
import { preventBubbling } from '@/utils'
import { currentModalAtom } from '@/atoms'
import { ReactComponent as CloseButton } from '@/assets/close-button.svg'

const AI28Modal = () => {  

  const setCurrentModal = useSetRecoilState(currentModalAtom)
  
  //모달창 닫힘
  const closeModal = () => {
    setCurrentModal("")
  }

  return (
    <div
      className={styles.shadow}
      onClick={closeModal}
    >
      <div
        className={styles.modal}
        onClick={e => {
          //이벤트 버블링 방지
          preventBubbling(e)
        }}
      >
        <AI28Table />
        <CloseButton
          className={styles.button}
          onClick={closeModal}
        />
      </div>
    </div>
  )
}

export default AI28Modal
