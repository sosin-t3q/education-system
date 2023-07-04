import { Header, DetailForm, DetailCarousel } from '@/containers'
import { useParams } from 'react-router-dom'
import styles from './Detail.module.css'
import { useEffect, useState } from 'react'

const Detail = () => {
  const { id } = useParams() as { id: string | undefined }
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    // TODO : id 값과 case는 어떻게 매칭 시킬 것인지
    // 데이터에서 case별 파일 유형을 지정해주면 하드코딩 해야 되는 부분이 적어짐
    // 타입 any로 지정되어 있는 부분들은 데이터 구조가 확정되면 수정 예정
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

    getDetailData('case8')
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
