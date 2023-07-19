import styles from './Keyword.module.css'

interface KeywordProps {
  option?: number
  label: string
}

let className = ''

const Keyword = ({ option, label }: KeywordProps) => {
  const mode =
    option === 1
      ? styles['keyword--primary']
      : option === 2
      ? styles['keyword--secondary']
      : option === 3
      ? styles['keyword--third']
      : styles['keyword--fourth']

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

  switch (true) {
    case isLabelPositive:
      className = 'positive'
      break
    case isLabelNegative:
      className = 'negative'
      break
    case !isLabelNegative && !isLabelPositive:
      switch (label) {
        case '개미':
          className = 'ant'
          break
        case '사과':
          className = 'apple'
          break
        case '버스':
          className = 'bus'
          break
        case '나비':
          className = 'butterfly'
          break
        case '컵':
          className = 'cup'
          break
        case '봉투':
          className = 'envelope'
          break
        case '물고기':
          className = 'fish'
          break
        case '기린':
          className = 'giraffe'
          break
        case '전구':
          className = 'bulb'
          break
        case '돼지':
          className = 'pig'
          break
      }
  }

  return (
    <div className={`${styles.keyword} ${mode} ${styles[className]}`}>
      {label}
    </div>
  )
}

export default Keyword
