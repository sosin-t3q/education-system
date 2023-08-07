import { useState } from 'react'
import { BsFillRecordFill, BsFillStopFill } from 'react-icons/bs'
import styles from './RecordButton.module.css'

interface RecordButtonProps {
  onClick: () => void
}

const RecordButton = ({ onClick }: RecordButtonProps) => {
  const [isRecording, setIsRecording] = useState<boolean>(false)
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null)
  const [recordedBase64, setRecordedBase64] = useState<string | null>(null)

  // 녹음 시작 함수
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      setAudioStream(stream)
      setIsRecording(true)

      // stream을 MediaRecorder에 연결하고 데이터 수집
      const mediaRecorder = new MediaRecorder(stream)
      const chunks: Blob[] = []

      mediaRecorder.ondataavailable = e => {
        if (e.data.size > 0) {
          chunks.push(e.data)
        }
      }

      mediaRecorder.onstop = async () => {
        const recordedBlob = new Blob(chunks, { type: 'audio/wav' })

        // Blob 데이터를 Base64 문자열로 변환하는 함수
        const blobToBase64 = (blob: Blob): Promise<string> =>
          new Promise<string>((resolve, reject) => {
            const reader = new FileReader()
            reader.onerror = () => {
              reject(new Error('음성 데이터를 변환할 수 없습니다.'))
            }
            reader.onload = () => {
              if (typeof reader.result === 'string') {
                const base64String = reader.result.split(',')[1]
                resolve(base64String)
              } else {
                reject(
                  new Error(
                    'Base64 변환 오류: 문자열이 아닌 데이터 형식입니다.',
                  ),
                )
              }
            }
            reader.readAsDataURL(blob)
          })
        try {
          // 녹음된 Blob 데이터를 Base64 문자열로 변환
          const base64String = await blobToBase64(recordedBlob)
          const result = 'data:audio/wav;base64,' + base64String

          setRecordedBase64(result)
        } catch (error) {
          alert('음성 데이터를 변환할 수 없습니다.')
        }
      }

      mediaRecorder.start()
    } catch (error) {
      alert('음성 녹음을 시작할 수 없습니다.')
    }
  }

  console.log(recordedBase64)

  const stopRecording = () => {
    if (audioStream) {
      audioStream.getTracks().forEach(track => track.stop())
    }
    setAudioStream(null)
    setIsRecording(false)
  }

  const handleClick = () => {
    if (isRecording) stopRecording()
    else if (!isRecording) {
      setRecordedBase64(null)
      startRecording()
    }

    // 상위 컴포넌트로 base64 데이터 전달
    onClick()
  }

  return (
    <button type="button" className={styles.recordButton} onClick={handleClick}>
      {!isRecording ? (
        <span className={styles.recordSpan}>
          <BsFillRecordFill />
          녹음 시작
        </span>
      ) : (
        <span className={`${styles.recordSpan} ${styles.stop}`}>
          <BsFillStopFill />
          녹음 정지
        </span>
      )}
    </button>
  )
}

export default RecordButton
