/* 손그림 이미지 분류 - 이미지 분류 */
import axios from 'axios'
import base64DataToFile from '../../base64DataToFile'

const imageClassification = async (
  value: any, // 사용자가 입력한 값 (string or base64)
  formUrl: any, // 사용자가 입력한 api Url
  setLoading: any, // 로딩
  // setResult: any,    // 결과 컴포넌트
) => {
  const class_info: any = {
    ant: '개미',
    apple: '사과',
    bus: '버스',
    butterfly: '나비',
    cup: '컵',
    envelope: '봉투',
    fish: '물고기',
    giraffe: '기린',
    lightbulb: '전구',
    pig: '돼지',
  }

  const axiosUrl = 'http://aihunmin-edu.t3q.ai/api/inference/file_req_ajx' // 고정값
  const convertData = await base64DataToFile(value, 'image', 'image/png')
  /* FormData (apiUrl, data) 형태로 전송 */
  const formData = new FormData()
  formData.append('url', formUrl)
  formData.append('file', convertData) // 사용자가 전송할 값이 [문자열] 형태일 때

  let resultData = ''
  console.log(formData)
  setLoading(true) // 로딩 표시

  /* axios 비동기 통신 함수 */
  try {
    const res = await axios.post(axiosUrl, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      responseType: 'json',
    })

    let json = res.data
    if (json.res === 'true') {
      let response_data = json.response.data
      if (response_data == null) {
        response_data = json.response.inference
      }
      /* 결과값에 따라 결과 컴포넌트 렌더링 */
      response_data = class_info[response_data]
      resultData = response_data
      // 결과 컴포넌트 자리
    }
  } catch (err) {
    alert('API 호출에 실패했습니다.')
  } finally {
    setLoading(false)
  }

  return { label: resultData }
}

export default imageClassification
