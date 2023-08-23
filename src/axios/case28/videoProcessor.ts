import axiosRequest from '@/axios/axiosRequest'
import base64DataToFile from '@/axios/base64DataToFile'
import { videoBase64toFile } from '@/axios'
import { CancelTokenSource, CanceledError } from 'axios'
import { SetterOrUpdater } from 'recoil'

const videoProcessor = async (
  targetId: any,
  mode: 'classification' | 'anomaly' | 'clustering' | 'regression' | string,
  value: string | string[], // 사용자가 입력한 값 (input)
  formUrl: string, // 사용자가 입력한 API Url
  setLoading: SetterOrUpdater<boolean>, // 로딩 컴포넌트
  setAlert: SetterOrUpdater<{ visible: boolean; option: string }>, // 알림창 컴포넌트 상태관리
  source: CancelTokenSource, // axios cancelToken 추가
) => {
  const apiType = 'file'
  let convertData: File
  let resultData = ''
  let extraData = ''
  let returnDirectly = false

  type infoType = {
    [key: string]: string
  }

  const classification_info: infoType = {
    CricketShot: '크리켓 슛',
    PlayingCello: '첼로 연주',
    Punch: '펀치',
    ShavingBeard: '면도',
    TennisSwing: '테니스 스윙',
  }

  // eslint-disable-next-line no-constant-condition
  if (mode === 'classification') {
    // video classification 예제는 image/jpeg 파일로 변환하여 전송
    convertData = await videoBase64toFile(value as string, 'video', 'video/mp4')
  } else {
    // 나머지 예제는 image/gif 파일로 변환하여 전송
    convertData = await base64DataToFile(value, 'gifImage', 'image/gif')
  }

  const findMaxValueKey = (data: Record<string, number>[]): string => {
    let maxKey = ''
    let maxValue = -Infinity

    for (const item of data) {
      const key = Object.keys(item)[0]
      const value = Object.values(item)[0]

      if (value > maxValue) {
        maxKey = key
        maxValue = value
      }
    }

    return maxKey
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
        /* CASE : 비디오 행동 분류 - Classification */
        case 'classification':
          extraData = findMaxValueKey(response_data)
          resultData = classification_info[extraData]
          break

        /* CASE : 비디오의 다음 프레임 예측 - Regression  */
        case 'regression':
          /* response_data => 이미지 base64 src */
          resultData = `data:image/jpg;base64,${response_data}`
          /* returnDirectly가 true이면 resultData를 바로 return 한다 */
          returnDirectly = true
          break

        /* CASE : 보행자 도로 위 이상행동 탐지 - Anomaly */
        case 'anomaly':
          resultData = response_data == 'normal' ? '정상' : '비정상'
          break

        /* CASE : 얼굴 키포인트가 있는 데이터 군집화 - Clustering */
        case 'clustering':
          {
            const response_image = json.response.all_cluster_image
            const dataImage = `data:image/jpeg;base64,${response_image}`
            const dataNum = response_data
            resultData = `${dataImage} and ${dataNum}`
            returnDirectly = true
          }
          break

        default:
          break
      }
    }
  } catch (err) {
    if (CanceledError) {
      // console.error('Axios request error:', err)
      // eslint-disable-next-line no-console
      console.log('페이지를 벗어나 통신이 중단되었습니다.')

      return
    }
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

export default videoProcessor
