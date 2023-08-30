import styles from './AI28Modal.module.css'
import { AI28Table } from '@/components'
import { preventBubbling } from '@/utils'
import { useCurrentModal } from '@/hooks/_index'
import { ReactComponent as CloseButton } from '@/assets/close-button.svg'

const AI28Modal = () => {  

  const closeCurrentModal = useCurrentModal()

  return (
    <div
      className={styles.shadow}
      onClick={closeCurrentModal}
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
          onClick={closeCurrentModal}
        />
      </div>
    </div>
  )
}

export default AI28Modal
