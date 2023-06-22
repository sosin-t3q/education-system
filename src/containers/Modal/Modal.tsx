import styles from './Modal.module.css'
import { ReactComponent as CloseButton } from '@/assets/close-button.svg'
import { Table } from '@/components'
import { useSetRecoilState, useRecoilValue } from 'recoil'
import { modalAtom, tableAtom } from '@/atoms'
import { MouseEvent } from 'react'

const Modal = () => {
  const setModal = useSetRecoilState(modalAtom)
  const table = useRecoilValue(tableAtom)

  // 이벤트 버블링을 막아주는 함수
  const preventBubbling = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
  }

  // state에 따라 Modal의 배경색 변경
  const modalBackgroundColor =
    table === '전국민 AI'
      ? { background: '#EAEEFF' }
      : table === '전산업 AI의료'
      ? { background: '#DBDFFE' }
      : table === '전장병 AI'
      ? { background: '#BFC7FE' }
      : { background: '#93A4FD' }

  return (
    <div
      className={styles.shadow}
      onClick={() => {
        setModal(false)
      }}
    >
      <div
        style={modalBackgroundColor}
        className={styles.modal}
        onClick={e => {
          preventBubbling(e)
        }}
      >
        <Table></Table>
        <CloseButton
          onClick={() => setModal(false)}
          className={styles.button}
        ></CloseButton>
      </div>
    </div>
  )
}

export default Modal
