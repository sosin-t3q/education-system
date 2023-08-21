import { Button } from '@/components'
import styles from './Error.module.css'
import { useNavigate } from 'react-router-dom'

const Error = () => {
  const navigate = useNavigate()

  return (
    <div className={styles.container}>
      <div className={styles.error}>404</div>
      <p className={styles['error-text']}>찾을 수 없는 페이지입니다. <br/> 요청하신 페이지가 사라졌거나, 잘못된 경로를 이용하셨어요 : )</p>
      <Button
        option={1}
        label={'홈으로 이동'}
        onClick={() => navigate('/home')}
        className={styles['button-error']}
      />
    </div>
  )
}

export default Error
