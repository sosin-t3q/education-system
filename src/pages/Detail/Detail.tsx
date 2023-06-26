import { Header, DetailForm, DetailCarousel } from '@/containers'
import { useParams } from 'react-router-dom'
import styles from './Detail.module.css'

const Detail = () => {
  const { id } = useParams() as { id: string | undefined }
  return (
    <div className={styles.detail}>
      <Header></Header>
      <DetailCarousel
        pageId={id}
        className={styles['detail-carousel']}
      ></DetailCarousel>
      <DetailForm pageId={id}></DetailForm>
    </div>
  )
}

export default Detail
