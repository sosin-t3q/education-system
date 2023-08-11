import axiosInstance from '@/services/axiosInstance'

const axiosRequest = async (
  dataTransfer: FormData | string,
  apiType: string,
) => {
  const axiosUrl = `/api/inference/${apiType}_req_ajx`
  // eslint-disable-next-line no-constant-condition
  if (apiType === 'files' || 'file') {
    const res = await axiosInstance.post(axiosUrl, dataTransfer, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      responseType: 'json',
    })

    return res.data
    // eslint-disable-next-line no-constant-condition
  } else if (apiType === 'text' || 'log') {
    const res = await axiosInstance.post(axiosUrl, dataTransfer, {
      headers: {
        'Content-Type': 'application/json',
      },
      responseType: 'json', //서버로부터 들어오는 응답값은 JSON 형식
    })

    return res.data
  }
}

export default axiosRequest
