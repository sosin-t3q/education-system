import { MouseEvent } from 'react'
import { useSetRecoilState } from 'recoil'
import styles from './CartModal.module.css'
import { cartModalAtom, isModalOpenAtom } from '@/atoms'
import { CartTable } from '@/components'
import { ReactComponent as CloseButton } from '@/assets/close-button.svg'

const CartModal = () => {
  // CartModal state의 값이 false면 화면에 보이지 않고, true면 보인다
  const setCartModal = useSetRecoilState(cartModalAtom)
  const setIsModalOpen = useSetRecoilState(isModalOpenAtom)

  // 이벤트 버블링을 막아주는 함수
  const preventBubbling = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
  }

  return (
    <div
      className={styles.shadow}
      onClick={() => {
        setCartModal(false)
        setIsModalOpen(false)
      }}
    >
      <div
        className={styles.modal}
        onClick={e => {
          preventBubbling(e)
        }}
      >
        <CartTable></CartTable>
        <CloseButton
          onClick={() => {
            setCartModal(false)
            setIsModalOpen(false)
          }}
          className={styles.button}
        ></CloseButton>
      </div>
    </div>
  )
}

export default CartModal
