import axiosInstance from '@/services/axiosInstance'
import { SetterOrUpdater } from 'recoil'

const convertVideo = async (
  base64: string,
  setAlert: SetterOrUpdater<{ visible: boolean; option: string }>,
) => {
  const url = '/api/converter/video'

  const jsonData = JSON.stringify({
    video_to_base64: base64,
  })

  try {
    const res = await axiosInstance.post(url, jsonData, {
      headers: {
        'Content-Type': 'application/json',
      },
      responseType: 'json',
    })
    const resData = res.data
    const dataObj = {
      convertedVideo: `data:video/mp4;base64,${resData.data}`,
      originalData: base64,
    }

    return dataObj
  } catch (e) {
    setAlert({ visible: true, option: 'videoError' })
  }
}

export default convertVideo
