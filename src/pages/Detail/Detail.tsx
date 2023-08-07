import {
  Header,
  DetailForm,
  DetailCarousel,
  AI28Modal,
  VisionModal,
} from '@/containers'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './Detail.module.css'
import { useEffect, useState } from 'react'
import { Book, LayersView, Spinner } from '@/components'
import { Helmet } from 'react-helmet-async'
import { loadingAtom, modalAtom, visionModalAtom } from '@/atoms'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { getSubPageData } from '@/axios'

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
  const setLoading = useSetRecoilState(loadingAtom)
  const modal = useRecoilValue(modalAtom)
  const visionModal = useRecoilValue(visionModalAtom)
  const navigate = useNavigate()

  useEffect(() => {
    const getDetailData = async (id: string) => {
      const newData = await getSubPageData(id, setLoading)
      if (!newData) {
        alert('데이터 요청을 실패했습니다.')
        navigate('/home')
      }
      setData(newData)
    }
    if (id) {
      getDetailData(id)
    }
  }, [])

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
        <Book className={styles['detail-view']} />
        <LayersView className={styles['detail-book']} />
        <DetailCarousel
          pageId={id}
          className={styles['detail-carousel']}
        ></DetailCarousel>
        <DetailForm data={data} pageId={id} />
      </main>
      {modal && <AI28Modal />}
      {visionModal && <VisionModal />}
      {loading && <Spinner />}
    </div>
  )
}

export default Detail
