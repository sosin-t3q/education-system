import styles from './CartModal.module.css'
import { CartTable } from '@/components'
import { preventBubbling } from '@/utils'
import { useCurrentModal } from '@/hooks/_index'
import { ReactComponent as CloseButton } from '@/assets/close-button.svg'

const CartModal = () => {

  // 모달창 닫는 커스텀훅
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
        <CartTable />
        <CloseButton
          className={styles.button}
          onClick={closeCurrentModal}
        />
      </div>
    </div>
  )
}

export default CartModal
