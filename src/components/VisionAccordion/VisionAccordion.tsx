import { Dispatch } from 'react'
import { useSetRecoilState } from 'recoil'
import { useKeycloak } from '@react-keycloak/web'
import { useNavigate } from 'react-router-dom'
import styles from './VisionAccordion.module.css'
import { ReactComponent as ArrowDown } from '@/assets/arrow-down.svg'
import { ReactComponent as ArrowUp } from '@/assets/arrow-up.svg'
import { handleNavigate } from '@/utils'
import { visionModalAtom, loadingAtom, isModalOpenAtom } from '@/atoms'

interface Props {
  title: string
  section: {
    id: number
    title: string
  }[]
  isActiveSection: boolean
  setActiveIndex: Dispatch<React.SetStateAction<number | null>>
  sectionIndex: number
}

const VisionAccordion = ({
  title,
  section,
  isActiveSection,
  setActiveIndex,
  sectionIndex,
}: Props) => {
  const { keycloak } = useKeycloak()
  const setLoading = useSetRecoilState(loadingAtom)
  const setVisionModal = useSetRecoilState(visionModalAtom)
  const setIsModalOpen = useSetRecoilState(isModalOpenAtom)
  const navigate = useNavigate()

  const toggleSection = () => {
    const nextIndex = isActiveSection ? null : sectionIndex
    setActiveIndex(nextIndex)
  }

  return (
    <>
      <div className={styles.title} onClick={toggleSection}>
        <span>{title}</span>
        {isActiveSection ? <ArrowUp /> : <ArrowDown />}
      </div>
      {isActiveSection && (
        <div className={styles.body}>
          {section.map(data => {
            return (
              <div
                className={styles.block}
                key={data.id}
                onClick={() =>
                  {
                  setIsModalOpen(false)
                  handleNavigate(
                    data.id,
                    keycloak,
                    setLoading,
                    navigate,
                    setVisionModal
                  )
                  }
                }
              >
                <span className={styles.text}>{data.title}</span>
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}

export default VisionAccordion
