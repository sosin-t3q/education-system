import { ReactComponent as MatchCase } from '@/assets/match_case.svg'
import styles from './Input.module.css'
import { Canvas } from '@/components'
import MidiPlayer from 'react-midi-player'
import { useEffect, useState } from 'react'

interface InputProps {
  selected: any
  getData: any
}

const Input = ({ selected, getData }: InputProps) => {
  const [value, setValue] = useState<any>('')
  const data = selected.data

  const handleChange = (e: any) => {
    setValue(e.target.value)
    if (value.trim().length === 0) return
    getData(e.target.value)
  }

  useEffect(() => {
    getData(selected.data)
  }, [selected])

  const canvasData = (data: any) => {
    getData(data)
  }

  let inner = <p>로딩 중...</p>
  if (selected === 'default') {
    inner = (
      <>
        <MatchCase />
        <p>추론 데이터 파일을 선택주세요</p>
      </>
    )
  }
  if (selected === 'write') {
    inner = (
      <label className={styles.textareaLabel}>
        <textarea
          placeholder="텍스트를 작성해주세요."
          value={value}
          onChange={handleChange}
        />
      </label>
    )
  }
  if (selected === 'draw') {
    inner = <Canvas onChange={canvasData} />
  }
  if (data && !data.startsWith('data:')) {
    inner = <p className={styles.selectedTxt}>{data}</p>
  }
  if (data && data.includes('image/')) {
    inner = <img src={selected.data} alt={selected.name}></img>
  }
  if (data && data.includes('audio/')) {
    if (data.includes('audio/midi')) {
      inner = <MidiPlayer src={selected.data} />
    } else {
      inner = <audio controls src={selected.data} />
    }
  }
  if (data && data.includes('video/')) {
    inner = <video controls src={selected.data} />
  }

  return <div className={styles.selectFile}>{inner}</div>
}

export default Input
