import { useSetRecoilState } from 'recoil'
import styles from './Layers.module.css'
import { AI28Layer, VisionLayer, CartLayer } from '@/components'
import { currentModalAtom } from '@/atoms'

const Layers = () => {

  const setCurrentModal = useSetRecoilState(currentModalAtom)

  // 모달창 열기
  const openModal = (modal: string) => {
    setCurrentModal(modal)
  }

  return (
    <div className={styles.layers}>
      <div
        className={styles['container-general']}
        onClick={() => openModal("ai28")}
      >
        <AI28Layer className={styles.general} />
      </div>
      <div
        className={styles['container-vision']}
        onClick={() => openModal("vision")}
      >
        <VisionLayer className={styles.vision} />
      </div>
      <div
        className={styles['container-cart']}
        onClick={() => openModal("cart")}
      >
        <CartLayer className={styles.cart} />
      </div>
    </div>
  )
}

export default Layers
