import { Header, DetailForm, DetailCarousel } from '@/containers'
import { useParams } from 'react-router-dom'
import styles from './Detail.module.css'
import { useEffect, useState } from 'react'
import { Book, LayersView, Spinner, AlertModal } from '@/components'
import { ModalController } from '@/containers'
import { Helmet } from 'react-helmet-async'
import { loadingAtom, alertAtom } from '@/atoms'
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
  const { id } = useParams() as { id: string }
  const [data, setData] = useState<DataType | null>(null)
  const loading = useRecoilValue(loadingAtom)
  const setLoading = useSetRecoilState(loadingAtom)
  const alertModal = useRecoilValue(alertAtom)

  useEffect(() => {
    const getDetailData = async (id: string) => {
      const newData = await getSubPageData(id, setLoading)

      setData(newData)
    }
    if (id) {
      getDetailData(id)
    }
  }, [id])

  return (
    <div className={styles.detail}>
      <Helmet>
        <title>전국민 AI훈민정음 | 수행</title>
        <meta name="description" content="T3Q.ai" />
        <meta name="author" content="t3q" />
        <meta name="keyword" content="T3Q.ai,AI platform,BigData" />
      </Helmet>
      <Header />
      <main className={styles.detailMain}>
        <Book className={styles['detail-view']} />
        <LayersView className={styles['detail-book']} />
        <DetailCarousel pageId={id} className={styles['detail-carousel']} />
        <DetailForm data={data} />
      </main>
      <ModalController />
      {loading && <Spinner />}
      {alertModal.visible && <AlertModal option={alertModal.option} />}
    </div>
  )
}

export default Detail
