/* 포켓몬 스탯에 따른 군집화 - log 군집화 */
import axios from 'axios'
import { detailDataAtom, loadingAtom } from '@/atoms'
import { useRecoilValue, useSetRecoilState } from 'recoil'

const detailData = useRecoilValue<any>(detailDataAtom)
const setLoading = useSetRecoilState(loadingAtom)

const logClustering = () => {
  let data = JSON.stringify({
    word: detailData.join(),
    url: 'http://dl.idro3vub.aica.t3q.ai/model/api/8ede6/inference',
  })
  setLoading(true)

  let class_info: any = {
    'physical good, magical bad': '물리 능력치 양호',
    'magical good, physical bad': '특수 능력치 양호',
    'physical good, magical good': '모든 능력치 양호',
    'physical bad, magical bad': '모든 능력치 부족',
  }

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
        response_data = class_info[response_data]
        // 결과 들어가는 부분
        //  $(".result_alert").html(response_data);
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

export default logClustering
