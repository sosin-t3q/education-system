/* 픽셀의 다중 스펙트럼 값을 이용한 이상탐지 - 위성 이상탐지 */
import axios from 'axios'
import { detailDataAtom, loadingAtom } from '@/atoms'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { Keyword } from '@/components'

const detailData = useRecoilValue<any>(detailDataAtom)
const setLoading = useSetRecoilState(loadingAtom)

const satelliteAnomaly = () => {
  let data = JSON.stringify({
    word: detailData.join(),
    url: 'http://dl.idro3vub.aica.t3q.ai/model/api/69e0b/inference',
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

        /* 결과 */
        if (response_data == 'normal data') {
          // 정상 결과 들어가는 부분
          // $("div.wrap_next").addClass("show_alert_pass");
          <Keyword option={1} label={'정상 데이터'} />
        } else if (response_data == 'abnormal data') {
          // 파손 결과 들어가는 부분
          // $("div.wrap_next").addClass("show_alert_nonpass");
          <Keyword option={2} label={'비정상 데이터'} />
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

export default satelliteAnomaly
