import axios from 'axios'
import { detailDataAtom, loadingAtom } from '@/atoms'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import base64DataToFile from '../../base64DataToFile'

const detailData = useRecoilValue<any>(detailDataAtom)
const setLoading = useSetRecoilState(loadingAtom)

const videoClustering = () => {
  let data = {
    file: base64DataToFile(detailData, '이미지이름', 'image/gif'),
    url: 'http://dl.idro3vub.aica.t3q.ai/model/api/05973/inference',
  }

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
        let response_image = json.response.all_cluster_image
        let response_data = json.response.inference_cluster

        // $('#resImgSrc').attr('src', 'data:image/jpg;base64,' + response_image)
        // $('div.inner_next').addClass('show_img')
        // $('div.inner_next').css({ 'align-items': 'baseline' })

        const counts = response_data.reduce((pv, cv) => {
          pv[cv] = (pv[cv] || 0) + 1
          return pv
        }, {})

        const keys = Object.keys(counts)
        let mode = keys[0]
        keys.forEach((val, idx) => {
          if (counts[val] > counts[mode]) {
            mode = val
          }
        })

        // $('.result_alert').html(mode)
        // $('.result_alert').css({ top: '85%' })
        // $('.inner_next').addClass('show_alert_pass')
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

export default videoClustering
