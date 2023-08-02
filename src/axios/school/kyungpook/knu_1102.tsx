/* 경북대학교 - 버스 승객 이상행동 감지 1102 */
import axios from 'axios'
import base64DataToFile from '../../base64DataToFile'

const knu1102 = async (
  value: any, // 사용자가 입력한 값 (string or base64)
  formUrl: any, // 사용자가 입력한 api Url
  setLoading: any, // 로딩
  // setResult: any,    // 결과 컴포넌트
) => {
  const axiosUrl = 'http://aihunmin-edu.t3q.ai:8181/api/inference/file_req_ajx' // 고정값
  const convertData = await base64DataToFile(value, 'video', 'video/mp4')
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
      /* response_data => 비디오 base64 src */
      resultData = 'data:video/mp4;base64,' + response_data // 결과 이미지 src 문자열 반환
    }
  } catch (err) {
    alert('API 호출에 실패했습니다.')
  } finally {
    setLoading(false)
  }
  return resultData
}

export default knu1102
