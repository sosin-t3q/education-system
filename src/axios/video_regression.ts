import axios from 'axios'
import { detailDataAtom } from '@/atoms'
import { useRecoilValue } from 'recoil'
import base64DataToFile from './base64DataToFile'

const detailData = useRecoilValue<any>(detailDataAtom)

let data = {
  file: base64DataToFile(detailData, '이미지이름', 'image/gif'),
  url: 'http://dl.idro3vub.aica.t3q.ai/model/api/a937e/inference',
}
axios
  .post('/inference/file_req_ajx', data, {
    // processData, contentType, dataType은 Axios에서 사용되지 않는 속성이다
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    responseType: 'json',
  })
  .then(json => {
    if (json.res == 'true') {
      var response_data = json.response.data
      if (response_data == null) {
        response_data = json.response.inference
      }
      // $('#resImgSrc').attr('src', 'data:image/jpg;base64,' + response_data)
      // $('div.inner_next').addClass('show_img')
    } else {
      alert('API 호출에 실패했습니다.')
    }
  })
  .catch(err => {
    console.log(err.message)
  })
