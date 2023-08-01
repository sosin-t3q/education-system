/* 얼굴 키포인트가 있는 데이터 군집화 - 영상 군집화 */
/* 수정 필요 */
/* 수정 필요 */
/* 수정 필요 */
/* 수정 필요 */
/* 수정 필요 */
/* 수정 필요 */
import axios from 'axios'
import base64DataToFile from '../../base64DataToFile'

const videoClustering = async (
  value: any, // 사용자가 입력한 값 (string or base64)
  formUrl: any, // 사용자가 입력한 api Url
  setLoading: any, // 로딩
  // setResult: any, // 결과 컴포넌트
) => {
  const axiosUrl = 'http://aihunmin-edu.t3q.ai:8181/api/inference/file_req_ajx' // 고정값
  const convertData = await base64DataToFile(value, 'gifImage', 'image/gif')
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
      let response_image = json.response.all_cluster_image
      // let response_data = json.response.inference_cluster
      // console.log(response_data)
      resultData = 'data:image/jpeg;base64,' + response_image

      // $('#resImgSrc').attr('src', 'data:image/jpg;base64,' + response_image)
      // $('div.inner_next').addClass('show_img')
      // $('div.inner_next').css({ 'align-items': 'baseline' })
      // const counts = response_data.reduce((pv, cv) => {
      //   pv[cv] = (pv[cv] || 0) + 1
      //   return pv
      // }, {})
      // const keys = Object.keys(counts)
      // let mode = keys[0]
      // // keys.forEach((val, idx) => {
      //   if (counts[val] > counts[mode]) {
      //     mode = val
      //   }
      // })
      // $('.result_alert').html(mode)
      // $('.result_alert').css({ top: '85%' })
      // $('.inner_next').addClass('show_alert_pass')
    }
  } catch (err) {
    alert('API 호출에 실패했습니다.')
    return
  } finally {
    setLoading(false)
  }
  return resultData
}

export default videoClustering
