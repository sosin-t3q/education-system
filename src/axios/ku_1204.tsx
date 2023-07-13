/* 고려대학교 - 가짜 얼굴 판별 서비스 1204 */
import axios from 'axios'
import { detailDataAtom, loadingAtom } from '@/atoms'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import base64DataToFile from './base64DataToFile'

const detailData = useRecoilValue<any>(detailDataAtom)
const setLoading = useSetRecoilState(loadingAtom)

const ku1204 = () => {
  let data = {
    file: base64DataToFile(detailData, '사진이름', 'image/jpeg'),
    url: 'http://dl.idro3vub.aica.t3q.ai/model/api/d29f6/inference',
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
        if (response_data == 'natural image') {
          // 정상
          // $('div.wrap_next').addClass('show_alert_pass')
        } else if (response_data == 'fake image') {
          // 비정상
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

export default ku1204
