/* 셰익스피어 저작 텍스트 생성 - 텍스트 회귀 */
import axios from 'axios'
import { detailDataAtom, loadingAtom } from '@/atoms'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { Keyword } from '@/components'

const detailData = useRecoilValue<string | null>(detailDataAtom)
const setLoading = useSetRecoilState(loadingAtom)

const textRegression = () => {
  // 전송 data에는 textarea 안의 담긴 값과, url 주소를 JSON으로 변환해 같이 보낸다
  // value는 value atom에서 가져온 값이 담긴다(string)
  let data = JSON.stringify({
    word: detailData,
    url: 'http://dl.idro3vub.aica.t3q.ai/model/api/6fe4c/inference',
  })

  setLoading(true)

  axios
    .post('/inference/text_req_ajx', data, {
      // processData, contentType, dataType은 Axios에서 사용되지 않는 속성이다
      //HTTP 요청에서 전송하는 데이터의 형식은 JSON 형식
      headers: {
        'Content-Type': 'application/json',
      },
      //서버로부터 들어오는 응답값은 JSON 형식
      responseType: 'json',
    })
    .then(res => {
      let json = res.data
      let response_data = json.response.data
      if (response_data == null) {
        response_data = json.response.inference
      }
      response_data = response_data[0].replaceAll('\n', '<br>')
      if (json.res == 'true') {
        // 생성된 텍스트 결과를 보여준다
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

export default textRegression
