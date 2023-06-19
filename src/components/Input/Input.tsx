import { ReactComponent as MathchCase } from '@/assets/match_case.svg'
import styles from './Input.module.css'
// import { useState } from 'react'

interface FileItem {
  name: string
  path: string
  text?: string
}

interface InputProps {
  file: FileItem[]
  type: string
  selected: string
}

const Input = ({ file, type, selected }: InputProps) => {
  const selectedFile = file.filter((item: any) => item.name === selected)[0]

  console.log(selectedFile?.path)

  return (
    <div className={styles.selectFile}>
      {selected === 'default' || selected === '예제 선택하기' ? (
        <>
          <MathchCase />
          <p>추론 데이터 파일을 선택주세요</p>
        </>
      ) : type === 'text' ? (
        <p>{selectedFile?.text}</p>
      ) : type === 'image' ? (
        <img src={selectedFile?.path} alt={selectedFile?.name} />
      ) : type === 'audio' ? (
        <audio controls src={selectedFile?.path} />
      ) : type === 'video' ? (
        <video controls src={selectedFile?.path} />
      ) : (
        '잘못된 파일 형식입니다.'
      )}
    </div>
  )
}

export default Input
