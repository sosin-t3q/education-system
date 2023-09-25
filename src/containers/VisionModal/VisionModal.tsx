import { useState } from 'react'
import styles from './VisionModal.module.css'
import sections from '@/data/layers/VISION_LAYER.json'
import { preventBubbling } from '@/utils'
import { VisionAccordion } from '@/components'
import { ReactComponent as CloseButton } from '@/assets/close-button.svg'
import { useCloseModal, useHideScroll } from '@/hooks/_index'

const VisionModal = () => {
  
  const [activeIndex, setActiveIndex] = useState<number | null>(-1)

  // 모달창 닫기
  const closeModal = useCloseModal()

  // 스크롤 숨김
  useHideScroll()

  return (
    <div
      className={styles.shadow}
      onClick={closeModal}
    >
      <div
        className={styles.modal}
        onClick={e => {
          //이벤트 버블링 방지
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
            />
          )
        })}
        <CloseButton
          className={styles.button}
          onClick={closeModal}
        />
      </div>
    </div>
  )
}

export default VisionModal
