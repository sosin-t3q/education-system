/* 고려대학교 - 가구 상세 분류 1203 */
import axios from 'axios'
import base64DataToFile from '../../base64DataToFile'

const ku1203 = async (
  value: any, // 사용자가 입력한 값 (string or base64)
  formUrl: any, // 사용자가 입력한 api Url
  setLoading: any, // 로딩
  // setResult: any,    // 결과 컴포넌트
) => {
  let chair_leg: any = [
    '문어형 다리',
    '일자형 다리',
    '스툴형 다리',
    '흔들의자형 다리',
    '다리 없음',
    '바형 다리',
  ]
  const axiosUrl = 'http://aihunmin-edu.t3q.ai:8181/api/inference/file_req_ajx' // 고정값
  const convertData = await base64DataToFile(value, 'image', 'image/png')
  /* FormData (apiUrl, data) 형태로 전송 */
  const formData = new FormData()
  formData.append('url', formUrl)
  formData.append('file', convertData)
  let resultData = ''

  setLoading(true) // 로딩 표시

  /* axios 비동기 통신 함수 */
  try {
    const res = await axios.post(axiosUrl, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      responseType: 'json', //서버로부터 들어오는 응답값은 JSON 형식
    })
    let json = res.data
    if (json.res == 'true') {
      let response_data = json.response.data
      if (response_data == null) {
        response_data = json.response.inference
      }
      /* 결과값에 따라 결과 컴포넌트 렌더링 */
      let response_arr = []
      let response_rlt = []
      if (response_data[0]['대분류'] == 0) {
        response_arr.push('침대')
        for (var i = 1; i < Object.entries(response_data[0]).length; i++) {
          if (Object.entries(response_data[0])[i][1] != 0) {
            response_rlt.push(' ' + Object.entries(response_data[0])[i][0])
          }
        }
      } else if (response_data[0]['대분류'] == 1) {
        response_arr.push('의자')
        for (var i = 2; i < Object.entries(response_data[0]).length; i++) {
          if (Object.entries(response_data[0])[i][1] == 0) {
            response_rlt.push(' ' + Object.entries(response_data[0])[i][0])
          }
        }
        let resultIndex: any = Object.entries(response_data[0])[0][1]
        response_rlt.push(' ' + chair_leg[resultIndex])
      }

      if (json.res == 'true') {
        resultData =
          '이 이미지는 ' +
          response_arr +
          '입니다. <br> 속성으로는 ' +
          response_rlt +
          '이(가) 있습니다.'
      }
    }
  } catch (err) {
    alert('API 호출에 실패했습니다.')
    return
  } finally {
    setLoading(false)
  }
  return { label: resultData }
}

export default ku1203
