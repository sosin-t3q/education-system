import base64DataToFile from '@/axios/base64DataToFile'
import axiosRequest from '@/axios/case28/axiosRequest'
import { SetterOrUpdater } from 'recoil'

const binaryProcessor = async (
  mode: 'classification' | 'anomaly' | 'clustering' | 'regression' | string,
  value: string, // 사용자가 입력한 값 (input)
  formUrl: string, // 사용자가 입력한 API Url
  setLoading: SetterOrUpdater<boolean>, // 로딩 컴포넌트
) => {
  let convertData: string | FormData
  let apiType = 'file'
  let resultData = ''
  let returnDirectly = false

  if (mode === 'regression') {
    // binary regression 예제는 log_req_ajx 에 json파일로 전송
    convertData = JSON.stringify({
      url: formUrl,
      log_data: value,
    })
    apiType = 'log'
  } else {
    // 나머지 예제는 image/png 파일로 변환하여 전송
    const convertImage = await base64DataToFile(value, 'image', 'image/png')
    /* FormData에 전달받은 값을 입력 */
    convertData = new FormData()
    convertData.append('url', formUrl)
    convertData.append('file', convertImage)
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
        /* CASE : 악성코드 분류 - Classification */
        /* CASE : 악성코드 이상탐지 - Anomaly */
        /* CASE : 악성코드 군집화 - Clustering */
        case 'classification' || 'anomaly' || 'clustering':
          resultData = response_data === 'benign' ? '정상' : '악성'
          break

        /* CASE : 악성코드 감염 예측 - Regression  */
        case 'regression':
          resultData = `${response_data * 100}%`
          returnDirectly = true
          break

        default:
          break
      }
    }
  } catch (err) {
    alert('API 호출에 실패하였습니다.')

    return
  } finally {
    setLoading(false)
  }
  if (returnDirectly) {
    return resultData
  }

  return { label: resultData }
}

export default binaryProcessor
