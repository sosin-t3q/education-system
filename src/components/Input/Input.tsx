import { useState } from 'react'
import { ReactComponent as MathchCase } from '@/assets/match_case.svg'
import styles from './Input.module.css'

const Input = () => {
  const [file, setFile] = useState<string>('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    setFile(file ? file.name : '')
  }

  return (
    <div className={styles.selectFile}>
      <MathchCase />
      <p>텍스트 파일을 선택해주세요.</p>
    </div>
  )
}

export default Input
