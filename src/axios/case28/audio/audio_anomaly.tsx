/* 산업 기계 소리 이상탐지 - 음성 이상탐지 */
import axios from 'axios'
import { detailDataAtom, loadingAtom } from '@/atoms'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import base64DataToFile from '../../base64DataToFile'

const detailData = useRecoilValue<any>(detailDataAtom) // 사용자가 입력한 값을 detailData에 넣어줌
const setLoading = useSetRecoilState(loadingAtom) // loading 화면을 표시하기 위해 선언

const audioAnomaly = () => {
  /* 보낼 data를 객체로 선언, 첨부한 file과 api URL을 포함하고 있음 */
  let data = {
    file: base64DataToFile(detailData, '오디오이름', 'audio/wav'),
    url: 'http://dl.idro3vub.aica.t3q.ai/model/api/704b3/inference',
  }

  /* setLoading을 true로 변경하여 Loading 창 표시 */
  setLoading(true)

  /* axios 비동기 통신 시작 */
  axios
    .post('/inference/file_req_ajx', data, {
      // 엔드포인트 주소와 위에서 선언한 data
      headers: {
        'Content-Type': 'multipart/form-data', // form-data 형식으로 전송
      },
      responseType: 'json', // 응답은 json 파일로 받음
    })
    /* axios 통신에 성공하면 then, 실패하면 catch */
    .then(res => {
      let json = res.data // json에 res.data를 넣어줌
      if (json.res == 'true') {
        // res.data 가 true이면 (API 응답에 성공하면)
        let response_data = json.response.data
        if (response_data == null) {
          // json.response.data에 왜 null 값이 들어있으며, 모든 조건문이 null 값이 맞으면 결과값을 가져오도록 설계되었는데 왜 그렇게 되었나요
          // response.data가 null 이면?
          response_data = json.response.inference // response.inference 값을 response_data(결과값)에 넣어줌
        }

        /* 결과 */
        if (response_data == 'normal') {
          // 결과 값이 'normal'이면 ? (정상이면?)
          // 정상 결과 컴포넌트 출력
          // $("div.wrap_next").addClass("show_alert_pass");
        } else if (response_data == 'abnormal') {
          // 결과 값이 'abnormal'이면 ? (파손이면?)
          // 파손 결과 들어가는 부분
          // $("div.wrap_next").addClass("show_alert_nonpass");
        } else {
          alert('API 호출에 실패했습니다.')
        }
      }
    })
    .catch(err => {
      console.log(err.message)
    })
    // 결과와 상관없이 무조건 setLoading의 상태를 false로 변경하고 동작을 마침
    .finally(() => {
      setLoading(false)
    })
}

export default audioAnomaly
