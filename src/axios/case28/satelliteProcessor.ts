import base64DataToFile from '@/axios/base64DataToFile'
import axiosRequest from '@/axios/axiosRequest'
import { SetterOrUpdater } from 'recoil'

const satelliteProcessor = async (
  mode: 'classification' | 'anomaly' | 'clustering' | 'regression' | string,
  value: string | string[], // 사용자가 입력한 값 (input)
  formUrl: string, // 사용자가 입력한 API Url
  setLoading: SetterOrUpdater<boolean>, // 로딩 컴포넌트
  setAlert: SetterOrUpdater<{ visible: boolean; option: number }>, // 알림창 컴포넌트 상태관리
) => {
  let convertData: string | FormData
  let convertImage: File
  let resultData = ''
  let apiType = 'file'
  let returnDirectly = false

  type infoType = {
    [key: string]: string
  }

  const classification_info: infoType = {
    freeway: '고속도로',
    intersection: '교차로',
    overpass: '고가도로',
    parkinglot: '주차장',
    runway: '일반도로',
  }

  const clustering_info: infoType = {
    forested: '산림화',
    desertified: '사막화',
  }

  switch (mode) {
    case 'anomaly':
      // log anomaly 예제는 log_req_ajx 에 json파일로 전송
      convertData = JSON.stringify({
        url: formUrl,
        log_data: value,
      })
      apiType = 'log'
      break

    case 'regression': // image/png로 전송하는 타입
      convertImage = await base64DataToFile(value, 'image', 'image/png')
      /* FormData에 전달받은 값을 입력 */
      convertData = new FormData()
      convertData.append('url', formUrl)
      convertData.append('file', convertImage)
      break

    default: // 기본적으로 이미지는 image/jpeg로 전송
      convertImage = await base64DataToFile(value, 'image', 'image/jpeg')
      /* FormData에 전달받은 값을 입력 */
      convertData = new FormData()
      convertData.append('url', formUrl)
      convertData.append('file', convertImage)
      break
  }

  setLoading(true)

  try {
    const json = await axiosRequest(convertData, apiType)
    if (json.res == 'true') {
      let response_data = json.response.data
      if (response_data == null) {
        response_data = json.response.inference
      }

      switch (mode) {
        /* CASE : 도로 위성 사진 분류 - Classification */
        case 'classification':
          resultData = classification_info[response_data]
          break

        /* CASE : 픽셀의 다중 스펙트럼 값을 이용한 이상탐지 - Anomaly */
        case 'anomaly':
          resultData =
            response_data === 'normal data' ? '정상 데이터' : '비정상 데이터'
          break

        /* CASE : 지표면 위성 사진 군집화 - Clustering */
        case 'clustering':
          resultData = clustering_info[response_data]
          break

        /* CASE : 허리케인 위성 사진 풍속 예측 - Regression  */
        case 'regression':
          resultData = response_data
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

export default satelliteProcessor
