import styles from './Keyword.module.css'

interface KeywordProps {
  option?: number
  label: string
  className?: string
}

const Keyword = ({ option, label, className }: KeywordProps) => {
    const mode = 
      option === 1 
        ? styles['keyword--primary']
        : option === 2
        ? styles['keyword--secondary']
        : option === 3
        ? styles['keyword--third']
        : styles['keyword--fourth']

  return (
    <div
        className={`${styles.keyword} ${mode} ${className}`}
 >
      {label}
    </div>
  )
}

export default Keyword
