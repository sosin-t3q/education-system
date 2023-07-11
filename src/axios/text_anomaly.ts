/* 스팸메일 이상탐지 - 텍스트 이상탐지 */
import axios from 'axios'
import { detailDataAtom, loadingAtom, resultAtom } from '@/atoms'
import { useRecoilValue, useSetRecoilState } from 'recoil'

const detailData = useRecoilValue<string | null>(detailDataAtom)
const setLoading = useSetRecoilState(loadingAtom)
const setResult = useSetRecoilState(resultAtom)

let data = JSON.stringify({
  word: detailData,
  url: 'http://dl.idro3vub.aica.t3q.ai/model/api/28c4c/inference',
})

const textAnomaly = () => {
  setLoading(true)
  axios
    .post('/inference/text_req_ajx', data, {
      // processData, contentType, dataType은 Axios에서 사용되지 않는 속성이다
      //HTTP 요청에서 전송하는 데이터의 형식은 JSON 형식
      headers: {
        'Content-Type': 'application/json',
      },
      //서버로부터 들어오는 응답값은 JSON 형식
      responseType: 'json',
    })
    .then(res => {
      let json = res.data
      if (json.res == 'true') {
        var response_data = json.response.data
        if (response_data == null) {
          response_data = json.response.inference
        }
        if (response_data == 'ham') {
          // $('div.wrap_next').addClass('show_alert_pass')
        } else {
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

export default textAnomaly