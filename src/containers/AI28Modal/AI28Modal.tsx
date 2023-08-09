import { useSetRecoilState } from 'recoil'
import { Table } from '@/components'
import { modalAtom } from '@/atoms'
import { ReactComponent as CloseButton } from '@/assets/close-button.svg'
import { preventBubbling } from '@/utils'
import styles from './AI28Modal.module.css'

const AI28Modal = () => {
  //modal의 값에 따라 AI28Modal의 렌더링이 결정된다
  const setModal = useSetRecoilState(modalAtom)

  return (
    <div
      className={styles.shadow}
      onClick={() => {
        //클릭할 경우 modal이 false로 업데이트 된다
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
          //클릭할 경우 modal이 false로 업데이트 된다
          onClick={() => setModal(false)}
          className={styles.button}
        ></CloseButton>
      </div>
    </div>
  )
}

export default AI28Modal
