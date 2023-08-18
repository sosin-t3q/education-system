import { useSetRecoilState } from 'recoil'
import styles from './CartModal.module.css'
import { CartTable } from '@/components'
import { preventBubbling } from '@/utils'
import { cartModalAtom, isModalOpenAtom } from '@/atoms'
import { ReactComponent as CloseButton } from '@/assets/close-button.svg'

const CartModal = () => {

  const setCartModal = useSetRecoilState(cartModalAtom)
  const setIsModalOpen = useSetRecoilState(isModalOpenAtom)

  //모달창 닫힘
  const closeModal = () => {
    setCartModal(false)
    setIsModalOpen(false)
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
