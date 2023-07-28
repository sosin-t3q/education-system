import { Header, DetailForm, DetailCarousel } from '@/containers'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './Detail.module.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Book } from '@/components'

type ResType = {
  id: number
  case_data: DataType
}

export type DataListType = {
  [key: string]: string
}
export interface DataType {
  API: string
  data_list: DataListType[]
  data_type: string
}

const Detail = () => {
  const { id } = useParams() as { id: string | undefined }
  const [data, setData] = useState<DataType | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const getDetailData = async (id: string) => {
      try {
        const response = await axios.get('/src/data/Detail_TestCase_Dummy.json')
        const res = response.data
        const target = res.find((item: ResType) => String(item.id) === id) // id에 해당하는 데이터 추출
        setData(target['case_data'])
      } catch (e) {
        // alert('데이터 요청을 실패했습니다.')
        // navigate('/home')
        console.log('실패');
      }
    }

    if (id) {
      getDetailData(id)
    }
  }, [id])

  return (
    <div className={styles.detail}>
      <Header />
      <main className={styles.detailMain}>
        <Book className={styles['detail-book']} />
        <DetailCarousel
          pageId={id}
          className={styles['detail-carousel']}
        ></DetailCarousel>
        <DetailForm data={data} pageId={id} />
      </main>
    </div>
  )
}

export default Detail
