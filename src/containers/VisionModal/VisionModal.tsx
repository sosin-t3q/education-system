import { useState, MouseEvent } from 'react'
import { useSetRecoilState } from "recoil"
import { visionModalAtom } from '@/atoms'
import styles from './VisionModal.module.css'
import { ReactComponent as CloseButton } from '@/assets/close-button.svg'
import { VisionAccordion } from '@/components'
import sections from "@/data/VISION_LAYER.json";

const VisionModal = () => {
    const setVisionModal = useSetRecoilState(visionModalAtom);
    const [activeIndex, setActiveIndex] = useState<number | null>(-1);

  // 이벤트 버블링을 막아주는 함수
  const preventBubbling = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
  }

  return (
    <div
      className={styles.shadow}
      onClick={() => {
        setVisionModal(false)
      }}
    >
      <div
        className={styles.modal}
        onClick={e => {
          preventBubbling(e)
        }}
      >
        <h2 className={styles.title}>AI훈민정음-VISION</h2>
        {
            sections.map((section, index) => {
                const { title, data } = section;

                return (
                    <VisionAccordion key={index} title={title} section={data} isActiveSection={index === activeIndex} setActiveIndex={setActiveIndex} sectionIndex={index}></VisionAccordion>
                )
            })
        }
        <CloseButton
          onClick={() => setVisionModal(false)}
          className={styles.button}
        ></CloseButton>
      </div>
    </div>
  )
}

export default VisionModal;
