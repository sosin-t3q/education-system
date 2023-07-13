/* NBA 선수 포지션 분류 - log 분류 */
import axios from 'axios'
import { detailDataAtom, loadingAtom } from '@/atoms'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { Keyword } from '@/components'

const detailData = useRecoilValue<any>(detailDataAtom)
const setLoading = useSetRecoilState(loadingAtom)

const logClassification = () => {
  let data = JSON.stringify({
    word: detailData.join(),
    url: 'http://dl.idro3vub.aica.t3q.ai/model/api/7ede0/inference',
  })
  setLoading(true)

  let class_info: any = { Center: '센터', Guard: '가드', Forward: '포워드' }

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

export default logClassification
