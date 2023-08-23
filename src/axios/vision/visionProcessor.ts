import axiosRequest from '@/axios/axiosRequest'
import { CancelTokenSource } from 'axios'
import base64DataToFile from '@/axios/base64DataToFile'
import { SetterOrUpdater } from 'recoil'

const visionProcessor = async (
  targetId: number,
  value: string | string[], // 사용자가 입력한 값 (input)
  formUrl: string, // 사용자가 입력한 API Url
  setLoading: SetterOrUpdater<boolean>, // 로딩 컴포넌트
  setAlert: SetterOrUpdater<{ visible: boolean; option: string }>, // 알림창 컴포넌트 상태관리
  source: CancelTokenSource, // axios cancelToken 추가
) => {
  const apiType = 'file'
  let convertData: File
  let resultData = ''
  let returnAround = false

  type infoType = {
    [key: string]: string
  }

  const return_parse: infoType = {
    '0.Mentah': '풋바나나',
    '1.Setengah-mentah': '덜 익은 바나나',
    '3.Matang': '잘 익은 바나나',
    '4.Terlalu-matang': '많이 익은 바나나',
  }

  // eslint-disable-next-line no-constant-condition
  if (
    targetId === 121 ||
    targetId === 123 ||
    targetId === 124 ||
    targetId === 125 ||
    targetId === 126
  ) {
    // image/png 파일로 변환하여 전송
    convertData = await base64DataToFile(value, 'image', 'image/png')
  } else {
    // 나머지 예제는 image/jpeg 파일로 변환하여 전송
    convertData = await base64DataToFile(value, 'image', 'image/jpeg')
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

      switch (targetId) {
        /* CASE : 118 */
        case 118:
          resultData = return_parse[response_data]
          /* returnAround true이면 { label: resultData }를 바로 return 한다 */
          returnAround = true
          break

        /* CASE : 121 */
        case 121:
          resultData = response_data
          /* returnAround true이면 { label: resultData }를 바로 return 한다 */
          returnAround = true
          break

        /* CASE : 122 */
        case 122:
          resultData = response_data
          /* returnAround true이면 { label: resultData }를 바로 return 한다 */
          returnAround = true
          break

        /* CASE : 123 || 124 || 125 || 126 */
        case 123 || 124 || 125 || 126:
          resultData = `data:image/jpg;base64,${response_data}`
          break

        default:
          resultData = `data:image/jpg;base64,${response_data}`
          break
      }
    }
  } catch (err) {
    setAlert({ visible: true, option: 'axiosError' })

    return
  } finally {
    setLoading(false)
  }
  if (returnAround) {
    return { label: resultData }
  }

  return resultData
}

export default visionProcessor
