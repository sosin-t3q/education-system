/* 노후 시설물 이미지를 이용한 이상탐지 - 이미지 이상탐지 */
import axios from 'axios'
import { detailDataAtom, loadingAtom, resultAtom } from '@/atoms'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import base64DataToFile from './base64DataToFile'

const detailData = useRecoilValue<any>(detailDataAtom)
const setLoading = useSetRecoilState(loadingAtom)
const setResult = useSetRecoilState(resultAtom)

const imageAnomaly = () => {
  // 이미지 이름이랑, 밈타입 알아야할듯?
  let data = {
    file: base64DataToFile(detailData, '이미지이름', 'image/jpeg'),
    url: 'http://dl.idro3vub.aica.t3q.ai/model/api/0897f/inference',
  }

  setLoading(true)

  axios
    .post('/inference/file_req_ajx', data, {
      // processData, contentType, dataType은 Axios에서 사용되지 않는 속성이다
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      responseType: 'json',
    })
    .then(res => {
      // $("#input_log").val(JSON.stringify(json.request));
      let json = res.data
      if (json.res == 'true') {
        // $('#output_log').val(JSON.stringify(json.response))
        // $('div.wrap_logText').addClass('show_log')
        var response_data = json.response.data
        if (response_data == null) {
          response_data = json.response.inference
        }
        if (response_data == 'original') {
          // $('div.wrap_next').addClass('show_alert_pass')
        } else if (response_data == 'discard') {
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

export default imageAnomaly
