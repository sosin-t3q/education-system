import { useSetRecoilState } from 'recoil'
import styles from './Layers.module.css'
import { modalAtom, cartModalAtom, visionModalAtom } from '@/atoms'
import { Layer, VisionLayer, CartLayer } from '@/components'

const Layers = () => {
  // modal state가 true면 모달창이 화면에 보인다
  const setModal = useSetRecoilState(modalAtom)
  const setCartModal = useSetRecoilState(cartModalAtom)
  const setVisionModal = useSetRecoilState(visionModalAtom);

  return (
    <div className={styles.layers}>
      {/* M - 마우스호버 애니메이션을 위해 각 <Layer />는 <div>로 감싸짐 */}
      <div
        className={styles['container-general']}
        onClick={() => setModal(true)}
        >
        <Layer  className={styles.general} />
      </div>
      <div
        className={styles['container-vision']}
        onClick={() => setVisionModal(true)}
      >
        <VisionLayer className={styles.vision} />
      </div>
      <div
        className={styles['container-cart']}
        onClick={() => setCartModal(true)}
      >
        <CartLayer className={styles.cart} />
      </div>
    </div>
  )
}

export default Layers
