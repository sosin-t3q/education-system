import axiosInstance from '@/services/axiosInstance'

const convertVideo = async (videoArray: { name: string; data: string }[]) => {
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
        }
      }),
    )

    return convertedVideos
  } catch (e) {
    alert('비디오 변환을 실패했습니다.')

    return []
  }
}

export default convertVideo
