import styles from './VisionLayer.module.css'
import { ReactComponent as ArrowDown } from '@/assets/arrow-down.svg'

const VisionLayer = ({ className }: { className: string }) => {
  return (
    <div className={`${className} ${styles.VisionLayer}`}>
      <h3 className={styles.title}>AI훈민정음-VISION</h3>
      <ul className={styles.blocks}>
        <li className={styles.block}>
          <span className={styles['block-title']}>
            다양한 데이터셋을 활용한 객체 탐지
          </span>
          <ArrowDown className={styles['block-icon']} />
        </li>
        <li className={styles.block}>
          <span className={styles['block-title']}>
            다양한 데이터셋을 활용한 객체 분류
          </span>
          <ArrowDown className={styles['block-icon']} />
        </li>
        <li className={styles.block}>
          <span className={styles['block-title']}>
            다양한 데이터셋을 활용한 객체 분할
          </span>
          <ArrowDown className={styles['block-icon']} />
        </li>
        <li className={styles.block}>
          <span className={styles['block-title']}>다양한 알고리즘 더보기</span>
          <ArrowDown className={styles['block-icon']} />
        </li>
      </ul>
    </div>
  )
}

export default VisionLayer
