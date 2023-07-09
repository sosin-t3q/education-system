/* 손그림 이미지 분류 - 이미지 분류 */
import axios from 'axios'
import { detailDataAtom, loadingAtom, resultAtom } from '@/atoms'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import base64DataToFile from './base64DataToFile'

const detailData = useRecoilValue<any>(detailDataAtom)
const setLoading = useSetRecoilState(loadingAtom)
const setResult = useSetRecoilState(resultAtom)

let class_info = {
  ant: '개미',
  apple: '사과',
  bus: '버스',
  butterfly: '나비',
  cup: '컵',
  envelope: '봉투',
  fish: '물고기',
  giraffe: '기린',
  lightbulb: '전구',
  pig: '돼지',
}

// 이미지 이름이랑, 밈타입 알아야할듯?
let data = {
  file: base64DataToFile(detailData, '이미지이름', 'image/jpeg'),
  url: 'http://dl.idro3vub.aica.t3q.ai/model/api/a8c58/inference',
}

const imageClassification = () => {
  setLoading(true)
  axios
    .post('/inference/file_req_ajx', data, {
      // processData, contentType, dataType은 Axios에서 사용되지 않는 속성이다
      //HTTP 요청에서 전송하는 데이터의 형식은 JSON 형식
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      //서버로부터 들어오는 응답값은 JSON 형식
      responseType: 'json',
    })
    .then(res => {
      let json = res.data
      if (json.res == 'true') {
        var response_data = json.response.data
        if (response_data == null) {
          response_data = json.response.inference
        }
        response_data = class_info[response_data]
        // $('.result_alert').html(response_data)
        // $('div.wrap_next').addClass('show_alert_pass')
      } else {
        console.log(json)
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

export default imageClassification

/*   axios
  .post('/inference/file_req_ajx', data, {
    // processData, contentType, dataType은 Axios에서 사용되지 않는 속성이다
    //HTTP 요청에서 전송하는 데이터의 형식은 JSON 형식
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    //서버로부터 들어오는 응답값은 JSON 형식
    responseType: 'json',
  })
  .then(json => {
    if (json.res == 'true') {
      var response_data = json.response.data
      if (response_data == null) {
        response_data = json.response.inference
      }
      response_data = class_info[response_data]
      // $('.result_alert').html(response_data)
      // $('div.wrap_next').addClass('show_alert_pass')
    } else {
      console.log(json)
      alert('API 호출에 실패했습니다.')
    }
  })
  .catch(err => {
    console.log(err.message)
  }) */
