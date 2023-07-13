/* 악성코드 감염 예측 - 바이너리 회귀 */
import axios from 'axios'
import { detailDataAtom, loadingAtom } from '@/atoms'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { Keyword } from '@/components'
// import base64DataToFile from './base64DataToFile'

const detailData = useRecoilValue<any>(detailDataAtom)
const setLoading = useSetRecoilState(loadingAtom)

const binaryRegression = () => {
  let data = JSON.stringify({
    word: detailData,
    url: 'http://dl.idro3vub.aica.t3q.ai/model/api/a142d/inference',
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
          response_data = json.response.inference;
          <Keyword option={1} label={response_data} />
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

export default binaryRegression
