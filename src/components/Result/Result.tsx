import styles from './Result.module.css'
import { ReactComponent as ApprovalDelegation } from '@/assets/approval_delegation.svg'

interface ResultProps {
  infer: string | null
}

const Result = ({ infer }: ResultProps) => {
  return (
    <div className={styles['result-cont']}>
      <ApprovalDelegation />
      <p>예측 결과</p>
    </div>
  )
}

export default Result
