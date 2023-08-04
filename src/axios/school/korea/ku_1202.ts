/* 고려대학교 - 사용자 맞춤 알약 검색 시스템 1202 */
import base64DataToFile from '../../base64DataToFile'
import axiosInstance from '@/services/axiosInstance'

const ku1202 = async (
  value: any, // 사용자가 입력한 값 (string or base64)
  formUrl: any, // 사용자가 입력한 api Url
  setLoading: any, // 로딩
  // setResult: any,    // 결과 컴포넌트
) => {
  const axiosUrl = '/api/inference/files_req_ajx' // 고정값

  /* image가 2장이 들어옴 */
  const imageA = value[0] // 배열에 담긴 첫번째 이미지
  const imageB = value[1] // 배열에 담긴 두번째 이미지
  const convertDataA = await base64DataToFile(imageA, 'image', 'image/jpeg')
  const convertDataB = await base64DataToFile(imageB, 'image', 'image/jpeg')
  /* FormData (apiUrl, data) 형태로 전송 */
  const formData = new FormData()
  formData.append('url', formUrl)
  formData.append('files', convertDataA)
  formData.append('files', convertDataB)

  let resultData = ''
  let resultValue: any = ''

  setLoading(true) // 로딩 표시

  /* axios 비동기 통신 함수 */
  try {
    const res = await axiosInstance.post(axiosUrl, formData, {
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
      let res_score = []
      for (var data_for in response_data[0]) {
        res_score.push(response_data[0][data_for]['SCORE'])
      }
      let res_max_data = Math.max.apply(null, res_score)
      for (var data_for in response_data[0]) {
        if (response_data[0][data_for]['SCORE'] == res_max_data) {
          resultValue = response_data[0][data_for]
        }
      }
      if (json.res == 'true') {
        resultData =
          '알약명 : ' +
          resultValue['NAME'] +
          '<br>' +
          '색 : ' +
          resultValue['COLOR'] +
          '<br>'
        '효능 : 1.' +
          resultValue['EFFECT'].split('1.')[1] +
          '<br>' +
          '모양 : ' +
          resultValue['MY'] +
          '<br>' +
          '용법 : ' +
          resultValue['USAGE'] +
          '<br>'
      }
    }
  } catch (err) {
    alert('API 호출에 실패했습니다.')
  } finally {
    setLoading(false)
  }
  return resultData
}

export default ku1202
