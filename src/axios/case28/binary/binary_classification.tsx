/* 악성코드 이상탐지 - 바이너리 이상탐지 */
import axios from 'axios'
import { detailDataAtom, loadingAtom } from '@/atoms'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import base64DataToFile from '../../base64DataToFile'

const detailData = useRecoilValue<any>(detailDataAtom)
const setLoading = useSetRecoilState(loadingAtom)

const binaryClassification = () => {
  let data = {
    file: base64DataToFile(detailData, '사진이름', 'image/png'),
    url: 'http://dl.idro3vub.aica.t3q.ai/model/api/09a5a/inference',
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
        /* 결과 */
        if (response_data == 'benign') {
          // 정상 결과 들어가는 부분
          // $("div.wrap_next").addClass("show_alert_pass");
        } else {
          console.log('파손')
          // 파손 결과 들어가는 부분
          // $("div.wrap_next").addClass("show_alert_nonpass");
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

export default binaryClassification
