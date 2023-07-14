import styles from './Layers.module.css'
import { useSetRecoilState } from 'recoil'
import { modalAtom, cartModalAtom } from '@/atoms'
import { Layer, CartLayer } from '@/components'

const Layers = () => {
  // modal state가 true면 모달창이 화면에 보인다
  const setModal = useSetRecoilState(modalAtom)
  const setCartModal = useSetRecoilState(cartModalAtom)

  return (
    <div className={styles.layers}>
      {/* M - 마우스호버 애니메이션을 위해 각 <Layer />는 <div>로 감싸짐 */}
      <div
        className={styles['container-general']}
        onClick={() => setModal(true)}
      >
        <Layer variant="전국민 AI" className={styles.general} />
      </div>
      <div
        className={styles['container-medical']}
        onClick={() => setModal(true)}
      >
        <Layer variant="전산업 AI의료" className={styles.medical} />
      </div>
      <div className={styles['container-army']} onClick={() => setModal(true)}>
        <Layer variant="전장병 AI" className={styles.army} />
      </div>
      {/* CartLayer는 별개로 관리되기 때문에 별도의 컴포넌트에서 관리됨 */}
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
