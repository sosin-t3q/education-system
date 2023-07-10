/* 환경 소리 군집화 - 음성 군집화 */
import axios from 'axios'
import { detailDataAtom, loadingAtom } from '@/atoms'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import base64DataToFile from './base64DataToFile'

const detailData = useRecoilValue<any>(detailDataAtom)
const setLoading = useSetRecoilState(loadingAtom)

const audioClustering = () => {
  let data = {
    file: base64DataToFile(detailData, '오디오이름', 'audio/wav'),
    url: 'http://dl.idro3vub.aica.t3q.ai/model/api/17551/inference',
  }

  setLoading(true)

  let audio_info: any = {
    Crackingfire: '불타는 소리',
    Cow: '소 울음소리',
    Sneezing: '재채기',
  }

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
        /* 결과 */
        response_data = audio_info[response_data]
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

export default audioClustering
