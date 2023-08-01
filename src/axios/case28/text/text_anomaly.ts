/* 스팸메일 이상탐지 - 텍스트 이상탐지 */
import axios from 'axios'

const textAnomaly = async (
  value: any, // 사용자가 입력한 값 (string or base64)
  formUrl: any, // 사용자가 입력한 api Url
  setLoading: any, // 로딩
  // setResult: any,    // 결과 컴포넌트
) => {
  const axiosUrl = 'http://aihunmin-edu.t3q.ai/api/inference/text_req_ajx' // 고정값
  // axiosUrl 이 text 또는 log일 때는 JSON.stringify 형태로 전송
  const jsonData = JSON.stringify({
    word: value,
    url: formUrl,
  })
  let resultData = ''

  setLoading(true) // 로딩 표시

  /* axios 비동기 통신 함수 */
  try {
    const res = await axios.post(axiosUrl, jsonData, {
      headers: {
        'Content-Type': 'application/json',
      },
      responseType: 'json', //서버로부터 들어오는 응답값은 JSON 형식
    })
    /* response_data에 결과값 반환 */
    let json = res.data
    if (json.res == 'true') {
      let response_data = json.response.data
      if (response_data == null) {
        response_data = json.response.inference
      }
      /* 결과값에 따라 결과 컴포넌트 렌더링 */
      if (response_data == 'ham') {
        resultData = 'HAM'
        // HAM 카드 컴포넌트
      } else {
        resultData = 'SPAM'
        // SPAM 카드 컴포넌트
      }
    }
  } catch (err) {
    alert('API 호출에 실패했습니다.')
  } finally {
    setLoading(false)
  }
  return { label: resultData }
}

export default textAnomaly
