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
  const [inputValues, setInputValues] = useState<{ [key: string]: string }>({})
  const setIsValid = useSetRecoilState(inputValidationAtom)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setInputValues(prevInputValues => ({
      ...prevInputValues,
      [id]: value,
    }))
  }

  useEffect(() => {
    const defaultInputValues = data?.data as unknown as {
      [key: string]: string
    }
    setInputValues(defaultInputValues)
  }, [data])

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null
    const areAllInputsFilled = Object.values(inputValues).every(
      value => value !== '',
    )

    const debounceGetData = () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }

      timeoutId = setTimeout(() => {
        if (!areAllInputsFilled) {
          setIsValid({
            type: 'log',
            message: '빈 칸을 입력해주세요.',
            isValid: false,
          })
          getData(null)
          return
        }

        setIsValid(prevIsValid => ({
          ...prevIsValid,
          isValid: true,
        }))

        const dataArray: Array<string | number> = []
        for (const key in inputValues) {
          const value = inputValues[key]
          if (typeof value !== 'number') {
            dataArray.push(`'${value}'`)
          } else {
            dataArray.push(value)
          }
        }
        getData(dataArray.join())
      }, 200)
    }

    debounceGetData()

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [data, inputValues, getData])

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
