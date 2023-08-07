import BeatLoader from 'react-spinners/BeatLoader'
import styles from './Recording.module.css'

const Recording = () => {
  return (
    <div>
      <BeatLoader
        color="#3f75ff"
        loading
        margin={5}
        size={15}
        speedMultiplier={1}
      />
      <span className={styles.recordSpan}>녹음 중...</span>
    </div>
  )
}

export default Recording
