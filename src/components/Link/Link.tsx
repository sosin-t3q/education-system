import { Link as ReactRouterLink } from 'react-router-dom'
import { ReactNode } from 'react'
import styles from './Link.module.css'

interface LinkProps {
  path: string
  children?: ReactNode
  className?: string
  onClick?: () => void
}

const Link = ({ path, children, className, onClick }: LinkProps) => {
  return (
    <ReactRouterLink to={path} onClick={onClick} className={`${styles.link} ${className}`}>
      {children}
    </ReactRouterLink>
  )
}

export default Link
