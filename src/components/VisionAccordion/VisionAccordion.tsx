import { Dispatch } from 'react'
import styles from './VisionAccordion.module.css'
import useHandleNavigate from '@/hooks/useHandleNavigate'
import { ReactComponent as ArrowUp } from '@/assets/arrow-up.svg'
import { ReactComponent as ArrowDown } from '@/assets/arrow-down.svg'

interface VisionAccordionProps {
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
}: VisionAccordionProps) => {

  const checkAuthNavigation = useHandleNavigate();

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
                    checkAuthNavigation(data.id)
                  }}
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
