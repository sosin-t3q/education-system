import { Link as ReactRouterLink } from 'react-router-dom'
import styles from './Link.module.css'

interface LinkProps {
  path: string
  label: string
  option: number
  className: string
}

const Link = (props: LinkProps) => {
  const mode =
    props.option === 1
      ? styles['link--primary']
      : props.option === 2
      ? styles['link--secondary']
      : styles['link--third']

  return (
    <ReactRouterLink to={props.path} className={mode}>
      {props.label}
    </ReactRouterLink>
  )
}

export default Link
