import axiosRequest from '@/axios/axiosRequest'
import { SetterOrUpdater } from 'recoil'

const logProcessor = async (
  mode: 'classification' | 'anomaly' | 'clustering' | 'regression' | string,
  value: string | string[], // 사용자가 입력한 값 (input)
  formUrl: string, // 사용자가 입력한 API Url
  setLoading: SetterOrUpdater<boolean>, // 로딩 컴포넌트
  setAlert: SetterOrUpdater<{ visible: boolean; option: string }>, // 알림창 컴포넌트 상태관리
) => {
  const apiType = 'log'
  let resultData = ''

  type infoType = {
    [key: string]: string
  }

  const classification_info: infoType = {
    Center: '센터',
    Guard: '가드',
    Forward: '포워드',
  }

  const clustering_info: infoType = {
    'physical good, magical bad': '물리 능력치 양호',
    'magical good, physical bad': '특수 능력치 양호',
    'physical good, magical good': '모든 능력치 양호',
    'physical bad, magical bad': '모든 능력치 부족',
  }

  const convertData = JSON.stringify({
    url: formUrl,
    log_data: value,
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
        /* CASE : NBA 선수 포지션 분류 - Classification */
        case 'classification':
          resultData = classification_info[response_data]
          break

        /* CASE : NBA 선수 연봉 예측 - Regression  */
        case 'regression':
          resultData = response_data
          break

        /* CASE : 신용카드 사기 탐지 - Anomaly */
        case 'anomaly':
          resultData =
            response_data === 'normal_transaction' ? '정상거래' : '부정거래'
          break

        /* CASE : 포켓몬 스탯에 따른 군집화 - Clustering */
        case 'clustering':
          resultData = clustering_info[response_data]
          break

        default:
          break
      }
    }
  } catch (err) {
    setAlert({ visible: true, option: 'axiosError' })

    return
  } finally {
    setLoading(false)
  }

  return { label: resultData }
}

export default logProcessor
