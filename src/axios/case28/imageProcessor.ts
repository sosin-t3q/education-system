import axiosRequest from '@/axios/axiosRequest'
import base64DataToFile from '@/axios/base64DataToFile'
import { CancelTokenSource } from 'axios'
import { SetterOrUpdater } from 'recoil'

const imageProcessor = async (
  targetId: any,
  mode: 'classification' | 'anomaly' | 'clustering' | 'regression' | string,
  value: string | string[], // 사용자가 입력한 값 (input)
  formUrl: string, // 사용자가 입력한 API Url
  setLoading: SetterOrUpdater<boolean>, // 로딩 컴포넌트
  setAlert: SetterOrUpdater<{ visible: boolean; option: string }>, // 알림창 컴포넌트 상태관리
  source: CancelTokenSource, // axios cancelToken 추가
) => {
  let resultData = ''
  let returnDirectly = false
  let apiType = 'file'
  let convertData: File
  const typeCheck = typeof value

  type infoType = {
    [key: string]: string
  }

  const classification_info: infoType = {
    ant: '개미',
    apple: '사과',
    bus: '버스',
    butterfly: '나비',
    cup: '컵',
    envelope: '봉투',
    fish: '물고기',
    giraffe: '기린',
    lightbulb: '전구',
    pig: '돼지',
  }

  const clustering_info: infoType = {
    'perm hair': '웨이브 머리', // 띄어쓰기를 위해 문자열로 작성
    'straight hair': '직모',
    sunglasses: '선글라스',
  }

  // eslint-disable-next-line no-constant-condition
  if (mode === 'anomaly' || mode === 'regression') {
    // Image anomaly, regression 예제는 image/jpeg 파일로 변환하여 전송
    convertData = await base64DataToFile(value, 'image', 'image/jpeg')
  } else if (mode === 'classification') {
    if (typeCheck == 'object') {
      apiType = 'canvas'
      convertData = await base64DataToFile(value[1], 'image', 'image/png')
    } else {
      convertData = await base64DataToFile(value, 'image', 'image/jpeg')
    }
  } else {
    // 나머지 예제는 image/png 파일로 변환하여 전송
    convertData = await base64DataToFile(value, 'image', 'image/png')
  }

  /* FormData에 전달받은 값을 입력 */
  const formData = new FormData()
  formData.append('url', formUrl)
  formData.append('file', convertData)
  formData.append('detail_id', targetId)

  setLoading(true)

  try {
    const json = await axiosRequest(formData, apiType, source)

    if (json.res == 'true') {
      let response_data = json.response.data
      if (response_data == null) {
        response_data = json.response.inference
      }

      switch (mode) {
        /* CASE : 손그림 이미지 분류 - Classification */
        case 'classification':
          response_data = classification_info[response_data]
          resultData = response_data
          break

        /* CASE : Style Transfer - Regression  */
        case 'regression':
          /* response_data => 이미지 base64 src */
          resultData = `data:image/gif;base64,${response_data}`
          /* returnDirectly가 true이면 resultData를 바로 return 한다 */
          returnDirectly = true
          break

        /* CASE : 노후 시설물 이미지를 이용한 이상탐지 - Anomaly */
        case 'anomaly':
          resultData = response_data == 'original' ? '정상 블록' : '파손 블록'
          break

        /* CASE : 환경 소리 군집화 - Clustering */
        case 'clustering':
          resultData = clustering_info[response_data]
          break

        default:
          resultData = '작동안됨'
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

export default imageProcessor
