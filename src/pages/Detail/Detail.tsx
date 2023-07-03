import { Header, DetailForm, DetailCarousel } from '@/containers'
import { useParams } from 'react-router-dom'
import styles from './Detail.module.css'
import { useEffect, useState } from 'react'

const Detail = () => {
  const { id } = useParams() as { id: string | undefined }
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    const getDetailData = async (id: string) => {
      const response = fetch(`/src/data/DETAIL_DUMMY.json`)
      const data = await (await response).json()

      const target = data[id]

      if (id === 'case7') {
        target['type'] = 'draw'
      }

      if (target['case_data'] === undefined || id === 'case8') {
        target['type'] = 'write'
      }
      setData(target)
    }

    getDetailData('case2')
  }, [])

  return (
    <div className={styles.detail}>
      <Header />
      <DetailCarousel
        pageId={id}
        className={styles['detail-carousel']}
      ></DetailCarousel>
      <DetailForm data={data} />
    </div>
  )
}

export default Detail
