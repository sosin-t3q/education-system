import styles from './Cube.module.css'
import { ReactComponent as CloseButton } from '@/assets/close-button.svg'
import { Table } from '@/components'
import { useSetRecoilState } from 'recoil'
import { modalAtom } from '@/atoms'

const Cube = () => {
  const setModal = useSetRecoilState(modalAtom)
  return (
    <div className={styles.cube}>
      <caption className={styles.caption}>전국민 AI</caption>
      <Table></Table>
      <CloseButton
        onClick={() => setModal(false)}
        className={styles.button}
      ></CloseButton>
    </div>
  )
}

export default Cube
