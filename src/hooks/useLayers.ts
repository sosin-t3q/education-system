import { useSetRecoilState } from 'recoil'
import { useNavigate } from 'react-router-dom'
import { currentModalAtom } from '@/atoms'

const useLayers = () => {
  const setCurrentModal = useSetRecoilState(currentModalAtom) 
  
  const navigate = useNavigate()
  // localStorage에 저장된 cardId를 불러온다
  const cartId = localStorage.getItem("cartId")


  const returnLayers = () => {
    const id = Number(cartId)
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
