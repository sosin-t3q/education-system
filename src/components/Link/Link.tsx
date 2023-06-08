import { Link as ReactRouterLink } from 'react-router-dom'
import styles from './Link.module.css'

interface LinkProps {
  path: string
  label: string
  option: number
  className: string
}

const Link = ({ path, label, option, className }: LinkProps) => {
  const mode =
    option === 1
      ? styles['link--primary']
      : option === 2
      ? styles['link--secondary']
      : styles['link--third']

  return (
    <ReactRouterLink to={path} className={`${mode} ${className}`}>
      {label}
    </ReactRouterLink>
  )
}

export default Link
