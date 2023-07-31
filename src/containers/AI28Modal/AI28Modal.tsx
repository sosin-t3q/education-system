import { useSetRecoilState } from 'recoil'
import { Table } from '@/components'
import { modalAtom } from '@/atoms'
import { ReactComponent as CloseButton } from '@/assets/close-button.svg'
import { preventBubbling } from "@/utils";
import styles from './AI28Modal.module.css'

const AI28Modal = () => {
  const setModal = useSetRecoilState(modalAtom)

  return (
    <div
    className={styles.shadow}
    onClick={() => {
      setModal(false)
    }}
    >
      <div
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

export default AI28Modal
