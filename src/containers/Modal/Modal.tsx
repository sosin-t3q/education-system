import styles from './Modal.module.css'
import { ReactComponent as CloseButton } from '@/assets/close-button.svg'
import { Table } from '@/components'
import { useSetRecoilState } from 'recoil'
import { modalAtom } from '@/atoms'

const Modal = () => {
  const setModal = useSetRecoilState(modalAtom)
  return (
    <div
      className={styles.shadow}
      onClick={() => {
        setModal(false)
      }}
    >
      <div className={styles.modal}>
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
