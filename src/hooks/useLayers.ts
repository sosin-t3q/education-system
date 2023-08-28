import { cartAtom, currentModalAtom } from '@/atoms'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue, useSetRecoilState } from 'recoil'

const useLayers = () => {
  const cart = useRecoilValue(cartAtom)
  const setCurrentModal = useSetRecoilState(currentModalAtom) 
  const navigate = useNavigate()

  const returnLayers = () => {
    const id = cart.id
    switch (true) {
      case id >= 1 && id <= 28: // 훈민정음 예제일 때 (id 1~28)
        setCurrentModal('ai28')
        break
      case id > 100 && id < 200: // 비전 예제일 때 (id 101~199)
        setCurrentModal('vision')
        break
      case id >= 1100: // 학교 예제일 때 (id > 1100)
        navigate('/school')
        break
      default:
        alert(`ID 값이 잘못되었습니다. 현재 ID값 -> ${id}`)
    }
  }

  return { returnLayers }
}

export default useLayers
