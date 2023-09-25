import { useEffect, useState } from 'react'
import styles from './Keyword.module.css'

interface KeywordProps {
  label: string
}

const Keyword = ({ label }: KeywordProps) => {
  const [keyword, setKeyword] = useState({ className: '', option: 3 })

  const isLabelPositive =
    label === '긍정' ||
    label === 'HAM' ||
    label === '정상 블록' ||
    label === '정상' ||
    label === '정상 거래' ||
    label === '정상 데이터'
  const isLabelNegative =
    label === '부정' ||
    label === 'SPAM' ||
    label === '악성' ||
    label === '파손 블록' ||
    label === '비정상' ||
    label === '부정 거래' ||
    label === '비정상 데이터'

  useEffect(() => {
    switch (true) {
      case isLabelPositive:
        setKeyword({ className: 'positive', option: 3 })
        break
      case isLabelNegative:
        setKeyword({ className: 'negative', option: 4 })
        break
      case !isLabelNegative && !isLabelPositive:
        switch (label) {
          case '개미':
            setKeyword({ className: 'ant', option: 3 })
            break
          case '사과':
            setKeyword({ className: 'apple', option: 3 })
            break
          case '버스':
            setKeyword({ className: 'bus', option: 3 })
            break
          case '나비':
            setKeyword({ className: 'butterfly', option: 3 })
            break
          case '컵':
            setKeyword({ className: 'cup', option: 3 })
            break
          case '봉투':
            setKeyword({ className: 'envelope', option: 3 })
            break
          case '물고기':
            setKeyword({ className: 'fish', option: 3 })
            break
          case '기린':
            setKeyword({ className: 'giraffe', option: 3 })
            break
          case '전구':
            setKeyword({ className: 'bulb', option: 3 })
            break
          case '돼지':
            setKeyword({ className: 'pig', option: 3 })
            break
          default:
            setKeyword({ className: '', option: 1 })
        }
    }
  }, [label])

  const mode =
    keyword.option === 1
      ? styles['keyword--primary']
      : keyword.option === 2
      ? styles['keyword--secondary']
      : keyword.option === 3
      ? styles['keyword--third']
      : styles['keyword--fourth']

  return (
    <>
      {!label ? (
        <div
          className={`${styles.keyword} ${mode} ${styles['keyword--empty']}`}
        >
          추론 결과 없음
        </div>
      ) : (
        <div
          className={`${styles.keyword} ${mode} ${styles[keyword.className]}`}
        >
          {label}
        </div>
      )}
    </>
  )
}

export default Keyword
