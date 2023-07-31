import { Title, Text, Layers } from '@/components'
import { AI28Modal, CartModal, VisionModal } from '@/containers'
import styles from './HomeCase.module.css'
import { useRecoilValue } from 'recoil'
import { modalAtom, cartModalAtom, visionModalAtom, loadingAtom } from '@/atoms'
import Spinner from '@/components/Spinner/Spinner'

const HomeCase = () => {
  const modal = useRecoilValue(modalAtom)
  const cartModal = useRecoilValue(cartModalAtom)
  const visionModal = useRecoilValue(visionModalAtom)
  const loading = useRecoilValue(loadingAtom);

  return (
    <div className={styles.case}>
      <Title
        type={2}
        className={styles.h2}
        label="전국민 AI훈민정음 28가지 사례"
      ></Title>
      <Text className={styles.p}>
        인공지능에서 다루는 데이터 7종, 인공지능이 하는 태스크 4가지를 조합한
        <span style={{ fontWeight: 700 }}>
          28가지 우수케이스를 통합 플랫폼에 <br /> 탑재한 사례집
        </span>
        을 체험함으로써 인공지능 배우기, 서비스 발굴, 서비스 개발을 쉽게 구현할
        수 있습니다.
      </Text>
      <Layers />
      { modal && <AI28Modal /> }
      { cartModal && <CartModal /> }
      { visionModal && <VisionModal /> }
      { loading && <Spinner></Spinner> }
    </div>
  )
}

export default HomeCase
