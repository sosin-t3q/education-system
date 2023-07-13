/* NBA 선수 연봉 예측 - log 회귀 */
import axios from 'axios'
import { detailDataAtom, loadingAtom } from '@/atoms'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { Keyword } from '@/components'

const detailData = useRecoilValue<any>(detailDataAtom)
const setLoading = useSetRecoilState(loadingAtom)

const logRegression = () => {
  let data = JSON.stringify({
    word: detailData.join(),
    url: 'http://dl.idro3vub.aica.t3q.ai/model/api/6dbca/inference',
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
        let response_data = json.response.data
        if (response_data == null) {
          response_data = json.response.inference
        }
        // 결과 들어가는 부분
        //  $(".result_alert").html(response_data);
        // $("div.wrap_next").addClass("show_alert_pass");
        <Keyword option={1} label={response_data} />
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

export default logRegression
