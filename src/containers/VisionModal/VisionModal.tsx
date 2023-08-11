import { useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { visionModalAtom, isModalOpenAtom } from '@/atoms'
import styles from './VisionModal.module.css'
import { ReactComponent as CloseButton } from '@/assets/close-button.svg'
import { VisionAccordion } from '@/components'
import sections from '@/data/layers/VISION_LAYER.json'
import { preventBubbling } from '@/utils'

const VisionModal = () => {
  const setVisionModal = useSetRecoilState(visionModalAtom)
  const setIsModalOpen = useSetRecoilState(isModalOpenAtom)
  const [activeIndex, setActiveIndex] = useState<number | null>(-1)

  return (
    <div
      className={styles.shadow}
      onClick={() => {
        setVisionModal(false)
        setIsModalOpen(false)
      }}
    >
      <div
        className={styles.modal}
        onClick={e => {
          preventBubbling(e)
        }}
      >
        <h2 className={styles.title}>AI훈민정음-VISION</h2>
        {sections.map((section, index) => {
          const { title, data } = section

          return (
            <VisionAccordion
              key={index}
              title={title}
              section={data}
              isActiveSection={index === activeIndex}
              setActiveIndex={setActiveIndex}
              sectionIndex={index}
            ></VisionAccordion>
          )
        })}
        <CloseButton
          onClick={() => {
            setVisionModal(false)
            setIsModalOpen(false)
          }}
          className={styles.button}
        ></CloseButton>
      </div>
    </div>
  )
}

export default VisionModal
