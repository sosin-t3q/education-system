import { cartAtom, modalAtom, visionModalAtom } from '@/atoms'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue, useSetRecoilState } from 'recoil'

const useLayers = () => {
  const cart = useRecoilValue(cartAtom)
  const setModal = useSetRecoilState(modalAtom)
  const setVisionModal = useSetRecoilState(visionModalAtom)
  const navigate = useNavigate()

  const returnLayers = () => {
    const id = cart.id
    switch (true) {
      case id >= 1 && id <= 28: // 훈민정음 예제일 때 (id 1~28)
        console.log('훈민정음, id = ', id)
        setModal(true)
        break
      case id > 100 && id < 200: // 비전 예제일 때 (id 101~199)
        console.log('VISION, id = ', id)
        setVisionModal(true)
        break
      case id >= 1100:
        console.log('서당페이지', id)
        navigate('/school')
        break
      default:
        console.log('ID 값이 잘못되었습니다. 현재 ID값 -> ', id)
    }
  }
  return { returnLayers }
}

export default useLayers
