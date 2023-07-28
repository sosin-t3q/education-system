/* NBA 선수 포지션 분류 - log 분류 */
import axios from 'axios'

const logClassification = (
  value: any, // 사용자가 입력한 값 (string or base64)
  formUrl: any, // 사용자가 입력한 api Url
  setLoading: any, // 로딩
  // setResult: any,    // 결과 컴포넌트
) => {
  const class_info: any = { Center: '센터', Guard: '가드', Forward: '포워드' }
  const axiosUrl = 'api/inference/log_req_ajx' // 고정값
  // axiosUrl 이 text 또는 log일 때는 JSON.stringify 형태로 전송
  const jsonData = JSON.stringify({
    url: formUrl,
    log_data: value,
  })

  let resultData = ''

  setLoading(true) // 로딩 표시

  /* axios 비동기 통신 함수 */
  axios
    .post(axiosUrl, jsonData, {
      headers: {
        'Content-Type': 'application/json',
      },
      //서버로부터 들어오는 응답값은 JSON 형식
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
        /* '센터', '가드', '포워드'가 반환됨 */
        // 결과 컴포넌트 자리
        resultData = response_data
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
  return { label: resultData }
}

export default logClassification
