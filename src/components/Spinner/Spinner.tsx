import PulseLoader from 'react-spinners/PulseLoader'
import styles from './Spinner.module.css'

interface SpinnerProps {
  className?: string
}

const Spinner = ({ className }: SpinnerProps) => {
  return (
    <div className={`${className} ${styles.spinnerContainer}`}>
      <PulseLoader
        color="#3f75ff"
        loading
        margin={5}
        size={25}
        speedMultiplier={1}
      />
    </div>
  )
}

export default Spinner
