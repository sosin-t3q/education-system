import { ReactComponent as MatchCase } from '@/assets/match_case.svg'
import styles from './Input.module.css'
import { Canvas, Log, Recording } from '@/components'
import MidiPlayer from 'react-midi-player'
import { ChangeEvent, useEffect, useState } from 'react'
import { RecordAtom, inputValidationAtom } from '@/atoms'
import { useRecoilState } from 'recoil'

interface InputProps {
  selected: Record<string, string> | null | undefined
  getData: (data: string | string[] | null | undefined) => void
  type: string
}

const Input = ({ selected, getData, type }: InputProps) => {
  const [value, setValue] = useState<string>('')
  const data = selected && selected.data
  const [isValid, setIsValid] = useRecoilState(inputValidationAtom)
  const [isRecord] = useRecoilState(RecordAtom)
  const { recording, base64: recordBase64 } = isRecord

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value)
    if (value.trim().length === 0) return // 입력된 값이 없다면
    getData(e.target.value)
  }

  useEffect(() => {
    if (!recording && recordBase64.trim() !== '') {
      getData(recordBase64)

      return
    }
    if (!selected)
      setIsValid({
        ...isValid,
        isValid: false,
        message: '데이터를 입력해주세요.',
      }) // 데이터가 없다면 입력 검증 상태를 false로 변경
    getData(data)
  }, [selected, recording, recordBase64])

  console.log(recording, recordBase64)

  const canvasData = (data: string | null) => {
    getData(data)
  }

  let inner = <p>로딩 중...</p>
  if (!selected) {
    inner = (
      <>
        <MatchCase />
        <p>추론 데이터 파일을 선택주세요</p>
      </>
    )
  }
  if (type === 'write') {
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
  if (type === 'draw') {
    inner = <Canvas onChange={canvasData} />
  }
  if (type === 'log') {
    return (
      <div className={styles.selectFile}>
        {selected ? (
          <Log data={selected} getData={getData} />
        ) : (
          <>
            <MatchCase />
            <p>추론 데이터 파일을 선택주세요</p>
          </>
        )}
      </div>
    )
  }

  if (type === 'record') {
    return (
      <div className={styles.selectFile}>
        {selected && !recording ? (
          <audio controls src={selected.data} autoPlay={false} />
        ) : recording ? (
          <Recording />
        ) : !recording && recordBase64.trim() !== '' ? (
          <audio controls src={recordBase64} autoPlay={false} />
        ) : (
          <>
            <MatchCase />
            <p>
              추론 데이터 파일을 선택하거나 <br />
              녹음 버튼을 눌러 음성을 녹음해주세요.
            </p>
          </>
        )}
      </div>
    )
  }

  if (typeof data === 'string' && selected) {
    if (!data.startsWith('data:')) {
      // 문자열로만 데이터가 들어온 경우
      inner = <p className={styles.selectedTxt}>{data}</p>
    }
    if (data.includes('image/')) {
      // 이미지 데이터가 들어온 경우
      inner = <img src={selected.data} alt={selected.name}></img>
    }
    if (data.includes('audio/')) {
      // 오디오 데이터가 들어온 경우
      if (data.includes('audio/midi')) {
        // 미디 데이터가 들어온 경우
        inner = <MidiPlayer src={selected.data} />
      } else {
        inner = <audio controls src={selected.data} autoPlay={false} />
      }
    }
    if (data.includes('video/')) {
      if (data.includes('video/x-msvideo')) {
      }
      // 비디오 데이터가 들어온 경우
      inner = <video controls src={selected.data} />
    }
  }
  if (Array.isArray(data) && selected) {
    // 이미지 데이터가 2개 들어온 경우
    return (
      <div className={`${styles.selectFile} ${styles.twoImg} `}>
        {data.map((item, index) => (
          <img src={item} alt={`Pill${index}`}></img>
        ))}
      </div>
    )
  }

  return <div className={styles.selectFile}>{inner}</div>
}

export default Input
