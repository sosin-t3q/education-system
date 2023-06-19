import styles from './Layers.module.css'
import general from '@/assets/layer_general.png'
import medical from '@/assets/layer_medical.png'
import army from '@/assets/layer_army.png'
import personal from '@/assets/layer_personal.png'
import { useSetRecoilState } from 'recoil'
import { modalAtom } from '@/atoms'

const Layers = () => {
  const setModal = useSetRecoilState(modalAtom)

  return (
    <div className={styles.layers}>
      <img
        onClick={() => setModal(true)}
        src={general}
        alt="일반 레이어"
        className={styles.general}
      />
      <img src={medical} alt="의료 레이어" className={styles.medical} />
      <img src={army} alt="장병 레이어" className={styles.army} />
      <img src={personal} alt="개인 레이어" className={styles.personal} />
    </div>
  )
}

export default Layers
