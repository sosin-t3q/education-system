/* Style Transfer - 이미지 회귀 */
import axios from 'axios'
import { detailDataAtom, loadingAtom } from '@/atoms'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import base64DataToFile from '../../base64DataToFile'
// import { Keyword } from '@/components'

const detailData = useRecoilValue<any>(detailDataAtom)
const setLoading = useSetRecoilState(loadingAtom)

const imageRegression = () => {
  // 이미지 이름이랑, 밈타입 알아야할듯?
  let data = {
    file: base64DataToFile(detailData, '이미지이름', 'image/jpeg'),
    url: 'http://dl.idro3vub.aica.t3q.ai/model/api/0335c/inference',
  }

  // let content_result = 'None'

  setLoading(true)

  axios
    .post('/inference/file_req_ajx', data, {
      // processData, contentType, dataType은 Axios에서 사용되지 않는 속성이다
      //HTTP 요청에서 전송하는 데이터의 형식은 JSON 형식
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      //서버로부터 들어오는 응답값은 JSON 형식
      responseType: 'json',
    })
    .then(res => {
      let json = res.data
      if (json.res == 'true') {
        let response_data = json.response.data
        if (response_data == null) {
          response_data = json.response.inference
        }
        // content_result = 'data:image/jpg;base64,' + response_data
        // let content_curriculum = json.response.inference_curriculum
        // $("#resImgSrc").attr("src", "data:image/jpg;base64," + content_curriculum);
        // $("div.inner_next").addClass("show_img");
      } else {
        console.log(json)
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

export default imageRegression
