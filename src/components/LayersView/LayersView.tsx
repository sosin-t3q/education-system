import { useRecoilValue } from 'recoil'
import { currentModalAtom } from '@/atoms'
import { ReactComponent as LayerIconEmpty } from '@/assets/layersIcon.svg'
import { ReactComponent as LayerIconFill } from '@/assets/setlayersIcon.svg'
import styles from './LayersView.module.css'
import useLayers from '@/hooks/useLayers'

interface LayersViewProps {
  onClick?: () => void
  className: string
}

const LayersView = ({ className }: LayersViewProps) => {
  const view = useRecoilValue(currentModalAtom) // 레이어 모달창의 상태 관리를 해주는 currentModal 값을 체크 하기위해 view에 반환
  const { returnLayers } = useLayers() // useLayers는 ID 값을 체크해서 그에 맞는 카테고리의 모달 레이어를 반환
  const handleLayers = () => {
    returnLayers()
  }

  return (
    <button
      type="button"
      className={`${className} ${styles.layersView}`}
      onClick={() => {
        handleLayers() // returnLayers를 통해서 클릭하면 모달 레이어를 표시
      }}
      aria-label="예제 전체보기"
    >
      {view ? <LayerIconFill /> : <LayerIconEmpty />}
    </button> // 모달창이 열림 유무를 체크하여 LayersView 버튼의 아이콘 색상이 변경됨 (열려있을 때: 채워진 레이어 아이콘 , 닫혀있을 때 : 빈 레이어 아이콘)
  )
}

export default LayersView
