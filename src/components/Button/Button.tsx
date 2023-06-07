import styles from './Button.module.css'

interface ButtonProps {
  onClick: () => void
  option: number
  label: string
}

const Button = ({ option, label, onClick }: ButtonProps) => {
  const mode =
    option === 1
      ? styles['button--primary']
      : option === 2
      ? styles['button--secondary']
      : styles['button--third']

  return (
    <button
      type="button"
      className={`${styles.button} ${mode}`}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

export default Button
