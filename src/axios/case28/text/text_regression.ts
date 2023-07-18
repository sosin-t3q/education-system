/* 셰익스피어 저작 텍스트 생성 - 텍스트 회귀 */
import axios from 'axios'

const textRegression = (
  value: any, // 사용자가 입력한 값 (string or base64)
  formUrl: any, // 사용자가 입력한 api Url
  setLoading: any, // 로딩
  // setResult: any,    // 결과 컴포넌트
) => {
  const axiosUrl = '/inference/text_req_ajx' // 고정값
  /* FormData (apiUrl, data) 형태로 전송 */
  const formData = new FormData()
  formData.append('url', formUrl)
  formData.append('word', value) // 사용자가 전송할 값이 [문자열] 형태일 때
  //  formData.append("file", value);   // 사용자가 전송할 값이 [파일] 형태일 때

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
      let response_data = json.response.data
      if (response_data == null) {
        response_data = json.response.inference
      }
      /* 결과값에 따라 결과 컴포넌트 렌더링 */
      response_data = response_data[0].replaceAll('\n', '<br>')
      if (json.res == 'true') {
        // 생성된 텍스트 결과를 보여준다
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

export default textRegression
