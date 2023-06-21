import { Link as ReactRouterLink } from 'react-router-dom'
import { ReactNode } from 'react'
import styles from './Link.module.css'

interface LinkProps {
  path: string
  children?: ReactNode
  className?: string
}

const Link = ({ path, children, className }: LinkProps) => {
  return (
    <ReactRouterLink to={path} className={`${styles.link} ${className}`}>
      {children}
    </ReactRouterLink>
  )
}

export default Link
