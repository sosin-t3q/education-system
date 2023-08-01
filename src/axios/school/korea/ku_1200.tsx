/* 고려대학교 - 버스 승객 이상행동 감지 1200 */

import axios from 'axios'

const ku1200 = async (
  value: any, // 사용자가 입력한 값 (text or base64)
  formUrl: any, // 사용자가 입력한 api Url
  setLoading: any, // 로딩
  // setResult: any,    // 결과 컴포넌트
) => {
  const axiosUrl = 'http://aihunmin-edu.t3q.ai:8181/api/inference/text_req_ajx' // 고정값
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
    let json = res.data
    if (json.res == 'true') {
      let response_data = json.response.data
      if (response_data == null) {
        response_data = json.response.inference
      }
      /* 결과값에 따라 결과 컴포넌트 렌더링 */

      let response_arr = []
      let response_rlt = []

      if (response_data == 'There is no data') {
        response_arr.push('해당 단어를 찾을 수 없습니다.')
      } else if (
        response_data[0]['negative'] > response_data[0]['neutral'] &&
        response_data[0]['negative'] > response_data[0]['postive']
      ) {
        response_arr.push('부정')
      } else if (response_data[0]['neutral'] > response_data[0]['postive']) {
        response_arr.push('중립')
      } else {
        response_arr.push('긍정')
      }

      for (var i = 1; i < 6; i++) {
        response_arr.push(response_data[i][0])
      }

      if (json.res == 'true') {
        if (response_arr[0] == '해당 단어를 찾을 수 없습니다.') {
          resultData = response_arr[0]
        } else if (response_arr[0] != '해당 단어를 찾을 수 없습니다.') {
          for (var i = 1; i < response_arr.length; i++) {
            response_rlt.push(' ' + response_arr[i])
          }
          resultData =
            '이 단어는 ' +
            response_arr[0] +
            '적인 단어입니다. <br>연관어로는 ' +
            response_rlt +
            '이(가) 있습니다.'
        }
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

export default ku1200
