import { useState, useRef, useEffect, MouseEvent } from 'react'
import { ReactComponent as Eraser } from '@/assets/Eraser.svg'
import { ReactComponent as Stylus } from '@/assets/stylus.svg'
import { ReactComponent as Reset } from '@/assets/reset.svg'
import styles from './Canvas.module.css'

interface CanvasProps {
  onChange: (data: string) => void
}

const Canvas = ({ onChange }: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null)
  const [tool, setTool] = useState<'pen' | 'eraser'>('pen')
  const [canvasData, setCanvasData] = useState<string>('')

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      if (ctx) {
        setContext(ctx)
      }
    }
  }, [])

  const debounce = (func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout
    return (...args: any[]) => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        func(...args)
      }, delay)
    }
  }

  const startDrawing = (event: MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    const { offsetX, offsetY } = event.nativeEvent
    if (context) {
      context.beginPath()
      context.moveTo(offsetX, offsetY)
    }
  }

  const draw = debounce((event: MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !context) return
    const { offsetX, offsetY } = event.nativeEvent
    if (tool === 'eraser') {
      context.globalCompositeOperation = 'destination-out'
      context.lineWidth = 10
    } else {
      context.globalCompositeOperation = 'source-over'
      context.lineWidth = 2
      context.strokeStyle = '#000000'
    }
    context.lineTo(offsetX, offsetY)
    context.stroke()
    setCanvasData(canvasRef.current?.toDataURL() || '')
    onChange(canvasData)
  }, 10)

  const stopDrawing = () => {
    setIsDrawing(false)
    if (context) {
      context.closePath()
    }
  }

  const clearCanvas = () => {
    if (context) {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height)
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
