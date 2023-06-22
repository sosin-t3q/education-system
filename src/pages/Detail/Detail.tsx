import { Header, DetailForm, DetailCarousel } from '@/containers'
import styles from './Detail.module.css'

const Detail = () => {
  return (
    <div className={styles.detail}>
      <Header></Header>
      <DetailCarousel className={styles['detail-carousel']}></DetailCarousel>
      <DetailForm pageId={23}></DetailForm>
    </div>
  )
}

export default Detail
