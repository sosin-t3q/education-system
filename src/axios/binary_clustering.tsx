/* 악성코드 군집화 - 바이너리 군집화 */
import axios from 'axios'
import { detailDataAtom, loadingAtom } from '@/atoms'
import { useRecoilValue, useSetRecoilState } from 'recoil'

const detailData = useRecoilValue<any>(detailDataAtom)
const setLoading = useSetRecoilState(loadingAtom)

const binaryClustering = () => {
  let data = JSON.stringify({
    word: detailData,
    url: 'http://dl.idro3vub.aica.t3q.ai/model/api/069d2/inference',
  })

  setLoading(true)

  axios
    .post('/inference/file_req_ajx', data, {
      headers: {
        'Content-Type': 'application/json',
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

export default binaryClustering
