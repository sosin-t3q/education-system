/* 비디오 행동 분류 - 영상 분류 */
import axios from 'axios'
import base64DataToFile from '../../base64DataToFile'

const videoClassification = async (
  value: any, // 사용자가 입력한 값 (string or base64)
  formUrl: any, // 사용자가 입력한 api Url
  setLoading: any, // 로딩
  // setResult: any, // 결과 컴포넌트
) => {
  const video_info: Record<string, string> = {
    CricketShot: '크리켓 슛',
    PlayingCello: '첼로 연주',
    Punch: '펀치',
    ShavingBeard: '면도',
    TennisSwing: '테니스 스윙',
  }
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
      console.log(response_data)

      const result = findMaxValueKey(response_data)
      resultData = video_info[result] // 결과값 반환
    }
  } catch (err) {
    alert('API 호출에 실패했습니다.')
    return
  } finally {
    setLoading(false)
  }
  return { label: resultData }
}

const findMaxValueKey = (data: Record<string, number>[]): string => {
  let maxKey = ''
  let maxValue = -Infinity

  for (const item of data) {
    const key = Object.keys(item)[0]
    const value = Object.values(item)[0]

    if (value > maxValue) {
      maxKey = key
      maxValue = value
    }
  }

  return maxKey
}
