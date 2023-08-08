import { useState, ChangeEvent, useEffect } from 'react'
import styles from './Log.module.css'
import { inputValidationAtom } from '@/atoms/index'
import { useSetRecoilState } from 'recoil'

interface DataType {
  [key: string]: string | number
}

interface LogProps {
  data: DataType
  getData: (data: string | null) => void
}

const Log = ({ data, getData }: LogProps) => {
  const [inputValues, setInputValues] = useState<{ [key: string]: string }>({}) // 입력된 값 저장
  const setIsValid = useSetRecoilState(inputValidationAtom) // 입력된 값 검증 상태 저장

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target // 이벤트 객체에서 id, value 추출
    setInputValues(prevInputValues => ({
      ...prevInputValues,
      [id]: value, // id를 키로 value를 값으로 하는 객체를 상태에 저장
    }))
  }

  useEffect(() => {
    const defaultInputValues = data?.data as unknown as {
      [key: string]: string
    }
    setInputValues(defaultInputValues) // data가 존재한다면 입력된 값 상태를 data로 초기화
  }, [data]) // data가 변경될 때마다 실행

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null // 디바운스를 위한 타임아웃 id
    const areAllInputsFilled = Object.values(inputValues).every(
      // 입력된 값이 모두 존재하는지 검사
      value => value !== '', // 빈 문자열이 아니라면 true
    )

    const debounceGetData = () => {
      if (timeoutId) {
        // 타임아웃이 존재한다면
        clearTimeout(timeoutId) // 타임아웃 제거
      }

      timeoutId = setTimeout(() => {
        // 200ms 후 실행
        if (!areAllInputsFilled) {
          // 입력된 값이 하나라도 없다면
          setIsValid({
            type: 'log',
            message: '빈 칸을 입력해주세요.',
            isValid: false,
          })
          getData(null)

          return
        }

        setIsValid(prevIsValid => ({
          // 입력된 값이 모두 있다면
          ...prevIsValid,
          isValid: true, // 검증 상태를 true로 변경
        }))

        const dataArray: Array<string | number> = []
        for (const key in inputValues) {
          // 입력된 값들을 배열에 저장
          const value = inputValues[key] // 입력된 값
          if (!isNaN(Number(value))) {
            // 입력된 값이 숫자라면
            dataArray.push(`${value}`)
          } else {
            // 입력된 값이 숫자가 아니라면
            dataArray.push(`"${value}"`)
          }
        }
        getData(dataArray.join()) // 배열을 문자열로 변환하여 getData 함수에 전달
      }, 200)
    }

    debounceGetData()

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [data, inputValues]) // data, inputValues가 변경될 때마다 실행

  return (
    <div className={styles['input-log__box']}>
      <div className={styles.tableHead}>
        <span>Key</span>
        <span>Value</span>
      </div>
      <form className={styles.logForm}>
        {Object.entries(data?.data).map(([key]) => (
          <div key={key}>
            <label htmlFor={key}>{key}</label>
            <input
              id={key}
              type="text"
              value={inputValues[key] || ''}
              onChange={handleChange}
            />
          </div>
        ))}
      </form>
    </div>
  )
}

export default Log
