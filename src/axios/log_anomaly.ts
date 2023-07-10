/* 신용카드 사기 탐지 - log 이상탐지 */
import axios from 'axios'
import { detailDataAtom, loadingAtom } from '@/atoms'
import { useRecoilValue, useSetRecoilState } from 'recoil'

const detailData = useRecoilValue<any>(detailDataAtom)
const setLoading = useSetRecoilState(loadingAtom)

const logAnomaly = () => {
  let data = JSON.stringify({
    word: detailData.join(),
    url: 'http://dl.idro3vub.aica.t3q.ai/model/api/d0fb3/inference',
  })
  setLoading(true)

  axios
    .post('/inference/log_req_ajx', data, {
      headers: {
        'Content-Type': 'application/json',
      },
      responseType: 'json',
    })
    .then(res => {
      let json = res.data
      if (json.res == 'true') {
        // $("#output_log").val(JSON.stringify(json.response));
        // $("div.wrap_logText").addClass("show_log");
        let response_data = json.response.data
        if (response_data == null) {
          response_data = json.response.inference
        }

        /* 결과 */
        if (response_data == 'normal_transaction') {
          // 정상 결과 들어가는 부분
          // $("div.wrap_next").addClass("show_alert_pass");
        } else if (response_data == 'fraudulent_transaction') {
          // 파손 결과 들어가는 부분
          // $("div.wrap_next").addClass("show_alert_nonpass");
        } else {
          alert('API 호출에 실패했습니다.')
        }
      }
    })
    .catch(err => {
      console.log(err.message)
    })
    .finally(() => {
      setLoading(false)
    })
}

export default logAnomaly
