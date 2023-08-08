import { MouseEvent } from 'react'

//M - preventBubbling은 이벤트 버블링을 막아주는 함수다

const preventBubbling = (e: MouseEvent<HTMLDivElement>) => {
  e.stopPropagation()
}

export default preventBubbling
