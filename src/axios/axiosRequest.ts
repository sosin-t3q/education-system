import axiosInstance from '@/services/axiosInstance'
import { CancelTokenSource } from 'axios'

const axiosRequest = async (
  dataTransfer: FormData | string,
  apiType: string,
  source: CancelTokenSource,
) => {
  const axiosUrl = `/api/inference/${apiType}_req_ajx`
  let contentType = ''

  // files, file, canvas로 전송하는 API는 form-data 형식으로 전송
  if (['files', 'file', 'canvas'].includes(apiType)) {
    contentType = 'multipart/form-data'

    // text, log로 전송하는 API는 json 형식으로 전송
  } else if (['text', 'log'].includes(apiType)) {
    contentType = 'application/json'
  } else {
    throw new Error('잘못된 API 타입입니다.')
  }

  const res = await axiosInstance.post(axiosUrl, dataTransfer, {
    headers: {
      'Content-Type': contentType,
    },
    responseType: 'json',
    cancelToken: source.token,
  })

  return res.data
}

export default axiosRequest
