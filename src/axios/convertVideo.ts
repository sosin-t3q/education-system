import axiosInstance from '@/services/axiosInstance'
import { SetterOrUpdater } from 'recoil'

const convertVideo = async (
  videoArray: { name: string; data: string }[],
  setAlert: SetterOrUpdater<{ visible: boolean; option: string }>, // 알림창 컴포넌트 상태관리
) => {
  const url = '/api/converter/video'

  try {
    const convertedVideos = await Promise.all(
      videoArray.map(async video => {
        const jsonData = JSON.stringify({
          video_to_base64: video.data,
        })

        const res = await axiosInstance.post(url, jsonData, {
          headers: {
            'Content-Type': 'application/json',
          },
          responseType: 'json',
        })

        const resData = res.data

        return {
          name: video.name,
          data: resData.data,
          original_data: video.data,
        }
      }),
    )

    return convertedVideos
  } catch (e) {
    setAlert({ visible: true, option: 'videoError' })

    return []
  }
}

export default convertVideo
