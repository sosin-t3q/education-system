import styles from './Title.module.css'
console.log(styles.h1)

interface TitleProps {
  type: number
  label: string
  className: string
}

const Title = ({ type, label, className }: TitleProps) => {
  switch (type) {
    case 1:
      return <h1 className={`${className} ${styles.h1}`}>{label}</h1>
    case 2:
      return <h2 className={`${className} ${styles.h2}`}>{label}</h2>
    case 3:
      return <h3 className={`${className} ${styles.h3}`}>{label}</h3>
    case 4:
      return <h4 className={`${className} ${styles.h4}`}>{label}</h4>
    case 5:
      return <h5 className={`${className} ${styles.h5}`}>{label}</h5>
    case 6:
      return <h6 className={`${className} ${styles.h6}`}>{label}</h6>
    default:
      return <h1 className={`${className} ${styles.h1}`}>{label}</h1>
  }
}

export default Title
