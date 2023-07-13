/* 경북대학교 - 버스 승객 이상행동 감지 1102 */
import axios from 'axios'
import { detailDataAtom, loadingAtom } from '@/atoms'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import base64DataToFile from './base64DataToFile'

const detailData = useRecoilValue<any>(detailDataAtom)
const setLoading = useSetRecoilState(loadingAtom)

const knu1102 = () => {
  let data = {
    file: base64DataToFile(detailData, '비디오이름', 'video/mp4'),
    url: 'http://dl.idro3vub.aica.t3q.ai/model/api/0b2a8/inference',
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
        // content_result = "data:video/mp4;base64," + response_data;
        // $("#resVidSrc").attr("style", "display:block;");
        // $("#resVidSrc").attr("src", content_result);
        // $("#vid_span").attr("style", "display:none;");
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

export default knu1102
