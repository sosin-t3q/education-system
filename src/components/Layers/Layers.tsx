import { useSetRecoilState } from 'recoil'
import styles from './Layers.module.css'
import { modalAtom, cartModalAtom, visionModalAtom, isModalOpenAtom } from '@/atoms'
import { AI28Layer, VisionLayer, CartLayer } from '@/components'

const Layers = () => {
  // modal state가 true면 모달창이 화면에 보인다
  const setModal = useSetRecoilState(modalAtom)
  const setCartModal = useSetRecoilState(cartModalAtom)
  const setVisionModal = useSetRecoilState(visionModalAtom)
  const setIsModalOpen = useSetRecoilState(isModalOpenAtom)

  return (
    <div className={styles.layers}>
      {/* M - 마우스호버 애니메이션을 위해 각 <Layer />는 <div>로 감싸짐 */}
      <div
        className={styles['container-general']}
        onClick={() => {
            setModal(true)
            setIsModalOpen(true)
          }
        }
      >
        <AI28Layer className={styles.general} />
      </div>
      <div
        className={styles['container-vision']}
        onClick={() => {
            setVisionModal(true)
            setIsModalOpen(true)
          }
        }
      >
        <VisionLayer className={styles.vision} />
      </div>
      <div
        className={styles['container-cart']}
        onClick={() => {
            setCartModal(true)
            setIsModalOpen(true)
          }
        }
      >
        <CartLayer className={styles.cart} />
      </div>
    </div>
  )
}

export default Layers
