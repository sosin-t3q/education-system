import axios from 'axios'
import { detailDataAtom, loadingAtom } from '@/atoms'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import base64DataToFile from '../../base64DataToFile'
import { Keyword } from '@/components'

const detailData = useRecoilValue<any>(detailDataAtom)
const setLoading = useSetRecoilState(loadingAtom)

let video_info: any = {
  CricketShot: '크리켓 슛',
  PlayingCello: '첼로 연주',
  Punch: '펀치',
  ShavingBeard: '면도',
  TennisSwing: '테니스 스윙',
}

const videoClassification = () => {
  let data = {
    file: base64DataToFile(detailData, '비디오이름', 'video/mp4'),
    url: 'http://dl.idro3vub.aica.t3q.ai/model/api/067bf/inference',
  }

  setLoading(true)

  axios
    .post('/inference/file_req_ajx', data, {
      // processData, contentType, dataType은 Axios에서 사용되지 않는 속성이다
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      responseType: 'json',
    })
    .then(res => {
      let json = res.data
      if (json.res == 'true') {
        var response_data = json.response.data
        if (response_data == null) {
          response_data = json.response.inference
        }

        response_data = video_info[response_data]
        // response_data = video_info[Object.keys(response_data[0])]
        // $('.result_alert').html(response_data)
        // $('div.wrap_next').addClass('show_alert_pass')
        ;<Keyword option={1} label={response_data} />
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

export default videoClassification
