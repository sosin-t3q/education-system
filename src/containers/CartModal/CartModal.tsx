import styles from './CartModal.module.css'
import { CartTable } from '@/components'
import { preventBubbling } from '@/utils'
import { useCloseModal, useHideScroll } from '@/hooks/_index'
import { ReactComponent as CloseButton } from '@/assets/close-button.svg'

const CartModal = () => {

  // 모달창 닫기
  const closeModal = useCloseModal()

  // 스크롤 숨김
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
        <CartTable />
        <CloseButton
          className={styles.button}
          onClick={closeModal}
        />
      </div>
    </div>
  )
}

export default CartModal
