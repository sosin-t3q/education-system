/* 셰익스피어 저작 텍스트 생성 - 텍스트 회귀 */
import axiosInstance from '@/services/axiosInstance'

const textRegression = async (
  value: any, // 사용자가 입력한 값 (string or base64)
  formUrl: any, // 사용자가 입력한 api Url
  setLoading: any, // 로딩
  setAlert: any,
  // setResult: any,    // 결과 컴포넌트
) => {
  const axiosUrl = '/api/inference/text_req_ajx' // 고정값
  // axiosUrl 이 text 또는 log일 때는 JSON.stringify 형태로 전송
  const jsonData = JSON.stringify({
    word: value,
    url: formUrl,
  })
  let resultData = ''

  setLoading(true) // 로딩 표시

  /* axios 비동기 통신 함수 */
  try {
    const res = await axiosInstance.post(axiosUrl, jsonData, {
      headers: {
        'Content-Type': 'application/json',
      },

      responseType: 'json', //서버로부터 들어오는 응답값은 JSON 형식
    })
    /* response_data에 결과값 반환 */
    let json = res.data
    let response_data = json.response.data
    if (response_data == null) {
      response_data = json.response.inference
    }
    /* 결과값에 따라 결과 컴포넌트 렌더링 */
    response_data = response_data[0].replaceAll('\n', '<br>')
    if (json.res == 'true') {
      // 생성된 텍스트 결과
      resultData = response_data
    }
  } catch (err) {
    setAlert({ visible: true, option: 1 })
    return
  } finally {
    setLoading(false)
  }
  return resultData
}

export default textRegression
