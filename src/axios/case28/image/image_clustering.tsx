/* 만화 얼굴 군집화 - 이미지 군집화 */
import axios from 'axios'
import { detailDataAtom, loadingAtom } from '@/atoms'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import base64DataToFile from '../../base64DataToFile'
import { Keyword } from '@/components'

const detailData = useRecoilValue<any>(detailDataAtom)
const setLoading = useSetRecoilState(loadingAtom)

const imageCluster = () => {
  // 이미지 이름이랑, 밈타입 알아야할듯?
  let data = {
    file: base64DataToFile(detailData, '이미지이름', 'image/jpeg'),
    url: 'http://dl.idro3vub.aica.t3q.ai/model/api/48f97/inference',
  }

  let class_info: any = {
    // 띄어쓰기 하려고 문자형으로 함
    'perm hair': '웨이브 머리',
    'straight hair': '직모',
    sunglasses: '선글라스',
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
        response_data = class_info[response_data]
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

export default imageCluster
