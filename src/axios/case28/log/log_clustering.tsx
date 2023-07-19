/* 포켓몬 스탯에 따른 군집화 - log 군집화 */
import axios from 'axios'

const logClustering = (
  value: any, // 사용자가 입력한 값 (string or base64)
  formUrl: any, // 사용자가 입력한 api Url
  setLoading: any, // 로딩
  // setResult: any,    // 결과 컴포넌트
) => {
  const class_info: any = {
    'physical good, magical bad': '물리 능력치 양호',
    'magical good, physical bad': '특수 능력치 양호',
    'physical good, magical good': '모든 능력치 양호',
    'physical bad, magical bad': '모든 능력치 부족',
  }

  const axiosUrl = '/inference/log_req_ajx' // 고정값
  /* FormData (apiUrl, data) 형태로 전송 */
  const formData = new FormData()
  formData.append('url', formUrl)
  formData.append('word', value) // 사용자가 전송할 값이 [문자열] 형태일 때

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
      /* response_data에 결과값 반환 */
      let json = res.data
      if (json.res == 'true') {
        let response_data = json.response.data
        if (response_data == null) {
          response_data = json.response.inference
        }
        /* 결과값에 따라 결과 컴포넌트 렌더링 */
        response_data = class_info[response_data]
        // 결과 컴포넌트
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

export default logClustering
