/* 뉴스 기사 군집화 - 텍스트 군집화 */
import axios from 'axios'
import { detailDataAtom, loadingAtom, resultAtom } from '@/atoms'
import { useRecoilValue, useSetRecoilState } from 'recoil'

const detailData = useRecoilValue<string | null>(detailDataAtom)
const setLoading = useSetRecoilState(loadingAtom)
const setResult = useSetRecoilState(resultAtom)

const textClustering = () => {
  let cluster_info: any = { rec: '취미', comp: '컴퓨터' }

  // 전송 data에는 file 안의 담긴 값과, url 주소를 JSON으로 변환해 같이 보낸다
  // value는 value atom에서 가져온 값이 담긴다(string)
  let data = JSON.stringify({
    word: detailData?.replace('?', '\\?'),
    url: 'http://dl.idro3vub.aica.t3q.ai/model/api/61626/inference',
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
      if (json.res == 'true') {
        let response_data = json.response.data
        if (response_data == null) {
          response_data = json.response.inference
        }
        response_data = cluster_info[response_data]
        // response_data의 '취미' 혹은 '컴퓨터'가 담겨진 결과값이 반환됨
        setResult(true)
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

export default textClustering
