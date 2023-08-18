import { useSetRecoilState, SetterOrUpdater  } from 'recoil'
import styles from './Layers.module.css'
import { AI28Layer, VisionLayer, CartLayer } from '@/components'
import { AI28ModalAtom, cartModalAtom, visionModalAtom, isModalOpenAtom } from '@/atoms'

const Layers = () => {

  const setAI28Modal = useSetRecoilState(AI28ModalAtom)
  const setVisionModal = useSetRecoilState(visionModalAtom)
  const setCartModal = useSetRecoilState(cartModalAtom)
  const setIsModalOpen = useSetRecoilState(isModalOpenAtom)

  // 모달창 열기
  const openModal = (setModal: SetterOrUpdater<boolean>) => {
    setModal(true)
    setIsModalOpen(true)
  }

  return (
    <div className={styles.layers}>
      <div
        className={styles['container-general']}
        onClick={() => openModal(setAI28Modal)}
      >
        <AI28Layer className={styles.general} />
      </div>
      <div
        className={styles['container-vision']}
        onClick={() => openModal(setVisionModal)}
      >
        <VisionLayer className={styles.vision} />
      </div>
      <div
        className={styles['container-cart']}
        onClick={() => openModal(setCartModal)}
      >
        <CartLayer className={styles.cart} />
      </div>
    </div>
  )
}

export default Layers
