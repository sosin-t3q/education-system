/* Style Transfer - 이미지 회귀 */
import axios from 'axios'
import base64DataToFile from '../../base64DataToFile'

const imageRegression = async (
  value: any, // 사용자가 입력한 값 (string or base64)
  formUrl: any, // 사용자가 입력한 api Url
  setLoading: any, // 로딩
  // setResult: any,    // 결과 컴포넌트
) => {
  const axiosUrl = 'api/inference/file_req_ajx' // 고정값
  const convertData = await base64DataToFile(value, 'image', 'image/jpeg')
  /* FormData (apiUrl, data) 형태로 전송 */
  const formData = new FormData()
  formData.append('url', formUrl)
  formData.append('file', convertData) // 사용자가 전송할 값이 [문자열] 형태일 때

  let resultData = ''
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
      let json = res.data
      if (json.res == 'true') {
        let response_data = json.response.data
        if (response_data == null) {
          response_data = json.response.inference
        }
        /* 결과값에 따라 결과 컴포넌트 렌더링 */
        /* response_data => 이미지 base64 src */
        const content_result = 'data:image/jpg;base64,' + response_data
        // const content_curriculum = json.response.inference_curriculum
        // $("#resImgSrc").attr("src", "data:image/jpg;base64," + content_curriculum);
        // $("div.inner_next").addClass("show_img");
        resultData = content_result
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
  return resultData
}

export default imageRegression
