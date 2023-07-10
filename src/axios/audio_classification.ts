/* 음성단어분류 - 음성 분류 */
import axios from 'axios'
import { detailDataAtom, loadingAtom } from '@/atoms'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import base64DataToFile from './base64DataToFile'

const detailData = useRecoilValue<any>(detailDataAtom)
const setLoading = useSetRecoilState(loadingAtom)

const audioClassification = () => {
  let data = {
    file: base64DataToFile(detailData, '오디오이름', 'audio/wav'),
    url: 'http://dl.idro3vub.aica.t3q.ai/model/api/c68e0/inference',
  }

  setLoading(true)

  axios
    .post('/inference/file_req_ajx', data, {
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
        // 결과 들어가는 부분
        // $(".result_alert").html(response_data);
        // $("div.wrap_next").addClass("show_alert_pass");
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

export default audioClassification
