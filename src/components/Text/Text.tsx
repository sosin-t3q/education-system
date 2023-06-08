import { ReactNode } from 'react'
import styles from './Text.module.css'

interface TextProps {
  variant: 'subtitle' | 'paragraph'
  children: ReactNode
}

// variant에 따라 subtitle, paragraph로 나뉘어서 선택됨
const Text = ({ variant, children }: TextProps) => {
  switch (variant) {
    case 'subtitle':
      return <p className={styles['text-subtitle']}>{children}</p>

    case 'paragraph':
      return <p className={styles['text-paragraph']}>{children}</p>
  }
}

export default Text
