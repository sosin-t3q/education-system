import { Header, DetailForm, DetailCarousel } from '@/containers'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './Detail.module.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Book } from '@/components'
import { Helmet } from 'react-helmet-async'
import Spinner from '@/components/Spinner/Spinner'
import { loadingAtom } from '@/atoms'
import { useRecoilValue } from 'recoil'

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
  const loading = useRecoilValue(loadingAtom)
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
        console.log('실패')
      }
    }

    if (id) {
      getDetailData(id)
    }
  }, [id])

  return (
    <div className={styles.detail}>
      <Helmet>
        <title>전국민 AI 훈민정음</title>
        <meta name="description" content="T3Q.ai" />
        <meta name="author" content="t3q" />
        <meta name="keyword" content="T3Q.ai,AI platform,BigData" />
      </Helmet>
      <Header />
      <main className={styles.detailMain}>
        <Book className={styles['detail-book']} />
        <DetailCarousel
          pageId={id}
          className={styles['detail-carousel']}
        ></DetailCarousel>
        <DetailForm data={data} pageId={id} />
      </main>
      {loading && <Spinner></Spinner>}
    </div>
  )
}

export default Detail
