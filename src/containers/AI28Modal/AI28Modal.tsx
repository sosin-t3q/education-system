import styles from './AI28Modal.module.css'
import { AI28Table } from '@/components'
import { preventBubbling } from '@/utils'
import { useCloseModal, useHideScroll } from '@/hooks/_index'
import { ReactComponent as CloseButton } from '@/assets/close-button.svg'

const AI28Modal = () => {    

  // 모달창 닫기
  const closeModal = useCloseModal()

  // 스크롤 숨기기
  useHideScroll()


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
