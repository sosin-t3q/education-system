import styles from './Result.module.css'
import { ReactComponent as ApprovalDelegation } from '@/assets/approval_delegation.svg'

const Result = () => {
  return (
    <div className={styles['result-cont']}>
      <ApprovalDelegation />
      <p>예측 결과</p>
    </div>
  )
}

export default Result
