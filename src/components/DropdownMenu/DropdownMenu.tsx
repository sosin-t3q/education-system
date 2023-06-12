import { useState, MouseEvent } from 'react'
import styles from './DropdownMenu.module.css'
import { ReactComponent as ArrowUp } from '@/assets/arrow-up.svg'
import { ReactComponent as ArrowDown } from '@/assets/arrow-down.svg'

const options = ['소개', '밥먹기', '춤추기', '놀기', '실행']

const DropdownMenu = () => {
  const [toggle, setToggle] = useState(false)
  const [selected, setSelected] = useState(options[0])

  const handleToggle = () => {
    setToggle(!toggle)
  }

  const handleClick = (e: MouseEvent) => {
    const li = e.target as HTMLLIElement
    setSelected(li.innerText)
    setToggle(false)
  }

  return (
    <div className={styles.dropDown}>
      <div className={styles['dropDown-selected']}>
        <span className={styles['dropDown-selected-title']}>{selected}</span>
        <button
          className={styles['dropDown-selected-button']}
          onClick={handleToggle}
        >
          {/* 토글버튼의 방향에 따라 다른 아이콘을 렌더함 */}
          {!toggle ? <ArrowUp></ArrowUp> : <ArrowDown></ArrowDown>}
        </button>
      </div>
      {/* toggle이 true면 메뉴를 보여줌 */}
      {toggle && (
        <ul className={styles['dropDown-options']}>
          {options.map(option => {
            return (
              <li
                key={option}
                className={styles['dropDown-option']}
                onClick={handleClick}
              >
                {option}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default DropdownMenu
