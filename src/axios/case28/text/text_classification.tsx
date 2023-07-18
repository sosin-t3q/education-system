/* 영화 리뷰 텍스트 감정 분석 - 텍스트 분류 */
/* 이 예제에서 사용자는 text 파일을 선택하거나, 직접 입력할 수 있다 */

/* 
수정이 필요한 부분

1. props로 formUrl을 Detailform에서 받아와야 한다. (추론하기를 눌렀을 때 담긴 url로)
-> 사용자가 수정할 수 있기 때문

2. props 타입 수정
*/
import axios from 'axios'

const textClassification = (
  value: any,
  setLoading: any,
  // setResult: any,
  // formUrl: any,
) => {
  setLoading(true) // Loading 컴포넌트 표시
  const formUrl = 'http://dl.idro3vub.aica.t3q.ai/model/api/28c4c/inference' // props로 받아야됨
  const axiosUrl = '/inference/text_req_ajx' // 고정값

  const formData = new FormData()
  formData.append('url', formUrl)

  // 문자열로 반환
  formData.append('word', value)

  // 파일로 반환
  //  formData.append("file", value);

  axios
    .post(axiosUrl, formData, {
      headers: {
        'content-type': 'multipart/form-data',
      },
      responseType: 'json',
    }) // Timeout in axios is in ms, so 60000 ms is equal to 600 s
    .then(res => {
      /* ********* 고정값 ********* */
      let json = res.data
      if (json.res == 'true') {
        let response_data = json.response.data
        if (response_data == null) {
          response_data = json.response.inference
        }
        /* ********* 고정값 ********* */
        if (response_data == 'pos') {
          setResult('pos')
          // 긍정 결과 컴포넌트
          // props로
          // $('div.wrap_next').addClass('show_alert_pass')
        } else {
          // 부정 결과 컴포넌트
          // $('div.wrap_next').addClass('show_alert_nonpass')
        }
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

export default textClassification
