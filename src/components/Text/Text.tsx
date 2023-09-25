import { ReactNode } from 'react'
import styles from './Text.module.css'

interface TextProps {
  className?: string
  children: ReactNode
}

const Text = ({ children, className }: TextProps) => {
  return <p className={`${styles.text} ${className}`}>{children}</p>
}

export default Text
