import styles from './Layers.module.css'
import general from '@/assets/layer_general.png'
import medical from '@/assets/layer_medical.png'
import army from '@/assets/layer_army.png'
import personal from '@/assets/layer_personal.png'
import { useSetRecoilState } from 'recoil'
import { modalAtom, tableAtom } from '@/atoms'

const Layers = () => {
  const setTable = useSetRecoilState(tableAtom)
  const setModal = useSetRecoilState(modalAtom)

  return (
    <div className={styles.layers}>
      <img
        onClick={() => {
          setTable('전국민 AI')
          setModal(true)
        }}
        src={general}
        alt="전국민 AI 레이어"
        className={styles.general}
      />
      <img
        onClick={() => {
          setTable('전산업 AI의료')
          setModal(true)
        }}
        src={medical}
        alt="전산업 AI의료 레이어"
        className={styles.medical}
      />
      <img
        onClick={() => {
          setTable('전장병 AI')
          setModal(true)
        }}
        src={army}
        alt="전장병 AI 레이어"
        className={styles.army}
      />
      <img
        onClick={() => {
          setTable('개인 AI')
          setModal(true)
        }}
        src={personal}
        alt="개인 AI 레이어"
        className={styles.personal}
      />
    </div>
  )
}

export default Layers
