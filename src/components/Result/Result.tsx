import { useEffect, useState } from 'react'
import styles from './Result.module.css'
import { ReactComponent as ApprovalDelegation } from '@/assets/approval_delegation.svg'
import { Keyword } from '@/components'
import { InferObj } from '@/containers/DetailForm/DetailForm'

interface ResultProps {
  infer: string | null | InferObj
}

const Result = ({ infer }: ResultProps) => {
  const [value, setValue] = useState<string>('')
  const [objValue, setObjValue] = useState<InferObj>({ label: '', option: 0 })

  useEffect(() => {
    if (infer && typeof infer === 'string') setValue(infer)
    else if (infer && typeof infer === 'object') setObjValue(infer)
  }, [infer])

  // 결과값 - 텍스트 / 키워드 / 이미지 / 오디오 / 비디오

  const isText = value.trim() !== '' && value !== null

  switch (true) {
    case typeof objValue === 'object': // 키워드
      return (
        <div className={styles['result-cont']}>
          <Keyword label={objValue.label} option={objValue.option} />
        </div>
      )
    case isText && !value.startsWith('data:'): // 문자열
      return (
        <div className={styles['result-cont']}>
          <p>{value}</p>
        </div>
      )
    case isText && value?.includes('data:image/'): // 이미지
      return (
        <div className={styles['result-cont']}>
          <img src={value} alt="" />
        </div>
      )
    case isText && value?.includes('data:audio/'): // 오디오
      return (
        <div className={styles['result-cont']}>
          <audio controls src={value} autoPlay={false} />
        </div>
      )
    case isText && value?.includes('data:video/'): // 비디오
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
