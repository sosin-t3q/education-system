import { useState, useRef, useEffect, MouseEvent } from 'react'
import { ReactComponent as Eraser } from '@/assets/Eraser.svg'
import { ReactComponent as Stylus } from '@/assets/stylus.svg'
import { ReactComponent as Reset } from '@/assets/reset.svg'
import styles from './Canvas.module.css'

interface CanvasProps {
  onChange: (data: string | null) => void // onChange 콜백 함수 타입 정의
}

const Canvas = ({ onChange }: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null) // 캔버스 요소 참조
  const [isDrawing, setIsDrawing] = useState(false) // 그리기 상태
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null) // 캔버스 2D 렌더링 컨텍스트 저장
  const [tool, setTool] = useState<'pen' | 'eraser'>('pen') // 선택된 그리기 도구 저장
  const [canvasData, setCanvasData] = useState<string>('') // 캔버스 데이터 저장

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      // 캔버스 요소가 존재한다면
      const ctx = canvas.getContext('2d') // 캔버스 2D 렌더링 컨텍스트를 가져옴
      if (ctx) {
        // 캔버스 2D 렌더링 컨텍스트가 존재한다면
        setContext(ctx) // 캔버스 2D 렌더링 컨텍스트를 상태에 저장
      }
    }
  }, [])

  const startDrawing = (event: MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true) // 그리기 상태를 true로 설정
    const { offsetX, offsetY } = event.nativeEvent // 마우스 이벤트 객체에서 offsetX, offsetY 추출
    if (context) {
      // 캔버스 2D 렌더링 컨텍스트가 존재한다면
      context.beginPath() // 새로운 경로 생성
      context.moveTo(offsetX, offsetY) // 캔버스 상의 특정 좌표로 이동
    }
  }

  const draw = (event: MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !context) return // 그리기 상태가 아니거나 캔버스 2D 렌더링 컨텍스트가 존재하지 않는다면 함수 종료
    const { offsetX, offsetY } = event.nativeEvent
    if (tool === 'eraser') {
      // 지우개 도구를 선택했다면
      context.globalCompositeOperation = 'destination-out' // 캔버스에 그려진 이미지를 지움
      context.lineWidth = 21 // 지우개 두께를 21로 설정
    } else {
      context.globalCompositeOperation = 'source-over' // 캔버스에 그려진 이미지를 덮음
      context.lineWidth = 21 // 펜 두께를 21로 설정
      context.strokeStyle = '#000000'
    }
    context.lineTo(offsetX, offsetY) // 지정된 좌표까지 선을 그림
    context.stroke()
    setCanvasData(canvasRef.current?.toDataURL() || '') // 캔버스 데이터를 상태에 저장
    onChange(canvasData) // onChange에 캔버스 데이터 전달
  }

  const stopDrawing = () => {
    setIsDrawing(false) // 그리기 상태를 false로 설정
    if (context) {
      // 캔버스 2D 렌더링 컨텍스트가 존재한다면
      context.closePath() // 경로를 닫음
    }
  }

  const clearCanvas = () => {
    if (context) {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height)
      setCanvasData('') // canvasData를 빈 문자열로 설정
      onChange(null) // onChange에 null 값을 전달
    }
  }

  const changeTool = (newTool: 'pen' | 'eraser') => {
    setTool(newTool)
  }

  return (
    <div className={styles.canvasWrap}>
      <div className={styles.btnWrap}>
        <button
          type="button"
          onClick={() => changeTool('pen')}
          aria-label="그리기"
        >
          <Stylus />
        </button>
        <button
          type="button"
          onClick={() => changeTool('eraser')}
          aria-label="지우기"
        >
          <Eraser />
        </button>
        <button type="button" onClick={clearCanvas} aria-label="리셋하기">
          <Reset />
        </button>
      </div>
      <canvas
        ref={canvasRef}
        width={570}
        height={380}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />
    </div>
  )
}

export default Canvas
