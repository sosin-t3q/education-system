import { useRecoilValue, useSetRecoilState } from 'recoil'
import { isModalOpenAtom, layersAtom } from '@/atoms'
import styles from './LayersView.module.css'
import { ReactComponent as LayerIconEmpty } from '@/assets/layersIcon.svg'
import { ReactComponent as LayerIconFill } from '@/assets/setlayersIcon.svg'
import useLayers from '@/hooks/useLayers'

interface LayersViewProps {
  onClick?: () => void
  className: string
}

const LayersView = ({ className }: LayersViewProps) => {
  const view = useRecoilValue(layersAtom)
  const setIsModalOpen = useSetRecoilState(isModalOpenAtom)

  const { returnLayers } = useLayers()

  const handleLayers = () => {
    returnLayers()
  }

  return (
    <button
      type="button"
      className={`${className} ${styles.layersView}`}
      onClick={() => {
          setIsModalOpen(true)
          handleLayers()
        }
      }
      aria-label="예제 전체보기"
    >
      {view === false ? <LayerIconEmpty /> : <LayerIconFill />}
    </button>
  )
}

export default LayersView
