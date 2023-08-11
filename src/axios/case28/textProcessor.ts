import axiosRequest from '@/axios/axiosRequest'
import { SetterOrUpdater } from 'recoil'

const textProcessor = async (
  mode: 'classification' | 'anomaly' | 'clustering' | 'regression' | string,
  value: string | string[], // 사용자가 입력한 값 (input)
  formUrl: string, // 사용자가 입력한 API Url
  setLoading: SetterOrUpdater<boolean>, // 로딩 컴포넌트
  setAlert: SetterOrUpdater<{ visible: boolean; option: number }>, // 알림창 컴포넌트 상태관리
) => {
  const apiType = 'text'
  let resultData = ''
  let returnDirectly = false

  type infoType = {
    [key: string]: string
  }

  const clustering_info: infoType = { rec: '취미', comp: '컴퓨터' }

  const convertData = JSON.stringify({
    url: formUrl,
    word: value,
  })

  setLoading(true)

  try {
    const json = await axiosRequest(convertData, apiType)
    if (json.res == 'true') {
      let response_data = json.response.data
      if (response_data == null) {
        response_data = json.response.inference
      }

      switch (mode) {
        /* CASE : 영화 리뷰 텍스트 감정 분석 - Classification */
        case 'classification':
          resultData = response_data === 'pos' ? '긍정' : '부정'
          break
        /* CASE : 스팸메일 이상탐지 - Anomaly */
        case 'anomaly':
          resultData = response_data === 'ham' ? 'HAM' : 'SPAM'
          break

        /* CASE : 뉴스 기사 군집화 - Clustering */
        case 'clustering':
          resultData = clustering_info[response_data]
          break

        /* CASE : 셰익스피어 저작 텍스트 생성 - Regression  */
        case 'regression':
          resultData = response_data[0].replaceAll('\n', '<br>')
          returnDirectly = true
          break

        default:
          break
      }
    }
  } catch (err) {
    setAlert({ visible: true, option: 1 })

    return
  } finally {
    setLoading(false)
  }
  if (returnDirectly) {
    return resultData
  }

  return { label: resultData }
}

export default textProcessor
