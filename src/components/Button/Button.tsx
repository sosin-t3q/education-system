import styles from './Button.module.css'

interface ButtonProps {
  onClick: () => void
  option: number
  label: string
  className: string
}

const Button = (props: ButtonProps) => {
  const mode =
    props.option === 1
      ? styles['button--primary']
      : props.option === 2
      ? styles['button--secondary']
      : styles['button--third']

  return (
    <button
      type="button"
      className={`${styles.button} ${mode} ${props.className}`}
      onClick={props.onClick}
    >
      {props.label}
    </button>
  )
}

export default Button
