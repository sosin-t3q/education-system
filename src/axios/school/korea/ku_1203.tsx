/* 고려대학교 - 가구 상세 분류 1203 */
import axios from 'axios'
import { detailDataAtom, loadingAtom } from '@/atoms'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import base64DataToFile from '../../base64DataToFile'

const detailData = useRecoilValue<any>(detailDataAtom)
const setLoading = useSetRecoilState(loadingAtom)

const ku1203 = () => {
  // let chair_leg: any = [
  //   '문어형 다리',
  //   '일자형 다리',
  //   '스툴형 다리',
  //   '흔들의자형 다리',
  //   '다리 없음',
  //   '바형 다리',
  // ]
  let data = {
    file: base64DataToFile(detailData, '사진이름', 'image/jpeg'),
    url: 'http://dl.aihunmin.t3q.ai/model/api/219ac/inference',
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
        let response_arr = []
        let response_rlt = []
        if (response_data[0]['대분류'] == 0) {
          response_arr.push('침대')
          for (var i = 1; i < Object.entries(response_data[0]).length; i++) {
            if (Object.entries(response_data[0])[i][1] != 0) {
              response_rlt.push(' ' + Object.entries(response_data[0])[i][0])
            }
          }
        } else if (response_data[0]['대분류'] == 1) {
          response_arr.push('의자')
          for (var i = 2; i < Object.entries(response_data[0]).length; i++) {
            if (Object.entries(response_data[0])[i][1] == 0) {
              response_rlt.push(' ' + Object.entries(response_data[0])[i][0])
            }
          }
          response_rlt
            .push
            // ' ' + chair_leg[Object.entries(response_data[0])[0][1]],
            ()
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

export default ku1203
