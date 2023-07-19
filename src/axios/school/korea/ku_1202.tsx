/* 고려대학교 - 알약 이미지 분류 1202 */
import axios from 'axios'
import { detailDataAtom, loadingAtom } from '@/atoms'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import base64DataToFile from '../../base64DataToFile'

const detailData = useRecoilValue<any>(detailDataAtom)
const setLoading = useSetRecoilState(loadingAtom)

const ku1202 = () => {
  let data = {
    file: base64DataToFile(detailData, '사진이름', 'image/jpeg'),
    url: 'http://dl.aihunmin.t3q.ai/model/api/5e366/inference',
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

        let res_score = []

        for (var data_for in response_data[0]) {
          res_score.push(response_data[0][data_for]['SCORE'])
        }

        let res_max_data = Math.max.apply(null, res_score)

        for (var data_for in response_data[0]) {
          if (response_data[0][data_for]['SCORE'] == res_max_data) {
            // let display_data = response_data[0][data_for];
          }
        }

        if (json.res == 'true') {
          // $(".result_alert>span").html(
          //                         "알약명 : " + display_data['NAME'] + "<br>"
          //                         + "색 : " + display_data['COLOR'] +"<br>"
          //                         //"효능 : 1." + display_data['EFFECT'].split('1.')[1] +"<br>"
          //                         + "모양 : " + display_data['MY'] +"<br>"
          //                         //+ "용법 : " + display_data['USAGE']+ "<br>"
          //                             );
          // $("div.wrap_next").addClass("show_alert_pass");
          // $(".result_alert>span").css("text-align", "left");
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

export default ku1202
