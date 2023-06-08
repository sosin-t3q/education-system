import styles from './Button.module.css'

interface ButtonProps {
  onClick: () => void
  option: number
  label: string
  className: string
}

const Button = ({ option, onClick, label, className }: ButtonProps) => {
  const mode =
    option === 1
      ? styles['button--primary']
      : option === 2
      ? styles['button--secondary']
      : styles['button--third']

  return (
    <button
      type="button"
      className={`${styles.button} ${mode} ${className}`}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

export default Button
