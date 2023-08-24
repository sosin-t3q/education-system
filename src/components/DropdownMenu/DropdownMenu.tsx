import { useState, MouseEvent, useEffect } from 'react'
import styles from './DropdownMenu.module.css'
import { ReactComponent as ArrowUp } from '@/assets/arrow-up.svg'
import { ReactComponent as ArrowDown } from '@/assets/arrow-down.svg'
import { useParams } from 'react-router-dom'

interface DropdownMenu {
  className?: string
  options: string[]
  onSelect?: (selected: string) => void
  targetIndex?: (index: number) => void
}

const DropdownMenu = ({
  className,
  options,
  onSelect,
  targetIndex,
}: DropdownMenu) => {
  const { id } = useParams()
  const [toggle, setToggle] = useState(false)
  const [selected, setSelected] = useState('')

  useEffect(() => {
    if (options?.length > 0) {
      setSelected(options[0])
    }
  }, [id])

  const handleToggle = () => {
    setToggle(!toggle)
  }

  const handleClick = (e: MouseEvent) => {
    const li = e.target as HTMLLIElement
    const index = options.indexOf(li.innerText)
    setSelected(li.innerText)
    setToggle(false)
    if (onSelect) {
      onSelect(li.innerText)
    }
    if (targetIndex) {
      targetIndex(index)
    }
  }

  return (
    <div className={`${styles.dropDown} ${className}`} onClick={handleToggle}>
      <div className={styles['dropDown-selected']}>
        <span className={styles['dropDown-selected-title']}>{selected}</span>
        <button
          aria-label="dropDown-toggle-button"
          type="button"
          className={styles['dropDown-selected-button']}
        >
          {/* 토글버튼의 방향에 따라 다른 아이콘을 렌더함 */}
          {!toggle ? <ArrowDown /> : <ArrowUp />}
        </button>
      </div>
      {/* toggle이 true면 메뉴를 보여줌 */}
      {toggle && (
        <ul className={styles['dropDown-options']}>
          {options.map((option, index) => {
            return (
              <li
                key={option + index}
                className={styles['dropDown-option']}
                onClick={handleClick}
              >
                <span className={styles.dropDownOptionText}>{option}</span>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default DropdownMenu
