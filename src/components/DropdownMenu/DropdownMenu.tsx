import styles from './DropdownMenu.module.css'
import { ReactComponent as ArrowDown } from '@/assets/arrow-down.svg'

const DropdownMenu = () => {
  return (
    <div className={styles.dropDown}>
      <div className={styles['dropDown-selected']}>
        <span className={styles['dropDown-selected-title']}>소개</span>
        <button className={styles['dropDown-selected-button']}>
          <ArrowDown></ArrowDown>
        </button>
      </div>
      <ul className={styles['dropDown-options']}>
        <li className={styles['dropDown-option']}>소개</li>
        <li className={styles['dropDown-option']}>소개</li>
        <li className={styles['dropDown-option']}>소개</li>
        <li className={styles['dropDown-option']}>소개</li>
        <li className={styles['dropDown-option']}>소개</li>
        <li className={styles['dropDown-option']}>소개</li>
      </ul>
    </div>
  )
}

export default DropdownMenu
