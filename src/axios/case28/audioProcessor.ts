import axiosRequest from '@/axios/axiosRequest'
import base64DataToFile from '@/axios/base64DataToFile'
import { SetterOrUpdater } from 'recoil'

const audioProcessor = async (
  targetId: any,
  mode: 'classification' | 'anomaly' | 'clustering' | 'regression' | string,
  value: string | string[], // 사용자가 입력한 값 (input)
  formUrl: string, // 사용자가 입력한 API Url
  setLoading: SetterOrUpdater<boolean>, // 로딩 컴포넌트
  setAlert: SetterOrUpdater<{ visible: boolean; option: string }>, // 알림창 컴포넌트 상태관리
) => {
  const apiType = 'file'
  let convertData: File
  let resultData = ''
  let returnDirectly = false

  type infoType = {
    [key: string]: string
  }

  const audio_info: infoType = {
    Crackingfire: '불타는 소리',
    Cow: '소 울음소리',
    Sneezing: '재채기',
  }

  if (mode === 'regression') {
    // Audio regression 예제는 audio/midi 파일로 변환하여 전송
    convertData = await base64DataToFile(value, 'audio', 'audio/midi')
  } else {
    // 나머지 예제는 audio/wav 파일로 변환하여 전송
    convertData = await base64DataToFile(value, 'audio', 'audio/wav')
  }

  /* FormData에 전달받은 값을 입력 */
  const formData = new FormData()
  formData.append('url', formUrl)
  formData.append('file', convertData)
  formData.append('detail_id', targetId)

  setLoading(true)

  try {
    const json = await axiosRequest(formData, apiType)
    if (json.res == 'true') {
      let response_data = json.response.data
      if (response_data == null) {
        response_data = json.response.inference
      }

      switch (mode) {
        /* CASE : 음성단어분류 - Classification */
        case 'classification':
          resultData = response_data
          break

        /* CASE : 피아노 악보 생성 - Regression  */
        case 'regression':
          resultData = `data:audio/midi;base64,${response_data}`
          returnDirectly = true
          break

        /* CASE : 산업 기계 소리 이상탐지 - Anomaly */
        case 'anomaly':
          resultData = response_data === 'normal' ? '정상' : '비정상'
          break

        /* CASE : 환경 소리 군집화 - Clustering */
        case 'clustering':
          resultData = audio_info[response_data]
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
  if (returnDirectly) {
    return resultData
  }

  return { label: resultData }
}

export default audioProcessor
