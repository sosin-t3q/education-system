/* 지표면 위성 사진 군집화 - 위성 군집화 */
import axios from 'axios'
import base64DataToFile from '../../base64DataToFile'

const satelliteClustering = async (
  value: any, // 사용자가 입력한 값 (string or base64)
  formUrl: any, // 사용자가 입력한 api Url
  setLoading: any, // 로딩
  // setResult: any,    // 결과 컴포넌트
) => {
  const class_info: any = { forested: '산림화', desertified: '사막화' }

  const axiosUrl = '/inference/file_req_ajx' // 고정값
  const convertData = await base64DataToFile(value, 'image', 'image/png')
  /* FormData (apiUrl, data) 형태로 전송 */
  const formData = new FormData()
  formData.append('url', formUrl)
  formData.append('file', convertData) // 사용자가 전송할 값이 [문자열] 형태일 때

  setLoading(true) // 로딩 표시
  /* axios 비동기 통신 함수 */
  axios
    .post(axiosUrl, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      responseType: 'json',
    })
    .then(res => {
      let json = res.data
      if (json.res == 'true') {
        let response_data = json.response.data
        if (response_data == null) {
          response_data = json.response.inference
        }
        /* 결과값에 따라 결과 컴포넌트 렌더링 */
        response_data = class_info[response_data]
        // 결과 컴포넌트 자리
      } else {
        alert('API 호출에 실패했습니다.')
      }
    })
    .catch(err => {
      console.log(err.message)
    })
    .finally(() => {
      setLoading(false)
    })
}

export default satelliteClustering
