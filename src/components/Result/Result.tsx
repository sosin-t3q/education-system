import styles from './Result.module.css'
import { ReactComponent as ApprovalDelegation } from '@/assets/approval_delegation.svg'

interface ResultProps {
  infer: string | null
}

const Result = ({ infer }: ResultProps) => {
  return (
    <div className={styles['result-cont']}>
      {infer ? (
        <p className={styles.infer}>{infer}</p>
      ) : (
        <>
          <ApprovalDelegation />
          <p>예측 결과</p>
        </>
      )}
    </div>
  )
}

export default Result
