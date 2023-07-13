/* 피아노 악보 생성 - 음성 회귀 */
import axios from 'axios'
import { detailDataAtom, loadingAtom } from '@/atoms'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import base64DataToFile from '../../base64DataToFile'

const detailData = useRecoilValue<any>(detailDataAtom)
const setLoading = useSetRecoilState(loadingAtom)

const audioRegression = () => {
  let data = {
    file: base64DataToFile(detailData, '오디오이름', 'audio/midi'),
    url: 'http://dl.idro3vub.aica.t3q.ai/model/api/29683/inference',
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
        // $("#tarMidi").attr("src", "data:audio/midi;base64," + response_data);
        // $(".inner_next").css('background', 'none');
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

export default audioRegression
