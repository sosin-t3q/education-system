import { useEffect, useState } from 'react'
import styles from './Result.module.css'
import { ReactComponent as ApprovalDelegation } from '@/assets/approval_delegation.svg'
import { Keyword } from '@/components'
import { InferObj } from '@/containers/DetailForm/DetailForm'
import MidiPlayer from 'react-midi-player'
import { useRecoilState } from 'recoil'
import { isInferAtom } from '@/atoms'

interface ResultProps {
  infer: string | InferObj | string[] | null
}

const Result = ({ infer }: ResultProps) => {
  const [value, setValue] = useState<string>('')
  const [objValue, setObjValue] = useState<InferObj>({ label: '' })
  const [arrValue, setArrValue] = useState<string[]>([])
  const [isInfer] = useRecoilState(isInferAtom)

  useEffect(() => {
    if (infer && typeof infer === 'string') setValue(infer)
    else if (infer && Array.isArray(infer)) setArrValue(infer)
    else if (infer && typeof infer === 'object') setObjValue(infer)
  }, [infer])

  // 결과값 - 텍스트 / 키워드 / 이미지 / 오디오 / 비디오

  const isText = value.trim() !== '' && value !== null
  const replacedValue = value.replace(/<br>/g, '\n')

  if (infer) {
    switch (true) {
      case Array.isArray(infer): // 결과값이 배열인 경우
        if (arrValue.length === 0 || !arrValue[0].includes('data:image/')) {
          return (
            <div className={styles['result-cont']}>
              <p>이미지를 불러올 수 없습니다.</p>
            </div>
          )
        } else if (arrValue[0].includes('data:image/')) {
          // 이미지 배열이 들어온 경우
          return (
            <div className={styles.arrImg}>
              {arrValue.map((img, idx) => (
                <img key={idx} src={img} alt={`결과 ${idx + 1}`} />
              ))}
            </div>
          )
        }
        break
      case typeof infer === 'object': // 키워드
        if (Array.isArray(objValue.label)) return

        return (
          <div className={styles['result-cont']}>
            <Keyword label={objValue.label} />
          </div>
        )
      case isText && !value.startsWith('data:'): // 문자열
        return (
          <div className={styles['result-cont']}>
            <p>{replacedValue}</p>
          </div>
        )
      case isText && value?.includes('data:image/'): // 이미지
        if (value.includes('undefined')) {
          return (
            <div className={styles['result-cont']}>
              <p>이미지를 불러올 수 없습니다.</p>
            </div>
          )
        }
        if (value?.includes(' and ')) {
          // case16 : 얼굴 키포인트가 있는 데이터 군집화
          const [img, keyword] = value.split(' and ')

          return (
            <div className={styles['result-cont']}>
              <img src={img} alt="결과" />
              <Keyword label={keyword} />
            </div>
          )
        }

        return (
          <div className={styles['result-cont']}>
            <img src={value} alt="결과" />
          </div>
        )
      case isText && value?.includes('data:audio/'): // 오디오
        if (value.includes('audio/midi')) {
          // 미디 데이터가 들어온 경우
          return (
            <div className={styles['result-cont']}>
              <MidiPlayer src={value} />
            </div>
          )
        }

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
  }

  return (
    <div className={styles['result-cont']}>
      {isInfer ? (
        <p>추론 결과가 없습니다.</p>
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
