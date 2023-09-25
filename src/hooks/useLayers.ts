import { useSetRecoilState } from 'recoil'
import { useNavigate } from 'react-router-dom'
import { currentModalAtom } from '@/atoms'

const useLayers = () => {
  const setCurrentModal = useSetRecoilState(currentModalAtom)
  const navigate = useNavigate()

  /* localStorage에 저장된 cardId를 불러온다 */
  const cartId = localStorage.getItem('cartId')

  const returnLayers = () => {
    const id = Number(cartId)
    switch (true) {
      /* 훈민정음 예제 (id 1~28) */
      case id >= 1 && id <= 28:
        setCurrentModal('ai28')
        break
      /* vision 예제 (id 101~199) */
      case id > 100 && id < 200:
        setCurrentModal('vision')
        break
      /* vision 예제 (id > 1100) */
      case id >= 1100:
        navigate('/school')
        break
      default:
        alert(`ID 값이 잘못되었습니다. 현재 ID값은 [${id}] 입니다.`)
    }
  }

  return { returnLayers }
}

export default useLayers
