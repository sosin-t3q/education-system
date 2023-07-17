import { useEffect, useState } from 'react'
import styles from './Result.module.css'
import { ReactComponent as ApprovalDelegation } from '@/assets/approval_delegation.svg'

interface ResultProps {
  infer: string | null
}

const Result = ({ infer }: ResultProps) => {
  const [value, setValue] = useState('')

  useEffect(() => {
    if (!infer) return
    setValue(infer)
  }, [infer])

  // 결과값 - 텍스트 / 키워드 / 이미지 / 오디오 / 비디오

  switch (true) {
    case typeof value === 'object': // 키워드
      return (
        <div className={styles['result-cont']}>
          <p>키워드</p>
        </div>
      )
    case typeof value === 'string' &&
      !value.startsWith('data:') &&
      value !== '': // 문자열
      return (
        <div className={styles['result-cont']}>
          <p>{value}</p>
        </div>
      )
    case value.includes('data:image/'): // 이미지
      return (
        <div className={styles['result-cont']}>
          <img src={value} alt="" />
        </div>
      )
    case value.includes('data:audio/'): // 오디오
      return (
        <div className={styles['result-cont']}>
          <audio controls src={value} autoPlay={false} />
        </div>
      )
    case value.includes('data:video/'): // 비디오
      return (
        <div className={styles['result-cont']}>
          <video controls src={value} autoPlay={false} />
        </div>
      )
  }

  return (
    <div className={styles['result-cont']}>
      <ApprovalDelegation />
      <p>예측 결과</p>
    </div>
  )
}

export default Result
