import styles from './Title.module.css'
console.log(styles.h1)

interface TitleProps {
  type: number
  label: string
  className: string
}

const Title = (props: TitleProps) => {
  switch (props.type) {
    case 1:
      return (
        <h1 className={`${props.className} ${styles.h1}`}>{props.label}</h1>
      )
    case 2:
      return (
        <h2 className={`${props.className} ${styles.h2}`}>{props.label}</h2>
      )
    case 3:
      return (
        <h3 className={`${props.className} ${styles.h3}`}>{props.label}</h3>
      )
    case 4:
      return (
        <h4 className={`${props.className} ${styles.h4}`}>{props.label}</h4>
      )
    case 5:
      return (
        <h5 className={`${props.className} ${styles.h5}`}>{props.label}</h5>
      )
    case 6:
      return (
        <h6 className={`${props.className} ${styles.h6}`}>{props.label}</h6>
      )
    default:
      return (
        <h1 className={`${props.className} ${styles.h1}`}>{props.label}</h1>
      )
  }
}

export default Title
