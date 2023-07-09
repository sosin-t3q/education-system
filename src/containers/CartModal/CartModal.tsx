import styles from './CartModal.module.css'
import { ReactComponent as CloseButton } from '@/assets/close-button.svg'
import { CartTable } from '@/components'
import { useSetRecoilState } from 'recoil'
import { cartModalAtom } from '@/atoms'
import { MouseEvent } from 'react'

const CartModal = () => {
  // CartModal state의 값이 false면 화면에 보이지 않고, true면 보인다
  const setCartModal = useSetRecoilState(cartModalAtom)

  // 이벤트 버블링을 막아주는 함수
  const preventBubbling = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
  }

  return (
    <div
      className={styles.shadow}
      onClick={() => {
        setCartModal(false)
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
          onClick={() => setCartModal(false)}
          className={styles.button}
        ></CloseButton>
      </div>
    </div>
  )
}

export default CartModal
