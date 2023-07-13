/* 지표면 위성 사진 군집화 - 위성 군집화 */
import axios from 'axios'
import { detailDataAtom, loadingAtom } from '@/atoms'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import base64DataToFile from './base64DataToFile'
import { Keyword } from '@/components'

const detailData = useRecoilValue<any>(detailDataAtom)
const setLoading = useSetRecoilState(loadingAtom)

const satelliteClustering = () => {
  let data = {
    file: base64DataToFile(detailData, '사진이름', 'image/png'),
    url: 'http://dl.idro3vub.aica.t3q.ai/model/api/ff463/inference',
  }
  setLoading(true)
  let class_info: any = { forested: '산림화', desertified: '사막화' }

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
        response_data = class_info[response_data];
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

export default satelliteClustering
