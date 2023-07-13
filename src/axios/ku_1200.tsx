/* 고려대학교 - 버스 승객 이상행동 감지 1200 */
import axios from 'axios'
import { detailDataAtom, loadingAtom } from '@/atoms'
import { useRecoilValue, useSetRecoilState } from 'recoil'

const detailData = useRecoilValue<any>(detailDataAtom)
const setLoading = useSetRecoilState(loadingAtom)

const ku1200 = () => {
  let data = JSON.stringify({
    word: detailData,
    url: 'http://dl.idro3vub.aica.t3q.ai/model/api/8273b/inference',
  })

  setLoading(true)

  axios
    .post('/inference/text_req_ajx', data, {
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

        let response_arr = []
        let response_rlt = []

        if (response_data == 'There is no data') {
          response_arr.push('해당 단어를 찾을 수 없습니다.')
        } else if (
          response_data[0]['negative'] > response_data[0]['neutral'] &&
          response_data[0]['negative'] > response_data[0]['postive']
        ) {
          response_arr.push('부정')
        } else if (response_data[0]['neutral'] > response_data[0]['postive']) {
          response_arr.push('중립')
        } else {
          response_arr.push('긍정')
        }

        for (var i = 1; i < 6; i++) {
          response_arr.push(response_data[i][0])
        }

        if (json.res == 'true') {
          if (response_arr[0] == '해당 단어를 찾을 수 없습니다.') {
            // $(".result_alert").html(response_arr[0]);
            // $("div.wrap_next").addClass("show_alert_pass");
          } else if (response_arr[0] != '해당 단어를 찾을 수 없습니다.') {
            for (var i = 1; i < response_arr.length; i++) {
              response_rlt.push(' ' + response_arr[i])
            }
            // $(".result_alert>span").html("이 단어는 "+response_arr[0]+"적인 단어입니다.<br>연관어로는"+response_rlt+"이(가) 있습니다.");
            // $("div.wrap_next").addClass("show_alert_pass");
          }
          // $(".inner_next>span").css("text-align", "left");
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

export default ku1200
