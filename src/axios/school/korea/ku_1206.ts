import axiosInstance from '@/services/axiosInstance'

const ku1206 = async (
  value: any, // 사용자가 입력한 값 (text or base64)
  formUrl: any, // 사용자가 입력한 api Url
  setLoading: any, // 로딩
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
    const json = res.data
    if (json.res == 'true') {
      let response_data = json.response.data
      if (response_data == null) {
        response_data = json.response.inference
      }
      console.log('response_data =', response_data)
      console.log(formUrl)
      console.log('test')
      // /* 결과값에 따라 결과 컴포넌트 렌더링 */
      // if (response_data == 'pos') {
      //   resultData = '긍정'
      //   // 긍정 결과 컴포넌트
      // } else {
      //   resultData = '부정'
      //   // 부정 결과 컴포넌트
      // }
    }
  } catch (err) {
    alert('API 호출에 실패했습니다.')
    return
  } finally {
    setLoading(false)
  }
  return { label: resultData }
}

export default ku1206
